var ioty_generator = new function() {
  var self = this;

  this.MQTT_CALLBACK_PLACEHOLDER = '# MQTT Callback Placeholder; you should not see this! #\n';
  this.MQTT_SUBSCRIPTION_PLACEHOLDER = '# MQTT Subscription Placeholder; you should not see this! #\n';
  this.EZ_TIMER_CALLBACK_PLACEHOLDER = '# EZ Timer Callback Placeholder; you should not see this! #\n';

  // Load Python generators
  this.load = function() {
    Blockly.Python.addReservedWords('machine,ioty,ioty_wifi,ioty_mqtt,ioty_mqtt_cb,req');

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
    Blockly.Python['servo_write_deg'] = self.servo_write_deg;
    Blockly.Python['servo_write_us'] = self.servo_write_us;
    Blockly.Python['hc_sr04_ping'] = self.hc_sr04_ping;
    Blockly.Python['connect_to_wifi'] = self.connect_to_wifi;
    Blockly.Python['connect_to_configured_wifi'] = self.connect_to_configured_wifi;
    Blockly.Python['setBluetoothCmds'] = self.setBluetoothCmds;

    Blockly.Python['type_cast'] = self.type_cast;
    Blockly.Python['decode'] = self.decode;
    Blockly.Python['math_map'] = self.math_map;
    Blockly.Python['json_dumps'] = self.json_dumps;
    Blockly.Python['json_loads'] = self.json_loads;

    Blockly.Python['neopixel_init'] = self.neopixel_init;
    Blockly.Python['neopixel_color'] = self.neopixel_color;
    Blockly.Python['neopixel_rgb'] = self.neopixel_rgb;
    Blockly.Python['neopixel_rgbw'] = self.neopixel_rgbw;
    Blockly.Python['neopixel_hsv'] = self.neopixel_hsv;
    Blockly.Python['neopixel_set'] = self.neopixel_set;
    Blockly.Python['neopixel_fill'] = self.neopixel_fill;
    Blockly.Python['neopixel_write'] = self.neopixel_write;

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
    Blockly.Python.addReservedWords('i2c');

    Blockly.Python['date_time_get'] = self.date_time_get;
    Blockly.Python['date_time_set'] = self.date_time_set;
    Blockly.Python['date_time_set_ntp'] = self.date_time_set_ntp;
    Blockly.Python.addReservedWords('dateTime,ntptime');

    Blockly.Python['file_open'] = self.file_open;
    Blockly.Python['file_readline'] = self.file_readline;
    Blockly.Python['file_read'] = self.file_read;
    Blockly.Python['file_write'] = self.file_write;
    Blockly.Python['file_close'] = self.file_close;
    Blockly.Python['file_flush'] = self.file_flush;
    Blockly.Python['file_is_file'] = self.file_is_file;
    Blockly.Python['file_is_dir'] = self.file_is_dir;
    Blockly.Python.addReservedWords('is_file,is_dir');

    Blockly.Python['esp32_temperature'] = self.esp32_temperature;
    Blockly.Python['esp32_hall_sensor'] = self.esp32_hall_sensor;

    Blockly.Python['mpu6050_init'] = self.mpu6050_init;
    Blockly.Python['mpu6050_calibrate'] = self.mpu6050_calibrate;
    Blockly.Python['mpu6050_reset'] = self.mpu6050_reset;
    Blockly.Python['mpu6050_update'] = self.mpu6050_update;
    Blockly.Python['mpu6050_accel'] = self.mpu6050_accel;
    Blockly.Python['mpu6050_gyro'] = self.mpu6050_gyro;
    Blockly.Python['mpu6050_angle'] = self.mpu6050_angle;
    Blockly.Python.addReservedWords('mpu6050,MPU6050');

    Blockly.Python['pca9685_init'] = self.pca9685_init;
    Blockly.Python['pca9685_set_freq'] = self.pca9685_set_freq;
    Blockly.Python['pca9685_analog_write'] = self.pca9685_analog_write;
    Blockly.Python['pca9685_write_angle'] = self.pca9685_write_angle;
    Blockly.Python['pca9685_write_us'] = self.pca9685_write_us;
    Blockly.Python.addReservedWords('pca9685,PCA9685');

    Blockly.Python['ssd1306_init'] = self.ssd1306_init;
    Blockly.Python['ssd1306_init_sh1106'] = self.ssd1306_init_sh1106;
    Blockly.Python['ssd1306_fill'] = self.ssd1306_fill;
    Blockly.Python['ssd1306_show'] = self.ssd1306_show;
    Blockly.Python['ssd1306_text'] = self.ssd1306_text;
    Blockly.Python['ssd1306_pixel'] = self.ssd1306_pixel;
    Blockly.Python['ssd1306_line'] = self.ssd1306_line;
    Blockly.Python['ssd1306_rect'] = self.ssd1306_rect;
    Blockly.Python['ssd1306_ellipse'] = self.ssd1306_ellipse;
    Blockly.Python['ssd1306_scroll'] = self.ssd1306_scroll;
    Blockly.Python.addReservedWords('ssd1306,ssd1306_i2c');

    Blockly.Python['dict_empty'] = self.dict_empty;
    Blockly.Python['dict_key_value'] = self.dict_key_value;
    Blockly.Python['dict_set'] = self.dict_set;

    Blockly.Python['urequests_simple'] = self.urequests_simple_advance;
    Blockly.Python['urequests_advance'] = self.urequests_simple_advance;

    Blockly.Python['esp_now_init'] = self.esp_now_init;
    Blockly.Python['esp_now_add_peer'] = self.esp_now_add_peer;
    Blockly.Python['esp_now_remove_peer'] = self.esp_now_remove_peer;
    Blockly.Python['esp_now_send'] = self.esp_now_send;
    Blockly.Python['esp_now_get_msg'] = self.esp_now_get_msg;
    Blockly.Python['esp_now_msg_available'] = self.esp_now_msg_available;
    Blockly.Python.addReservedWords('esp_now');

    Blockly.Python['ez_esp_now_init'] = self.ez_esp_now_init;
    Blockly.Python['ez_esp_now_set_group'] = self.ez_esp_now_set_group
    Blockly.Python['ez_esp_now_send'] = self.ez_esp_now_send;
    Blockly.Python['ez_esp_now_get_msg'] = self.ez_esp_now_get_msg;
    Blockly.Python.addReservedWords('ez_espnow');

    Blockly.Python['ez_httpd_init'] = self.ez_httpd_init;
    Blockly.Python['ez_httpd_wait_for_connection'] = self.ez_httpd_wait_for_connection;
    Blockly.Python['ez_httpd_send_response'] = self.ez_httpd_send_response;
    Blockly.Python['ez_httpd_send_file'] = self.ez_httpd_send_file;
    Blockly.Python['ez_httpd_send_404'] = self.ez_httpd_send_404;
    Blockly.Python.addReservedWords('ez_httpd,ezhttpd');

    Blockly.Python['ucsv_reader'] = self.ucsv_reader;
    Blockly.Python['ucsv_writer'] = self.ucsv_writer;
    Blockly.Python['ucsv_readrow'] = self.ucsv_readrow;
    Blockly.Python['ucsv_writerow'] = self.ucsv_writerow;
    Blockly.Python['ucsv_flush'] = self.ucsv_flush;
    Blockly.Python['ucsv_close'] = self.ucsv_close;
    Blockly.Python.addReservedWords('ucsv');

    Blockly.Python['i2c_lcd_init'] = self.i2c_lcd_init;
    Blockly.Python['i2c_lcd_putstr'] = self.i2c_lcd_putstr;
    Blockly.Python['i2c_lcd_clear'] = self.i2c_lcd_clear;
    Blockly.Python['i2c_lcd_move_to'] = self.i2c_lcd_move_to;
    Blockly.Python['i2c_lcd_cursor'] = self.i2c_lcd_cursor;
    Blockly.Python['i2c_lcd_blink'] = self.i2c_lcd_blink;
    Blockly.Python['i2c_lcd_display'] = self.i2c_lcd_display;
    Blockly.Python['i2c_lcd_backlight'] = self.i2c_lcd_backlight;
    Blockly.Python.addReservedWords('i2c_lcd, lcd');

    Blockly.Python['dht_init'] = self.dht_init;
    Blockly.Python['dht_measure'] = self.dht_measure;
    Blockly.Python['dht_temperature'] = self.dht_temperature;
    Blockly.Python['dht_humidity'] = self.dht_humidity;
    Blockly.Python.addReservedWords('dht, dht_device');

    Blockly.Python['ez_ds18x20_init'] = self.ez_ds18x20_init;
    Blockly.Python['ez_ds18x20_device_count'] = self.ez_ds18x20_device_count;
    Blockly.Python['ez_ds18x20_convert_temp'] = self.ez_ds18x20_convert_temp;
    Blockly.Python['ez_ds18x20_read_temp'] = self.ez_ds18x20_read_temp;
    Blockly.Python.addReservedWords('ez_ds18x20, ds_device');

    Blockly.Python['non_block_init'] = self.non_block_init;
    Blockly.Python['non_block_read'] = self.non_block_read;
    Blockly.Python['non_block_readline'] = self.non_block_readline;
    Blockly.Python.addReservedWords('non_block, nblock');

    Blockly.Python['uart_init'] = self.uart_init;
    Blockly.Python['uart_any'] = self.uart_any;
    Blockly.Python['uart_read'] = self.uart_read;
    Blockly.Python['uart_readline'] = self.uart_readline;
    Blockly.Python['uart_write'] = self.uart_write;
    Blockly.Python['uart_flush'] = self.uart_flush;
    Blockly.Python.addReservedWords('uart1, uart2');

    Blockly.Python['gps_init'] = self.gps_init;
    Blockly.Python['gps_update'] = self.gps_update;
    Blockly.Python['gps_lat'] = self.gps_lat;
    Blockly.Python['gps_lng'] = self.gps_lng;
    Blockly.Python['gps_alt'] = self.gps_alt;
    Blockly.Python['gps_date'] = self.gps_date;
    Blockly.Python['gps_time'] = self.gps_time;
    Blockly.Python['gps_datetime'] = self.gps_datetime;
    Blockly.Python['gps_sog'] = self.gps_sog;
    Blockly.Python['gps_cog'] = self.gps_cog;
    Blockly.Python.addReservedWords('gps, gps_device');

    Blockly.Python['hx711_init'] = self.hx711_init;
    Blockly.Python['hx711_read'] = self.hx711_read;
    Blockly.Python.addReservedWords('hx711, hx711_device');

    Blockly.Python['ez_timer_init'] = self.ez_timer_init;
    Blockly.Python['ez_timer_update'] = self.ez_timer_update;
    Blockly.Python['ez_timer_cb'] = self.ez_timer_cb;
    Blockly.Python.addReservedWords('ez_timer, ez_timer_obj');

    Blockly.Python['spi_init'] = self.spi_init;
    Blockly.Python['spi_read'] = self.spi_read;
    Blockly.Python['spi_write'] = self.spi_write;
    Blockly.Python.addReservedWords('spi1, spi2');

    Blockly.Python['mfrc522_init'] = self.mfrc522_init;
    Blockly.Python['mfrc522_card_present'] = self.mfrc522_card_present;
    Blockly.Python['mfrc522_get_uid'] = self.mfrc522_get_uid;
    Blockly.Python.addReservedWords('mfrc522, mfrc522_device');

    Blockly.Python['qmc5883l_init'] = self.qmc5883l_init;
    Blockly.Python['qmc5883l_read'] = self.qmc5883l_read;
    Blockly.Python['qmc5883l_value'] = self.qmc5883l_value;
    Blockly.Python.addReservedWords('qmc5883l, qmc5883l_device');

    Blockly.Python['bmp280_init'] = self.bmp280_init;
    Blockly.Python['bmp280_read'] = self.bmp280_read;
    Blockly.Python['bmp280_temperature'] = self.bmp280_temperature;
    Blockly.Python['bmp280_pressure'] = self.bmp280_pressure;
    Blockly.Python['bmp280_altitude'] = self.bmp280_altitude;
    Blockly.Python.addReservedWords('bmp280, bmp280_device');

    Blockly.Python['max30102_init'] = self.max30102_init;
    Blockly.Python['max30102_read'] = self.max30102_read;
    Blockly.Python['max30102_read_succeeded'] = self.max30102_read_succeeded;
    Blockly.Python['max30102_read_temperature'] = self.max30102_read_temperature;
    Blockly.Python['max30102_value'] = self.max30102_value;
    Blockly.Python['max30102_beat'] = self.max30102_beat;
    Blockly.Python['max30102_bpm'] = self.max30102_bpm;
    Blockly.Python['max30102_spo2'] = self.max30102_spo2;
    Blockly.Python.addReservedWords('max30102, max30102_device');

  };

  // Generate python code
  this.genCode = function() {
    self.imports = {};
    self.iotyImports = {};
    self.mqttSubscriptions = {};
    self.ezTimerCb = [];
    self.startType = 'RUN';

    let workspaceCode = Blockly.Python.workspaceToCode(blockly.workspace);

    workspaceCode = self._mqttCBSubstitution(workspaceCode);
    workspaceCode = self._mqttSubscriptionSubstitution(workspaceCode);
    workspaceCode = self._ezTimerCBSubstitution(workspaceCode);

    let code = '';

    if (self.startType == 'RUN') {
      code += 'import ioty.monitor\n';
    } else if (self.startType == 'WAIT') {
      code +=
        'import ioty.monitor\n' +
        'ioty.monitor.wait_for_connection()\n\n';
    } else if (self.startType == 'WAIT_MQTT') {
      code += 'import ioty.monitor_mqtt\n';
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

  this._ezTimerCBSubstitution = function(code) {
    let placeholderRegexStr = '([^\S\r\n]*)' + self.EZ_TIMER_CALLBACK_PLACEHOLDER;
    let placeholderRegexG = new RegExp(placeholderRegexStr, 'g');
    let placeholderRegex = new RegExp(placeholderRegexStr);

    let matches = code.matchAll(placeholderRegexG);
    for (let _ of matches) {
      let replacementCode = '';

      for (let cb of self.ezTimerCb) {
        replacementCode += 'ez_timer_obj.set_interval(' + cb.function + ', ' + cb.interval + ', offset=' + cb.offset + ')\n';
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

    let units = block.getFieldValue('units');
    let code;

    if (units == 'SECONDS') {
      code = 'int(time.ticks_ms() / 1000)';
    } else if (units == 'MILLI') {
      code = 'time.ticks_ms()';
    } else if (units == 'MICRO') {
      code = 'time.ticks_us()';
    }

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

  this.decode = function(block) {
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = value + '.decode(\'utf-8\')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.math_map = function(block) {
    var functionCode =
      '\ndef math_map(x, in_min, in_max, out_min, out_max):\n' +
      '    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min\n';

    Blockly.Python.definitions_['math_map'] = functionCode;

    var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    var in_min = Blockly.Python.valueToCode(block, 'in_min', Blockly.Python.ORDER_ATOMIC);
    var in_max = Blockly.Python.valueToCode(block, 'in_max', Blockly.Python.ORDER_ATOMIC);
    var out_min = Blockly.Python.valueToCode(block, 'out_min', Blockly.Python.ORDER_ATOMIC);
    var out_max = Blockly.Python.valueToCode(block, 'out_max', Blockly.Python.ORDER_ATOMIC);

    var code = 'math_map(' + x + ', ' + in_min + ', ' + in_max + ', ' + out_min + ', ' + out_max + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.json_dumps = function(block) {
    self.imports['json'] = 'import json';

    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'json.dumps(' + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.json_loads = function(block) {
    self.imports['json'] = 'import json';

    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'json.loads(' + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.neopixel_init = function(block) {
    self.imports['neopixel'] = 'import ioty_neopixel as neopixel';

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
    self.imports['neopixel'] = 'import ioty_neopixel as neopixel';

    var hue = Blockly.Python.valueToCode(block, 'hue', Blockly.Python.ORDER_ATOMIC);
    var saturation = Blockly.Python.valueToCode(block, 'saturation', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'neopixel.hsv2rgb(' + hue + ', ' + saturation + ', ' + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.neopixel_set = function(block) {
    self.imports['neopixel'] = 'import ioty_neopixel as neopixel';

    var pin = block.getFieldValue('pin');
    var pixel = Blockly.Python.valueToCode(block, 'pixel', Blockly.Python.ORDER_NONE);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'neopixel.set(' + pin + ', ' + pixel + ', ' + color + ')\n';

    return code;
  };

  this.neopixel_fill = function(block) {
    self.imports['neopixel'] = 'import ioty_neopixel as neopixel';

    var pin = block.getFieldValue('pin');
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'neopixel.fill(' + pin + ', ' + color + ')\n';

    return code;
  };

  this.neopixel_write = function(block) {
    self.imports['neopixel'] = 'import ioty_neopixel as neopixel';

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

    ssid = escapeSingeQuotes(ssid);
    password = escapeSingeQuotes(password);

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

  this.connect_to_configured_wifi = function(block) {
    self.imports['MQTT_Service'] = 'from ioty.mqtt import MQTT_Service';
    self.imports['time'] = 'import time';

    var code =
      '# Connect to configured WiFi\n' +
      'mqtt = MQTT_Service()\n' +
      'if mqtt.read_config():\n' +
      '    mqtt.connect_wifi()\n' +
      '    while not mqtt.wifi_isconnected():\n' +
      '        time.sleep_ms(500)\n' +
      'else:\n' +
      '    raise Exception("No WiFi configured")\n\n';

      return code;
  };

  this.setBluetoothCmds = function(block) {
    let value = block.getFieldValue('value');

    if (self.startType != 'RUN' && self.startType != 'WAIT') {
      return '';
    }

    if (value == 'DISABLED') {
      value = 'False';
    } else {
      value = 'True';
    }

    let code = 'ioty.monitor.ble_service.allowProgramming = ' + value + '\n';

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

    name = escapeSingeQuotes(name);
    password = escapeSingeQuotes(password);

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

    topic = escapeSingeQuotes(topic);

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

    topic = escapeSingeQuotes(topic);

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

    var code = 'struct.unpack(\'' + format + '\', i2c.readfrom_mem(' + address + ', ' + register + ', ' + size + '))[0]';

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

    var code = 'struct.unpack(\'' + format + '\', i2c.readfrom(' + address + ', ' + size + stopParam + '))[0]';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.date_time_get = function(block) {
    self.imports['machine'] = 'import machine';

    var code = 'list(machine.RTC().datetime())';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.date_time_set = function(block) {
    self.imports['machine'] = 'import machine';

    var dateTime = Blockly.Python.valueToCode(block, 'dateTime', Blockly.Python.ORDER_NONE);

    var code = 'machine.RTC().datetime(' + dateTime + ')\n';

    return code;
  };

  this.date_time_set_ntp = function(block) {
    self.imports['ntptime'] = 'import ntptime';

    var tz = Blockly.Python.valueToCode(block, 'tz', Blockly.Python.ORDER_NONE);

    var code =
      'ntptime.settime()\n' +
      'dateTime = list(machine.RTC().datetime())\n' +
      'dateTime[4] += ' + tz + '\n' +
      'machine.RTC().datetime(dateTime)\n';

    return code;
  };

  this.file_open = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);
    var mode = block.getFieldValue('mode');
    var type = block.getFieldValue('type');

    var code = variable + ' = open(' + filename + ', \'' + mode + type + '\')\n';

    return code;
  };

  this.file_readline = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = variable + '.readline()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.file_read = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_NONE);

    var code = variable + '.read(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.file_write = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var newline = block.getFieldValue('newline');

    let ending = '';
    if (newline == 'TRUE') {
      ending = ' + \'\\n\'';
    }

    var code = variable + '.write(' + value + ending + ')\n';

    return code;
  };

  this.file_close = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = variable + '.close()\n';

    return code;
  };

  this.file_flush = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = variable + '.flush()\n';

    return code;
  };

  this.file_is_file = function(block) {
    self.imports['os'] = 'import os';

    var path = Blockly.Python.valueToCode(block, 'path', Blockly.Python.ORDER_NONE);

    var functionCode =
      '\ndef is_file(path):\n' +
      '    try:\n' +
      '        return (os.stat(path)[0] & 0x4000) == 0\n' +
      '    except:\n' +
      '        return False\n';

    Blockly.Python.definitions_['is_file'] = functionCode;

    var code = 'is_file(' + path + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.file_is_dir = function(block) {
    self.imports['os'] = 'import os';

    var path = Blockly.Python.valueToCode(block, 'path', Blockly.Python.ORDER_NONE);

    var functionCode =
      '\ndef is_dir(path):\n' +
      '    try:\n' +
      '        return (os.stat(path)[0] & 0x8000) == 0\n' +
      '    except:\n' +
      '        return False\n';

    Blockly.Python.definitions_['is_dir'] = functionCode;

    var code = 'is_dir(' + path + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.esp32_temperature = function(block) {
    self.imports['esp32'] = 'import esp32';

    var units = block.getFieldValue('units');

    var code = '(esp32.raw_temperature() - 32) * 5 / 9';
    var binding = Blockly.Python.ORDER_MULTIPLICATIVE
    if (units == 'FAHRENHEIT') {
      code = 'esp32.raw_temperature()';
      binding = Blockly.Python.ORDER_ATOMIC;
    }

    return [code, binding];
  };

  this.esp32_hall_sensor = function(block) {
    self.imports['esp32'] = 'import esp32';


    var code = 'esp32.hall_sensor()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mpu6050_init = function(block) {
    self.imports['mpu6050'] = 'from mpu6050 import MPU6050';

    var addr = block.getFieldValue('addr');

    var code =
      'mpu6050 = MPU6050(i2c, ' + addr + ')\n' +
      'mpu6050.init_device()\n';

    return code;
  };

  this.mpu6050_calibrate = function(block) {
    var code = 'mpu6050.calibrateGyro()\n';

    return code;
  };

  this.mpu6050_reset = function(block) {
    var code = 'mpu6050.reset_gyro()\n';

    return code;
  };

  this.mpu6050_update = function(block) {
    var code = 'mpu6050.update_angle()\n';

    return code;
  };

  this.mpu6050_accel = function(block) {
    var axis = block.getFieldValue('axis');

    if (axis == 'X') {
      func = 'accel_x';
    } else if (axis == 'Y') {
      func = 'accel_y';
    } else if (axis == 'Z') {
      func = 'accel_z';
    } else if (axis == 'ALL') {
      func = 'accel_all';
    }

    var code = 'mpu6050.' + func + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mpu6050_gyro = function(block) {
    var axis = block.getFieldValue('axis');

    if (axis == 'X') {
      func = 'rate_x';
    } else if (axis == 'Y') {
      func = 'rate_y';
    } else if (axis == 'Z') {
      func = 'rate_z';
    } else if (axis == 'ALL') {
      func = 'rate_all';
    }

    var code = 'mpu6050.' + func + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mpu6050_angle = function(block) {
    var axis = block.getFieldValue('axis');

    if (axis == 'X') {
      func = 'angle_x';
    } else if (axis == 'Y') {
      func = 'angle_y';
    } else if (axis == 'Z') {
      func = 'angle_z';
    } else if (axis == 'ALL') {
      func = 'angle_all';
    }

    var code = 'mpu6050.' + func + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.pca9685_init = function(block) {
    self.imports['pca9685'] = 'from pca9685 import PCA9685';

    var addr = block.getFieldValue('addr');

    var code = 'pca9685 = PCA9685(i2c, ' + addr + ')\n';

    return code;
  };

  this.pca9685_set_freq = function(block) {
    var freq = block.getFieldValue('freq');

    var code = 'pca9685.set_frequency(' + freq + ')\n';

    return code;
  };

  this.pca9685_analog_write = function(block) {
    var channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pca9685.pwm(' + channel + ', ' + value + ')\n';

    return code;
  };

  this.pca9685_write_angle = function(block) {
    var channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pca9685.servo_deg(' + channel + ', ' + value + ')\n';

    return code;
  };

  this.pca9685_write_us = function(block) {
    var channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pca9685.servo_us(' + channel + ', ' + value + ')\n';

    return code;
  };

  this.ssd1306_init = function(block) {
    self.imports['ssd1306'] = 'import ssd1306';

    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var addr = block.getFieldValue('addr');

    var code =
      'ssd1306_i2c = ssd1306.SSD1306_I2C(' + width + ', ' + height + ', i2c, ' + addr + ')\n'+
      'ssd1306_i2c.init_display()\n';

    return code;
  };

  this.ssd1306_init_sh1106 = function(block) {
    self.imports['ssd1306'] = 'import ssd1306';

    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var addr = block.getFieldValue('addr');

    var code =
      'ssd1306_i2c = ssd1306.SSD1306_I2C(' + width + ', ' + height + ', i2c, ' + addr + ', driver=ssd1306.TYPE_SH1106)\n'+
      'ssd1306_i2c.init_display()\n';

    return code;
  };

  this.ssd1306_fill = function(block) {
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

    var code = 'ssd1306_i2c.fill(' + color + ')\n';

    return code;
  };

  this.ssd1306_show = function(block) {
    var code = 'ssd1306_i2c.show()\n';

    return code;
  };

  this.ssd1306_text = function(block) {
    var text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

    var code = 'ssd1306_i2c.text(' + text + ', ' + x + ', ' + y + ', ' + color + ')\n';

    return code;
  };

  this.ssd1306_pixel = function(block) {
    var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

    var code = 'ssd1306_i2c.pixel(' + x + ', ' + y + ', ' + color + ')\n';

    return code;
  };

  this.ssd1306_line = function(block) {
    var x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_ATOMIC);
    var y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_ATOMIC);
    var x2 = Blockly.Python.valueToCode(block, 'x2', Blockly.Python.ORDER_ATOMIC);
    var y2 = Blockly.Python.valueToCode(block, 'y2', Blockly.Python.ORDER_ATOMIC);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

    var code = 'ssd1306_i2c.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + color + ')\n';

    return code;
  };

  this.ssd1306_rect = function(block) {
    var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    var w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_ATOMIC);
    var h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_ATOMIC);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var fill = block.getFieldValue('fill');

    var code = 'ssd1306_i2c.rect(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + color + ', ' + fill + ')\n';

    return code;
  };

  this.ssd1306_ellipse = function(block) {
    var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    var xr = Blockly.Python.valueToCode(block, 'xr', Blockly.Python.ORDER_ATOMIC);
    var yr = Blockly.Python.valueToCode(block, 'yr', Blockly.Python.ORDER_ATOMIC);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var fill = block.getFieldValue('fill');

    var code = 'ssd1306_i2c.ellipse(' + x + ', ' + y + ', ' + xr + ', ' + yr + ', ' + color + ', ' + fill + ')\n';

    return code;
  };

  this.ssd1306_scroll = function(block) {
    var xstep = Blockly.Python.valueToCode(block, 'xstep', Blockly.Python.ORDER_ATOMIC);
    var ystep = Blockly.Python.valueToCode(block, 'ystep', Blockly.Python.ORDER_ATOMIC);

    var code = 'ssd1306_i2c.scroll(' + xstep + ', ' + ystep + ')\n';

    return code;
  };

  this.dict_empty = function(block) {
    var code = '{}';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.dict_key_value = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = variable;

    let i=0;
    while (true) {
      let key = Blockly.Python.valueToCode(block, 'key' + i, Blockly.Python.ORDER_NONE);
      if (key) {
        code += '[' + key + ']';
      } else {
        break;
      }
      i++;
    }

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.dict_set = function(block) {
    var variable = Blockly.Python.valueToCode(block, 'variable', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    if (! value) {
      value = '0';
    }

    var code = variable + ' = ' + value + '\n';

    return code;
  };

  this.urequests_simple_advance = function(block) {
    self.imports['urequests'] = 'import urequests';

    let method = block.getFieldValue('method');
    var url = Blockly.Python.valueToCode(block, 'url', Blockly.Python.ORDER_ATOMIC);
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    let type = block.getFieldValue('type');

    let return_method;
    if (type == 'JSON') {
      return_method = '.json()';
    } else if (type == 'TEXT') {
      return_method = '.text';
    } else if (type == 'BYTES') {
      return_method = '.content';
    }

    // Only used by advance
    let body_type = block.getFieldValue('body_type');
    let body = Blockly.Python.valueToCode(block, 'body', Blockly.Python.ORDER_ATOMIC);
    let header = Blockly.Python.valueToCode(block, 'header', Blockly.Python.ORDER_ATOMIC);
    var on_success = Blockly.Python.statementToCode(block, 'on_success');
    var on_fail = Blockly.Python.statementToCode(block, 'on_fail');

    let param = '';

    if (body) {
      if (body_type == 'JSON') {
        param += ', json=' + body;
      } else {
        param += ', data=' + body;
      }
    }

    if (header) {
      param += ', header=' + header;
    }

    var code =
      'try:\n' +
      '    req = urequests.request(\'' + method + '\', ' + url + param + ')\n' +
      '    ' + variable + ' = req' + return_method + '\n' +
      '    req.close()\n' +
      on_success +
      'except:\n';

    if (on_fail) {
      code += on_fail;
    } else {
      code += '    pass\n';
    }

    return code;
  };

  this.esp_now_init = function(block) {
    self.imports['network'] = 'import network';
    self.imports['espnow'] = 'import espnow';

    var code =
      'ioty_wifi = network.WLAN(network.STA_IF)\n' +
      'ioty_wifi.active(True)\n' +
      'esp_now = espnow.ESPNow()\n' +
      'esp_now.active(True)\n';

    return code;
  };

  this.esp_now_add_peer = function(block) {
    let mac = Blockly.Python.valueToCode(block, 'mac', Blockly.Python.ORDER_ATOMIC);
    mac = mac.substring(1,mac.length-1);

    let macParts = mac.split(/(..)/g).filter(s => s);
    mac = '';
    for (let part of macParts) {
      mac += '\\x' + part;
    }

    var code = 'esp_now.add_peer(b\'' + mac + '\')\n';

    return code;
  };

  this.esp_now_remove_peer = function(block) {
    let mac = Blockly.Python.valueToCode(block, 'mac', Blockly.Python.ORDER_ATOMIC);
    mac = mac.substring(1,mac.length-1);

    let macParts = mac.split(/(..)/g).filter(s => s);
    mac = '';
    for (let part of macParts) {
      mac += '\\x' + part;
    }

    var code = 'esp_now.del_peer(b\'' + mac + '\')\n';

    return code;
  };

  this.esp_now_send = function(block) {
    let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    let mac = Blockly.Python.valueToCode(block, 'mac', Blockly.Python.ORDER_ATOMIC);
    mac = mac.substring(1,mac.length-1);

    let macParts = mac.split(/(..)/g).filter(s => s);
    mac = '';
    for (let part of macParts) {
      mac += '\\x' + part;
    }

    var code = 'esp_now.send(b\'' + mac + '\', ' + value + ')\n';

    return code;
  };

  this.esp_now_get_msg = function(block) {
    let timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_NONE);

    let code = 'esp_now.irecv(' + timeout + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.esp_now_msg_available = function(block) {
    let code = 'esp_now.any()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ez_esp_now_init = function(block) {
    self.imports['ez_espnow'] = 'import ez_espnow';

    var code = 'ez_espnow.init()\n'

    return code;
  };

  this.ez_esp_now_set_group = function(block) {
    let group = Blockly.Python.valueToCode(block, 'group', Blockly.Python.ORDER_ATOMIC);

    var code = 'ez_espnow.set_group(' + group + ')\n';

    return code;
  };

  this.ez_esp_now_send = function(block) {
    let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'ez_espnow.send(' + value + ')\n';

    return code;
  };

  this.ez_esp_now_get_msg = function(block) {
    let wait = block.getFieldValue('wait');

    let code = 'ez_espnow.recv(' + wait + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ez_httpd_init = function(block) {
    self.imports['ez_httpd'] = 'import ez_httpd';

    let name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);

    var code = 'ezhttpd = ez_httpd.HTTPD(' + name + ')\n';

    return code;
  };

  this.ez_httpd_wait_for_connection = function(block) {
    let url = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('url'), 'VARIABLE');
    let query = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('query'), 'VARIABLE');
    let content = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('content'), 'VARIABLE');

    var code = url + ', ' + query + ', ' + content + ' = ezhttpd.wait_for_connection()\n';

    return code;
  };

  this.ez_httpd_send_response = function(block) {
    let response = Blockly.Python.valueToCode(block, 'response', Blockly.Python.ORDER_ATOMIC);

    var code = 'ezhttpd.send_response(' + response + ')\n';

    return code;
  };

  this.ez_httpd_send_file = function(block) {
    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);

    var code = 'ezhttpd.send_file(' + filename + ')\n';

    return code;
  };

  this.ez_httpd_send_404 = function(block) {
    var code = 'ezhttpd.send_response(\'Page Not Found\', status=\'404 Not Found\')\n';

    return code;
  };

  this.ucsv_reader = function(block) {
    self.imports['ucsv'] = 'import ucsv';

    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);

    var code = variable + ' = ucsv.reader(' + filename + ')\n';

    return code;
  };

  this.ucsv_writer = function(block) {
    self.imports['ucsv'] = 'import ucsv';

    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);
    var mode = block.getFieldValue('mode');

    let append = '';
    if (mode == 'a') {
      append = ', append=True';
    }

    var code = variable + ' = ucsv.writer(' + filename + append + ')\n';

    return code;
  };

  this.ucsv_readrow = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = 'next(' + variable + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ucsv_writerow = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    var code = variable + '.writerow(' + value + ')\n';

    return code;
  };

  this.ucsv_close = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = variable + '.close()\n';

    return code;
  };

  this.ucsv_flush = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = variable + '.flush()\n';

    return code;
  };

  this.i2c_lcd_init = function(block) {
    self.imports['i2c_lcd'] = 'import i2c_lcd';

    var lines = block.getFieldValue('lines');
    var columns = block.getFieldValue('columns');
    var addr = block.getFieldValue('addr');

    var code =
      'lcd = i2c_lcd.LCD(i2c, ' + addr + ', ' + lines + ', ' + columns + ')\n';

    return code;
  };

  this.i2c_lcd_putstr = function(block) {
    var text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);

    var code = 'lcd.putstr(' + text + ')\n';

    return code;
  };

  this.i2c_lcd_clear = function(block) {
    var code = 'lcd.clear()\n';

    return code;
  };

  this.i2c_lcd_move_to = function(block) {
    var x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    var y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);

    var code = 'lcd.move_to(' + x + ', ' + y + ')\n';

    return code;
  };

  this.i2c_lcd_cursor = function(block) {
    var value = block.getFieldValue('value');

    var code;

    if (value == 'ON') {
      code = 'lcd.show_cursor()\n';
    } else {
      code = 'lcd.hide_cursor()\n';
    }

    return code;
  };

  this.i2c_lcd_blink = function(block) {
    var value = block.getFieldValue('value');

    var code;

    if (value == 'ON') {
      code = 'lcd.blink_cursor_on()\n';
    } else {
      code = 'lcd.blink_cursor_off()\n';
    }

    return code;
  };

  this.i2c_lcd_display = function(block) {
    var value = block.getFieldValue('value');

    var code;

    if (value == 'ON') {
      code = 'lcd.display_on()\n';
    } else {
      code = 'lcd.display_off()\n';
    }

    return code;
  };

  this.i2c_lcd_backlight = function(block) {
    var value = block.getFieldValue('value');

    var code;

    if (value == 'ON') {
      code = 'lcd.backlight_on()\n';
    } else {
      code = 'lcd.backlight_off()\n';
    }

    return code;
  };

  this.dht_init = function(block) {
    self.imports['dht'] = 'import dht';
    self.imports['machine'] = 'import machine';

    var type = block.getFieldValue('type');
    var pin = block.getFieldValue('pin');

    var code =
      'dht_device = dht.' + type + '(machine.Pin(' + pin + '))\n';

    return code;
  };

  this.dht_measure = function(block) {
    var code =
      'try:\n' +
      '    dht_device.measure()\n' +
      'except:\n' +
      '    pass\n';

    return code;
  };

  this.dht_temperature = function(block) {
    var code = 'dht_device.temperature()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.dht_humidity = function(block) {
    var code = 'dht_device.humidity()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ez_ds18x20_init = function(block) {
    self.imports['ez_ds18x20'] = 'import ez_ds18x20';

    var pin = block.getFieldValue('pin');

    var code =
      'ds_device = ez_ds18x20.DS18X20(' + pin + ')\n';

    return code;
  };

  this.ez_ds18x20_device_count = function(block) {
    var code = 'ds_device.device_count()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ez_ds18x20_convert_temp = function(block) {
    var code =
      'ds_device.convert_temp()\n';

    return code;
  };

  this.ez_ds18x20_read_temp = function(block) {
    var index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_NONE);

    var code = 'ds_device.read_temp(' + index + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.non_block_init = function(block) {
    self.imports['non_block'] = 'import non_block';

    var code =
      'nblock = non_block.NonBlock()\n';

    return code;
  };

  this.non_block_read = function(block) {
    var size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_NONE);

    var code = 'nblock.read(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.non_block_readline = function(block) {
    var code = 'nblock.readline()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.uart_init = function(block) {
    self.imports['machine'] = 'import machine';

    var id = block.getFieldValue('id');
    var baudrate = block.getFieldValue('baudrate');
    var tx = block.getFieldValue('tx');
    var rx = block.getFieldValue('rx');

    var code =
      'uart' + id + ' = machine.UART(' + id + ', baudrate=' + baudrate + ', tx=' + tx + ', rx=' + rx + ')\n';

    return code;
  };

  this.uart_any = function(block) {
    var id = block.getFieldValue('id');

    var code = 'uart' + id + '.any()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.uart_read = function(block) {
    var id = block.getFieldValue('id');

    var size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_NONE);

    var code = 'uart' + id + '.read(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.uart_readline = function(block) {
    var id = block.getFieldValue('id');

    var code = 'uart' + id + '.readline()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.uart_write = function(block) {
    var id = block.getFieldValue('id');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var newline = block.getFieldValue('newline');

    let ending = '';
    if (newline == 'TRUE') {
      ending = ' + \'\\n\'';
    }

    var code = 'uart' + id + '.write(' + value + ending + ')\n';

    return code;
  };

  this.uart_flush = function(block) {
    var id = block.getFieldValue('id');

    var code = 'uart' + id + '.flush()\n';

    return code;
  };

  this.gps_init = function(block) {
    self.imports['gps'] = 'import gps';

    var uart = block.getFieldValue('uart');

    var code = 'gps_device = gps.GPS(uart' + uart + ')\n';

    return code;
  };

  this.gps_update = function(block) {
    var code = 'gps_device.update()\n';

    return code;
  };

  this.gps_lat = function(block) {
    var type = block.getFieldValue('type');

    let code;
    if (type == 'dd') {
      code = 'gps_device.get_lat()';
    } else {
      code = 'gps_device.get_lat_ddm()';
    }

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gps_lng = function(block) {
    var type = block.getFieldValue('type');

    let code;
    if (type == 'dd') {
      code = 'gps_device.get_lng()';
    } else {
      code = 'gps_device.get_lng_ddm()';
    }

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gps_alt = function(block) {
    let code = 'gps_device.get_alt()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gps_date = function(block) {
    let code = 'gps_device.get_date()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gps_time = function(block) {
    let code = 'gps_device.get_time()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gps_datetime = function(block) {
    let code = 'gps_device.get_datetime()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gps_sog = function(block) {
    let code = 'gps_device.get_sog()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gps_cog = function(block) {
    let code = 'gps_device.get_cog()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.hx711_init = function(block) {
    self.imports['hx711'] = 'import hx711';

    var dt = block.getFieldValue('dt');
    var sck = block.getFieldValue('sck');

    var code = 'hx711_device = hx711.HX711(' + dt + ', ' + sck + ')\n';

    return code;
  };

  this.hx711_read = function(block) {
    let code = 'hx711_device.read()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ez_timer_init = function(block) {
    self.imports['ez_timer'] = 'import ez_timer';

    var code =
      'ez_timer_obj = ez_timer.Timer()\n' +
      self.EZ_TIMER_CALLBACK_PLACEHOLDER;

      return code;
  };

  this.ez_timer_update = function(block) {
    var code = 'ez_timer_obj.update()\n';

    return code;
  };

  this.ez_timer_cb = function(block) {
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
    var interval = block.getFieldValue('interval');
    var offset = block.getFieldValue('offset');
    var statements = Blockly.Python.statementToCode(block, 'statements');

    let functionName = 'ez_timer_cb_' + self.ezTimerCb.length;

    self.ezTimerCb.push({
      function: functionName,
      interval: interval,
      offset: offset
    });

    var code =
      'def ' + functionName + '():\n'
      + globalString;

    code += statements;

    Blockly.Python.definitions_[functionName] = code;

    return null;
  };

  this.spi_init = function(block) {
    self.imports['machine'] = 'import machine';

    var id = block.getFieldValue('id');
    var baudrate = block.getFieldValue('baudrate');
    var sck = block.getFieldValue('sck');
    var mosi = block.getFieldValue('mosi');
    var miso = block.getFieldValue('miso');

    var code =
      'spi' + id + ' = machine.SPI(' + id + ', baudrate=' + baudrate + ', sck=Pin(' + sck + '), mosi=Pin(' + mosi + '), miso=Pin(' + miso + '))\n';

    return code;
  };

  this.spi_read = function(block) {
    self.imports['struct'] = 'import struct';

    var id = block.getFieldValue('id');
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

    var code = 'struct.unpack(\'' + format + '\', spi' + id + '.read(' + size + '))[0]';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.spi_write = function(block) {
    self.imports['struct'] = 'import struct';

    var id = block.getFieldValue('id');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');

    var code = 'spi' + id + '.write(struct.pack(\'' + format + '\', ' + value + '))\n';

    return code;
  };

  this.mfrc522_init = function(block) {
    self.imports['mfrc522'] = 'import mfrc522';

    var spi = block.getFieldValue('spi');
    var rst = block.getFieldValue('rst');
    var cs = block.getFieldValue('cs');

    var code =
      'mfrc522_device = mfrc522.MFRC522(spi' + spi + ', ' + rst + ', ' + cs + ')\n';

    return code;
  };

  this.mfrc522_card_present = function(block) {
    var code = 'mfrc522_device.card_present()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mfrc522_get_uid = function(block) {
    var code = 'mfrc522_device.get_uid()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.qmc5883l_init = function(block) {
    self.imports['qmc5883l'] = 'import qmc5883l';

    let addr = block.getFieldValue('addr');
    let scale = block.getFieldValue('scale');

    let code =
      'qmc5883l_device = qmc5883l.QMC5883L(i2c, addr=' + addr + ', scale=qmc5883l.SCALE_' + scale + ')\n';

    return code;
  };

  this.qmc5883l_read = function(block) {
    let code = 'qmc5883l_device.read()\n';

    return code;
  };

  this.qmc5883l_value = function(block) {
    let axis = block.getFieldValue('axis');

    let code = 'qmc5883l_device.get_' + axis + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bmp280_init = function(block) {
    self.imports['bmp280'] = 'import bmp280';

    let addr = block.getFieldValue('addr');

    let code =
      'bmp280_device = bmp280.BMP280(i2c, addr=' + addr + ')\n';

    return code;
  };

  this.bmp280_read = function(block) {
    let code = 'bmp280_device.read()\n';

    return code;
  };

  this.bmp280_temperature = function(block) {
    let code = 'bmp280_device.get_temperature()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bmp280_pressure = function(block) {
    let code = 'bmp280_device.get_pressure()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bmp280_altitude = function(block) {
    let code = 'bmp280_device.get_altitude()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.max30102_init = function(block) {
    self.imports['max30102'] = 'import max30102';

    let addr = block.getFieldValue('addr');
    let red = block.getFieldValue('red');
    let ir = block.getFieldValue('ir');

    let code =
      'max30102_device = max30102.MAX30102(i2c, addr=' + addr + ', red_led=' + red + ', ir_led=' + ir + ')\n';

    return code;
  };

  this.max30102_read = function(block) {
    let code = 'max30102_device.read()\n';

    return code;
  };

  this.max30102_read_succeeded = function(block) {
    let code = 'max30102_device.read_succeeded';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.max30102_read_temperature = function(block) {
    let code = 'max30102_device.read_temperature()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.max30102_beat = function(block) {
    let code = 'max30102_device.get_beat()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.max30102_bpm = function(block) {
    let code = 'max30102_device.get_bpm()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.max30102_spo2 = function(block) {
    let code = 'max30102_device.get_spo2()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.max30102_value = function(block) {
    let led = block.getFieldValue('led');

    let code = 'max30102_device.get_' + led + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

}

