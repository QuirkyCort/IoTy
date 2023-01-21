var main = new function() {
  var self = this;

  this.STATUS_CONNECTED = 1;
  this.STATUS_DISCONNECTED = 2;

  this.connectionMode = 'ble';
  this.bleAvailable = true;

  this.firmwareFiles = {};
  this.firmwarePreloaded = false;

  // Run on page load
  this.init = async function() {
    self.connectionMode = localStorage.getItem('connectionMode');
    if (self.connectionMode == null) {
      self.connectionMode = 'ble';
    }

    if (typeof navigator.bluetooth == 'undefined') {
      self.bleAvailable = false;
      self.connectionMode = 'ap';
    }

    self.$navs = $('nav li');
    self.$panels = $('.panels .panel');
    self.$fileMenu = $('.fileMenu');
    self.$helpMenu = $('.helpMenu');
    self.$languageMenu = $('.language');
    self.$newsButton = $('.news');
    self.$connectStatus = $('#connectionStatus')
    self.$connectMenu = $('#connectMenu');

    self.$projectName = $('#projectName');

    self.updateTextLanguage();

    self.$navs.click(self.tabClicked);
    self.$fileMenu.click(self.toggleFileMenu);
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
  };

  this.hiddenButtonDialog = function(title, body) {
    let $dialog = acknowledgeDialog({
      title: title,
      message: body
    });
    $dialog.$buttonsRow.addClass('hide');

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
        let response = await fetch('firmware/' + file);
        let text = await response.text();
        self.firmwareFiles[file].content = text;
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
        '<p>This simulator would not have been possible without the great people behind:</p>' +
        '<ul>' +
          '<li><a href="https://developers.google.com/blockly" target="_blank">Blockly</a></li>' +
          '<li><a href="https://ace.c9.io/" target="_blank">Ace Editor</a></li>' +
          '<li><a href="https://skulpt.org/" target="_blank">Skulpt</a></li>' +
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

  // Toggle help
  this.toggleHelpMenu = function(e) {
    if ($('.helpMenuDropDown').length == 0) {
      $('.menuDropDown').remove();
      e.stopPropagation();

      let menuItems = [
        // {html: 'Wiki', line: false, callback: function() { self.openPage('https://github.com/QuirkyCort/gears/wiki'); }},
        {html: 'Github', line: false, callback: function() { self.openPage('https://github.com/QuirkyCort/IoTy'); }},
        {html: i18n.get('#main-whats_new#'), line: false, callback: function() { self.showWhatsNew(true); }},
        {html: i18n.get('#main-privacy#'), line: false, callback: function() { self.openPage('privacy.html'); }},
        {html: i18n.get('#main-about#'), line: true, callback: self.openAbout },
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
      } else if (self.connectionMode == 'ap') {
        self.apConnectMenu(e);
      } else if (self.connectionMode == 'mqtt') {
        self.mqttConnectMenu(e);
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
      {html: i18n.get('#main-updateFirmware#'), line: false, callback: ble.updateFirmwareDialog},
      {html: i18n.get('#main-configureDeviceNetwork#'), line: false, callback: main.configureDeviceNetwork},
      {html: i18n.get('#main-disconnect#'), line: false, callback: ble.disconnect},
    ];

    menuDropDown(self.$connectMenu, menuItems, {className: 'connectMenuDropDown', align: 'right'});
  };

  this.apConnectMenu = function(e) {
    let menuItems = [
      {html: i18n.get('#main-connectMode#'), line: false, callback: self.connectModeMenu },
      {html: i18n.get('#main-connectAP#'), line: false, callback: ap.connect },
      {html: i18n.get('#main-download#'), line: false, callback: ap.download },
      {html: i18n.get('#main-erase#'), line: false, callback: ap.eraseDialog },
      {html: i18n.get('#main-changeName#'), line: false, callback: ap.changeNameDialog},
      {html: i18n.get('#main-configureDeviceNetwork#'), line: false, callback: main.configureDeviceNetwork},
      {html: i18n.get('#main-updateFirmware#'), line: false, callback: ap.updateFirmwareDialog},
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
      {html: i18n.get('#main-updateFirmware#'), line: false, callback: mqtt.updateFirmwareDialog},
      {html: i18n.get('#main-configureDeviceNetwork#'), line: false, callback: main.configureDeviceNetwork},
      {html: i18n.get('#main-disconnect#'), line: false, callback: mqtt.disconnect},
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

    let $buttons = $(
      '<button type="button" class="cancel btn-light">Cancel</button>' +
      '<button type="button" class="confirm btn-success">Ok</button>'
    );

    let $dialog = dialog('Connect', $body, $buttons);

    $buttons.siblings('.cancel').click(function(){
      $dialog.close();
    });
    $buttons.siblings('.confirm').click(function(){
      let deviceWifiSettings = {
        ssid: $ssid.val().trim(),
        wifiPassword: $wifiPassword.val().trim(),
        host: $host.val().trim(),
        port: $port.val().trim(),
        username: $username.val().trim(),
        mqttPassword: $mqttPassword.val().trim()
      };
      localStorage.setItem('deviceWifiSettings', JSON.stringify(deviceWifiSettings));

      let file = '';
      file += deviceWifiSettings.ssid + '\n';
      file += deviceWifiSettings.wifiPassword + '\n';
      file += deviceWifiSettings.host + '\n';
      file += deviceWifiSettings.port + '\n';
      file += deviceWifiSettings.username + '\n';
      file += deviceWifiSettings.mqttPassword + '\n';

      if (self.connectionMode == 'ble') {
        ble.configureDeviceNetwork(file);
      } else if (self.connectionMode == 'ap') {
        ap.configureDeviceNetwork(file);
      } else if (self.connectionMode == 'mqtt') {
        mqtt.configureDeviceNetwork(file);
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
    if (self.bleAvailable) {
      $select.append('<option value="ble">Bluetooth</option>');
    }
    $select.append('<option value="ap">Access Point</option>');
    $select.append('<option value="mqtt">Internet</option>');

    let $description = $body.find('.description');
    $select.change(setDescription);

    function setDescription() {
      if ($select.val() == 'ble') {
        $description.html(
          '<p>' +
            'Bluetooth mode only works with Chrome and Chrome based browsers, and on all platforms except iOS. ' +
          '</p>' +
          '<p>' +
            'Your computer will need to have Bluetooth hardware compatible with the IoTy device.' +
          '</p>' +
          '<p>' +
            'Web Bluetooth is an experimental technology and you may encounter compatibility problems. ' +
            'If so, please try a different connection mode.' +
          '</p>'
        );
      } else if ($select.val() == 'ap') {
        $description.html(
          '<p>' +
            'In Access Point mode, the IoTy device acts like a WiFi access point that you can connect your computer to. ' +
            'While connected to the IoTy WiFi access point, you will not have internet access.' +
          '</p>' +
          '<p>' +
            'This mode should be compatible with all browsers on any OS.' +
          '</p>'
        );
      } else if ($select.val() == 'mqtt') {
        $description.html(
          '<p>' +
            'In Internet mode, the IoTy device connects to an MQTT broker via the internet and receives programs from through the broker. ' +
          '</p>' +
          '<p>' +
            'To use Internet mode, the IoTy device must first be configured using another mode, and provided with the credentials required to connect to your router and the MQTT broker. ' +
          '</p>' +
          '<p>' +
            'This mode should be compatible with all browsers on any OS.' +
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
        {html: i18n.get('#main-save_blocks#'), line: true, callback: self.saveToComputer},
        {html: i18n.get('#main-load_python#'), line: false, callback: self.loadPythonFromComputer},
        {html: i18n.get('#main-save_python#'), line: true, callback: self.savePythonToComputer},
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
      pythonPanel.modified = false;
      localStorage.setItem('pythonModified', false);
      blocklyPanel.setDisable(false);
      self.$projectName.val('');
      self.saveProjectName();
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

  // save to computer
  this.saveToComputer = function() {
    let filename = self.$projectName.val();
    if (filename.trim() == '') {
      filename = 'IoTy';
    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:application/xml;charset=UTF-8,' + encodeURIComponent(blockly.getXmlText());;
    hiddenElement.target = '_blank';
    hiddenElement.download = filename + '.xml';
    hiddenElement.dispatchEvent(new MouseEvent('click'));
  };

  // load from computer
  this.loadFromComputer = function() {
    var hiddenElement = document.createElement('input');
    hiddenElement.type = 'file';
    hiddenElement.accept = 'application/xml,.xml';
    hiddenElement.dispatchEvent(new MouseEvent('click'));
    hiddenElement.addEventListener('change', function(e){
      var reader = new FileReader();
      reader.onload = function() {
        blockly.loadXmlText(this.result);
      };
      reader.readAsText(e.target.files[0]);
      let filename = e.target.files[0].name.replace(/.xml/, '');
      self.$projectName.val(filename);
      self.saveProjectName();
    });
  };

  // save to computer
  this.savePythonToComputer = function() {
    // let filename = self.$projectName.val();
    // if (filename.trim() == '') {
    //   filename = 'gearsBot';
    // }

    // let code = null;
    // if (pythonPanel.modified) {
    //   code = pythonPanel.editor.getValue();
    // } else {
    //   code = blockly.generator.genCode();
    // }
    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:text/x-python;charset=UTF-8,' + encodeURIComponent(code);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = filename + '.py';
    // hiddenElement.dispatchEvent(new MouseEvent('click'));
  };

  // load from computer
  this.loadPythonFromComputer = function() {
    // var hiddenElement = document.createElement('input');
    // hiddenElement.type = 'file';
    // hiddenElement.accept = 'text/x-python,.py';
    // hiddenElement.dispatchEvent(new MouseEvent('click'));
    // hiddenElement.addEventListener('change', function(e){
    //   var reader = new FileReader();
    //   reader.onload = function() {
    //     // second arg: 0 select all, -1 start, 1 end
    //     pythonPanel.editor.setValue(this.result, 1);
    //     self.tabClicked('navPython');
    //     pythonPanel.warnModify();
    //   };
    //   reader.onerror = function() {
    //     console.log(reader.error);
    //   };
    //   reader.readAsText(e.target.files[0]);
    //   let filename = e.target.files[0].name.replace(/\.py/, '');
    //   self.$projectName.val(filename);
    //   self.saveProjectName();
    // });
  };

  // Check for unsaved changes
  this.checkUnsaved = function (event) {
    if (blockly.unsaved || filesManager.unsaved) {
      event.preventDefault();
      event.returnValue = '';
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

  // Display what's new if not seen before
  this.showWhatsNew = function(forceShow=false) {
    let current = 20220821;
    let lastShown = localStorage.getItem('whatsNew');
    if (lastShown == null || parseInt(lastShown) < current || forceShow) {
      let options = {
        title: 'What\'s New',
        message:
        '<h3>31 Dec 2022 (MQTT)</h3>' +
        '<p>WiFi and MQTT blocks and modules are now available.</p>' +
        '<p>When using MQTT, be sure to call "Check for message" frequently in a loop to keep the connection alive.</p>'
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
