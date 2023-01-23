var ap = new function() {
  var self = this;

  this.URL = 'http://192.168.4.1:8000';
  this.isConnected = false;

  // Run on page load
  this.init = function() {
  };

  this.postData = async function(data = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(self.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    return response.json();
  };

  this.sendCmd = async function(mode, content) {
    return await self.postData({
      mode: mode,
      content: content
    });
  };

  this.getVersion = async function() {
    return await self.sendCmd(constants._MODE_GET_VERSION);
  };

  this.connectDialog = function() {
    let $body = $(
      '<div>' +
        '<ol type="1">' +
          '<li>' +
            '<h4>Put IoTy device in Acces Point mode</h4>' +
            '<ol type="a">' +
              '<li>Press and release the "Reset" button on your IoTy device</li>' +
              '<li>Before the 3 blinks completes, press and hold the "Boot" button.</li>' +
              '<li>Keep holding the "Boot" button until the LED start blinking rapidly.</li>' +
              '<li>Release the "Boot" button. Your device is now in Access point mode.</li>' +
            '</ol>' +
          '</li>' +
          '<li>' +
            '<h4>Connect to IoTy Access Point</h4>' +
            '<p><strong>If you are on a device with a wired or mobile network; you may need to disable them first.</strong></p>' +
            '<ol type="a">' +
              '<li>On your computer, search for your IoTy WiFi access point. It should have a name like "IoTy-123" (...the numbers should match your device!).</li>' +
              '<li>Connect to that access point. Don\'t worry if it says that you have no internet; that\'s normal.</li>' +
              '<li>Click the "Ok" button below.</li>' +
            '</ol>' +
          '</li>' +
        '</ol>' +
      '</div>'
    );

    confirmDialog({
      title: 'Connect',
      message: $body
    }, self.connect);
  };

  this.connect = async function() {
    let $connectWindow = main.hiddenButtonDialog('Connecting Device', 'Connecting...');

    try {
      let result = await self.getVersion();
      if (result.status != constants._STATUS_SUCCESS) {
        $connectWindow.$body.text('Connection error');
        $connectWindow.$buttonsRow.removeClass('hide');
        return;
      }
      self.version = result.content;
      self.name = result.name;

      if (self.version != constants.CURRENT_VERSION) {
        self.updateFirmwareDialog();
      }

      $connectWindow.close();
      main.setConnectStatus(main.STATUS_CONNECTED);
      self.isConnected = true;
    } catch (error) {
      console.log(error);
      $connectWindow.$body.text('Connection timed out');
      $connectWindow.$buttonsRow.removeClass('hide');
      main.setConnectStatus(main.STATUS_DISCONNECTED);
      self.isConnected = false;
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
    let $updateWindow = main.hiddenButtonDialog('Firmware Update', 'Updating Firmware...');

    let files = {};
    for (let filename in main.firmwareFiles) {
      if (filename == constants.FIRMWARE_UPDATE_FILE) {
        continue;
      }
      files[filename] = main.firmwareFiles[filename].content;
    }
    await self.sendCmd(constants._MODE_WRITE_FILES, files);

    $updateWindow.$body.text('Update Completed. Please restart your device.');
    $updateWindow.$buttonsRow.removeClass('hide');
  };

  this.download = async function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    if (filesManager.modified == false) {
      pythonPanel.loadPythonFromBlockly();
    }
    filesManager.updateCurrentFile();

    let $downloadWindow = main.hiddenButtonDialog('Download to Device', 'Checking syntax...');

    // Check syntax
    result = main.checkPythonSyntax();
    if (result.error) {
      $downloadWindow.$body.text('Syntax Error');
      let $error = $('<pre>' + result.text + '</pre>');
      $downloadWindow.$body.append($error);
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    }

    // Erase all
    $downloadWindow.$body.text('Erasing...');
    await self.sendCmd(constants._MODE_DELETE_ALL);

    // Download
    $downloadWindow.$body.text('Downloading...');
    await self.sendCmd(constants._MODE_WRITE_FILES, filesManager.files);

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
    }, self.erase);
  };

  this.erase = async function() {
    let $deleteWindow = main.hiddenButtonDialog('Erase Device', 'Deleting all programs from device...');

    await self.sendCmd(constants._MODE_DELETE_ALL);

    $deleteWindow.$body.text('Delete completed.');
    $deleteWindow.$buttonsRow.removeClass('hide');
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
      let newName = $changeNameWindow.$body.find('#newName').val();
      self.changeName(newName);
    })
  };

  this.changeName = async function(newName) {
    let $changeNameWindow = main.hiddenButtonDialog('Change Device Name', 'Changing Name...');
    self.name = newName;

    let files = {}
    files[constants.NAME_FILE] = newName.slice(0, 8);

    await self.sendCmd(constants._MODE_WRITE_FILES, files);
    $changeNameWindow.$body.text('Change completed. Restart your device to see the new name.');
    $changeNameWindow.$buttonsRow.removeClass('hide');
  };

  this.configureDeviceNetwork = async function(content) {
    let $changeNameWindow = main.hiddenButtonDialog('Configure Device Network', 'Downloading Settings...');

    let files = {}
    files[constants.NAME_FILE] = content;

    await self.sendCmd(constants._MODE_WRITE_FILES, files);
    $changeNameWindow.$body.text('Change completed. Restart your device to connect to the network.');
    $changeNameWindow.$buttonsRow.removeClass('hide');
  };
}

// Init class
ap.init();