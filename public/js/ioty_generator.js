var ioty_generator = new function() {
  var self = this;

  this.MQTT_CALLBACK_PLACEHOLDER = '# MQTT Callback Placeholder; you should not see this! #\n';
  this.MQTT_SUBSCRIPTION_PLACEHOLDER = '# MQTT Subscription Placeholder; you should not see this! #\n';

  // Load Python generators
  this.load = function() {
    Blockly.Python.addReservedWords('ioty_wifi,ioty_mqtt,ioty_mqtt_cb,i2c');

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
    Blockly.Python['neopixel_color'] = self.neopixel_color;
    Blockly.Python['neopixel_rgb'] = self.neopixel_rgb;
    Blockly.Python['neopixel_rgbw'] = self.neopixel_rgbw;
    Blockly.Python['neopixel_hsv'] = self.neopixel_hsv;
    Blockly.Python['neopixel_set'] = self.neopixel_set;
    Blockly.Python['neopixel_fill'] = self.neopixel_fill;
    Blockly.Python['neopixel_write'] = self.neopixel_write;
    Blockly.Python['servo_write_deg'] = self.servo_write_deg;
    Blockly.Python['servo_write_us'] = self.servo_write_us;
    Blockly.Python['hc_sr04_ping'] = self.hc_sr04_ping;
    Blockly.Python['connect_to_wifi'] = self.connect_to_wifi;
    Blockly.Python['mqtt_connect_to_server'] = self.mqtt_connect_to_server;
    Blockly.Python['mqtt_wait_msg'] = self.mqtt_wait_msg;
    Blockly.Python['mqtt_check_msg'] = self.mqtt_check_msg;
    Blockly.Python['mqtt_on_receive'] = self.mqtt_on_receive;
    Blockly.Python['mqtt_msg'] = self.mqtt_msg;
    Blockly.Python['mqtt_publish'] = self.mqtt_publish;
    Blockly.Python['i2c_init'] = self.i2c_init;
    Blockly.Python['i2c_scan'] = self.i2c_scan;
    Blockly.Python['i2c_writeto_mem'] = self.i2c_writeto_mem;
    Blockly.Python['i2c_readfrom_mem'] = self.i2c_readfrom_mem;
    Blockly.Python['i2c_writeto'] = self.i2c_writeto;
    Blockly.Python['i2c_readfrom'] = self.i2c_readfrom;

  };

  // Generate python code
  this.genCode = function() {
    self.imports = {};
    self.iotyImports = {};
    self.mqttSubscriptions = {};
    self.startType = 'RUN';

    let workspaceCode = Blockly.Python.workspaceToCode(blockly.workspace);

    workspaceCode = self._mqttCBSubstitution(workspaceCode);
    workspaceCode = self._mqttSubscriptionSubstitution(workspaceCode);

    let code = '';

    if (self.startType == 'RUN') {
      code += 'import ioty.monitor\n';
    } else if (self.startType == 'WAIT') {
      code +=
        'import ioty.monitor\n' +
        'ioty.monitor.wait_for_connection()\n\n';
    }

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

  this._mqttCBSubstitution = function(code) {
    let placeholderRegexStr = '([^\S\r\n]*)' + self.MQTT_CALLBACK_PLACEHOLDER;
    let placeholderRegexG = new RegExp(placeholderRegexStr, 'g');
    let placeholderRegex = new RegExp(placeholderRegexStr);

    let matches = code.matchAll(placeholderRegexG);
    for (let match of matches) {
      let spaces = match[1];
      let first = true;
      let replacementCode = '';

      if (Object.keys(self.mqttSubscriptions).length == 0) {
        replacementCode = spaces + 'pass\n';
      }
      for (let key in self.mqttSubscriptions) {
        let cb = self.mqttSubscriptions[key];
        let functionName = 'ioty_mqtt_cb_' + cb.replaceAll(/\W*/g, '');
        if (first) {
          first = false;
          replacementCode += spaces + 'if ';
        } else {
          replacementCode += spaces + 'elif ';
        }

        replacementCode += 'topic == b\'' + cb + '\':\n';
        replacementCode += spaces + '    ' + functionName + '(msg.decode())\n';
      }
      code = code.replace(placeholderRegex, replacementCode);
    }

    return code;
  }

  this._mqttSubscriptionSubstitution = function(code) {
    let placeholderRegexStr = '([^\S\r\n]*)' + self.MQTT_SUBSCRIPTION_PLACEHOLDER;
    let placeholderRegexG = new RegExp(placeholderRegexStr, 'g');
    let placeholderRegex = new RegExp(placeholderRegexStr);

    let matches = code.matchAll(placeholderRegexG);
    for (let match of matches) {
      let spaces = match[1];
      let first = true;
      let replacementCode = '';

      for (let key in self.mqttSubscriptions) {
        let topic = self.mqttSubscriptions[key];
        replacementCode += 'ioty_mqtt.subscribe(b\'' + topic + '\')\n';
      }
      code = code.replace(placeholderRegex, replacementCode);
    }

    return code;
  }

  //
  // Python Generators
  //

  // Start
  this.when_started = function(block) {
    var start_type = block.getFieldValue('start_type');

    self.startType = start_type;

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

  this.neopixel_color = function(block) {
    var color = block.getFieldValue('color');

    var code = color;

    return [code, Blockly.Python.ORDER_COLLECTION];
  };

  this.neopixel_rgb = function(block) {
    var red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
    var green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
    var blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);

    var code = '(' + red + ', ' + green + ', ' + blue + ')';

    return [code, Blockly.Python.ORDER_COLLECTION];
  };

  this.neopixel_rgbw = function(block) {
    var red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
    var green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
    var blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);
    var white = Blockly.Python.valueToCode(block, 'white', Blockly.Python.ORDER_ATOMIC);

    var code = '(' + red + ', ' + green + ', ' + blue + ', ' + white + ')';

    return [code, Blockly.Python.ORDER_COLLECTION];
  };

  this.neopixel_hsv = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var hue = Blockly.Python.valueToCode(block, 'hue', Blockly.Python.ORDER_ATOMIC);
    var saturation = Blockly.Python.valueToCode(block, 'saturation', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.hsv2rgb(' + hue + ', ' + saturation + ', ' + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.neopixel_set = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var pixel = Blockly.Python.valueToCode(block, 'pixel', Blockly.Python.ORDER_NONE);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'neopixel.set(' + pin + ', ' + pixel + ', ' + color + ')\n';

    return code;
  };

  this.neopixel_fill = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'neopixel.fill(' + pin + ', ' + color + ')\n';

    return code;
  };

  this.neopixel_write = function(block) {
    self.iotyImports['neopixel'] = 'neopixel';

    var pin = block.getFieldValue('pin');

    var code = 'neopixel.write(' + pin + ')\n';

    return code;
  };

  this.servo_write_deg = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');
    var deg = Blockly.Python.valueToCode(block, 'deg', Blockly.Python.ORDER_NONE);

    var code = 'pin.servo_write_deg(' + pin + ', ' + deg + ')\n';

    return code;
  };

  this.servo_write_us = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');
    var us = Blockly.Python.valueToCode(block, 'us', Blockly.Python.ORDER_NONE);

    var code = 'pin.servo_write_us(' + pin + ', ' + us + ')\n';

    return code;
  };

  this.hc_sr04_ping = function(block) {
    self.iotyImports['pin'] = 'pin';

    var trig = block.getFieldValue('trig');
    var echo = block.getFieldValue('echo');
    var unit = block.getFieldValue('unit');

    var code;
    if (unit == 'CM') {
      code = 'pin.hc_sr04_ping_cm(';
    } else if (unit == 'US') {
      code = 'pin.hc_sr04_ping_us(';
    }

    code += trig + ', ' + echo + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.connect_to_wifi = function(block) {
    self.imports['network'] = 'import network';

    var ssid = block.getFieldValue('ssid');
    var password = block.getFieldValue('password');

    var code =
      '\n# Connect to WiFi\n' +
      'ioty_wifi = network.WLAN(network.STA_IF)\n' +
      'ioty_wifi.active(True)\n' +
      'ioty_wifi.connect(\'' + ssid + '\', \'' + password + '\')\n' +
      'while not ioty_wifi.isconnected():\n' +
      '    pass\n' +
      '# Done: Connect to WiFi\n\n';

      return code;
  };

  this.mqtt_connect_to_server = function(block) {
    self.imports['umqtt'] = 'from umqtt.robust import MQTTClient';
    self.imports['machine'] = 'import machine';
    self.imports['ubinascii'] = 'import ubinascii';

    var server = block.getFieldValue('server');
    var port = block.getFieldValue('port');
    var name = block.getFieldValue('name');
    var password = block.getFieldValue('password');

    var code =
      '\n# MQTT callback\n' +
      'def ioty_mqtt_cb(topic, msg):\n' +
      '    ' + self.MQTT_CALLBACK_PLACEHOLDER +
      '\n# Connect to MQTT server\n' +
      'ioty_mqtt = MQTTClient(' +
        'ubinascii.hexlify(machine.unique_id()), \'' + server + '\'' +
        ', port=' + port +
        ', user=\'' + name + '\'' +
        ', password=\'' + password + '\'' +
        ', keepalive=60)\n' +
      'ioty_mqtt.set_callback(ioty_mqtt_cb)\n' +
      'ioty_mqtt.connect()\n' +
      self.MQTT_SUBSCRIPTION_PLACEHOLDER +
      '# Done: Connect to MQTT server\n\n';

      return code;
  };

  this.mqtt_wait_msg = function(block) {
    var code = 'ioty_mqtt.wait_msg()\n';

    return code;
  };

  this.mqtt_check_msg = function(block) {
    var code = 'ioty_mqtt.check_msg()\n';

    return code;
  };

  this.mqtt_on_receive = function(block) {
    // First, add a 'global' statement for every variable that is not shadowed by
    // a local parameter.
    const globals = [];
    const workspace = blockly.workspace;
    const usedVariables = Blockly.Variables.allUsedVarModels(workspace) || [];
    for (let i = 0, variable; (variable = usedVariables[i]); i++) {
      const varName = variable.name;
      if (block.getVars().indexOf(varName) === -1) {
        globals.push(Blockly.Python.nameDB_.getName(varName, Blockly.Names.NameType.VARIABLE));
      }
    }
    // Add developer variables.
    const devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (let i = 0; i < devVarList.length; i++) {
      globals.push(
          Blockly.Python.nameDB_.getName(devVarList[i], Blockly.Names.NameType.DEVELOPER_VARIABLE));
    }
    const globalString = globals.length ?
      Blockly.Python.INDENT + 'global ' + globals.join(', ') + '\n' :
      '';

    // Usual stuff
    var topic = block.getFieldValue('topic');
    var statements = Blockly.Python.statementToCode(block, 'statements');

    self.mqttSubscriptions[topic] = topic;

    let functionName = 'ioty_mqtt_cb_' + topic.replaceAll(/\W*/g, '');

    var code =
      '\n# MQTT callback for topic ' + topic + '\n' +
      'def ' + functionName + '(mqtt_msg):\n'
      + globalString;

    code += statements;

    Blockly.Python.definitions_[functionName] = code;

    return null;
  };

  this.mqtt_msg = function(block) {
    code = 'mqtt_msg';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mqtt_publish = function(block) {
    var topic = block.getFieldValue('topic');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    var code = 'ioty_mqtt.publish(b\'' + topic + '\', bytes(' + value + ', \'utf-8\'))\n'

    return code;
  };

  this.i2c_init = function(block) {
    self.imports['machine'] = 'import machine';

    var id = block.getFieldValue('id');
    var freq = block.getFieldValue('freq');

    var code = 'i2c = machine.I2C(' + id + ', freq=' + freq + ')\n';

    return code;
  };

  this.i2c_scan = function(block) {
    var code = 'i2c.scan()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.i2c_writeto_mem = function(block) {
    self.imports['struct'] = 'import struct';

    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var register = Blockly.Python.valueToCode(block, 'register', Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');

    var code = 'i2c.writeto_mem(' + address + ', ' + register + ', struct.pack(\'' + format + '\', ' + value + '))\n';

    return code;
  };

  this.i2c_readfrom_mem = function(block) {
    self.imports['struct'] = 'import struct';

    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var register = Blockly.Python.valueToCode(block, 'register', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');

    let formatLower = format.toLowerCase();

    let size = 1;
    if (formatLower.includes('b')) {
      size = 1;
    } else if (formatLower.includes('h')) {
      size = 2;
    } else if (formatLower.includes('i') || formatLower.includes('f')) {
      size = 4;
    } else if (formatLower.includes('d')) {
      size = 8;
    }

    var code = 'struct.unpack(\'' + format + '\', i2c.readfrom_mem(' + address + ', ' + register + ', ' + size + '))';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.i2c_writeto = function(block) {
    self.imports['struct'] = 'import struct';

    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');
    var stop = block.getFieldValue('stop');

    let stopParam = '';
    if (stop != 'STOP') {
      stopParam = ', stop=False';
    }

    var code = 'i2c.writeto(' + address + ', struct.pack(\'' + format + '\', ' + value + ')' + stopParam + ')\n';

    return code;
  };

  this.i2c_readfrom = function(block) {
    self.imports['struct'] = 'import struct';

    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');
    var stop = block.getFieldValue('stop');

    let stopParam = '';
    if (stop != 'STOP') {
      stopParam = ', stop=False';
    }

    let formatLower = format.toLowerCase();

    let size = 1;
    if (formatLower.includes('b')) {
      size = 1;
    } else if (formatLower.includes('h')) {
      size = 2;
    } else if (formatLower.includes('i') || formatLower.includes('f')) {
      size = 4;
    } else if (formatLower.includes('d')) {
      size = 8;
    }

    var code = 'struct.unpack(\'' + format + '\', i2c.readfrom(' + address + ', ' + size + stopParam + '))';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };


}

