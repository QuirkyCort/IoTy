var monitorPanel = new function() {
  var self = this;

  // Run on page load
  this.init = function() {
    self.$display = $('#monitorDisplay');
    self.$input = $('#monitorInput');
    self.$send = $('#monitorSend');
    self.$clear = $('#monitorClear');

    self.$clear.click(self.clearDisplay);
    self.$send.click(self.sendInput);
    self.$input[0].onkeydown = self.sendOnEnter;

    self.updateTextLanguage();
  };

  this.appendText = function(text) {
    let display = self.$display[0];
    display.innerText += text;
    display.scrollTop = display.scrollHeight - display.clientHeight
  };

  this.setText = function(text) {
    let display = self.$display[0];
    display.innerText = text;
    display.scrollTop = display.scrollHeight - display.clientHeight
  };

  this.clearDisplay = function(text) {
    self.setText('');
  };

  this.sendOnEnter = function(event) {
    if(event.key === 'Enter') {
      self.sendInput();
      self.clearInput();
    }
  };

  this.sendInput = function() {
    let text = self.$input.val();
    ble.sendSerial(text);
  };

  this.clearInput = function() {
    self.$input.val('');
  };

  // Update text already in html
  this.updateTextLanguage = function() {
    self.$send.text(i18n.get('#monitor-send#'));
    self.$clear.text(i18n.get('#monitor-clear#'));
  };

  // Runs when panel is made active
  this.onActive = function() {
  };

  // Run when panel is inactive
  this.onInActive = function() {
  };
}

// Init class
monitorPanel.init();