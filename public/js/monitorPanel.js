var monitorPanel = new function() {
  var self = this;

  // Run on page load
  this.init = function() {
    self.$display = $('#monitorDisplay');
    self.$input = $('#monitorInput');
    self.$send = $('#monitorSend');

    self.updateTextLanguage();
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
    // self.$pythonCode.css('font-size', '120%');
  };

  // Update text already in html
  this.updateTextLanguage = function() {
    // self.$save.text(i18n.get('#python-save#'));
  };

  // Runs when panel is made active
  this.onActive = function() {
    // self.$pythonCode.removeClass('hide');
  };

  // Run when panel is inactive
  this.onInActive = function() {
    // self.$pythonCode.addClass('hide');
  };
}

// Init class
monitorPanel.init();