var ioty_generator = new function() {
  var self = this;

  // Load Python generators
  this.load = function() {
    Blockly.Python.INDENT = '    ';

    Blockly.Python['when_started'] = self.when_started;
    Blockly.Python['set_pin_mode'] = self.set_pin_mode;
    Blockly.Python['digital_read_pin'] = self.digital_read_pin;
    Blockly.Python['digital_write_pin'] = self.digital_write_pin;
    Blockly.Python['set_analog_reader'] = self.set_analog_reader;
    Blockly.Python['analog_read_pin'] = self.analog_read_pin;
    Blockly.Python['set_analog_writer'] = self.set_analog_writer;
    Blockly.Python['analog_write_pin'] = self.analog_write_pin;
    Blockly.Python['comment'] = self.comment;
    Blockly.Python['sleep'] = self.sleep;
    Blockly.Python['wait_until_connected'] = self.wait_until_connected;
    Blockly.Python['time'] = self.time;
    Blockly.Python['exit'] = self.exit;
    Blockly.Python['read_input'] = self.read_input;
  };

  // Generate python code
  this.genCode = function() {
    self.imports = {};
    self.analogPins = {};

    let workspaceCode = Blockly.Python.workspaceToCode(blockly.workspace);

    let code = 'import _ioty_monitor\n';
    for (let key in self.imports) {
      code += self.imports[key] + '\n';
    }
    code += '\n';

    code += workspaceCode;

    return code
  };

  //
  // Python Generators
  //

  // Start
  this.when_started = function(block) {
    var code = '';
    return code;
  };

  this.set_pin_mode = function(block) {
    self.imports['machine'] = 'import machine';

    var pin = block.getFieldValue('pin');
    var mode = block.getFieldValue('mode');

    if (mode == 'INPUT') {
      mode = 'machine.Pin.IN';
    } else if (mode == 'INPUT_PULLUP') {
      mode = 'machine.Pin.IN, machine.Pin.PULL_UP';
    } else if (mode == 'OUTPUT') {
      mode = 'machine.Pin.OUT';
    }

    var code = 'machine.Pin(' + pin + ', ' + mode + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.digital_read_pin = function(block) {
    self.imports['machine'] = 'import machine';

    var pin = Blockly.Python.nameDB_.getName(block.getFieldValue('pin'), Blockly.Names.NameType.VARIABLE);

    var code = pin + '.value()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.digital_write_pin = function(block) {
    self.imports['machine'] = 'import machine';

    var pin = Blockly.Python.nameDB_.getName(block.getFieldValue('pin'), Blockly.Names.NameType.VARIABLE);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = pin + '.value(' + value + ')\n';

    return code;
  };

  this.set_analog_reader = function(block) {
    self.imports['machine'] = 'import machine';

    var pin = block.getFieldValue('pin');

    var code = 'machine.ADC(machine.Pin(' + pin + '))';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.analog_read_pin = function(block) {
    self.imports['machine'] = 'import machine';

    var pin = Blockly.Python.nameDB_.getName(block.getFieldValue('pin'), Blockly.Names.NameType.VARIABLE);
    var units = block.getFieldValue('units');

    if (units == 'U16') {
      units = '.read_u16()';
    } else if (units == 'MICROVOLTS') {
      units = '.read_uv()';
    }

    var code = pin + units;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.set_analog_writer = function(block) {
    self.imports['machine'] = 'import machine';

    var pin = block.getFieldValue('pin');
    var frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_ATOMIC);

    var code = 'machine.PWM(machine.Pin(' + pin + '), freq=' + frequency + ', duty=0)';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.analog_write_pin = function(block) {
    self.imports['machine'] = 'import machine';

    var pin = Blockly.Python.nameDB_.getName(block.getFieldValue('pin'), Blockly.Names.NameType.VARIABLE);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = pin + '.duty(' + value + ')\n';

    return code;
  };

  this.comment = function(block) {
    self.imports['time'] = 'import time';

    var value = block.getFieldValue('value');

    var code = '\n# ' + value + '\n\n';

    return code;
  };

  this.sleep = function(block) {
    self.imports['time'] = 'import time';

    var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
    var units = block.getFieldValue('units');

    if (units == 'SECONDS') {
      units = 'sleep(';
    } else if (units == 'MILLISECONDS') {
      units = 'sleep_ms(';
    } else if (units == 'MICROSECONDS') {
      units = 'sleep_us(';
    }

    var code = 'time.' + units + duration + ')\n';

    return code;
  };

  this.wait_until_connected = function(block) {
    var code = '_ioty_monitor.wait_for_connection()\n';

    return code;
  };

  this.time = function(block) {
    self.imports['time'] = 'import time';

    var units = block.getFieldValue('units');

    if (units == 'MILLI') {
      units = 'ticks_ms()';
    } else if (units == 'MICRO') {
      units = 'ticks_us()';
    }

    var code = 'time.' + units;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.exit = function(block) {
    self.imports['sys'] = 'import sys';

    var code = 'sys.exit()\n';

    return code;
  };

  this.read_input = function(block) {
    var prompt = Blockly.Python.valueToCode(block, 'prompt', Blockly.Python.ORDER_ATOMIC);

    var code = 'input(' + prompt + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

}

