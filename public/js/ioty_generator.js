var ioty_generator = new function() {
  var self = this;

  // Load Python generators
  this.load = function() {
    Blockly.Python.INDENT = '    ';

    Blockly.Python['when_started'] = self.when_started;
    Blockly.Python['set_pin_mode'] = self.set_pin_mode;
    Blockly.Python['digital_read_pin'] = self.digital_read_pin;
    Blockly.Python['digital_write_pin'] = self.digital_write_pin;
    Blockly.Python['analog_read_pin'] = self.analog_read_pin;
    Blockly.Python['set_analog_write_freq'] = self.set_analog_write_freq;
    Blockly.Python['analog_write_pin'] = self.analog_write_pin;
    Blockly.Python['comment'] = self.comment;
    Blockly.Python['sleep'] = self.sleep;
    Blockly.Python['wait_until_connected'] = self.wait_until_connected;
    Blockly.Python['time'] = self.time;
    Blockly.Python['exit'] = self.exit;
    Blockly.Python['read_input'] = self.read_input;
    Blockly.Python['type_cast'] = self.type_cast;
    Blockly.Python['neopixel_init'] = self.neopixel_init;
    Blockly.Python['neopixel_set_rgb'] = self.neopixel_set_rgb;
    Blockly.Python['neopixel_set_rgbw'] = self.neopixel_set_rgbw;
    Blockly.Python['neopixel_set_hsv'] = self.neopixel_set_hsv;
    Blockly.Python['neopixel_fill_rgb'] = self.neopixel_fill_rgb;
    Blockly.Python['neopixel_fill_rgbw'] = self.neopixel_fill_rgbw;
    Blockly.Python['neopixel_fill_hsv'] = self.neopixel_fill_hsv;
    Blockly.Python['neopixel_write'] = self.neopixel_write;
  };

  // Generate python code
  this.genCode = function() {
    self.imports = {};
    self.iotyImports = {};

    let workspaceCode = Blockly.Python.workspaceToCode(blockly.workspace);

    let code = 'import ioty.monitor\n';
    for (let key in self.imports) {
      code += self.imports[key] + '\n';
    }

    if (Object.keys(self.iotyImports).length > 0) {
      let iotyImportCode = 'from ioty import ';
      for (let key in self.iotyImports) {
        iotyImportCode += key + ', ';
      }
      iotyImportCode = iotyImportCode.slice(0, -2);
      code += iotyImportCode + '\n';
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
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');
    var mode = block.getFieldValue('mode');

    if (mode == 'INPUT') {
      mode = 'pin.IN';
    } else if (mode == 'INPUT_PULLUP') {
      mode = 'pin.PULL_UP';
    } else if (mode == 'OUTPUT') {
      mode = 'pin.OUT';
    }

    var code = 'pin.set_pin_mode(' + pin + ', ' + mode + ')\n';

    return code;
  };

  this.digital_read_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');

    var code = 'pin.digital_read(' + pin + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.digital_write_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pin.digital_write(' + pin + ', ' + value + ')\n';

    return code;
  };

  this.analog_read_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');

    var code = 'pin.analog_read(' + pin + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.set_analog_write_freq = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');
    var frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_NONE);

    var code = 'pin.set_analog_write_freq(' + pin + ', ' + frequency + ')\n';

    return code;
  };

  this.analog_write_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pin.analog_write(' + pin + ', ' + value + ')\n';

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
    var code = 'ioty.monitor.wait_for_connection()\n';

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

  this.type_cast = function(block) {
    var type = block.getFieldValue('type');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    if (type == 'INTEGER') {
      type = 'int(';
    } else if (type == 'FLOAT') {
      type = 'float(';
    } else if (type == 'STRING') {
      type = 'str(';
    }

    var code = type + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.neopixel_init = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var pixels = Blockly.Python.valueToCode(block, 'pixels', Blockly.Python.ORDER_ATOMIC);
    var format = block.getFieldValue('format');

    var code = 'neopixel.init(' + pin + ', ' + pixels + ', format=' + format + ')\n';

    return code;
  };

  this.neopixel_set_rgb = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var pixel = Blockly.Python.valueToCode(block, 'pixel', Blockly.Python.ORDER_ATOMIC);
    var red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
    var green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
    var blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.set_rgb(' + pin + ', ' + pixel + ', (' + red + ', ' + green + ', ' + blue + '))\n';

    return code;
  };

  this.neopixel_set_rgbw = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var pixel = Blockly.Python.valueToCode(block, 'pixel', Blockly.Python.ORDER_ATOMIC);
    var red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
    var green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
    var blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
    var white = Blockly.Python.valueToCode(block, 'white', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.set_rgbw(' + pin + ', ' + pixel + ', (' + red + ', ' + green + ', ' + blue + ', ' + white + '))\n';

    return code;
  };

  this.neopixel_set_hsv = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var pixel = Blockly.Python.valueToCode(block, 'pixel', Blockly.Python.ORDER_ATOMIC);
    var hue = Blockly.Python.valueToCode(block, 'hue', Blockly.Python.ORDER_ATOMIC);
    var saturation = Blockly.Python.valueToCode(block, 'saturation', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.set_hsv(' + pin + ', ' + pixel + ', (' + hue + ', ' + saturation + ', ' + value + '))\n';

    return code;
  };

  this.neopixel_fill_rgb = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
    var green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
    var blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.fill_rgb(' + pin + ', (' + red + ', ' + green + ', ' + blue + '))\n';

    return code;
  };

  this.neopixel_fill_rgbw = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
    var green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
    var blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
    var white = Blockly.Python.valueToCode(block, 'white', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.fill_rgbw(' + pin + ', (' + red + ', ' + green + ', ' + blue + ', ' + white + '))\n';

    return code;
  };

  this.neopixel_fill_hsv = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var hue = Blockly.Python.valueToCode(block, 'hue', Blockly.Python.ORDER_ATOMIC);
    var saturation = Blockly.Python.valueToCode(block, 'saturation', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.fill_hsv(' + pin + ', (' + hue + ', ' + saturation + ', ' + value + '))\n';

    return code;
  };

  this.neopixel_write = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');

    var code = 'neopixel.write(' + pin + ')\n';

    return code;
  };
}

