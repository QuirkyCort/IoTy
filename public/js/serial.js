var serial = new function() {
  var self = this;

  this.version = undefined;
  this.name = '';

  this.isConnected = false;

  this.usbFilters = [
    { // CH9102F (non-standard?)
      usbVendorId: 0x1a86,
      usbProductId: 0x55d4
    },
    { // CP2102
      usbVendorId: 0x10c4,
      usbProductId: 0xea60
    },
    { // CH340
      usbVendorId: 0x1a86,
      usbProductId: 0x7523
    },
  ];

  this.writeEnable = false;

  // Run on page load
  this.init = function() {
    self.port = null;
    self.pythonSerial = null;
  };

  this.connectDialog = function() {
    let $body = $(
      '<p>' +
        '"Filtered Connect" can help hide the non-ESP32 devices, but some valid ESP32 devices may not appear.' +
      '</p>' +
      '<p>' +
        '"Connect" will show all devices, but it may be hard to identify the correct device.' +
      '</p>'
    );

    let $buttons = $(
      '<button type="button" class="cancel btn-light">Cancel</button>' +
      '<button type="button" class="filteredConnect btn-success">Filtered Connect</button>' +
      '<button type="button" class="connect btn-success">Connect</button>'
    );

    let $dialog = dialog('Connect', $body, $buttons);

    $buttons.siblings('.cancel').click(function(){
      $dialog.close();
    });
    $buttons.siblings('.filteredConnect').click(function(){
      self.connect(self.usbFilters);
      $dialog.close();
    });
    $buttons.siblings('.connect').click(function(){
      self.connect();
      $dialog.close();
    });
  };

  this.connect = async function(filters=[]) {
    if (! ('serial' in navigator)) {
      toastMsg('Web Serial not supported on this browser!');
      return;
    }

    try {
      if (filters.length > 0) {
        self.port = await navigator.serial.requestPort({filters: filters});
      } else {
        self.port = await navigator.serial.requestPort();
      }

      self.port.ondisconnect = function(){
        main.setConnectStatus(main.STATUS_DISCONNECTED);
        self.isConnected = false;
        self.port = null;
        self.pythonSerial = null;
        self.version = undefined;
        self.name = '';
      }

      self.pythonSerial = new PythonSerial(self.port, 115200);
      await self.pythonSerial.init();
      self.setupReadLoop();

      main.setConnectStatus(main.STATUS_CONNECTED);
      self.isConnected = true;
      self.writeEnable = true;
    } catch (error) {
      toastMsg(error);
    }
  };

  this.setupReadLoop = function() {
    self.pythonSerial.readLoop(function(text){
      monitorPanel.appendText(text);
    });
  };

  this.sendSerial = async function(text) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    if (self.writeEnable) {
      const value = new TextEncoder('utf-8').encode(text + '\r\n');
      try {
        self.pythonSerial.writeString(text + '\r\n');
      } catch (error) {
        console.log(error);
        toastMsg('Error sending');
      }
    }
  };

  this.sendAbort = function() {
    this.pythonSerial.sendCtrlC();
  };

  this.disconnect = async function() {
    await self.pythonSerial.closePort();

    main.setConnectStatus(main.STATUS_DISCONNECTED);
    self.isConnected = false;
    self.port = null;
    self.pythonSerial = null;
    self.version = undefined;
    self.name = '';
  };

  this.getVersion = async function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      return null;
    }
    let result = await self.pythonSerial.sendPythonCmdAndRun(
      'import ioty.constants\n' +
      'print(ioty.constants._VERSION)\n' +
      'with open("_ioty_name") as f: print(f.readline())\n'
    );
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result[0] != 'success') {
      return null;
    }
    result = result[1].split('\r\n');

    self.version = parseInt(result[0]);
    self.name = result[1];

    return 'success';
  };

  this.checkVersion = async function($window) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    $window = main.hiddenButtonDialog('Checking version', 'Retrieving...');

    let response = await self.getVersion();
    if (response == null) {
      $window.$body.text('Connection timed out. Press the reset button on your device and try again.');
      $window.$buttonsRow.removeClass('hide');
      return;
    }

    if (self.version < constants.CURRENT_VERSION) {
      $window.close();
      main.updateFirmwareDialog();
    } else {
      $window.$body.text('Firmware version: ' + self.version);
      $window.$buttonsRow.removeClass('hide');
    }
  };

  this.getInfo = async function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      toastMsg('Connection timed out. Press the reset button on your device and try again.');
      return;
    }
    let result = await self.pythonSerial.sendPythonCmdAndRun(
      'import os, gc, network, binascii\n' +
      'fs_stats = os.statvfs("/")\n' +
      'print(binascii.hexlify(network.WLAN().config("mac")))\n' +
      'print(gc.mem_alloc())\n' +
      'print(gc.mem_free())\n' +
      'print(fs_stats[0])\n' +
      'print(fs_stats[3])\n'
    );
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result[0] != 'success') {
      toastMsg('Connection timed out. Press the reset button on your device and try again.');
      return;
    }
    result = result[1].split('\r\n');

    let $info = $(
      '<table>' +
        '<tr><td style="padding-right: 2em;">MAC Address: </td><td id="mac"></td></tr>' +
        '<tr><td>Allocated Mem: </td><td id="allocMem"></td></tr>' +
        '<tr><td>Free Mem: </td><td id="freeMem"></td></tr>' +
        '<tr><td>Free Space: </td><td id="freeSpace"></td></tr>' +
      '</table>'
    );
    $info.find('#mac').text(result[0].slice(2,-1));
    $info.find('#allocMem').text(result[1]);
    $info.find('#freeMem').text(result[2]);
    $info.find('#freeSpace').text(result[3] * result[4]);
    acknowledgeDialog({message: $info});
  };

  this.updateFirmware = async function() {
    main.openPage('https://quirkycort.github.io/IoTy-Flash/public');
  };

  this.updateFirmwareDialog = async function() {
    if (self.version == undefined) {
      await self.getVersion();
    }
    main.updateFirmwareDialog();
  }

  this.download = async function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    if (filesManager.modified == false) {
      await pythonPanel.loadPythonFromBlockly();
    }
    filesManager.updateCurrentFile();

    let $downloadWindow = main.hiddenButtonDialog('Download to Device', 'Checking syntax...');

    // Check syntax
    let result = main.checkPythonSyntax();
    if (result.error) {
      $downloadWindow.$body.text('Syntax Error');
      let $error = $('<pre>' + result.text + '</pre>');
      $downloadWindow.$body.append($error);
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    }

    // Enter raw mode
    $downloadWindow.$body.text('Entering raw mode');
    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      $downloadWindow.$body.text('Connection timed out. Press the reset button on your device and try again.');
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    }

    // Erase
    $downloadWindow.$body.text('Erasing...');
    let response = await self.erase();
    if (response[0] != 'success') {
      $downloadWindow.$body.text('Error erasing files.');
      $downloadWindow.$buttonsRow.removeClass('hide');
      await self.pythonSerial.exitRawMode();
      return;
    }

    let currentFileCount = 0;
    let totalFilesCount = Object.keys(filesManager.files).length;
    for (let filename in filesManager.files) {
      $downloadWindow.$body.text('Downloading (' + currentFileCount + '/' + totalFilesCount + ')');
      let e = new TextEncoder();
      let fileBuf = e.encode(filesManager.files[filename]);
      let result = await self.pythonSerial.copyFileToDevice(filename, fileBuf);
      if (result != 'success') {
        $downloadWindow.$body.text('Error downloading files');
        $downloadWindow.$buttonsRow.removeClass('hide');
        return;
      }
    }

    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    $downloadWindow.$body.text('Download Completed. Please restart your device.');
    $downloadWindow.$buttonsRow.removeClass('hide');
  };

  this.eraseDialog = function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    confirmDialog({
      title: 'Erase Device?',
      confirm: 'Erase All',
      message: 'This will erase all programs from your device, restoring it to its initial state.'
    }, async function(){
      let $deleteWindow = main.hiddenButtonDialog('Erase Device', 'Deleting all programs from device...');

      self.pythonSerial.setReadToBuf();
      self.writeEnable = false;
      if (await self.pythonSerial.enterRawMode() != 'success') {
        $deleteWindow.$body.text('Connection timed out. Press the reset button on your device and try again.');
        $deleteWindow.$buttonsRow.removeClass('hide');
        return
      }

      let response = await self.erase();
      await self.pythonSerial.exitRawMode();
      self.pythonSerial.setReadToHandler();
      self.writeEnable = true;

      if (response[0] != 'success') {
        $deleteWindow.$body.text('Error erasing files.');
        $deleteWindow.$buttonsRow.removeClass('hide');
      } else {
        $deleteWindow.$body.text('Delete completed.');
        $deleteWindow.$buttonsRow.removeClass('hide');
      }
    });
  };

  this.erase = async function() {
    let result = await self.pythonSerial.sendPythonCmdAndRun(
      'import os\n' +
      'import ioty.constants\n' +
      'for f in os.listdir():\n' +
      '  if not(f in ioty.constants._PRESERVE_FILES):\n' +
      '    os.remove(f)\n'
    );
    return result;
  };

  this.changeNameDialog = function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    let $changeNameWindow = confirmDialog({
      title: 'Change device name',
      message: '<div>New name: <input id="newName" type="text" maxlength="8" value="' + self.name + '"></div>'
    }, function() {
      let newName = $changeNameWindow.$body.find('#newName').val().trim();
      if (newName.length < 1) {
        toastMsg('Name cannot be empty');
        return;
      }
      self.changeName(newName);
    })
  };

  this.changeName = async function(newName) {
    let $changeNameWindow = main.hiddenButtonDialog('Change Device Name', 'Changing Name...');

    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      $changeNameWindow.$body.text('Connection timed out. Press the reset button on your device and try again.');
      $changeNameWindow.$buttonsRow.removeClass('hide');
      return
    }

    let e = new TextEncoder();
    let fileBuf = e.encode(newName);
    let result = await self.pythonSerial.copyFileToDevice(constants.NAME_FILE, fileBuf);
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result != 'success') {
      $changeNameWindow.$body.text('Error changing device name');
      $changeNameWindow.$buttonsRow.removeClass('hide');
      return;
    }
    $changeNameWindow.$body.text('Change completed. Restart your device to see the new name.');
    $changeNameWindow.$buttonsRow.removeClass('hide');
  };

  this.configureDeviceNetwork = async function(content) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    let $configureDeviceNetworkWindow = main.hiddenButtonDialog('Configure Device Network', 'Downloading Settings...');

    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      $configureDeviceNetworkWindow.$body.text('Connection timed out. Press the reset button on your device and try again.');
      $configureDeviceNetworkWindow.$buttonsRow.removeClass('hide');
      return
    }

    let e = new TextEncoder();
    let fileBuf = e.encode(content);
    let result = await self.pythonSerial.copyFileToDevice(constants.NETWORK_CONFIGURATION_FILE, fileBuf);
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result != 'success') {
      $configureDeviceNetworkWindow.$body.text('Error configuring network');
      $configureDeviceNetworkWindow.$buttonsRow.removeClass('hide');
      return;
    }
    $configureDeviceNetworkWindow.$body.text('Change completed. Restart your device to connect to the network.');
    $configureDeviceNetworkWindow.$buttonsRow.removeClass('hide');
  };

  this.getFilesListing = async function() {
    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      return {
        status: constants._STATUS_FAILED,
        content: null
      }
    }

    let result = await self.pythonSerial.sendPythonCmdAndRun(
      'import os\n' +
      'def list_files(dir):\n' +
      '  for i in os.ilistdir(dir):\n' +
      '    if i[1] == 0x8000:\n' +
      '      print(dir + i[0])\n' +
      '    elif i[1] == 0x4000:\n' +
      '      print(dir + i[0] + "/")\n' +
      '      list_files(dir + i[0] + "/")\n' +
      'list_files("")\n'
    );
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result[0] != 'success') {
      return {
        status: constants._STATUS_FAILED,
        content: null
      }
    }
    return {
      status: constants._STATUS_SUCCESS,
      content: result[1].split('\r\n').slice(0, -1)
    }
  };

  this.downloadOneFileFromDevice = async function(filename) {
    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      return null;
    }

    let result = await self.pythonSerial.copyFileFromDevice(filename);
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result[0] != 'success') {
      return null;
    }
    return base64DecToArr(result[1]);
  };

  this.writeFile = async function(name, value, progressCB) {
    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      return constants._STATUS_FAILED;
    }

    let result = await self.pythonSerial.copyFileToDevice(name, new Uint8Array(value));
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result != 'success') {
      return constants._STATUS_FAILED;
    }
    return constants._STATUS_SUCCESS;
  };

  this.deleteOneFileFromDevice = async function(filename) {
    if (constants.PRESERVE_FILES.includes(filename)) {
      return constants._STATUS_FAILED;
    }

    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      return constants._STATUS_FAILED;
    }

    let result = await self.pythonSerial.deleteFile(filename);
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result != 'success') {
      return constants._STATUS_FAILED;
    }
    return constants._STATUS_SUCCESS;
  };

  this.mkdirOnDevice = async function(dirname) {
    self.pythonSerial.setReadToBuf();
    self.writeEnable = false;
    if (await self.pythonSerial.enterRawMode() != 'success') {
      return constants._STATUS_FAILED;
    }

    let result = await self.pythonSerial.mkdir(dirname);
    await self.pythonSerial.exitRawMode();
    self.pythonSerial.setReadToHandler();
    self.writeEnable = true;

    if (result != 'success') {
      return constants._STATUS_FAILED;
    }
    return constants._STATUS_SUCCESS;
  };
}

// Init class
serial.init();