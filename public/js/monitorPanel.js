var monitorPanel = new function() {
  var self = this;

  self.history = [];
  self.currentCmd = '';
  self.historyPos = -1;

  // Run on page load
  this.init = function() {
    self.$display = $('#monitorDisplay');
    self.$input = $('#monitorInput');
    self.$send = $('#monitorSend');
    self.$abort = $('#monitorAbort');
    self.$clear = $('#monitorClear');

    self.$clear.click(self.clearDisplay);
    self.$send.click(self.sendAndClear);
    self.$abort.click(self.sendAbort);
    self.$input[0].onkeydown = self.handleKeyEvents;

    self.updateTextLanguage();

    self.needScrolling = false;
    setInterval(self.scrollText, 100);
  };

  this.appendText = function(text) {
    let display = self.$display[0];
    display.textContent += text;
    self.needScrolling = true;
  };

  this.scrollText = function() {
    if (self.needScrolling) {
      let display = self.$display[0];
      display.scrollTop = display.scrollHeight - display.clientHeight
      self.needScrolling = false;
  }
  }

  this.setText = function(text) {
    let display = self.$display[0];
    display.innerText = text;
    display.scrollTop = display.scrollHeight - display.clientHeight
  };

  this.clearDisplay = function(text) {
    self.setText('');
  };

  this.handleKeyEvents = function(event) {
    if(event.key === 'Enter') {
      self.sendAndClear();

    } else if (event.key == 'ArrowUp') {
      if (self.historyPos == -1) {
        this.currentCmd = self.$input.val();
        self.historyPos = self.history.length - 1;
      } else if (self.historyPos > 0) {
        self.historyPos -= 1;
      }
      if (self.historyPos >= 0) {
        self.$input.val(self.history[self.historyPos]);
      }

    } else if (event.key == 'ArrowDown') {
      if (self.historyPos >= 0) {
        self.historyPos += 1;
      }
      if (self.historyPos >= self.history.length) {
        self.historyPos = -1;
      }
      if (self.historyPos == -1) {
        self.$input.val(this.currentCmd);
      } else {
        self.$input.val(self.history[self.historyPos]);
      }
    }
  };

  this.sendAndClear = function() {
    if (self.$input.val() != self.history[self.history.length - 1]) {
      self.history.push(self.$input.val());
    }
    self.historyPos = -1;
    self.sendInput();
    self.clearInput();
  };

  this.sendInput = function() {
    let interface = main.getInterface();
    let text = self.$input.val();
    if (typeof interface.sendSerial == 'function') {
      interface.sendSerial(text);
    }
  };

  this.clearInput = function() {
    self.$input.val('');
  };

  this.sendAbort = function() {
    let interface = main.getInterface();
    if (typeof interface.sendAbort == 'function') {
      interface.sendAbort();
    }
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