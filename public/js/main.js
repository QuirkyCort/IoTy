var main = new function() {
  var self = this;

  this.STATUS_CONNECTED = 1;
  this.STATUS_DISCONNECTED = 2;

  this.connectionMode = 'ble';
  this.bleAvailable = true;

  this.firmwareFiles = {};
  this.firmwarePreloaded = false;

  this.settings;

  this.deviceWifiSettings = {
    ssid: '',
    wifiPassword: '',
    host: 'mqtt.a9i.sg',
    port: '1883',
    username: '',
    mqttPassword: ''
  };

  // Run on page load
  this.init = async function() {
    connectionMode = localStorage.getItem('connectionMode');

    if (['ble', 'mqtt', 'serial'].includes(connectionMode)) {
      self.connectionMode = connectionMode;
    } else if (typeof navigator.bluetooth == 'undefined') {
      self.bleAvailable = false;
      self.connectionMode = 'serial';
    } else {
      self.connectionMode = 'ble';
    }

    let deviceWifiSettings = localStorage.getItem('deviceWifiSettings');
    if (deviceWifiSettings) {
      self.deviceWifiSettings = JSON.parse(deviceWifiSettings);
    }

    let settings = localStorage.getItem('iotySettings');
    if (settings) {
      self.settings = JSON.parse(settings);
      extensions.processExtensions();
    } else {
      self.settings = self.defaultSettings();
    }

    self.$navs = $('nav li');
    self.$panels = $('.panels .panel');
    self.$fileMenu = $('.fileMenu');
    self.$appMenu = $('.appMenu');
    self.$helpMenu = $('.helpMenu');
    self.$languageMenu = $('.language');
    self.$newsButton = $('.news');
    self.$connectStatus = $('#connectionStatus')
    self.$connectMenu = $('#connectMenu');

    self.$projectName = $('#projectName');

    self.updateTextLanguage();

    self.$navs.click(self.tabClicked);
    self.$fileMenu.click(self.toggleFileMenu);
    self.$appMenu.click(self.toggleAppMenu);
    self.$helpMenu.click(self.toggleHelpMenu);
    self.$languageMenu.click(self.toggleLanguageMenu);
    self.$newsButton.click(self.showNews);
    self.$connectMenu.click(self.toggleConnectMenu);

    window.addEventListener('beforeunload', self.checkUnsaved);
    blocklyPanel.onActive();
    self.loadProjectName();

    let $firmwareWindow = self.hiddenButtonDialog('Firmware Download', 'Preloading Firmware...');
    self.preloadFirmwareFiles();
    $firmwareWindow.close();

    self.showWhatsNew();

    setInterval(self.saveSettingsToLocalStorage, 2 * 1000);
  };

  this.defaultSettings = function() {
    return {
      extensions: [],
    }
  };

  this.saveSettingsToLocalStorage = function() {
    localStorage.setItem('iotySettings', JSON.stringify(self.settings));
  };

  this.hiddenButtonDialog = function(title, body, reset) {
    let buttonsStr = '<button type="button" class="ok btn btn-success">OK</button>';
    if (typeof reset == 'function') {
      buttonsStr = '<button type="button" class="reset btn btn-warning">Reset Now</button>' + buttonsStr;
    }

    var $buttons = $(
      buttonsStr
    );

    let $dialog = dialog(title, body, $buttons);
    $dialog.$buttonsRow.addClass('hide');

    if (typeof reset == 'function') {
      $dialog.$buttonsRow.find('.reset').click(async function() {
        await reset();
        $dialog.close();
      });
    }
    $dialog.$buttonsRow.find('.ok').click(function() { $dialog.close(); });

    return $dialog;
  };

  this.preloadFirmwareFiles = async function() {
    async function retrieveUpdateFile() {
      let response = await fetch('firmware/' + constants.FIRMWARE_UPDATE_FILE);
      let text = await response.text();

      self.firmwareFiles[constants.FIRMWARE_UPDATE_FILE] = {
        content: text,
        tempName: constants.FIRMWARE_UPDATE_FILE
      }

      for (let row of text.split('\n')) {
        let command = row.split(' ');
        if (command[0] == 'mv') {
          self.firmwareFiles[command[2]] = {
            content: '',
            tempName: command[1]
          }
        }
      }
    }

    async function retrieveFiles() {
      for (let file in self.firmwareFiles) {
        if (file != constants.FIRMWARE_UPDATE_FILE) {
          let response = await fetch('firmware/' + file);
          let buf = await response.arrayBuffer();
          self.firmwareFiles[file].content = buf;
        }
      }
    }

    await retrieveUpdateFile();
    await retrieveFiles();
    self.firmwarePreloaded = true;
  };

  // Update text already in html
  this.updateTextLanguage = function() {
    $('#navBlocks').text(i18n.get('#main-blocks#'));
    $('#navSim').text(i18n.get('#main-sim#'));
    self.$fileMenu.text(i18n.get('#main-file#'));
    self.$helpMenu.text(i18n.get('#main-help#'));
  };

  // Toggle language menu
  this.toggleLanguageMenu = function(e) {
    if ($('.languageMenuDropDown').length == 0) {
      $('.menuDropDown').remove();
      e.stopPropagation();

      function setLang(lang) {
        localStorage.setItem('LANG', lang);
        window.location.reload();
      }

      let menuItems = [
        {html: 'Deutsch', line: false, callback: function() { setLang('de'); }},
        {html: 'Ελληνικά', line: false, callback: function() { setLang('el'); }},
        {html: 'English', line: false, callback: function() { setLang('en'); }},
        {html: 'Español', line: false, callback: function() { setLang('es'); }},
        {html: 'Français', line: false, callback: function() { setLang('fr'); }},
        {html: 'עברית', line: false, callback: function() { setLang('he'); }},
        {html: 'Nederlands', line: false, callback: function() { setLang('nl'); }},
        {html: 'Português', line: false, callback: function() { setLang('pt'); }},
        {html: 'tlhIngan', line: false, callback: function() { setLang('tlh'); }},
        {html: 'Русский', line: false, callback: function() { setLang('ru'); }},
        {html: 'Magyar', line: false, callback: function() { setLang('hu'); }},
      ];

      menuDropDown(self.$languageMenu, menuItems, {className: 'languageMenuDropDown', align: 'right'});
    }
  };

  // About page
  this.openAbout = function() {
    let $body = $(
      '<div class="about">' +
        '<div></div>' +
        '<h3>Credits</h3>' +
        '<p>Created by Cort @ <a href="https://aposteriori.com.sg" target="_blank">A Posteriori</a>.</p>' +
        '<p>This software would not have been possible without the great people behind:</p>' +
        '<ul>' +
          '<li><a href="https://developers.google.com/blockly" target="_blank">Blockly</a></li>' +
          '<li><a href="https://ace.c9.io/" target="_blank">Ace Editor</a></li>' +
          '<li><a href="https://skulpt.org/" target="_blank">Skulpt</a></li>' +
          '<li><a href="https://micropython.org/" target="_blank">Micropython</a></li>' +
        '</ul>' +
        '<h3>Contact</h3>' +
        '<p>Please direct all complaints or requests to <a href="mailto:cort@aposteriori.com.sg">Cort</a>.</p>' +
        '<p>If you\'re in the market for STEM training, do consider <a href="https://aposteriori.com.sg" target="_blank">A Posteriori</a>.</p>' +
        '<h3>License</h3>' +
        '<p>GNU General Public License v3.0</p>' +
        '<p>IoTy is a Free and Open Source Software</p>' +
      '</div>'
    );

    let $buttons = $(
      '<button type="button" class="confirm btn-success">Ok</button>'
    );

    let $dialog = dialog('About', $body, $buttons);

    $buttons.click(function(){
      $dialog.close();
    });
  };

  // Open page in new tab
  this.openPage = function(url) {
    window.open(url, '_blank');
  };

  // Toggle app
  this.toggleAppMenu = function(e) {
    if ($('.appMenuDropDown').length == 0) {
      $('.menuDropDown').remove();
      e.stopPropagation();

      let menuItems = [
        {html: 'MQTT App Builder', line: false, callback: self.appBuilderWindow},
        {html: 'Access Point Page', line: false, callback: self.apPageWindow},
        {html: 'Flash Firmware', line: false, callback: self.flashFirmwareWindow},
      ];

      menuDropDown(self.$appMenu, menuItems, {className: 'appMenuDropDown'});
    }
  };

  this.appBuilderWindow = function() {
    let options = {
      title: i18n.get('#main-appBuilder_title#'),
      message: i18n.get('#main-appBuilder_description#'),
      confirm: i18n.get('#main-appBuilder_go#')
    };
    confirmDialog(options, function(){
      self.openPage('https://ioty-mqtt.a9i.sg/');
    });
  };

  this.apPageWindow = function() {
    let options = {
      title: i18n.get('#main-apPage_title#'),
      message: i18n.get('#main-apPage_description#'),
      confirm: i18n.get('#main-apPage_go#')
    };
    confirmDialog(options, function(){
      self.openPage('http://192.168.4.1');
    });
  };

  this.flashFirmwareWindow = function() {
    let options = {
      title: i18n.get('#main-flashFirmware_title#'),
      message: i18n.get('#main-flashFirmware_description#'),
      confirm: i18n.get('#main-flashFirmware_go#')
    };
    confirmDialog(options, function(){
      self.openPage('https://ioty-flash.a9i.sg/');
    });
  };

  // Toggle help
  this.toggleHelpMenu = function(e) {
    if ($('.helpMenuDropDown').length == 0) {
      $('.menuDropDown').remove();
      e.stopPropagation();

      let menuItems = [
        {html: 'Documentations', line: false, callback: function() { self.openPage('https://tutorials.aposteriori.com.sg/120-IoTy/10-Introduction/10-Intro.html'); }},
        {html: 'Github', line: false, callback: function() { self.openPage('https://github.com/QuirkyCort/IoTy'); }},
        {html: i18n.get('#main-whats_new#'), line: false, callback: function() { self.showWhatsNew(true); }},
        {html: i18n.get('#main-privacy#'), line: false, callback: function() { self.openPage('privacy.html'); }},
        {html: i18n.get('#main-about#'), line: false, callback: self.openAbout },
      ];

      menuDropDown(self.$helpMenu, menuItems, {className: 'helpMenuDropDown'});
    }
  };

  // Toggle connect
  this.toggleConnectMenu = function(e) {
    if ($('.connectMenuDropDown').length == 0) {
      $('.menuDropDown').remove();
      e.stopPropagation();

      if (self.connectionMode == 'ble') {
        self.bleConnectMenu(e);
      } else if (self.connectionMode == 'mqtt') {
        self.mqttConnectMenu(e);
      } else if (self.connectionMode == 'serial') {
        self.serialConnectMenu(e);
      }
    }
  };

  this.bleConnectMenu = function(e) {
    let menuItems = [
      {html: i18n.get('#main-connectMode#'), line: false, callback: self.connectModeMenu },
      {html: i18n.get('#main-connectBLE#'), line: false, callback: ble.connect },
      {html: i18n.get('#main-download#'), line: false, callback: ble.download },
      {html: i18n.get('#main-erase#'), line: false, callback: ble.eraseDialog },
      {html: i18n.get('#main-changeName#'), line: false, callback: ble.changeNameDialog},
      {html: i18n.get('#main-updateFirmware#'), line: false, callback: main.updateFirmwareDialog},
      {html: i18n.get('#main-getInfo#'), line: false, callback: ble.getInfo},
      {html: i18n.get('#main-listFiles#'), line: false, callback: self.listFiles},
      {html: i18n.get('#main-configureDeviceNetwork#'), line: false, callback: main.configureDeviceNetwork},
      {html: i18n.get('#main-resetDevice#'), line: false, callback: ble.resetDialog},
      {html: i18n.get('#main-disconnect#'), line: false, callback: ble.disconnect},
    ];

    menuDropDown(self.$connectMenu, menuItems, {className: 'connectMenuDropDown', align: 'right'});
  };

  this.mqttConnectMenu = function(e) {
    let menuItems = [
      {html: i18n.get('#main-connectMode#'), line: false, callback: self.connectModeMenu },
      {html: i18n.get('#main-connectInet#'), line: false, callback: mqtt.connectDialog },
      {html: i18n.get('#main-download#'), line: false, callback: mqtt.download },
      {html: i18n.get('#main-erase#'), line: false, callback: mqtt.eraseDialog },
      {html: i18n.get('#main-changeName#'), line: false, callback: mqtt.changeNameDialog},
      {html: i18n.get('#main-updateFirmware#'), line: false, callback: main.updateFirmwareDialog},
      {html: i18n.get('#main-getInfo#'), line: false, callback: mqtt.getInfo},
      {html: i18n.get('#main-listFiles#'), line: false, callback: self.listFiles},
      {html: i18n.get('#main-configureDeviceNetwork#'), line: false, callback: main.configureDeviceNetwork},
      {html: i18n.get('#main-resetDevice#'), line: false, callback: mqtt.resetDialog},
      {html: i18n.get('#main-disconnect#'), line: false, callback: mqtt.disconnect},
    ];

    menuDropDown(self.$connectMenu, menuItems, {className: 'connectMenuDropDown', align: 'right'});
  };

  this.serialConnectMenu = function(e) {
    let menuItems = [
      {html: i18n.get('#main-connectMode#'), line: false, callback: self.connectModeMenu },
      {html: i18n.get('#main-connectSerial#'), line: false, callback: serial.connectDialog },
      {html: i18n.get('#main-download#'), line: false, callback: serial.download },
      {html: i18n.get('#main-runSelectedBlock#'), line: false, callback: self.runSelectedBlock },
      {html: i18n.get('#main-erase#'), line: false, callback: serial.eraseDialog },
      {html: i18n.get('#main-changeName#'), line: false, callback: serial.changeNameDialog},
      {html: i18n.get('#main-checkVersion#'), line: false, callback: serial.checkVersion},
      {html: i18n.get('#main-updateFirmware#'), line: false, callback: serial.updateFirmwareDialog},
      {html: i18n.get('#main-getInfo#'), line: false, callback: serial.getInfo},
      {html: i18n.get('#main-listFiles#'), line: false, callback: self.listFiles},
      {html: i18n.get('#main-configureDeviceNetwork#'), line: false, callback: main.configureDeviceNetwork},
      {html: i18n.get('#main-softResetDevice#'), line: false, callback: serial.softResetDialog},
      {html: i18n.get('#main-resetDevice#'), line: false, callback: serial.resetDialog},
      {html: i18n.get('#main-disconnect#'), line: false, callback: serial.disconnect},
    ];

    menuDropDown(self.$connectMenu, menuItems, {className: 'connectMenuDropDown', align: 'right'});
  };

  this.configureDeviceNetwork = function(e) {
    let $body = $(
      '<div>' +
        'Configure WiFi access and MQTT connection for your IoTy device.' +
      '</div>' +
      '<div>' +
        'These credentials are only used for programming your IoTy device, ' +
        'they are not used for your IoT programs and can be different from the credentials used there.' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">WiFi SSID</div>' +
        '<div class="text"><input type="text" class="ssid"></div>' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">WiFi Password</div>' +
        '<div class="text"><input type="text" class="wifiPassword"></div>' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">MQTT Host</div>' +
        '<div class="text"><input type="text" class="host"></div>' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">MQTT Port</div>' +
        '<div class="text"><input type="text" class="port"></div>' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">Username</div>' +
        '<div class="text"><input type="text" class="username"></div>' +
      '</div>' +
      '<div class="configuration">' +
        '<div class="configurationTitle">Password</div>' +
        '<div class="text"><input type="text" class="mqttPassword"></div>' +
      '</div>'
    );

    let $ssid = $body.find('.ssid');
    let $wifiPassword = $body.find('.wifiPassword');
    let $host = $body.find('.host');
    let $port = $body.find('.port');
    let $username = $body.find('.username');
    let $mqttPassword = $body.find('.mqttPassword');

    $ssid.val(self.deviceWifiSettings.ssid);
    $wifiPassword.val(self.deviceWifiSettings.wifiPassword);
    $host.val(self.deviceWifiSettings.host);
    $port.val(self.deviceWifiSettings.port);
    $username.val(self.deviceWifiSettings.username);
    $mqttPassword.val(self.deviceWifiSettings.mqttPassword);

    let $buttons = $(
      '<button type="button" class="cancel btn-light">Cancel</button>' +
      '<button type="button" class="confirm btn-success">Ok</button>'
    );

    let $dialog = dialog('Connect', $body, $buttons);

    $buttons.siblings('.cancel').click(function(){
      $dialog.close();
    });
    $buttons.siblings('.confirm').click(function(){
      self.deviceWifiSettings = {
        ssid: $ssid.val().trim(),
        wifiPassword: $wifiPassword.val().trim(),
        host: $host.val().trim(),
        port: $port.val().trim(),
        username: $username.val().trim(),
        mqttPassword: $mqttPassword.val().trim()
      };
      localStorage.setItem('deviceWifiSettings', JSON.stringify(self.deviceWifiSettings));

      let file = '';
      file += self.deviceWifiSettings.ssid + '\n';
      file += self.deviceWifiSettings.wifiPassword + '\n';
      file += self.deviceWifiSettings.host + '\n';
      file += self.deviceWifiSettings.port + '\n';
      file += self.deviceWifiSettings.username + '\n';
      file += self.deviceWifiSettings.mqttPassword + '\n';

      if (self.connectionMode == 'ble') {
        ble.configureDeviceNetwork(file);
      } else if (self.connectionMode == 'mqtt') {
        mqtt.configureDeviceNetwork(file);
      } else if (self.connectionMode == 'serial') {
        serial.configureDeviceNetwork(file);
      }

      $dialog.close();
    });
  };

  this.checkPythonSyntax = function() {
    Sk.configure({
      __future__: Sk.python3
    });
    let syntaxError = false;
    let errorText = '';
    for (let filename in filesManager.files) {
      try {
        Sk.compile(filesManager.files[filename], filename);
      } catch (error) {
        // Skip some errors which occurs in Skulpt but not micropython
        if (error.args.v[0].v == 'Not implemented: nonlocal') {
          continue;
        }

        console.log(error);
        errorText += 'File "' + error.traceback[0].filename + '", line ' + error.traceback[0].lineno + '\n';
        errorText += '  ' + error.args.v[0].v + '\n';
        syntaxError = true;
      }
    }

    return {
      error: syntaxError,
      text: errorText
    };
  }

  this.connectModeMenu = function() {
    let $body = $(
      '<div>' +
        '<select></select>' +
        '<div class="description"></div>' +
      '</div>'
    );
    let $select = $body.find('select');
    $select.append('<option value="ble">Bluetooth</option>');
    $select.append('<option value="mqtt">Internet</option>');
    $select.append('<option value="serial">Serial</option>');

    $select.val(self.connectionMode);

    let $description = $body.find('.description');
    $select.change(setDescription);

    function setDescription() {
      if ($select.val() == 'ble') {
        $description.html(
          '<p>' +
            'Bluetooth mode only works with Chrome and Chrome based browsers, and is not available on iOS. ' +
          '</p>' +
          '<p>' +
            'Your computer will need to have Bluetooth hardware compatible with the IoTy device.' +
          '</p>' +
          '<p>' +
            'Web Bluetooth is an experimental technology and you may encounter compatibility problems. ' +
            'If so, please try a different connection mode.' +
          '</p>'
        );
      } else if ($select.val() == 'mqtt') {
        $description.html(
          '<p>' +
            'In Internet mode, the IoTy device connects to an MQTT broker via the internet and receives programs through the broker. ' +
          '</p>' +
          '<p>' +
            'To use Internet mode, you must first use a different mode to configure the IoTy device network, providing it with the credentials required to connect to your router and the MQTT broker. ' +
          '</p>' +
          '<p>' +
            'This mode should be compatible with all browsers on any OS.' +
          '</p>'
        );
      } else if ($select.val() == 'serial') {
        $description.html(
          '<p>' +
            'To use Serial mode, you must connect your computer to the IoTy device with a USB cable, and your browser must support Web Serial (Chrome and Chrome based browsers). ' +
          '</p>' +
          '<p>' +
            'Your device does NOT need to be in programming mode for serial mode to work. ' +
          '</p>' +
          '<p>' +
            'Serial mode will not check your firmware version on connect as it will cause running programs on your device to terminate. ' +
            'You will need to manually trigger a version check if desired. ' +
          '</p>'
        );
      }
    }

    setDescription();
    let $buttons = $(
      '<button type="button" class="cancel btn-light">Cancel</button>' +
      '<button type="button" class="confirm btn-success">Ok</button>'
    );

    let $dialog = dialog('Connection Mode', $body, $buttons);

    $buttons.siblings('.cancel').click(function(){
      $dialog.close();
    });
    $buttons.siblings('.confirm').click(function(){
      self.connectionMode = $select.val();
      localStorage.setItem('connectionMode', self.connectionMode);
      self.disconnectUnusedMode();
      $dialog.close();
    });
  };

  this.disconnectUnusedMode = function() {
    if (self.connectionMode != 'ble') {
      ble.disconnect();
    }
    main.setConnectStatus(main.STATUS_DISCONNECTED);
  };

  // Toggle filemenu
  this.toggleFileMenu = function(e) {
    if ($('.fileMenuDropDown').length == 0) {
      $('.menuDropDown').remove();
      e.stopPropagation();

      let menuItems = [
        {html: i18n.get('#main-new_program#'), line: true, callback: self.newProgram},
        {html: i18n.get('#main-load_blocks#'), line: false, callback: self.loadFromComputer},
        {html: i18n.get('#main-save_blocks#'), line: false, callback: self.saveToComputer},
        {html: i18n.get('#main-import_functions#'), line: true, callback: self.importFromComputer},
        {html: i18n.get('#main-load_python#'), line: false, callback: self.loadPythonFromComputer},
        {html: i18n.get('#main-save_python#'), line: true, callback: self.savePythonToComputer},
        {html: i18n.get('#main-save_json#'), line: false, callback: self.saveToJson},
        {html: i18n.get('#main-save_firmware#'), line: true, callback: self.saveFirmwareToJson},
        {html: i18n.get('#main-load_extension#'), line: true, callback: extensions.loadDialog},
      ];

      menuDropDown(self.$fileMenu, menuItems, {className: 'fileMenuDropDown'});
    }
  };

  // Set connect status
  this.setConnectStatus = function(status) {
    if (status == self.STATUS_CONNECTED) {
      self.$connectStatus.text('Connected');
      self.$connectStatus.addClass('connected');
    } else if (status == self.STATUS_DISCONNECTED) {
      self.$connectStatus.text('Disconnected');
      self.$connectStatus.removeClass('connected');
    }
  };

  // New program
  this.newProgram = function() {
    confirmDialog(i18n.get('#main-start_new_warning#'), function() {
      blockly.loadDefaultWorkspace();
      filesManager.modified = false;
      localStorage.setItem('iotyPythonModified', false);
      blocklyPanel.setDisable(false);
      self.$projectName.val('');
      self.saveProjectName();
      self.settings = self.defaultSettings();
      extensions.processExtensions();
    });
  };

  // Load project name from local storage
  this.loadProjectName = function() {
    self.$projectName.val(localStorage.getItem('projectName'));
  };

  // Remove problematic characters then save project name
  this.saveProjectName = function() {
    let filtered = self.$projectName.val().replace(/[^0-9a-zA-Z_\- ]/g, '').trim();
    self.$projectName.val(filtered);
    localStorage.setItem('projectName', filtered);
  };

  // Download to single file
  this.downloadFile = function(filename, content, mimetype) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:' + mimetype + ';base64,' + content;
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.dispatchEvent(new MouseEvent('click'));
  }

  // Download to zip  file
  this.downloadZipFile = function(filename, files) {
    var zip = new JSZip();
    for (let f in files) {
      zip.file(f, files[f]);
    }

    zip.generateAsync({
      type:'base64',
      compression: "DEFLATE"
    })
    .then(function(content) {
      self.downloadFile(filename + '.zip', content, 'application/zip');
    });
  }

  // save to computer
  this.saveToComputer = function() {
    let filename = self.$projectName.val();
    if (filename.trim() == '') {
      filename = 'IoTy_Blocks';
    }

    self.downloadZipFile(
      filename,
      {
        'blocks.json': blockly.getJsonText(),
        'settings.json': JSON.stringify(self.settings)
      }
    );
  };

  // load from computer
  this.loadFromComputer = function() {
    var hiddenElement = document.createElement('input');
    hiddenElement.type = 'file';
    hiddenElement.accept = 'application/zip,.zip,application/xml,.xml';
    hiddenElement.dispatchEvent(new MouseEvent('click'));
    hiddenElement.addEventListener('change', function(e){
      if (e.target.files[0].name.slice(-4) == '.zip') {
        self.loadFromComputerZip(e.target.files[0]);
      } else {
        self.loadFromComputerXml(e.target.files[0]);
      }
    });
  };

  // import functions from blocks file
  this.importFromComputer = function() {
    async function loadFiles(zip) {
      await zip.file('blocks.json').async('string')
        .then(function(content){
          blockly.importJsonText(content);
        });
    }

    var hiddenElement = document.createElement('input');
    hiddenElement.type = 'file';
    hiddenElement.accept = 'application/zip,.zip';
    hiddenElement.dispatchEvent(new MouseEvent('click'));
    hiddenElement.addEventListener('change', function(e){
      JSZip.loadAsync(e.target.files[0])
        .then(loadFiles);
    });
  };

  // load new zip format from computer
  this.loadFromComputerZip = function(file) {
    async function loadFiles(zip) {
      await zip.file('blocks.json').async('string')
        .then(function(content){
          blockly.loadJsonText(content);
        });

      await zip.file('settings.json').async('string')
        .then(function(content){
          self.settings = JSON.parse(content);
        });

      extensions.processExtensions();
    }

    JSZip.loadAsync(file)
      .then(loadFiles)
      .catch(error => showErrorModal(i18n.get('#main-invalid_blocks_file#')));

    let filename = file.name.replace(/.zip/, '');
    self.$projectName.val(filename);
    self.saveProjectName();
  };

  // load old xml format from computer
  this.loadFromComputerXml = function(file) {
    var reader = new FileReader();
    reader.onload = function() {
      blockly.loadXmlText(this.result);
    };
    reader.readAsText(file);
    let filename = file.name.replace(/.xml/, '');
    self.$projectName.val(filename);
    self.saveProjectName();
  };

  // save to computer
  this.savePythonToComputer = async function() {
    let filename = self.$projectName.val();
    if (filename.trim() == '') {
      filename = 'IoTy_Python';
    }

    if (filesManager.modified == false) {
      await pythonPanel.loadPythonFromBlockly();
    }
    filesManager.updateCurrentFile();

    self.downloadZipFile(filename, filesManager.files);
  };

  // load from computer
  this.loadPythonFromComputer = function() {
    var hiddenElement = document.createElement('input');
    hiddenElement.type = 'file';
    hiddenElement.accept = 'application/zip,.zip';
    hiddenElement.dispatchEvent(new MouseEvent('click'));
    hiddenElement.addEventListener('change', self.loadPythonFromComputerZip);
  };

  this.loadPythonFromComputerZip = function(e) {
    async function loadFiles(zip) {
      filesManager.deleteAll();

      let filenames = [];
      zip.forEach(function(path, file) {
        filenames.push(path);
      });

      if (! filenames.includes('main.py')) {
        throw new Error('No main.py in zip archive');
      }

      for (let filename of filenames) {
        await zip.file(filename).async('string')
          .then(function(content){
            filesManager.add(filename, content);
          });
      }

      filesManager.modified = true;
      filesManager.unsaved = true;
      filesManager.saveLocalStorage();
      self.tabClicked('navPython');
    }

    JSZip.loadAsync(e.target.files[0])
      .then(loadFiles)
      .catch(error => showErrorModal(i18n.get('#main-invalid_python_file#')));
  }

  // save to json package
  this.saveToJson = async function() {
    let filename = self.$projectName.val();
    if (filename.trim() == '') {
      filename = 'IoTy';
    }

    if (filesManager.modified == false) {
      await pythonPanel.loadPythonFromBlockly();
    }
    filesManager.updateCurrentFile();

    let obj = {};

    for (let f in filesManager.files) {
      obj[f] = filesManager.files[f];
    }

    self.downloadFile(filename + '.json', btoa(JSON.stringify(obj)), 'application/json');
  };

  // save to json package
  this.saveFirmwareToJson = function() {
    let filename = 'firmware-v' + constants.CURRENT_VERSION;
    let firmwareFiles = {};

    for (let name in self.firmwareFiles) {
      if (name == constants.FIRMWARE_UPDATE_FILE) {
        firmwareFiles[name] = {
          tempName: self.firmwareFiles[name].tempName,
          content: self.firmwareFiles[name].content
        };
      } else {
        firmwareFiles[name] = {
          tempName: self.firmwareFiles[name].tempName,
          content: base64EncArr(new Uint8Array(self.firmwareFiles[name].content))
        };
      }
    }

    self.downloadFile(filename + '.json', btoa(JSON.stringify(firmwareFiles)), 'application/json');
  };

  // Check for unsaved changes
  this.checkUnsaved = function (event) {
    if (blockly.unsaved || filesManager.unsaved) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  this.getInterface = function() {
    if (self.connectionMode == 'mqtt') {
      return mqtt;
    } else if (self.connectionMode == 'serial') {
      return serial;
    } else {
      return ble;
    }
  }

  this.listFiles = function() {
    let interface = self.getInterface();

    if (! interface.isConnected) {
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
    $buttons.siblings('.download').click(self.downloadFilesFromDevice);
    $buttons.siblings('.close').click(function() { $dialog.close(); });

    self.updateFilesListing();
  };

  this.mkdirSetName = function() {
    async function mkdir(dirname) {
      let interface = self.getInterface();

      let $updateWindow = main.hiddenButtonDialog('Make Directory', 'Making Directory...');
      let status = await interface.mkdirOnDevice(dirname);

      if (status == constants._STATUS_SUCCESS) {
        $updateWindow.$body.text('Completed');
        $updateWindow.$buttonsRow.removeClass('hide');
      } else {
        $updateWindow.$body.text('Error making directory');
        $updateWindow.$buttonsRow.removeClass('hide');
      }

      self.updateFilesListing();
    }

    let $mkdirNameWindow = confirmDialog({
      title: 'Make Directory',
      message: '<div>Directory Name: <input id="dirname" type="text" value=""></div>'
    }, function() {
      let dirname = $mkdirNameWindow.$body.find('#dirname').val();
      mkdir(dirname);
    });
  };

  this.deleteFilesFromDevice = async function() {
    let interface = self.getInterface();

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
      let status = await interface.deleteOneFileFromDevice(file);
      if (status != constants._STATUS_SUCCESS) {
        toastMsg('Error deleting "' + file + '"');
      }

      count++;
    }
    $updateWindow.$body.text('Delete completed');
    $updateWindow.$buttonsRow.removeClass('hide');

    self.updateFilesListing();
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
    let interface = self.getInterface();

    let $updateWindow = main.hiddenButtonDialog('Uploading File', 'Uploading');

    try {
      let progressBar = '';

      function updateProgress() {
        progressBar += '.';
        $updateWindow.$body.text('Uploading' + progressBar);
      }

      let status = await interface.writeFile(filename, content, updateProgress);

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
      } else if (status == null) {
        $updateWindow.$body.text('Connection timed out');
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
    let interface = self.getInterface();

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
      let content = await interface.downloadOneFileFromDevice(file);
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
      let content = files[filename];
      if (content instanceof Uint8Array) {
        content = String.fromCharCode(...content);
      }
      content = btoa(content);
      main.downloadFile(filename, content, 'application/octet-stream');
    } else {
      main.downloadZipFile('deviceFiles', files);
    }
    $updateWindow.$buttonsRow.removeClass('hide');
  };

  this.updateFilesListing = async function() {
    let interface = self.getInterface();

    let result = await interface.getFilesListing();
    if (result.status == constants._STATUS_SUCCESS) {
      let files = result.content;

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

  // Clicked on tab
  this.tabClicked = function(tabNav) {
    if (typeof tabNav == 'string') {
      var match = tabNav;
    } else {
      var match = $(this)[0].id;
    }

    function getPanelByNav(nav) {
      // the python module panels are all in the dict, look there first
      if (nav == 'navBlocks') {
        return blocklyPanel;
      } else if (nav == 'navPython') {
        return pythonPanel;
      } else if (nav == 'navMonitor') {
        return monitorPanel;
      }
    };

    // when deleting a python module, inActiveNav and inActive will be undefined
    inActiveNav = self.$navs.siblings('.active').attr('id');
    inActive = getPanelByNav(inActiveNav);
    active = getPanelByNav(match);

    self.$navs.removeClass('active');
    $('#' + match).addClass('active');

    self.$panels.removeClass('active');
    self.$panels.siblings('[aria-labelledby="' + match + '"]').addClass('active');

    if ((inActive !== undefined) && (typeof inActive.onInActive == 'function')) {
      inActive.onInActive();
    }
    if (typeof active.onActive == 'function') {
      active.onActive();
    }
  };

  this.unableToUpdateFirmwareDialog = function() {
    acknowledgeDialog({
      title: 'Firmware Update',
      message:
        'A new firmware (version ' + constants.CURRENT_VERSION + ') is available, but your device version is too old to upgrade through this page. ' +
        'Please use Serial mode or the <a href="https://ioty-flash.a9i.sg/">Firmware Flash Tool</a> to update your firmware. '
    });
  };

  this.updateFirmwareDialog = function() {
    let interface = self.getInterface();

    if (! interface.isConnected) {
      toastMsg('Not connected. Please connect to device.');
      return;
    }

    if (interface.version < constants.CURRENT_VERSION) {
      confirmDialog({
        title: 'Firmware Update',
        confirm: 'Update Now',
        message:
          'A new firmware (version ' + constants.CURRENT_VERSION + ') is available, your device is using version ' + interface.version + '. ' +
          'Errors may occur if you do not update your firmware.'
      }, interface.updateFirmware);
    } else {
      confirmDialog({
        title: 'Firmware Update',
        confirm: 'Update Anyway',
        message:
          'The latest firmware version is ' + constants.CURRENT_VERSION + ', your device is using version ' + interface.version + '. ' +
          'No updates are required.'
      }, interface.updateFirmware);
    }
  };

  this.runSelectedBlock = function() {
    Blockly.Python.init(blockly.workspace);
    let code = Blockly.Python.blockToCode(Blockly.getSelected(), true);
    let interface = main.getInterface();
    if (typeof interface.sendSerialPasteMode == 'function') {
      interface.sendSerialPasteMode(code);
    }
  };

  // Display what's new if not seen before
  this.showWhatsNew = function(forceShow=false) {
    let current = 20250321;
    let lastShown = localStorage.getItem('whatsNew');
    if (lastShown == null || parseInt(lastShown) < current || forceShow) {
      let options = {
        title: 'What\'s New',
        message:
        '<h3>21 Mar 2025</h3>' +
        '<p>' +
          'Added extension for VS1003 MP3/WMA Audio CODEC and Circular Buffer. ' +
          'Added blocks to urequests to facilicate streaming. ' +
        '</p>' +
        '<p>' +
          'Put together, these new additions allows you to stream internet radio stations on your ESP32 device.' +
        '</p>' +
        '<h3>3 Oct 2024 (Firmware 14)</h3>' +
        '<p>' +
          'A new firmware version (14) is released. ' +
          '<strong>You must update to this new version or network functions will not work!</strong>' +
        '</p>' +
        '<h3>7 Aug 2024 (I2C changes and New extensions)</h3>' +
        '<p>' +
          'The I2C blocks now allows for use of the second channel and Soft I2C.' +
        '</p>' +
        '<p>' +
          'Many new extensions have been added; ' +
          '<ul>' +
            '<li>Camera (...for ESP32-Cam)</li>' +
            '<li>Machine Vision</li>' +
            '<li>Wheeled Drive</li>' +
            '<li>ILI9341 Display</li>' +
            '<li>X-GLCD Font</li>' +
            '<li>ADS7843 / XPT2046 Touchscreen Controller</li>' +
            '<li>ST7789 Display</li>' +
          '</ul>' +
        '</p>'
      }
      acknowledgeDialog(options, function(){
        localStorage.setItem('whatsNew', current);
      });
    }
  };

  // Display news
  this.showNews = function() {
    let options = {
      title: 'News',
      message: ''
    }
    acknowledgeDialog(options);
  };
}

// Init class
main.init();
