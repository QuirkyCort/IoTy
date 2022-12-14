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
    return fetch('toolbox.xml?v=95062a90')
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

  // Load default workspace
  this.loadDefaultWorkspace = function() {
    let xmlText =
      '<xml xmlns="https://developers.google.com/blockly/xml">' +
        '<block type="when_started" id="Q!^ZqS4/(a/0XL$cIi-~" x="63" y="38" deletable="false"><data>Main</data></block>' +
      '</xml>';
    self.loadXmlText(xmlText);
  };

  // Load custom blocks
  this.loadCustomBlocks = function() {
    return fetch('customBlocks.json?v=86be3e48')
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

  // get xmlText
  this.getXmlText = function() {
    var xml = Blockly.Xml.workspaceToDom(self.workspace);
    return Blockly.Xml.domToText(xml);
  };

  // Save to local storage
  this.saveLocalStorage = function() {
    if (self.workspace && self.unsaved) {
      self.unsaved = false;
      blocklyPanel.hideSave();
      localStorage.setItem('blocklyXML', self.getXmlText());
    }
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
    self.loadXmlText(localStorage.getItem('blocklyXML'));
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

