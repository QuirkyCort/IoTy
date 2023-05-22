var ble = new function() {
  var self = this;

  this.SERIAL_BUFFER_SIZE = 20;
  this.DATA_BUFFER_SIZE = 512;
  // this.DATA_BUFFER_SIZE = 20;

  this.SERVICE_UUID = 'ba48d887-db79-4cac-8d72-a4d9ecdfcde2';
  this.CMD_UUID = '4423f470-dad0-437a-8c18-9a378981cca9';
  this.DATA_UUID = 'e4494fc7-fae6-42cf-81c0-8f835a0ace7f';
  this.SERIAL_UUID = 'c12fee47-2a93-4138-9505-2a97da04b413';

  this.isConnected = false;

  this.dataNotificationBuf = new Uint8Array();

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

    let $connectWindow = main.hiddenButtonDialog('Connecting Device', 'Connecting (1/5)...');

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
      self.serialCharacteristic.addEventListener('characteristicvaluechanged', self.handleSerialNotifications);
      try {
        await self.dataCharacteristic.startNotifications();
        self.dataCharacteristic.addEventListener('characteristicvaluechanged', self.handleDataNotifications);
      } catch(error) {
        console.log(error);
      }
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

  this.setCmdMode = async function(mode) {
    let value = Uint8Array.of(mode);
    await self.cmdCharacteristic.writeValueWithResponse(value);
  };

  this.readCmdCharacteristic = async function() {
    return await self.cmdCharacteristic.readValue();
  };

  this.writeData = async function(data, progressCB) {
    if (typeof data == 'string') {
      data = new TextEncoder('utf-8').encode(data);
    }
    for (let i=0; i<data.byteLength; i+=self.DATA_BUFFER_SIZE) {
      await self.dataCharacteristic.writeValueWithResponse(data.slice(i, i + self.DATA_BUFFER_SIZE));
      if (typeof progressCB == 'function') {
        progressCB();
      }
    }
  };

  // this.writeData = async function(str, progressCB, bufferSize) {
  //   if (typeof bufferSize == 'undefined') {
  //     bufferSize = self.DATA_BUFFER_SIZE;
  //   }
  //   try {
  //     var value = new TextEncoder('utf-8').encode(str);
  //     for (let i=0; i<value.byteLength; i+=bufferSize) {
  //       await self.dataCharacteristic.writeValueWithResponse(value.slice(i, i + bufferSize));
  //       if (typeof progressCB == 'function') {
  //         progressCB();
  //       }
  //     }
  //   } catch(error) {
  //     if (bufferSize == self.DATA_BUFFER_SIZE) {
  //       console.log('Try smaller buffer');
  //       await self.writeData(str, progressCB, self.DATA_BUFFER_SIZE_MIN);
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

//   this.writeData = async function(str, progressCB) {
//     async function awaitTimeout(delay) {
//       return new Promise(resolve => setTimeout(resolve, delay));
//     }
// start=Date.now()
//     var value = new TextEncoder('utf-8').encode(str);
//     let withoutResponseCtr = 0;
//     for (i=0; i<value.byteLength; i+=self.DATA_BUFFER_SIZE) {
//       withoutResponseCtr++;
//       await awaitTimeout(40);
//       if (withoutResponseCtr > 10 || i + self.DATA_BUFFER_SIZE >= value.byteLength) {
//         await self.dataCharacteristic.writeValueWithResponse(value.slice(i, i + self.DATA_BUFFER_SIZE));
//       } else {
//         await self.dataCharacteristic.writeValueWithoutResponse(value.slice(i, i + self.DATA_BUFFER_SIZE));
//       }
//       if (typeof progressCB == 'function') {
//         progressCB();
//       }
//     }
// console.log(Date.now() - start);
//   };

  this.writeFile = async function(name, value, progressCB) {
    await self.setCmdMode(constants._MODE_OPEN);
    await self.writeData(name, progressCB);

    await self.setCmdMode(constants._MODE_APPEND);
    await self.writeData(value, progressCB);

    let data;
    if (typeof value == 'string') {
      data = new TextEncoder().encode(value);
    } else {
      data = value;
    }
    let hash = await crypto.subtle.digest('SHA-256', data);
    await self.setCmdMode(constants._MODE_FILE_HASH);
    await self.writeData(hash, progressCB);

    await self.setCmdMode(constants._MODE_CLOSE);

    return await self.retrieve_status();
  };

  this.retrieve_status = async function() {
    async function awaitTimeout(delay) {
      return new Promise(resolve => setTimeout(resolve, delay));
    }

    let status;
    for (let i=0; i<300; i++) {
      await awaitTimeout(100);
      status = await self.readCmdCharacteristic();
      try {
        status = status.getUint16(0);
      } catch (error) {
        status = -1;
      }
      if (status != constants._STATUS_PENDING) {
        break;
      }
    }

    return status;
  };

  this.getVersion = async function() {
    await self.setCmdMode(constants._MODE_GET_VERSION);
    let value = await self.readCmdCharacteristic();
    return value.getUint16(0);
  };

  this.getInfo = async function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    self.dataNotificationBuf = new Uint8Array();
    await self.setCmdMode(constants._MODE_GET_INFO);
    let status = await self.retrieve_status();
    if (status == constants._STATUS_SUCCESS) {
      let utf8decoder = new TextDecoder();
      let text = utf8decoder.decode(self.dataNotificationBuf);
      let $info = $(
        '<table>' +
          '<tr><td style="padding-right: 2em;">MAC Address: </td><td id="mac"></td></tr>' +
          '<tr><td>Allocated Mem: </td><td id="allocMem"></td></tr>' +
          '<tr><td>Free Mem: </td><td id="freeMem"></td></tr>' +
          '<tr><td>Free Space: </td><td id="freeSpace"></td></tr>' +
        '</table>'
      );
      let result = JSON.parse(text);
      $info.find('#mac').text(result['network']['mac']);
      $info.find('#allocMem').text(result['mem']['allocated']);
      $info.find('#freeMem').text(result['mem']['free']);
      $info.find('#freeSpace').text(result['fs']['block size'] * result['fs']['free blocks']);
      acknowledgeDialog({message: $info});
    }
  };

  this.listFiles = function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    self.$filesListing = $('<div>Retrieving files listing...</div>');

    let $buttons = $(
      '<button type="button" class="delete btn btn-danger">Delete</button>' +
      '<button type="button" class="mkdir btn btn-warning">Make Directory</button>' +
      '<button type="button" class="upload btn btn-warning">Upload</button>' +
      '<button type="button" class="download btn btn-success">Download</button>' +
      '<button type="button" class="close btn btn-light">Close</button>'
    );

    let $dialog = dialog(
      'Files on Device',
      self.$filesListing,
      $buttons
    );

    $buttons.siblings('.delete').click(self.deleteFilesFromDevice);
    $buttons.siblings('.mkdir').click(self.mkdirSetName);
    $buttons.siblings('.upload').click(self.uploadFileSelect);
    $buttons.siblings('.download').click(self.downloadFilesFromDevice)
    $buttons.siblings('.close').click(function() { $dialog.close(); })

    self.updateFilesListing();
  };

  this.mkdirSetName = function() {
    let $mkdirNameWindow = confirmDialog({
      title: 'Make Directory',
      message: '<div>Directory Name: <input id="dirname" type="text" value=""></div>'
    }, function() {
      let dirname = $mkdirNameWindow.$body.find('#dirname').val();
      self.mkdirOnDevice(dirname);
    });
  };

  this.mkdirOnDevice = async function(dirname) {
    let $updateWindow = main.hiddenButtonDialog('Make Directory', 'Making Directory...');

    await self.setCmdMode(constants._MODE_MKDIR);
    await self.writeData(dirname);
    let status = await self.retrieve_status();
    if (status == constants._STATUS_SUCCESS) {
      $updateWindow.$body.text('Completed');
      $updateWindow.$buttonsRow.removeClass('hide');
    } else {
      $updateWindow.$body.text('Error making directory');
      $updateWindow.$buttonsRow.removeClass('hide');
    }

    self.updateFilesListing();
  };

  this.deleteFilesFromDevice = async function() {
    let $inputs = self.$filesListing.find('input.filename');
    let filesToDelete = [];
    for (let $input of $inputs) {
      if ($input.checked) {
        filesToDelete.push($input.getAttribute('data'));
      }
    }

    if (filesToDelete.length == 0) {
      toastMsg('No files selected');
      return
    }

    let $updateWindow = main.hiddenButtonDialog('Deleting', 'Starting Delete...');
    let count = 1;

    for (let file of filesToDelete) {
      $updateWindow.$body.text('File (' + count + ' / ' + filesToDelete.length + ')');
      await self.deleteOneFileFromDevice(file);
      count++;
    }
    $updateWindow.$body.text('Delete completed');
    $updateWindow.$buttonsRow.removeClass('hide');

    self.updateFilesListing();
  };

  this.deleteOneFileFromDevice = async function(filename) {
    await self.setCmdMode(constants._MODE_DELETE);
    await self.writeData(filename);
    let status = await self.retrieve_status();
    if (status != constants._STATUS_SUCCESS) {
      toastMsg('Error deleting file');
      return null;
    }
  };

  this.uploadFileSelect = function() {
    let hiddenElement = document.createElement('input');
    hiddenElement.type = 'file';
    hiddenElement.dispatchEvent(new MouseEvent('click'));
    hiddenElement.addEventListener('change', function(e){
      let filename = e.target.files[0].name;
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = function() {
        self.uploadFileSetName(filename, this.result);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  this.uploadFileSetName = function(filename, content) {
    let $changeFilenameWindow = confirmDialog({
      title: 'Set filename',
      message: '<div>Filename: <input id="filename" type="text" value="' + filename + '"></div>'
    }, function() {
      let filename = $changeFilenameWindow.$body.find('#filename').val();
      self.uploadFile(filename, content);
    });
  };

  this.uploadFile = async function(filename, content) {
    let $updateWindow = main.hiddenButtonDialog('Uploading File', 'Uploading');

    try {
      let progressBar = '';

      function updateProgress() {
        progressBar += '.';
        $updateWindow.$body.text('Uploading' + progressBar);
      }

      let status = await self.writeFile(filename, content, updateProgress);

      if (status == constants._STATUS_SUCCESS) {
        $updateWindow.$body.text('Upload Completed.');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else if (status == constants._STATUS_PENDING) {
        $updateWindow.$body.text('Error uploading file (timeout). Please try again.');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else if (status == constants._STATUS_CHECKSUM_ERROR) {
        $updateWindow.$body.text('Error uploading file (hash mismatch). Please try again.');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else if (status == constants._STATUS_FAILED) {
        $updateWindow.$body.text('Error uploading file (write failed). Please try again.');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else {
        $updateWindow.$body.text('Unknown error. Please try again.');
        $updateWindow.$buttonsRow.removeClass('hide');
      }
    } catch (error) {
      console.log(error);
      $updateWindow.$body.text('Error uploading file (See console for details).');
      $updateWindow.$buttonsRow.removeClass('hide');
    }

    self.updateFilesListing();
  };

  this.downloadFilesFromDevice = async function() {
    let $inputs = self.$filesListing.find('input.filename');
    let filesToDownload = [];
    for (let $input of $inputs) {
      if ($input.checked) {
        filesToDownload.push($input.getAttribute('data'));
      }
    }

    if (filesToDownload.length == 0) {
      toastMsg('No files selected');
      return
    }

    let $updateWindow = main.hiddenButtonDialog('Downloading', 'Starting Download...');

    let files = {};
    let count = 1;

    for (let file of filesToDownload) {
      $updateWindow.$body.text('File (' + count + ' / ' + filesToDownload.length + ')');
      let content = await self.downloadOneFileFromDevice(file);
      if (content == null) {
        $updateWindow.$body.text('Download failed');
        $updateWindow.$buttonsRow.removeClass('hide');
        return;
      }

      files[file] = content;
      count++;
    }

    if (filesToDownload.length == 1) {
      let filename = filesToDownload[0];
      let content = btoa(String.fromCharCode(...new Uint8Array(files[filename])));
      main.downloadFile(filename, content, 'application/octet-stream');
    } else {
      main.downloadZipFile('deviceFiles', files);
    }
    $updateWindow.$buttonsRow.removeClass('hide');
  };

  this.downloadOneFileFromDevice = async function(filename) {
    self.dataNotificationBuf = new Uint8Array();
    await self.setCmdMode(constants._MODE_READ);
    await self.writeData(filename);
    let status = await self.retrieve_status();
    if (status == constants._STATUS_SUCCESS) {
      let hash1 = self.dataNotificationBuf.slice(0, 32);
      let content = self.dataNotificationBuf.slice(32);
      let hash2 = await crypto.subtle.digest('SHA-256', content);
      hash2 = new Uint8Array(hash2);

      function hashEqual(a, b) {
        if (a.length != b.length) {
          return false;
        } else {
          for (let i=0; i < a.byteLength; i++) {
            if (a[i] != b[i]) {
              return false;
            }
          }
          return true;
        }
      }

      if (hashEqual(hash1, hash2)) {
        return content;
      } else {
        toastMsg('File checksum error');
        return null;
      }
    } else {
      toastMsg('Error downloading file');
      return null;
    }
  };

  this.updateFilesListing = async function() {
    self.dataNotificationBuf = new Uint8Array();
    await self.setCmdMode(constants._MODE_LIST);
    let status = await self.retrieve_status();
    if (status == constants._STATUS_SUCCESS) {
      let utf8decoder = new TextDecoder();
      let text = utf8decoder.decode(self.dataNotificationBuf);
      let files = JSON.parse(text);

      self.$filesListing.empty();

      files.sort(function(a, b){
        let aLen = (a.match(/\//g)||[]).length;
        let bLen = (b.match(/\//g)||[]).length;
        if (aLen > bLen) {
          return 1;
        } else if (bLen > aLen) {
          return -1;
        } else {
          return a > b;
        }
      });

      let checkboxes = [];

      for (let file of files) {
        let $row = $('<div></div>');
        let $checkbox = $('<input type="checkbox" class="filename">');
        $checkbox.attr('data', file);
        let $span = $('<span></span>');
        $span.text(file);

        checkboxes.push($checkbox);
        $row.append($checkbox);
        $row.append($span);
        self.$filesListing.append($row);
      }
    } else {
      toastMsg('Error retrieving file listings');
    }
  };

  this.checkVersion = async function() {
    self.version = await self.getVersion();
    if (self.version != constants.CURRENT_VERSION) {
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
        'A new firmware (version ' + constants.CURRENT_VERSION + ') is available, your device is using version ' + self.version + '. ' +
        'Errors may occur if you do not update your firmware.'
    }, self.updateFirmware);
  };

  this.updateFirmware = async function() {
    if (main.firmwarePreloaded == false) {
      toastMsg('Firmware files not preloaded.');
      return;
    }

    // Draw window
    let $updateWindow = main.hiddenButtonDialog('Firmware Update', 'Updating Firmware...');

    try {
      // Transfer to device
      let totalFilesCount = Object.keys(main.firmwareFiles).length;
      let currentFileCount = 0;
      let progressBar = '';

      function updateProgress() {
        progressBar += '.';
        $updateWindow.$body.text('Updating Firmware (' + currentFileCount + '/' + totalFilesCount + ')' + progressBar);
      }

      let status;
      for (let key in main.firmwareFiles) {
        progressBar = '';
        currentFileCount++;
        updateProgress();

        status = await self.writeFile(main.firmwareFiles[key].tempName, main.firmwareFiles[key].content, updateProgress);
        if (status != constants._STATUS_SUCCESS) {
          break;
        }
      }

      if (status == constants._STATUS_SUCCESS) {
        // Trigger update
        await self.setCmdMode(constants._MODE_UPDATE);
        status = await self.retrieve_status();
      }

      if (status == constants._STATUS_SUCCESS) {
        $updateWindow.$body.text('Update Completed. Please restart your device.');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else if (status == constants._STATUS_PENDING) {
        $updateWindow.$body.text('Error updating device (timeout). Please try again.');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else if (status == -1) {
        $updateWindow.$body.text('Unable to verify update. Please reset your device and try again.');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else {
        $updateWindow.$body.text('Error updating device (corrupted firmware). Please try again.');
        $updateWindow.$buttonsRow.removeClass('hide');
      }

    } catch (error) {
      console.log(error);
      $updateWindow.$body.text('Error updating device. Please reset your device and try again.');
      $updateWindow.$buttonsRow.removeClass('hide');
    }
  };

  this.disconnect = function() {
    if (self.server) {
      self.server.disconnect();
    }
  };

  this.disconnected = function() {
    main.setConnectStatus(main.STATUS_DISCONNECTED);
    self.isConnected = false;
  };

  this.handleSerialNotifications = function(event) {
    let utf8decoder = new TextDecoder();
    let text = utf8decoder.decode(event.target.value);

    monitorPanel.appendText(text);
  };

  this.handleDataNotifications = function(event) {
    let currentSize = self.dataNotificationBuf.byteLength;
    let addedSize = event.target.value.byteLength;

    let newBuf = new Uint8Array(currentSize + addedSize);

    newBuf.set(self.dataNotificationBuf, 0);
    newBuf.set(new Uint8Array(event.target.value.buffer), currentSize);

    self.dataNotificationBuf = newBuf;
  };

  this.sendSerial = async function(text) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    var value = new TextEncoder('utf-8').encode(text + '\r\n');
    try {
      for (let i=0; i<value.byteLength; i+=self.SERIAL_BUFFER_SIZE) {
        await self.serialCharacteristic.writeValueWithResponse(value.slice(i, i + self.SERIAL_BUFFER_SIZE));
      }
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
      await pythonPanel.loadPythonFromBlockly();
    }
    filesManager.updateCurrentFile();

    let $downloadWindow = main.hiddenButtonDialog('Download to Device', 'Checking syntax...');

    let totalFilesCount = Object.keys(filesManager.files).length;
    let currentFileCount = 0;
    let progressBar = '';

    // Check syntax
    Sk.configure({
      __future__: Sk.python3
    });
    let syntaxError = false;
    let errorText = '';
    for (let filename in filesManager.files) {
      try {
        Sk.compile(filesManager.files[filename], filename);
      } catch (error) {
        console.log(error);
        errorText += 'File "' + error.traceback[0].filename + '", line ' + error.traceback[0].lineno + '\n';
        errorText += '  ' + error.args.v[0].v + '\n';
        syntaxError = true;
      }
    }

    if (syntaxError) {
      $downloadWindow.$body.text('Syntax Error');
      let $error = $('<pre>' + errorText + '</pre>');
      $downloadWindow.$body.append($error);
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    }

    $downloadWindow.$body.text('Erasing...');

    try {
      await self.setCmdMode(constants._MODE_DELETE_ALL);

      function updateProgress() {
        progressBar += '.';
        $downloadWindow.$body.text('Downloading (' + currentFileCount + '/' + totalFilesCount + ')' + progressBar);
      }

      let status;
      for (let filename in filesManager.files) {
        progressBar = '';
        currentFileCount++;
        updateProgress();

        status = await self.writeFile(filename, filesManager.files[filename], updateProgress);
        if (status != constants._STATUS_SUCCESS) {
          break;
        }
      }

      if (status == constants._STATUS_SUCCESS) {
        $downloadWindow.$body.text('Download Completed. Please restart your device.');
        $downloadWindow.$buttonsRow.removeClass('hide');
      } else if (status == constants._STATUS_PENDING) {
        $downloadWindow.$body.text('Download verification timeout. Please try again.');
        $downloadWindow.$buttonsRow.removeClass('hide');
      } else {
        $downloadWindow.$body.text('Error downloading (corrupted data). Please try again.');
        $downloadWindow.$buttonsRow.removeClass('hide');
      }
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
    let $deleteWindow = main.hiddenButtonDialog('Erase Device', 'Deleting all programs from device...');

    try {
      await self.setCmdMode(constants._MODE_DELETE_ALL);
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
    let $changeNameWindow = main.hiddenButtonDialog('Change Device Name', 'Changing Name...');

    try {
      let filename = constants.NAME_FILE;
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

  this.configureDeviceNetwork = async function(content) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    let $changeNameWindow = main.hiddenButtonDialog('Configure Device Network', 'Downloading Settings...');

    try {
      let filename = constants.NETWORK_CONFIGURATION_FILE;
      await self.writeFile(filename, content);
      $changeNameWindow.$body.text('Change completed. Restart your device to connect to the network.');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    } catch (error) {
      console.log(error);
      $changeNameWindow.$body.text('Error configuring network.');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    }
  };
}

// Init class
ble.init();