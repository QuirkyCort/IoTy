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
    try {
      return value.getUint16(0);
    } catch (error) {
      return null;
    }
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
    } else {
      toastMsg('Error retrieving info.');
    }
  };

  this.getHash = async function(filename) {
    self.dataNotificationBuf = new Uint8Array();
    await self.setCmdMode(constants._MODE_GET_HASH);
    await self.writeData(filename);
    let status = await self.retrieve_status();
    if (status == constants._STATUS_SUCCESS) {
      let utf8decoder = new TextDecoder();
      let text = utf8decoder.decode(self.dataNotificationBuf);
      return text;
    }
    return false;
  }

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

  this.mkdirOnDevice = async function(dirname) {
    await self.setCmdMode(constants._MODE_MKDIR);
    await self.writeData(dirname);
    return await self.retrieve_status();
  };

  this.deleteOneFileFromDevice = async function(filename) {
    await self.setCmdMode(constants._MODE_DELETE);
    await self.writeData(filename);
    return await self.retrieve_status();
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

  this.getFilesListing = async function() {
    self.dataNotificationBuf = new Uint8Array();
    await self.setCmdMode(constants._MODE_LIST);
    let status = await self.retrieve_status();
    let content = null;
    if (status == constants._STATUS_SUCCESS) {
      let utf8decoder = new TextDecoder();
      let text = utf8decoder.decode(self.dataNotificationBuf);
      content = JSON.parse(text);
    }

    return {
      status: status,
      content: content
    }
  };

  this.checkVersion = async function() {
    let version = await self.getVersion();
    if (version == null) {
      return;
    }
    self.version = version;
    if (self.version < constants.CURRENT_VERSION) {
      if (self.version < constants.MINIMUM_VERSION_TO_UPGRADE) {
        main.unableToUpdateFirmwareDialog();
      } else {
        main.updateFirmwareDialog();
      }
    }
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

    let $downloadWindow = main.hiddenButtonDialog('Download to Device', 'Checking syntax...', self.reset);

    let totalFilesCount = Object.keys(filesManager.files).length;
    let currentFileCount = 0;
    let progressBar = '';

    // Check syntax
    let result = main.checkPythonSyntax();

    if (result.error) {
      $downloadWindow.$body.text('Syntax Error');
      let $error = $('<pre>' + result.text + '</pre>');
      $downloadWindow.$body.append($error);
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    }

    // $downloadWindow.$body.text('Erasing...');

    try {
      // await self.setCmdMode(constants._MODE_DELETE_ALL);

      function updateProgress() {
        progressBar += '.';
        $downloadWindow.$body.text('Downloading (' + currentFileCount + '/' + totalFilesCount + ')' + progressBar);
      }

      let status;
      for (let filename in filesManager.files) {
        progressBar = '';
        currentFileCount++;
        updateProgress();

        let remoteHash = await self.getHash(filename);
        let data = new TextEncoder().encode(filesManager.files[filename]);
        let localHashBuf = await crypto.subtle.digest('SHA-256', data);
        let localHash = Array.from(new Uint8Array(localHashBuf)).map((b) => b.toString(16).padStart(2, "0")).join("")

        if (remoteHash == localHash) {
          console.log('No change. Skipping ' + filename);
          status = constants._STATUS_SUCCESS;
        } else {
          status = await self.writeFile(filename, filesManager.files[filename], updateProgress);
          if (status != constants._STATUS_SUCCESS) {
            break;
          }
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

  this.resetDialog = function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    self.reset();
  };

  this.reset = async function() {
    try {
      await self.setCmdMode(constants._MODE_RESET);
    } catch (error) {
      toastMsg('Error resetting');
      return;
    }

    let status = await self.retrieve_status();
    if (status != constants._STATUS_SUCCESS) {
      toastMsg('Resetting failed');
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
      let newName = $changeNameWindow.$body.find('#newName').val().trim();
      if (newName.length < 1) {
        toastMsg('Name cannot be empty');
        return;
      }
      self.changeName(newName);
    })
  };

  this.changeName = async function(newName) {
    let $changeWindow = main.hiddenButtonDialog('Change Device Name', 'Changing Name...');

    try {
      let filename = constants.NAME_FILE;
      let content = newName.slice(0, 8);
      let status = await self.writeFile(filename, content);
      if (status == constants._STATUS_SUCCESS) {
        $changeWindow.$body.text('Change completed. Restart your device to see the new name.');
        $changeWindow.$buttonsRow.removeClass('hide');
      } else {
        $changeWindow.$body.text('Change failed.');
        $changeWindow.$buttonsRow.removeClass('hide');
      }
    } catch (error) {
      console.log(error);
      $changeWindow.$body.text('Error changing name.');
      $changeWindow.$buttonsRow.removeClass('hide');
    }
  };

  this.configureDeviceNetwork = async function(content) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    let $changeWindow = main.hiddenButtonDialog('Configure Device Network', 'Downloading Settings...');

    try {
      let filename = constants.NETWORK_CONFIGURATION_FILE;
      let status = await self.writeFile(filename, content);
      if (status == constants._STATUS_SUCCESS) {
        $changeWindow.$body.text('Change completed. Restart your device to connect to the network.');
        $changeWindow.$buttonsRow.removeClass('hide');
      } else {
        $changeWindow.$body.text('Change failed.');
        $changeWindow.$buttonsRow.removeClass('hide');
      }
    } catch (error) {
      console.log(error);
      $changeWindow.$body.text('Error configuring network.');
      $changeWindow.$buttonsRow.removeClass('hide');
    }
  };
}

// Init class
ble.init();