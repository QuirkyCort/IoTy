var pythonPanel = new function() {
  var self = this;

  this.ignoreChange = 0;

  // Run on page load
  this.init = function() {
    self.$pythonCode = $('#pythonCode');

    self.loadPythonEditor();
  };

  // Increase font size
  this.zoomIn = function() {
    let currentSize = parseFloat(self.$pythonCode.css('font-size'));
    self.$pythonCode.css('font-size', currentSize * 1.25);
  };

  // Decrease font size
  this.zoomOut = function() {
    let currentSize = parseFloat(self.$pythonCode.css('font-size'));
    self.$pythonCode.css('font-size', currentSize * 0.8);
  };

  // Reset font size
  this.zoomReset = function() {
    self.$pythonCode.css('font-size', '120%');
  };

  // Runs when panel is made active
  this.onActive = function() {
    if (filesManager.modified == false) {
      self.loadPythonFromBlockly();
    }
    self.$pythonCode.removeClass('hide');
  };

  // Run when panel is inactive
  this.onInActive = function() {
    self.$pythonCode.addClass('hide');
  };

  // Load ace editor
  this.loadPythonEditor = function() {
    let langTools = ace.require("ace/ext/language_tools");
    self.editor = ace.edit('pythonCode');
    self.editor.setTheme('ace/theme/monokai');
    self.editor.session.setMode('ace/mode/python');
    self.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: false,
      enableLiveAutocompletion: true
    });

    var staticWordCompleter = {
      getCompletions: function(editor, session, pos, prefix, callback) {
        var wordList = [];
        var list = wordList.map(function(word) {
          return {
            caption: word,
            value: word,
            meta: 'method'
          };
        })
        callback(null, list);
      }
    };
    langTools.addCompleter(staticWordCompleter);

    self.editor.on('change', self.warnModify);
  };

  // Warn when changing python code
  this.warnModify = function() {
    if (self.ignoreChange > 0) {
      return;
    }
    filesManager.unsaved = true;

    if (! filesManager.modified) {
      acknowledgeDialog({
        title: i18n.get('#python-warning#'),
        message: i18n.get('#python-cannot_change_back_warning#')
      });
      filesManager.modified = true;
    }
  };

  // Load Python code from blockly
  this.loadPythonFromBlockly = async function() {
    self.ignoreChange++;
    filesManager.setToDefault();
    await extensions.processExtensions();
    filesManager.select('main.py');
    let code = blockly.generator.genCode();
    self.editor.setValue(code, 1);
    self.ignoreChange--;
  };
}

// Init class
pythonPanel.init();