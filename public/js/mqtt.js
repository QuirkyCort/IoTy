var mqtt = new function() {
  var self = this;

  this.URL = 'http://192.168.4.1:8000';
  this.COMMAND_TOPIC = '_IOTY_COMMAND';
  this.RESPONSE_TOPIC = '_IOTY_RESPONSE';
  this.TO_MONITOR_TOPIC = '_IOTY_TO_MONITOR';

  this.isConnected = false;

  this.mqttSettings = {
    host: 'wss://mqtt.a9i.sg:8081/mqtt',
    username: '',
    password: ''
  };

  this.responseBuffer = {};

  // Run on page load
  this.init = function() {
    let settings = localStorage.getItem('mqttSettings');
    if (settings) {
      self.mqttSettings = JSON.parse(settings);
    }
  };

  this.sendCmd = async function(mode, content=null) {
    if (self.isConnected) {
      let nonce = Math.random().toString().slice(2);
      let payload = {
        mode: mode,
        nonce: nonce,
        content: content
      };

      let message = new Paho.MQTT.Message(JSON.stringify(payload));
      message.destinationName = self.mqttSettings.username + '/' + self.COMMAND_TOPIC;
      self.client.send(message);
      return nonce;
    }
    return null;
  };

  this.getVersion = async function() {
    let nonce = await self.sendCmd(constants._MODE_GET_VERSION);
    if (nonce) {
      let response = await self.waitForResponse(nonce);
      if (response == null) {
        return null;
      }
      if (response.status == constants._STATUS_SUCCESS) {
        return response.content;
      }
    }

    return null;
  };

  this.getInfo = async function() {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    let nonce = await self.sendCmd(constants._MODE_GET_INFO);
    if (nonce) {
      let response = await self.waitForResponse(nonce);
      if (response.status == constants._STATUS_SUCCESS) {
        let $info = $(
          '<table>' +
            '<tr><td style="padding-right: 2em;">MAC Address: </td><td id="mac"></td></tr>' +
            '<tr><td>Allocated Mem: </td><td id="allocMem"></td></tr>' +
            '<tr><td>Free Mem: </td><td id="freeMem"></td></tr>' +
            '<tr><td>Free Space: </td><td id="freeSpace"></td></tr>' +
          '</table>'
        );
        let result = response.content;
        $info.find('#mac').text(result['network']['mac']);
        $info.find('#allocMem').text(result['mem']['allocated']);
        $info.find('#freeMem').text(result['mem']['free']);
        $info.find('#freeSpace').text(result['fs']['block size'] * result['fs']['free blocks']);
        acknowledgeDialog({message: $info});
      }
    }
  };

  this.waitForResponse = async function(nonce) {
    async function awaitTimeout(delay) {
      return new Promise(resolve => setTimeout(resolve, delay));
    }

    for (let i=0; i<1000; i++) {
      await awaitTimeout(10);
      if (nonce in self.responseBuffer) {
        let response = self.responseBuffer[nonce];
        delete self.responseBuffer[nonce];
        return response;
      }
    }

    return null;
  };

  this.checkVersion = async function($window) {
    if (typeof $window == 'undefined') {
      $window = main.hiddenButtonDialog('Checking version', 'Retrieving...');
    } else {
      $window.$body.text('Checking version...');
    }

    let response = await self.getVersion();
    if (response == null) {
      $window.$body.text('Connection timed out');
      $window.$buttonsRow.removeClass('hide');
      return;
    }
    self.version = response.version;
    self.name = response.name;
    main.setConnectStatus(main.STATUS_CONNECTED);

    $window.close();
    if (self.version != constants.CURRENT_VERSION) {
      self.updateFirmwareDialog();
    }
  };

  this.connectDialog = function() {
    let $body = $(
      '<div class="configuration">' +
        '<div class="configurationTitle">MQTT Host</div>' +
        '<div class="text"><input type="text" class="host"></div>' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">Username</div>' +
        '<div class="text"><input type="text" class="username"></div>' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">Password</div>' +
        '<div class="text"><input type="text" class="password"></div>' +
      '</div>'
    );

    let $host = $body.find('.host');
    let $username = $body.find('.username');
    let $password = $body.find('.password');

    $host.val(self.mqttSettings.host);
    $username.val(self.mqttSettings.username);
    $password.val(self.mqttSettings.password);

    let $buttons = $(
      '<button type="button" class="cancel btn-light">Cancel</button>' +
      '<button type="button" class="confirm btn-success">Ok</button>'
    );

    let $dialog = dialog('Connect', $body, $buttons);

    $buttons.siblings('.cancel').click(function(){
      $dialog.close();
    });
    $buttons.siblings('.confirm').click(function(){
      self.mqttSettings = {
        host: $host.val(),
        username: $username.val(),
        password: $password.val()
      };
      localStorage.setItem('mqttSettings', JSON.stringify(self.mqttSettings));
      $dialog.close();
      self.connect();
    });
  };

  this.genClientID = function() {
    let rand = '';
    for (let i=0; i<8; i++) {
      rand += Math.random().toString()[2];
    }
    return 'IoTy-' + rand;
  };

  this.onMessageArrived = function(message) {
    if (message.destinationName == self.mqttSettings.username + '/' + self.RESPONSE_TOPIC) {
      self.onResponseMessageArrived(message);
    } else if (message.destinationName == self.mqttSettings.username + '/' + self.TO_MONITOR_TOPIC) {
      self.onMonitorMessageArrived(message);
    }
  };

  this.onMonitorMessageArrived = function(message) {
    monitorPanel.appendText(message.payloadString);
  };

  this.onResponseMessageArrived = function(message) {
    let response = JSON.parse(message.payloadString);
    self.responseBuffer[response.nonce] = response;
  };

  this.onConnectionLost = function(responseObject) {
    window.clearInterval(self.connectTimeoutID);
    main.setConnectStatus(main.STATUS_DISCONNECTED);
    if (responseObject.errorCode !== 0) {
      toastMsg('Connection Lost: ' + responseObject.errorMessage);
      console.log(responseObject.errorMessage);
    }
  };

  this.onConnect = function() {
    self.isConnected = true;
    window.clearInterval(self.connectTimeoutID);
    self.client.subscribe(self.mqttSettings.username + '/' + self.RESPONSE_TOPIC);
    self.client.subscribe(self.mqttSettings.username + '/' + self.TO_MONITOR_TOPIC);
    self.checkVersion(self.$connectWindow);
  };

  this.connectTimeout = function() {
    self.$connectWindow.$body.text('Connection timed out. Make sure your username and password are correct.');
    self.$connectWindow.$buttonsRow.removeClass('hide');
  };

  this.connect = async function() {
    self.$connectWindow = main.hiddenButtonDialog('Connecting to Server', 'Connecting...');

    let clientID = self.genClientID();
    if (self.client) {
      try {
        self.client.disconnect();
      } catch (e) {}

    }
    self.client = new Paho.MQTT.Client(self.mqttSettings.host, clientID);
    self.client.onConnectionLost = self.onConnectionLost;
    self.client.onMessageArrived = self.onMessageArrived;
    self.client.connect({
      onSuccess: self.onConnect,
      userName: self.mqttSettings.username,
      password: self.mqttSettings.password,
      reconnect: true
    });
    self.connectTimeoutID = window.setTimeout(self.connectTimeout, 5 * 1000);
  };

  this.disconnect = function() {
    self.isConnected = false;
    if (self.client) {
      self.client.disconnect();
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

    let nonce = await self.sendCmd(constants._MODE_WRITE_FILES, files);
    let response = await self.waitForResponse(nonce);

    if (response == null) {
      $updateWindow.$body.text('Connection timed out');
      $updateWindow.$buttonsRow.removeClass('hide');
    } else if (response.status != constants._STATUS_SUCCESS) {
      $updateWindow.$body.text('Update failed. Please try again.');
      $updateWindow.$buttonsRow.removeClass('hide');
    } else {
      $updateWindow.$body.text('Update Completed. Please restart your device.');
      $updateWindow.$buttonsRow.removeClass('hide');
    }
  };

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
    let nonce = await self.sendCmd(constants._MODE_DELETE_ALL);
    let response = await self.waitForResponse(nonce);
    if (response == null) {
      $downloadWindow.$body.text('Connection timed out');
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    } else if (response.status != constants._STATUS_SUCCESS) {
      $downloadWindow.$body.text('Error erasing files');
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    }

    // Download
    $downloadWindow.$body.text('Downloading...');
    nonce = await self.sendCmd(constants._MODE_WRITE_FILES, filesManager.files);
    response = await self.waitForResponse(nonce);
    if (response == null) {
      $downloadWindow.$body.text('Connection timed out');
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    } else if (response.status != constants._STATUS_SUCCESS) {
      $downloadWindow.$body.text('Error downloading files');
      $downloadWindow.$buttonsRow.removeClass('hide');
      return;
    }

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

    let nonce = await self.sendCmd(constants._MODE_DELETE_ALL);
    let response = await self.waitForResponse(nonce);
    if (response == null) {
      $deleteWindow.$body.text('Connection timed out');
      $deleteWindow.$buttonsRow.removeClass('hide');
    } else if (response.status != constants._STATUS_SUCCESS) {
      $deleteWindow.$body.text('Error erasing files');
      $deleteWindow.$buttonsRow.removeClass('hide');
    } else {
      $deleteWindow.$body.text('Delete completed.');
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
      message: '<div>New name: <input id="newName" type="text" maxlength="8" value="' + self.name + '"></div>'
    }, function() {
      let newName = $changeNameWindow.$body.find('#newName').val();
      self.changeName(newName);
    })
  };

  this.changeName = async function(newName) {
    let $changeNameWindow = main.hiddenButtonDialog('Change Device Name', 'Changing Name...');
    self.name = newName;

    let files = {};
    files[constants.NAME_FILE] = newName.slice(0, 8);

    let nonce = await self.sendCmd(constants._MODE_WRITE_FILES, files);
    let response = await self.waitForResponse(nonce);
    if (response == null) {
      $changeNameWindow.$body.text('Connection timed out');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    } else if (response.status != constants._STATUS_SUCCESS) {
      $changeNameWindow.$body.text('Error changing device name');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    } else {
      $changeNameWindow.$body.text('Change completed. Restart your device to see the new name.');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    }
  };

  this.configureDeviceNetwork = async function(content) {
    if (! self.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    let $changeNameWindow = main.hiddenButtonDialog('Configure Device Network', 'Downloading Settings...');

    let files = {};
    files[constants.NETWORK_CONFIGURATION_FILE] = content;

    let nonce = await self.sendCmd(constants._MODE_WRITE_FILES, files);
    let response = await self.waitForResponse(nonce);
    if (response == null) {
      $changeNameWindow.$body.text('Connection timed out');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    } else if (response.status != constants._STATUS_SUCCESS) {
      $changeNameWindow.$body.text('Error configuring network');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    } else {
      $changeNameWindow.$body.text('Change completed. Restart your device to connect to the network.');
      $changeNameWindow.$buttonsRow.removeClass('hide');
    }
  };
}

// Init class
mqtt.init();