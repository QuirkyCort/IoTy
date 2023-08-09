var blockly = new function() {
  var self = this;

  self.theme = Blockly.Theme.defineTheme('customTheme', {
    'base': Blockly.Themes.Classic,
    'startHats': true
  });

  var options = {
    toolbox : null,
    zoom: {
      controls: true
    },
    move: {
      wheel: true
    },
    renderer: 'geras',
    collapse : true,
    comments : true,
    disable : true,
    maxBlocks : Infinity,
    maxInstances: {
      'when_started': 1
    },
    trashcan : false,
    horizontalLayout : false,
    toolboxPosition : 'start',
    css : true,
    media : 'blockly-9.0.0/media/',
    rtl : RTL,
    scrollbars : true,
    sounds : true,
    oneBasedIndex : false,
    theme: self.theme
  };

  this.unsaved = false;
  this.generator = ioty_generator;

  // Run on page load
  this.init = function() {
    const script = document.createElement('script');
    script.src = 'blockly-9.0.0/msg/js/' + LANG + '.js';
    script.addEventListener('load', function() {
      self.loadCustomBlocks()
        .then(self.loadToolBox)
        .then(self.generator.load());
      Blockly.Python['math_change'] = self.math_change;

    });
    document.head.appendChild(script);
  };

  // Load toolbox
  this.loadToolBox = function() {
    return fetch('toolbox.xml?v=f6ebc48d')
      .then(response => response.text())
      .then(function(response) {
        response = i18n.replace(response);
        self.toolboxXml = (new DOMParser()).parseFromString(response, "text/xml");
        options.toolbox = self.toolboxXml.getElementById('toolbox');
        self.workspace = Blockly.inject('blocklyDiv', options);

        self.loadDefaultWorkspace();

        self.workspace.addChangeListener(Blockly.Events.disableOrphans);
        // self.loadLocalStorage();
        setTimeout(self.loadLocalStorage, 200);
        setTimeout(function(){
          self.workspace.addChangeListener(self.checkModified);
        }, 1000);
      });
  };

  // Prevent deletion of when_started block
  this.preventWhenStartedDelete = function() {
    let whenStarted = blockly.workspace.getBlocksByType('when_started');
    if (whenStarted.length > 0) {
      whenStarted[0].setDeletable(false);
    }
  };

  // Load default workspace
  this.loadDefaultWorkspace = function() {
    let jsonText = '{"blocks":{"languageVersion":0,"blocks":[{"type":"when_started","id":"Q!^ZqS4/(a/0XL$cIi-~","x":63,"y":38,"fields":{"start_type":"RUN"}}]}}';
    self.loadJsonText(jsonText);
    self.unsaved = true;
  };

  // Load custom blocks
  this.loadCustomBlocks = function() {
    return fetch('customBlocks.json?v=6b23a9a1')
      .then(response => response.text())
      .then(function(response) {
        let json = JSON.parse(i18n.replace(response));
        Blockly.defineBlocksWithJsonArray(json);
      });
  };

  // Mark workspace as unsaved
  this.checkModified = function(e) {
    if (e.type != Blockly.Events.UI) {
      self.unsaved = true;
      blocklyPanel.showSave();
    }
  };

  // get json
  this.getJsonText = function() {
    let obj = Blockly.serialization.workspaces.save(self.workspace)
    return JSON.stringify(obj);
  };

  // Save to local storage
  this.saveLocalStorage = function() {
    if (self.workspace && self.unsaved) {
      self.unsaved = false;
      blocklyPanel.hideSave();
      localStorage.setItem('iotyBlocklyJson', self.getJsonText());
    }
  };

  // load jsonText to workspace
  this.loadJsonText = function(jsonText) {
    let oldJsonText = self.getJsonText();
    if (jsonText) {
      try {
        let obj = JSON.parse(jsonText);
        self.workspace.clear();
        Blockly.serialization.workspaces.load(obj, self.workspace);
      }
      catch (err) {
        console.log(err);
        if (err.name == 'Error') {
          toastMsg('Invalid Blocks');
          self.loadJsonText(oldJsonText);
        }
      }
      self.preventWhenStartedDelete();
    }
  };

  // get xmlText
  this.getXmlText = function() {
    var xml = Blockly.Xml.workspaceToDom(self.workspace);
    return Blockly.Xml.domToText(xml);
  };

  // load xmlText to workspace
  this.loadXmlText = function(xmlText) {
    let oldXmlText = self.getXmlText();
    if (xmlText) {
      try {
        let dom = Blockly.Xml.textToDom(xmlText);
        self.workspace.clear();
        Blockly.Xml.domToWorkspace(dom, self.workspace);

        let pages = [];
        self.workspace.getAllBlocks().forEach(function(block){
          if (pages.indexOf(block.data) == -1) {
            pages.push(block.data);
          }
        });
        blocklyPanel.loadPagesOptions(pages);
      }
      catch (err) {
        console.log(err);
        if (err.name == 'Error') {
          toastMsg('Invalid Blocks');
          self.loadXmlText(oldXmlText);
        }
      }
    }
  };

  // Load from local storage
  this.loadLocalStorage = function() {
    if (localStorage.getItem('iotyBlocklyJson') != null) {
      self.loadJsonText(localStorage.getItem('iotyBlocklyJson'));
    } else {
      self.loadXmlText(localStorage.getItem('iotyBlocklyXML'));
    }
  };

  // Clear all blocks from displayed workspace
  this.clearworkspace = function() {
    self.workspace.clear();
  };

  // Delete all blocks in page
  this.deleteAllInPage = function(page) {
    let blocks = self.workspace.getAllBlocks();
    blocks.forEach(function(block){
      if (block.data == page) {
        block.data = '';
        block.dispose();
      }
    });
    self.unsaved = true;
    blocklyPanel.showSave();
  };

  //
  // Special generators
  //
  this.math_change = function(block) {
    var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
        Blockly.Python.ORDER_ADDITIVE) || '0';
    var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'),
        Blockly.VARIABLE_CATEGORY_NAME);
    return varName + ' += ' + argument0 + '\n';
  };
}

