var ble = new function() {
  var self = this;

  this.CURRENT_VERSION = 1;

  this._MODE_APPEND = 2;
  this._MODE_OPEN = 1;
  this._MODE_CLOSE = 3;
  this._MODE_DELETE_ALL = 4;
  this._MODE_GET_VERSION = 5;
  this._MODE_LIST = 6;
  this._MODE_READ = 7;
  this._MODE_DELETE = 8;
  this._MODE_UPDATE = 9;

  this.DATA_BUFFER_SIZE = 512;

  this.FIRWARE_FILES = [
    '_ioty_updates',
    'boot.py',
    '_ioty_monitor.py',
    '_ioty_service.py',
  ];

  this.FIRWARE_UPDATE_FILE = '_ioty_updates';

  this.SERVICE_UUID = 'ba48d887-db79-4cac-8d72-a4d9ecdfcde2';
  this.CMD_UUID = '4423f470-dad0-437a-8c18-9a378981cca9';
  this.DATA_UUID = 'e4494fc7-fae6-42cf-81c0-8f835a0ace7f';
  this.SERIAL_UUID = 'c12fee47-2a93-4138-9505-2a97da04b413';

  this.isConnected = false;

  // Run on page load
  this.init = function() {
  };

  this.connect = async function() {
    if (typeof navigator.bluetooth == 'undefined') {
      showErrorModal('Bluetooth not supported on this browser. IoTy is only supported on Chrome.');
      return;
    }

    try {
      console.log('Requesting Bluetooth Device...');
      self.device = await navigator.bluetooth.requestDevice({
        filters: [{services: [self.SERVICE_UUID]}]
      });
    } catch(error) {
      console.log(error);
      toastMsg(error.message);
      return;
    }

    let $connectWindow = self.hiddenButtonDialog('Connecting Device', 'Connecting (1/5)...');

    try {
      self.device.addEventListener('gattserverdisconnected', self.disconnected);

      console.log('Connecting to GATT Server...');
      self.server = await self.device.gatt.connect();
      $connectWindow.$body.text('Connecting (2/5)...');

      console.log('Getting Service...');
      self.service = await self.server.getPrimaryService(self.SERVICE_UUID);
      $connectWindow.$body.text('Connecting (3/5)...');

      console.log('Getting Characteristic...');
      self.cmdCharacteristic = await self.service.getCharacteristic(self.CMD_UUID);
      self.dataCharacteristic = await self.service.getCharacteristic(self.DATA_UUID);
      self.serialCharacteristic = await self.service.getCharacteristic(self.SERIAL_UUID);
      $connectWindow.$body.text('Connecting (4/5)...');

      console.log('Starting notifications...');
      await self.serialCharacteristic.startNotifications();
      self.serialCharacteristic.addEventListener('characteristicvaluechanged', self.handleNotifications);
      $connectWindow.$body.text('Connecting (5/5)...');

      console.log('Checking version...');
      self.checkVersion();
      $connectWindow.close();

      main.setConnectStatus(main.STATUS_CONNECTED);
      self.isConnected = true;
    } catch(error) {
      console.log(error);
      $connectWindow.$body.text('Connection error');
      $connectWindow.$buttonsRow.removeClass('hide');
    }
  };

  this.hiddenButtonDialog = function(title, body) {
    let $dialog = acknowledgeDialog({
      title: title,
      message: body
    });
    $dialog.$buttonsRow.addClass('hide');

    return $dialog;
  };

  this.setCmdMode = async function(mode) {
    let value = Uint8Array.of(mode);
    await self.cmdCharacteristic.writeValueWithResponse(value);
  };

  this.readCmdCharacteristic = async function() {
    return await self.cmdCharacteristic.readValue();
  };

  this.writeData = async function(str, progressCB) {
    var value = new TextEncoder('utf-8').encode(str);
    for (i=0; i<value.byteLength; i+=self.DATA_BUFFER_SIZE) {
      await self.dataCharacteristic.writeValueWithResponse(value.slice(i, i + self.DATA_BUFFER_SIZE));
      if (typeof progressCB == 'function') {
        progressCB();
      }
    }
  };

  this.writeFile = async function(name, value, progressCB) {
    await self.setCmdMode(self._MODE_OPEN);
    await self.writeData(name, progressCB);
    await self.setCmdMode(self._MODE_APPEND);
    await self.writeData(value, progressCB);
    await self.setCmdMode(self._MODE_CLOSE);
  };

  this.getVersion = async function() {
    await self.setCmdMode(self._MODE_GET_VERSION);
    let value = await self.readCmdCharacteristic();
    return value.getUint16(0);
  };

  this.checkVersion = async function() {
    self.version = await self.getVersion();
    if (self.version != self.CURRENT_VERSION) {
      self.updateFirmwareDialog();
    }
  };

  this.updateFirmwareDialog = function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    confirmDialog({
      title: 'Firmware Update',
      confirm: 'Update Now',
      message:
        'A new firmware (version ' + self.CURRENT_VERSION + ') is available, your device is using version ' + self.version + '. ' +
        'Errors may occur if you do not update your firmware.'
    }, self.updateFirmware);
  };

  this.updateFirmware = async function() {
    // Draw window
    let $updateWindow = self.hiddenButtonDialog('Firmware Update', 'Retrieving Firmware...');

    // Retrieve and prep firmware
    let firmwareFiles = {};

    async function retrieveUpdateFile() {
      let response = await fetch('firmware/' + self.FIRWARE_UPDATE_FILE);
      let text = await response.text();

      firmwareFiles[self.FIRWARE_UPDATE_FILE] = {
        content: text,
        tempName: self.FIRWARE_UPDATE_FILE
      }

      let tempNames = {};
      for (let row of text.split('\n')) {
        let command = row.split(' ');
        if (command[0] == 'mv') {
          firmwareFiles[command[2]] = {
            content: '',
            tempName: command[1]
          }
        }
      }
    }

    async function retrieveFiles() {
      for (let file in firmwareFiles) {
        let response = await fetch('firmware/' + file);
        let text = await response.text();
        firmwareFiles[file].content = text;
      }
    }

    try {
      await retrieveUpdateFile();
      await retrieveFiles();

      let totalFilesCount = Object.keys(firmwareFiles).length;
      let currentFileCount = 0;
      let progressBar = '';

      function updateProgress() {
        progressBar += '.';
        $updateWindow.$body.text('Updating Firmware (' + currentFileCount + '/' + totalFilesCount + ')' + progressBar);
      }

      for (let key in firmwareFiles) {
        progressBar = '';
        currentFileCount++;
        updateProgress();

        await self.writeFile(firmwareFiles[key].tempName, firmwareFiles[key].content, updateProgress);
      }

      await self.setCmdMode(self._MODE_UPDATE);
      $updateWindow.$body.text('Update Completed. Please restart your device.');
      $updateWindow.$buttonsRow.removeClass('hide');
    } catch (error) {
      console.log(error);
      $updateWindow.$body.text('Error updating device. Please try again.');
      $updateWindow.$buttonsRow.removeClass('hide');
    }
  };

  this.disconnect = function() {
    self.server.disconnect();
  };

  this.disconnected = function() {
    main.setConnectStatus(main.STATUS_DISCONNECTED);
    self.isConnected = false;
  };

  this.handleNotifications = function(event) {
    let utf8decoder = new TextDecoder();
    let text = utf8decoder.decode(event.target.value);

    monitorPanel.appendText(text);
  };

  this.sendSerial = async function(text) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    const utf8Encode = new TextEncoder();
    value = utf8Encode.encode(text + '\r\n');
    try {
      await self.serialCharacteristic.writeValueWithResponse(value);
    } catch (error) {
      console.log(error);
      toastMsg('Error sending');
    }
  }

  this.download = async function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    if (filesManager.modified == false) {
      pythonPanel.loadPythonFromBlockly();
    }
    filesManager.updateCurrentFile();

    let $downloadWindow = self.hiddenButtonDialog('Download to Device', 'Erasing...');

    let totalFilesCount = Object.keys(filesManager.files).length;
    let currentFileCount = 0;
    let progressBar = '';

    function updateProgress() {
      progressBar += '.';
      $downloadWindow.$body.text('Downloading (' + currentFileCount + '/' + totalFilesCount + ')' + progressBar);
    }

    try {
      await self.setCmdMode(self._MODE_DELETE_ALL);

      for (let filename in filesManager.files) {
        progressBar = '';
        currentFileCount++;
        updateProgress();

        await self.writeFile(filename, filesManager.files[filename], updateProgress);
      }

      $downloadWindow.$body.text('Update Completed. Please restart your device.');
      $downloadWindow.$buttonsRow.removeClass('hide');
    } catch (error) {
      console.log(error);
      $downloadWindow.$body.text('Error downloading files.');
      $downloadWindow.$buttonsRow.removeClass('hide');
    }

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
    }, self.erase);
  };

  this.erase = async function() {
    let $deleteWindow = self.hiddenButtonDialog('Erase Device', 'Deleting all programs from device...');

    try {
      await self.setCmdMode(self._MODE_DELETE_ALL);
      $deleteWindow.$body.text('Delete completed.');
      $deleteWindow.$buttonsRow.removeClass('hide');
    } catch (error) {
      console.log(error);
      $deleteWindow.$body.text('Error deleting programs.');
      $deleteWindow.$buttonsRow.removeClass('hide');
    }
  };

  this.changeNameDialog = function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    let $changeNameWindow = confirmDialog({
      title: 'Change device name',
      message: '<div>New name: <input id="newName" type="text" maxlength="8" value="' + self.device.name + '"></div>'
    }, function() {
      let newName = $changeNameWindow.$body.find('#newName').val();
      self.changeName(newName);
    })
  };

  this.changeName = async function(newName) {
    let $changeNameWindow = self.hiddenButtonDialog('Change Device Name', 'Changing Name...');

    try {
      let filename = '_ioty_name';
      let content = newName.slice(0, 8);
      await self.writeFile(filename, content);
      $changeNameWindow.$body.text('Change completed. Restart your device to see the new name.');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    } catch (error) {
      console.log(error);
      $changeNameWindow.$body.text('Error changing name.');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    }
  };
}

// Init class
ble.init();