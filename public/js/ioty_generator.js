var ioty_generator = new function() {
  var self = this;

  this.MQTT_CALLBACK_PLACEHOLDER = '# MQTT Callback Placeholder; you should not see this! #\n';
  this.MQTT_SUBSCRIPTION_PLACEHOLDER = '# MQTT Subscription Placeholder; you should not see this! #\n';
  this.EZ_TIMER_CALLBACK_PLACEHOLDER = '# EZ Timer Callback Placeholder; you should not see this! #\n';
  this.RESERVED_VARIABLES_PLACEHOLDER = '# Reserved Variables Placeholder; you should not see this! #\n';

  this.imports = {};
  this.iotyImports = {};
  this.mqttSubscriptions = {};
  this.ezTimerCb = [];
  this.reservedVariables = {};
  this.startType = 'RUN';

  // Load Python generators
  this.load = function() {
    Blockly.Python.addReservedWords('machine,time,ioty,pin,sys,struct');

    Blockly.Python.INDENT = '    ';

    Blockly.Python['procedures_defreturn'] = self.procedures_defreturn;
    Blockly.Python['procedures_defnoreturn'] = self.procedures_defreturn;

    Blockly.Python['when_started'] = self.when_started;

    Blockly.Python['set_pin_mode'] = self.set_pin_mode;
    Blockly.Python['digital_read_pin'] = self.digital_read_pin;
    Blockly.Python['digital_write_pin'] = self.digital_write_pin;
    Blockly.Python['analog_read_pin'] = self.analog_read_pin;
    Blockly.Python['touch_read_pin'] = self.touch_read_pin;
    Blockly.Python['set_analog_write_freq'] = self.set_analog_write_freq;
    Blockly.Python['analog_write_pin'] = self.analog_write_pin;
    Blockly.Python['servo_write_deg'] = self.servo_write_deg;
    Blockly.Python['servo_write_us'] = self.servo_write_us;
    Blockly.Python['hc_sr04_ping'] = self.hc_sr04_ping;

    Blockly.Python['adv_set_pin_mode'] = self.adv_set_pin_mode;
    Blockly.Python['adv_digital_read_pin'] = self.adv_digital_read_pin;
    Blockly.Python['adv_digital_write_pin'] = self.adv_digital_write_pin;
    Blockly.Python['adv_analog_read_pin'] = self.adv_analog_read_pin;
    Blockly.Python['adv_touch_read_pin'] = self.adv_touch_read_pin;
    Blockly.Python['adv_set_analog_write_freq'] = self.adv_set_analog_write_freq;
    Blockly.Python['adv_analog_write_pin'] = self.adv_analog_write_pin;
    Blockly.Python['adv_servo_write_deg'] = self.adv_servo_write_deg;
    Blockly.Python['adv_servo_write_us'] = self.adv_servo_write_us;
    Blockly.Python['adv_hc_sr04_ping'] = self.adv_hc_sr04_ping;

    Blockly.Python['comment'] = self.comment;
    Blockly.Python['sleep'] = self.sleep;
    Blockly.Python['wait_until_connected'] = self.wait_until_connected;
    Blockly.Python['time'] = self.time;
    Blockly.Python['exit'] = self.exit;
    Blockly.Python['read_input'] = self.read_input;

    Blockly.Python['connect_to_wifi'] = self.connect_to_wifi;
    Blockly.Python['connect_to_wifi_blocks_input'] = self.connect_to_wifi_blocks_input;
    Blockly.Python['connect_to_configured_wifi'] = self.connect_to_configured_wifi;
    Blockly.Python['wlan_get_ip'] = self.wlan_get_ip;
    Blockly.Python['start_as_ap'] = self.start_as_ap;
    Blockly.Python['wlan_scan'] = self.wlan_scan;
    Blockly.Python['wlan_is_present'] = self.wlan_is_present;
    Blockly.Python['wlan_is_connected'] = self.wlan_is_connected;

    Blockly.Python['setBluetoothCmds'] = self.setBluetoothCmds;
    Blockly.Python['try_except'] = self.try_except;
    Blockly.Python['run_python'] = self.run_python;
    Blockly.Python['run_python_and_return'] = self.run_python_and_return;

    Blockly.Python['type_cast'] = self.type_cast;
    Blockly.Python['bytes'] = self.bytes;
    Blockly.Python['bytearray'] = self.bytearray;
    Blockly.Python['bytearray_by_size'] = self.bytearray_by_size;
    Blockly.Python['bytearray_set_slice'] = self.bytearray_set_slice;
    Blockly.Python['bytearray_get_slice'] = self.bytearray_get_slice;
    Blockly.Python['decode'] = self.decode;
    Blockly.Python['encode'] = self.encode;
    Blockly.Python['unpack'] = self.unpack;
    Blockly.Python['math_map'] = self.math_map;
    Blockly.Python['json_dumps'] = self.json_dumps;
    Blockly.Python['json_loads'] = self.json_loads;
    Blockly.Python['base64_encode'] = self.base64_encode;
    Blockly.Python['base64_decode'] = self.base64_decode;
    Blockly.Python['binary_op'] = self.binary_op;
    Blockly.Python['binary_not'] = self.binary_not;
    Blockly.Python['binary_shift'] = self.binary_shift;
    Blockly.Python.addReservedWords('json,math_map');

    Blockly.Python['neopixel_init'] = self.neopixel_init;
    Blockly.Python['neopixel_color'] = self.neopixel_color;
    Blockly.Python['neopixel_rgb'] = self.neopixel_rgb;
    Blockly.Python['neopixel_rgbw'] = self.neopixel_rgbw;
    Blockly.Python['neopixel_hsv'] = self.neopixel_hsv;
    Blockly.Python['neopixel_set'] = self.neopixel_set;
    Blockly.Python['neopixel_fill'] = self.neopixel_fill;
    Blockly.Python['neopixel_write'] = self.neopixel_write;
    Blockly.Python.addReservedWords('ioty_neopixel');

    Blockly.Python['mqtt_connect_to_server'] = self.mqtt_connect_to_server;
    Blockly.Python['mqtt_wait_msg'] = self.mqtt_wait_msg;
    Blockly.Python['mqtt_check_msg'] = self.mqtt_check_msg;
    Blockly.Python['mqtt_on_receive'] = self.mqtt_on_receive;
    Blockly.Python['mqtt_msg'] = self.mqtt_msg;
    Blockly.Python['mqtt_publish'] = self.mqtt_publish;
    Blockly.Python['mqtt_publish_bytes'] = self.mqtt_publish_bytes;
    Blockly.Python.addReservedWords('ioty_mqtt,ioty_mqtt_cb,mqtt_msg,binascii');

    Blockly.Python['i2c_init'] = self.i2c_init;
    Blockly.Python['i2c_init_with_pins'] = self.i2c_init_with_pins;
    Blockly.Python['i2c_scan'] = self.i2c_scan;
    Blockly.Python['i2c_writeto_mem'] = self.i2c_writeto_mem;
    Blockly.Python['i2c_readfrom_mem'] = self.i2c_readfrom_mem;
    Blockly.Python['i2c_writeto'] = self.i2c_writeto;
    Blockly.Python['i2c_readfrom'] = self.i2c_readfrom;
    Blockly.Python['i2c_readfrom_bytes'] = self.i2c_readfrom_bytes;
    Blockly.Python.addReservedWords('i2c');

    Blockly.Python['date_time_get'] = self.date_time_get;
    Blockly.Python['date_time_set'] = self.date_time_set;
    Blockly.Python['date_time_set_ntp'] = self.date_time_set_ntp;
    Blockly.Python.addReservedWords('dateTime,ntptime');

    Blockly.Python['file_open'] = self.file_open;
    Blockly.Python['file_readline'] = self.file_readline;
    Blockly.Python['file_read'] = self.file_read;
    Blockly.Python['file_write'] = self.file_write;
    Blockly.Python['file_write_binary'] = self.file_write_binary;
    Blockly.Python['file_close'] = self.file_close;
    Blockly.Python['file_flush'] = self.file_flush;
    Blockly.Python['file_is_file'] = self.file_is_file;
    Blockly.Python['file_is_dir'] = self.file_is_dir;
    Blockly.Python['file_list_dir'] = self.file_list_dir;
    Blockly.Python.addReservedWords('is_file,is_dir');

    Blockly.Python['sdcard_init'] = self.sdcard_init;
    Blockly.Python['sdcard_deinit'] = self.sdcard_deinit;
    Blockly.Python.addReservedWords('sdcard');

    Blockly.Python['esp32_temperature'] = self.esp32_temperature;
    Blockly.Python.addReservedWords('esp32');

    Blockly.Python['mpu6050_init'] = self.mpu6050_init;
    Blockly.Python['mpu6050_calibrate'] = self.mpu6050_calibrate;
    Blockly.Python['mpu6050_reset'] = self.mpu6050_reset;
    Blockly.Python['mpu6050_update'] = self.mpu6050_update;
    Blockly.Python['mpu6050_accel'] = self.mpu6050_accel;
    Blockly.Python['mpu6050_gyro'] = self.mpu6050_gyro;
    Blockly.Python['mpu6050_angle'] = self.mpu6050_angle;
    Blockly.Python['mpu6050_temperature'] = self.mpu6050_temperature;
    Blockly.Python['mpu6050_get_calibration'] = self.mpu6050_get_calibration;
    Blockly.Python['mpu6050_set_calibration'] = self.mpu6050_set_calibration;
    Blockly.Python.addReservedWords('mpu6050,mpu6050_device');

    Blockly.Python['pca9685_init'] = self.pca9685_init;
    Blockly.Python['pca9685_set_freq'] = self.pca9685_set_freq;
    Blockly.Python['pca9685_analog_write'] = self.pca9685_analog_write;
    Blockly.Python['pca9685_write_angle'] = self.pca9685_write_angle;
    Blockly.Python['pca9685_write_us'] = self.pca9685_write_us;
    Blockly.Python.addReservedWords('pca9685,pca9685_device');

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
    Blockly.Python['dict_key_value_input'] = self.dict_key_value_input;
    Blockly.Python['dict_set'] = self.dict_set;

    Blockly.Python['urequests_simple'] = self.urequests_simple_advance;
    Blockly.Python['urequests_advance'] = self.urequests_simple_advance;
    Blockly.Python['urequests_connect'] = self.urequests_connect;
    Blockly.Python['urequests_read'] = self.urequests_read;
    Blockly.Python['urequests_settimeout'] = self.urequests_settimeout;
    Blockly.Python.addReservedWords('urequests');

    Blockly.Python['esp_now_init'] = self.esp_now_init;
    Blockly.Python['esp_now_add_peer'] = self.esp_now_add_peer;
    Blockly.Python['esp_now_remove_peer'] = self.esp_now_remove_peer;
    Blockly.Python['esp_now_send'] = self.esp_now_send;
    Blockly.Python['esp_now_get_msg'] = self.esp_now_get_msg;
    Blockly.Python['esp_now_msg_available'] = self.esp_now_msg_available;
    Blockly.Python.addReservedWords('espnow,esp_now');

    Blockly.Python['ez_esp_now_init'] = self.ez_esp_now_init;
    Blockly.Python['ez_esp_now_set_group'] = self.ez_esp_now_set_group
    Blockly.Python['ez_esp_now_send'] = self.ez_esp_now_send;
    Blockly.Python['ez_esp_now_get_msg'] = self.ez_esp_now_get_msg;
    Blockly.Python.addReservedWords('ez_espnow');

    Blockly.Python['ez_httpd_init'] = self.ez_httpd_init;
    Blockly.Python['ez_httpd_available'] = self.ez_httpd_available;
    Blockly.Python['ez_httpd_wait_for_connection'] = self.ez_httpd_wait_for_connection;
    Blockly.Python['ez_httpd_send_response'] = self.ez_httpd_send_response;
    Blockly.Python['ez_httpd_send_bytes'] = self.ez_httpd_send_bytes;
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
    Blockly.Python.addReservedWords('i2c_lcd,lcd');

    Blockly.Python['dht_init'] = self.dht_init;
    Blockly.Python['dht_measure'] = self.dht_measure;
    Blockly.Python['dht_temperature'] = self.dht_temperature;
    Blockly.Python['dht_humidity'] = self.dht_humidity;
    Blockly.Python.addReservedWords('dht,dht_device');

    Blockly.Python['ez_ds18x20_init'] = self.ez_ds18x20_init;
    Blockly.Python['ez_ds18x20_device_count'] = self.ez_ds18x20_device_count;
    Blockly.Python['ez_ds18x20_convert_temp'] = self.ez_ds18x20_convert_temp;
    Blockly.Python['ez_ds18x20_read_temp'] = self.ez_ds18x20_read_temp;
    Blockly.Python.addReservedWords('ez_ds18x20,ds_device');

    Blockly.Python['non_block_init'] = self.non_block_init;
    Blockly.Python['non_block_read'] = self.non_block_read;
    Blockly.Python['non_block_readline'] = self.non_block_readline;
    Blockly.Python.addReservedWords('non_block,nblock');

    Blockly.Python['uart_init'] = self.uart_init;
    Blockly.Python['uart_any'] = self.uart_any;
    Blockly.Python['uart_read'] = self.uart_read;
    Blockly.Python['uart_readline'] = self.uart_readline;
    Blockly.Python['uart_write'] = self.uart_write;
    Blockly.Python['uart_flush'] = self.uart_flush;
    Blockly.Python.addReservedWords('uart1,uart2');

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
    Blockly.Python.addReservedWords('gps,gps_device');

    Blockly.Python['hx711_init'] = self.hx711_init;
    Blockly.Python['hx711_read'] = self.hx711_read;
    Blockly.Python.addReservedWords('hx711,hx711_device');

    Blockly.Python['hx710_init'] = self.hx710_init;
    Blockly.Python['hx710_read'] = self.hx710_read;
    Blockly.Python.addReservedWords('hx710,hx710_device');

    Blockly.Python['ez_timer_init'] = self.ez_timer_init;
    Blockly.Python['ez_timer_update'] = self.ez_timer_update;
    Blockly.Python['ez_timer_cb'] = self.ez_timer_cb;
    Blockly.Python['ez_timer_set_timeout'] = self.ez_timer_set_timeout;
    Blockly.Python.addReservedWords('ez_timer,ez_timer_obj,ez_timer_timeout_fn');

    Blockly.Python['spi_init'] = self.spi_init;
    Blockly.Python['spi_read'] = self.spi_read;
    Blockly.Python['spi_write'] = self.spi_write;
    Blockly.Python.addReservedWords('spi1,spi2,softSpi1,softSpi2');

    Blockly.Python['mfrc522_init'] = self.mfrc522_init;
    Blockly.Python['mfrc522_card_present'] = self.mfrc522_card_present;
    Blockly.Python['mfrc522_get_uid'] = self.mfrc522_get_uid;
    Blockly.Python.addReservedWords('mfrc522,mfrc522_device');

    Blockly.Python['qmc5883l_init'] = self.qmc5883l_init;
    Blockly.Python['qmc5883l_read'] = self.qmc5883l_read;
    Blockly.Python['qmc5883l_value'] = self.qmc5883l_value;
    Blockly.Python.addReservedWords('qmc5883l,qmc5883l_device');

    Blockly.Python['hmc5883l_init'] = self.hmc5883l_init;
    Blockly.Python['hmc5883l_read'] = self.hmc5883l_read;
    Blockly.Python['hmc5883l_value'] = self.hmc5883l_value;
    Blockly.Python.addReservedWords('hmc5883l,hmc5883l_device');

    Blockly.Python['bmp280_init'] = self.bmp280_init;
    Blockly.Python['bmp280_read'] = self.bmp280_read;
    Blockly.Python['bmp280_temperature'] = self.bmp280_temperature;
    Blockly.Python['bmp280_pressure'] = self.bmp280_pressure;
    Blockly.Python['bmp280_altitude'] = self.bmp280_altitude;
    Blockly.Python.addReservedWords('bmp280,bmp280_device');

    Blockly.Python['max30102_init'] = self.max30102_init;
    Blockly.Python['max30102_read'] = self.max30102_read;
    Blockly.Python['max30102_read_succeeded'] = self.max30102_read_succeeded;
    Blockly.Python['max30102_read_temperature'] = self.max30102_read_temperature;
    Blockly.Python['max30102_value'] = self.max30102_value;
    Blockly.Python['max30102_beat'] = self.max30102_beat;
    Blockly.Python['max30102_bpm'] = self.max30102_bpm;
    Blockly.Python['max30102_spo2'] = self.max30102_spo2;
    Blockly.Python.addReservedWords('max30102,max30102_device');

    Blockly.Python['vl53l0x_init'] = self.vl53l0x_init;
    Blockly.Python['vl53l0x_read'] = self.vl53l0x_read;
    Blockly.Python.addReservedWords('vl53l0x,vl53l0x_device');

    Blockly.Python['vl53l1x_init'] = self.vl53l1x_init;
    Blockly.Python['vl53l1x_read'] = self.vl53l1x_read;
    Blockly.Python['vl53l1x_set_distance_mode'] = self.vl53l1x_set_distance_mode;
    Blockly.Python.addReservedWords('vl53l1x,vl53l1x_device');

    Blockly.Python['mqtt_logger_init'] = self.mqtt_logger_init;
    Blockly.Python['mqtt_logger_log_with_time'] = self.mqtt_logger_log_with_time;
    Blockly.Python['mqtt_logger_log'] = self.mqtt_logger_log;
    Blockly.Python.addReservedWords('mqtt_logger');

    Blockly.Python['ds3231_init'] = self.ds3231_init;
    Blockly.Python['ds3231_date_time_get'] = self.ds3231_date_time_get;
    Blockly.Python['ds3231_date_time_set'] = self.ds3231_date_time_set;
    Blockly.Python.addReservedWords('ds3231,ds3231_device');

    Blockly.Python['bme280_init'] = self.bme280_init;
    Blockly.Python['bme280_read'] = self.bme280_read;
    Blockly.Python['bme280_temperature'] = self.bme280_temperature;
    Blockly.Python['bme280_pressure'] = self.bme280_pressure;
    Blockly.Python['bme280_altitude'] = self.bme280_altitude;
    Blockly.Python['bme280_humidity'] = self.bme280_humidity;
    Blockly.Python.addReservedWords('bme280,bme280_device');

    Blockly.Python['apds9960_init'] = self.apds9960_init;
    Blockly.Python['apds9960_enable_light'] = self.apds9960_enable_light;
    Blockly.Python['apds9960_disable_light'] = self.apds9960_disable_light;
    Blockly.Python['apds9960_read_light'] = self.apds9960_read_light;
    Blockly.Python['apds9960_enable_prox'] = self.apds9960_enable_prox;
    Blockly.Python['apds9960_disable_prox'] = self.apds9960_disable_prox;
    Blockly.Python['apds9960_read_prox'] = self.apds9960_read_prox;
    Blockly.Python['apds9960_enable_gesture'] = self.apds9960_enable_gesture;
    Blockly.Python['apds9960_disable_gesture'] = self.apds9960_disable_gesture;
    Blockly.Python['apds9960_read_gesture'] = self.apds9960_read_gesture;
    Blockly.Python['apds9960_get_gesture'] = self.apds9960_get_gesture;
    Blockly.Python.addReservedWords('apds9960,apds9960_device');

    Blockly.Python['gy33_i2c_init'] = self.gy33_i2c_init;
    Blockly.Python['gy33_i2c_read_raw'] = self.gy33_i2c_read_raw;
    Blockly.Python['gy33_i2c_read_calibrated'] = self.gy33_i2c_read_calibrated;
    Blockly.Python['gy33_i2c_set_led'] = self.gy33_i2c_set_led;
    Blockly.Python['gy33_i2c_calibrate_white'] = self.gy33_i2c_calibrate_white;
    Blockly.Python['gy33_i2c_calibrate_black'] = self.gy33_i2c_calibrate_black;
    Blockly.Python.addReservedWords('gy33_i2c,gy33_i2c_device');

    Blockly.Python['gy33_uart_init'] = self.gy33_uart_init;
    Blockly.Python['gy33_uart_update'] = self.gy33_uart_update;
    Blockly.Python['gy33_uart_get_raw'] = self.gy33_uart_get_raw;
    Blockly.Python['gy33_uart_get_calibrated'] = self.gy33_uart_get_calibrated;
    Blockly.Python['gy33_uart_set_led'] = self.gy33_uart_set_led;
    Blockly.Python['gy33_uart_set_integration_time'] = self.gy33_uart_set_integration_time;
    Blockly.Python['gy33_uart_calibrate_white'] = self.gy33_uart_calibrate_white;
    Blockly.Python['gy33_uart_calibrate_black'] = self.gy33_uart_calibrate_black;
    Blockly.Python.addReservedWords('gy33_uart,gy33_uart_device');

    Blockly.Python['tcs3472_init'] = self.tcs3472_init;
    Blockly.Python['tcs3472_read_raw'] = self.tcs3472_read_raw;
    Blockly.Python['tcs3472_read_calibrated'] = self.tcs3472_read_calibrated;
    Blockly.Python['tcs3472_set_gain'] = self.tcs3472_set_gain;
    Blockly.Python['tcs3472_set_integration_time'] = self.tcs3472_set_integration_time;
    Blockly.Python['tcs3472_calibrate_white'] = self.tcs3472_calibrate_white;
    Blockly.Python['tcs3472_calibrate_black'] = self.tcs3472_calibrate_black;
    Blockly.Python.addReservedWords('tcs3472,tcs3472_device');

    Blockly.Python['tween_start'] = self.tween_start;
    Blockly.Python['tween_get'] = self.tween_get;
    Blockly.Python['tween_is_ended'] = self.tween_is_ended;
    Blockly.Python['tween_remove'] = self.tween_remove;
    Blockly.Python.addReservedWords('tween');

    Blockly.Python['max6675_init'] = self.max6675_init;
    Blockly.Python['max6675_read'] = self.max6675_read;
    Blockly.Python.addReservedWords('max6675,max6675_device');

    Blockly.Python['encoder_init'] = self.encoder_init;
    Blockly.Python['encoder_get_position'] = self.encoder_get_position;
    Blockly.Python['encoder_set_position'] = self.encoder_set_position;
    Blockly.Python['encoder_get_speed'] = self.encoder_get_speed;
    Blockly.Python.addReservedWords('encoder,encoder_device');

    Blockly.Python['huskylens_init_i2c'] = self.huskylens_init_i2c;
    Blockly.Python['huskylens_init_uart'] = self.huskylens_init_uart;
    Blockly.Python['huskylens_change_mode'] = self.huskylens_change_mode;
    Blockly.Python['huskylens_request'] = self.huskylens_request;
    Blockly.Python['huskylens_requestByID'] = self.huskylens_requestByID;
    Blockly.Python['huskylens_results'] = self.huskylens_results;
    Blockly.Python['huskylens_idInResults'] = self.huskylens_idInResults;
    Blockly.Python['huskylens_get'] = self.huskylens_get;
    Blockly.Python['huskylens_closestBlockToCenter'] = self.huskylens_closestBlockToCenter;
    Blockly.Python['huskylens_closestArrowToCenter'] = self.huskylens_closestArrowToCenter;
    Blockly.Python['huskylens_forget'] = self.huskylens_forget;
    Blockly.Python['huskylens_learn'] = self.huskylens_learn;
    Blockly.Python['huskylens_customText'] = self.huskylens_customText;
    Blockly.Python['huskylens_clearText'] = self.huskylens_clearText;
    Blockly.Python['huskylens_saveLoadModel'] = self.huskylens_saveLoadModel;
    Blockly.Python['huskylens_saveImage'] = self.huskylens_saveImage;
    Blockly.Python.addReservedWords('huskylens,huskylib');

    Blockly.Python['tca9548a_init'] = self.tca9548a_init;
    Blockly.Python['tca9548a_get_port'] = self.tca9548a_get_port;
    Blockly.Python['tca9548a_set_port'] = self.tca9548a_set_port;
    Blockly.Python.addReservedWords('tca9548a,tca9548a_device');

    Blockly.Python['music_init'] = self.music_init;
    Blockly.Python['music_play_tone'] = self.music_play_tone;
    Blockly.Python['music_play_notes'] = self.music_play_notes;
    Blockly.Python['music_play_rtttl'] = self.music_play_rtttl;
    Blockly.Python['music_is_playing'] = self.music_is_playing;
    Blockly.Python['music_update'] = self.music_update;
    Blockly.Python['music_stop'] = self.music_stop;
    Blockly.Python.addReservedWords('music,music_device');

    Blockly.Python['scaled_text_init'] = self.scaled_text_init;
    Blockly.Python['scaled_text_text'] = self.scaled_text_text;
    Blockly.Python['scaled_text_text_with_background'] = self.scaled_text_text_with_background;
    Blockly.Python.addReservedWords('scaled_text,text_scaler');

    Blockly.Python['png_decoder_render'] = self.png_decoder_render;
    Blockly.Python.addReservedWords('PNGdecoder');

    Blockly.Python['bmp_image_open'] = self.bmp_image_open;
    Blockly.Python['bmp_image_close'] = self.bmp_image_close;
    Blockly.Python['bmp_image_width'] = self.bmp_image_width;
    Blockly.Python['bmp_image_height'] = self.bmp_image_height;
    Blockly.Python['bmp_image_depth'] = self.bmp_image_depth;
    Blockly.Python['bmp_image_render'] = self.bmp_image_render;
    Blockly.Python['bmp_image_get_pixel'] = self.bmp_image_get_pixel;
    Blockly.Python.addReservedWords('bmp_image,bmp_image_file');

    Blockly.Python['hid_keyboard_init'] = self.hid_keyboard_init;
    Blockly.Python['hid_keyboard_advertising'] = self.hid_keyboard_advertising;
    Blockly.Python['hid_keyboard_status'] = self.hid_keyboard_status;
    Blockly.Python['hid_keyboard_send_string'] = self.hid_keyboard_send_string;
    Blockly.Python['hid_keyboard_send_key'] = self.hid_keyboard_send_key;
    Blockly.Python['hid_mouse_init'] = self.hid_mouse_init;
    Blockly.Python['hid_mouse_advertising'] = self.hid_mouse_advertising;
    Blockly.Python['hid_mouse_status'] = self.hid_mouse_status;
    Blockly.Python['hid_mouse_send_rel'] = self.hid_mouse_send_rel;
    Blockly.Python['hid_mouse_send_abs'] = self.hid_mouse_send_abs;
    Blockly.Python['hid_mouse_send_btns'] = self.hid_mouse_send_btns;
    Blockly.Python['hid_ccd_init'] = self.hid_ccd_init;
    Blockly.Python['hid_ccd_advertising'] = self.hid_ccd_advertising;
    Blockly.Python['hid_ccd_status'] = self.hid_ccd_status;
    Blockly.Python['hid_ccd_send_key'] = self.hid_ccd_send_key;
    Blockly.Python['hid_ccd_send_key_select'] = self.hid_ccd_send_key_select;
    Blockly.Python['hid_joystick_init'] = self.hid_joystick_init;
    Blockly.Python['hid_joystick_advertising'] = self.hid_joystick_advertising;
    Blockly.Python['hid_joystick_status'] = self.hid_joystick_status;
    Blockly.Python['hid_joystick_send_axes'] = self.hid_joystick_send_axes;
    Blockly.Python['hid_joystick_send_btns'] = self.hid_joystick_send_btns;
    Blockly.Python.addReservedWords('hid_services,hid_keyboard,hid_mouse,hid_ccd,hid_joystick');

    Blockly.Python['yx5300_init'] = self.yx5300_init;
    Blockly.Python['yx5300_play'] = self.yx5300_play;
    Blockly.Python['yx5300_play_index'] = self.yx5300_play_index;
    Blockly.Python['yx5300_play_folder_index'] = self.yx5300_play_folder_index;
    Blockly.Python['yx5300_play_next'] = self.yx5300_play_next;
    Blockly.Python['yx5300_play_prev'] = self.yx5300_play_prev;
    Blockly.Python['yx5300_pause'] = self.yx5300_pause;
    Blockly.Python['yx5300_stop'] = self.yx5300_stop;
    Blockly.Python['yx5300_set_volume'] = self.yx5300_set_volume;
    Blockly.Python.addReservedWords('yx5300,yx5300_device');

    Blockly.Python['ld2410_init'] = self.ld2410_init;
    Blockly.Python['ld2410_update'] = self.ld2410_update;
    Blockly.Python['ld2410_get_target'] = self.ld2410_get_target;
    Blockly.Python['ld2410_get_engineering'] = self.ld2410_get_engineering;
    Blockly.Python['ld2410_engineering_mode'] = self.ld2410_engineering_mode;
    Blockly.Python['ld2410_set_max'] = self.ld2410_set_max;
    Blockly.Python['ld2410_set_sensitivity'] = self.ld2410_set_sensitivity;
    Blockly.Python['ld2410_factory_reset'] = self.ld2410_factory_reset;
    Blockly.Python.addReservedWords('ld2410,ld2410_device');

    Blockly.Python['stepper_wheels_init'] = self.stepper_wheels_init;
    Blockly.Python['stepper_wheels_enable'] = self.stepper_wheels_enable;
    Blockly.Python['stepper_wheels_reset'] = self.stepper_wheels_reset;
    Blockly.Python['stepper_wheels_motor_run'] = self.stepper_wheels_motor_run;
    Blockly.Python['stepper_wheels_motor_run_steps'] = self.stepper_wheels_motor_run_steps;
    Blockly.Python['stepper_wheels_motor_stop'] = self.stepper_wheels_motor_stop;
    Blockly.Python['stepper_wheels_motor_reset_steps'] = self.stepper_wheels_motor_reset_steps;
    Blockly.Python['stepper_wheels_motor_get_steps'] = self.stepper_wheels_motor_get_steps;
    Blockly.Python['stepper_wheels_motor_set_acceleration'] = self.stepper_wheels_motor_set_acceleration;
    Blockly.Python.addReservedWords('stepper_wheels,sw_controller,sw_motor0,sw_motor1,sw_motor2,sw_motor3');

    Blockly.Python['stepper_wheels_init_drive'] = self.stepper_wheels_init_drive;
    Blockly.Python['stepper_wheels_drive_tank'] = self.stepper_wheels_drive_tank;
    Blockly.Python['stepper_wheels_drive_tank_steps'] = self.stepper_wheels_drive_tank_steps;
    Blockly.Python['stepper_wheels_drive_steering'] = self.stepper_wheels_drive_steering;
    Blockly.Python['stepper_wheels_drive_steering_steps'] = self.stepper_wheels_drive_steering_steps;
    Blockly.Python['stepper_wheels_drive_stop'] = self.stepper_wheels_drive_stop;
    Blockly.Python['stepper_wheels_drive_reset_steps'] = self.stepper_wheels_drive_reset_steps;
    Blockly.Python['stepper_wheels_drive_get_steps'] = self.stepper_wheels_drive_get_steps;
    Blockly.Python['stepper_wheels_drive_set_acceleration'] = self.stepper_wheels_drive_set_acceleration;
    Blockly.Python['stepper_wheels_init_delta'] = self.stepper_wheels_init_delta;
    Blockly.Python['stepper_wheels_delta_move_turn'] = self.stepper_wheels_delta_move_turn;
    Blockly.Python['stepper_wheels_delta_move_steps'] = self.stepper_wheels_delta_move_steps;
    Blockly.Python['stepper_wheels_delta_turn_steps'] = self.stepper_wheels_delta_turn_steps;
    Blockly.Python['stepper_wheels_delta_stop'] = self.stepper_wheels_delta_stop;
    Blockly.Python['stepper_wheels_delta_set_acceleration'] = self.stepper_wheels_delta_set_acceleration;
    Blockly.Python['stepper_wheels_init_mecanum'] = self.stepper_wheels_init_mecanum;
    Blockly.Python['stepper_wheels_mecanum_move_turn'] = self.stepper_wheels_mecanum_move_turn;
    Blockly.Python['stepper_wheels_mecanum_move_steps'] = self.stepper_wheels_mecanum_move_steps;
    Blockly.Python['stepper_wheels_mecanum_turn_steps'] = self.stepper_wheels_mecanum_turn_steps;
    Blockly.Python['stepper_wheels_mecanum_stop'] = self.stepper_wheels_mecanum_stop;
    Blockly.Python['stepper_wheels_mecanum_set_acceleration'] = self.stepper_wheels_mecanum_set_acceleration;
    Blockly.Python.addReservedWords('sw_drive,sw_delta,sw_mecanum');

    Blockly.Python['camera_init'] = self.camera_init;
    Blockly.Python['camera_deinit'] = self.camera_deinit;
    Blockly.Python['camera_capture'] = self.camera_capture;
    Blockly.Python['camera_set_whitebalance'] = self.camera_set_whitebalance;
    Blockly.Python['camera_set_saturation'] = self.camera_set_saturation;
    Blockly.Python['camera_set_brightness'] = self.camera_set_brightness;
    Blockly.Python['camera_set_contrast'] = self.camera_set_contrast;
    Blockly.Python['camera_set_quality'] = self.camera_set_quality;
    Blockly.Python.addReservedWords('camera');

    Blockly.Python['mv_find_blobs_yuv'] = self.mv_find_blobs_yuv;
    Blockly.Python['mv_find_blobs_grayscale'] = self.mv_find_blobs_grayscale;
    Blockly.Python['mv_find_circle_single'] = self.mv_find_circle_single;
    Blockly.Python['mv_edge_detect'] = self.mv_edge_detect;
    Blockly.Python['mv_yuv_to_grayscale'] = self.mv_yuv_to_grayscale;
    Blockly.Python['mv_gaussian_blur_3x3_gray'] = self.mv_gaussian_blur_3x3_gray;
    Blockly.Python['mv_gaussian_blur_3x3_yuv'] = self.mv_gaussian_blur_3x3_yuv;
    Blockly.Python['mv_sobel'] = self.mv_sobel;
    Blockly.Python['mv_scale_grayscale'] = self.mv_scale_grayscale;
    Blockly.Python['mv_crop_grayscale'] = self.mv_crop_grayscale;
    Blockly.Python['mv_crop_row_grayscale'] = self.mv_crop_row_grayscale;
    Blockly.Python['mv_crop_row_yuv'] = self.mv_crop_row_yuv;
    Blockly.Python.addReservedWords('mv');

    Blockly.Python['wheeled_drives_steering'] = self.wheeled_drives_steering;
    Blockly.Python['wheeled_drives_joystick'] = self.wheeled_drives_joystick;
    Blockly.Python['wheeled_drives_delta'] = self.wheeled_drives_delta;
    Blockly.Python['wheeled_drives_mecanum'] = self.wheeled_drives_mecanum;
    Blockly.Python.addReservedWords('wheeled_drives');

    Blockly.Python['ili9341_init'] = self.ili9341_init;
    Blockly.Python['ili9341_color'] = self.ili9341_color;
    Blockly.Python['ili9341_rgb'] = self.ili9341_rgb;
    Blockly.Python['ili9341_hsv'] = self.ili9341_hsv;
    Blockly.Python['ili9341_clear'] = self.ili9341_clear;
    Blockly.Python['ili9341_text8x8'] = self.ili9341_text8x8;
    Blockly.Python['ili9341_text_with_font'] = self.ili9341_text_with_font;
    Blockly.Python['ili9341_pixel'] = self.ili9341_pixel;
    Blockly.Python['ili9341_line'] = self.ili9341_line;
    Blockly.Python['ili9341_rectangle'] = self.ili9341_rectangle;
    Blockly.Python['ili9341_ellipse'] = self.ili9341_ellipse;
    Blockly.Python['ili9341_image_from_file'] = self.ili9341_image_from_file;
    Blockly.Python['ili9341_image_from_buf'] = self.ili9341_image_from_buf;
    Blockly.Python.addReservedWords('ili9341,ili9341_device');

    Blockly.Python['xglcd_font_load'] = self.xglcd_font_load;
    Blockly.Python.addReservedWords('xglcd_font');

    Blockly.Python['xpt2046_init'] = self.xpt2046_init;
    Blockly.Python['xpt2046_get_pos'] = self.xpt2046_get_pos;
    Blockly.Python['xpt2046_in_rect'] = self.xpt2046_in_rect;
    Blockly.Python['xpt2046_in_circle'] = self.xpt2046_in_circle;
    Blockly.Python.addReservedWords('xpt2046,xpt2046_device');

    Blockly.Python['st7789_init'] = self.st7789_init;
    Blockly.Python['st7789_color'] = self.st7789_color;
    Blockly.Python['st7789_rgb'] = self.st7789_rgb;
    Blockly.Python['st7789_hsv'] = self.st7789_hsv;
    Blockly.Python['st7789_fill'] = self.st7789_fill;
    Blockly.Python['st7789_text8x8'] = self.st7789_text8x8;
    Blockly.Python['st7789_text_with_font'] = self.st7789_text_with_font;
    Blockly.Python['st7789_pixel'] = self.st7789_pixel;
    Blockly.Python['st7789_line'] = self.st7789_line;
    Blockly.Python['st7789_rectangle'] = self.st7789_rectangle;
    Blockly.Python['st7789_ellipse'] = self.st7789_ellipse;
    Blockly.Python['st7789_image_from_file'] = self.st7789_image_from_file;
    Blockly.Python['st7789_image_from_buf'] = self.st7789_image_from_buf;
    Blockly.Python.addReservedWords('st7789,st7789_device');

    Blockly.Python['lds02rr_init'] = self.lds02rr_init;
    Blockly.Python['lds02rr_update'] = self.lds02rr_update;
    Blockly.Python['lds02rr_rpm'] = self.lds02rr_rpm;
    Blockly.Python['lds02rr_distances'] = self.lds02rr_distances;
    Blockly.Python.addReservedWords('lds02rr,lds02rr_device');

    Blockly.Python['amg8833_init'] = self.amg8833_init;
    Blockly.Python['amg8833_set_ma_mode'] = self.amg8833_set_ma_mode;
    Blockly.Python['amg8833_read'] = self.amg8833_read;
    Blockly.Python['amg8833_get_buf'] = self.amg8833_get_buf;
    Blockly.Python['amg8833_get_temperature'] = self.amg8833_get_temperature;
    Blockly.Python['amg8833_get_thermistor_temperature'] = self.amg8833_get_thermistor_temperature;
    Blockly.Python.addReservedWords('amg8833');

    Blockly.Python['vs1003_init'] = self.vs1003_init;
    Blockly.Python['vs1003_set_stream_mode'] = self.vs1003_set_stream_mode;
    Blockly.Python['vs1003_set_volume'] = self.vs1003_set_volume;
    Blockly.Python['vs1003_dreq_ready'] = self.vs1003_dreq_ready;
    Blockly.Python['vs1003_play_bytes'] = self.vs1003_play_bytes;
    Blockly.Python['vs1003_play_file'] = self.vs1003_play_file;
    Blockly.Python['vs1003_reset'] = self.vs1003_reset;
    Blockly.Python['vs1003_start_recording_to_file'] = self.vs1003_start_recording_to_file;
    Blockly.Python['vs1003_record_to_file'] = self.vs1003_record_to_file;
    Blockly.Python['vs1003_stop_recording_to_file'] = self.vs1003_stop_recording_to_file;
    Blockly.Python.addReservedWords('vs1003');

    Blockly.Python['bytesBuffer_init'] = self.bytesBuffer_init;
    Blockly.Python['circularBuffer_can_write'] = self.circularBuffer_can_write;
    Blockly.Python['circularBuffer_write'] = self.circularBuffer_write;
    Blockly.Python['circularBuffer_can_read'] = self.circularBuffer_can_read;
    Blockly.Python['circularBuffer_read'] = self.circularBuffer_read;
    Blockly.Python['circularBuffer_free_space'] = self.circularBuffer_free_space;
    Blockly.Python.addReservedWords('circularBuffer');

    Blockly.Python['idle'] = self.idle;
    Blockly.Python['lightsleep'] = self.lightsleep;
    Blockly.Python['deepsleep'] = self.deepsleep;
    Blockly.Python['wake_reason'] = self.wake_reason;
    Blockly.Python['reset_cause'] = self.reset_cause;
    Blockly.Python['start_watchdog'] = self.start_watchdog;
    Blockly.Python['feed_watchdog'] = self.feed_watchdog;
    Blockly.Python.addReservedWords('watchdog_timer');

  };

  // Generate python code
  this.genCode = function() {
    self.imports = {};
    self.iotyImports = {};
    self.mqttSubscriptions = {};
    self.ezTimerCb = [];
    self.reservedVariables = {};
    self.startType = 'RUN';

    let workspaceCode = Blockly.Python.workspaceToCode(blockly.workspace);

    workspaceCode = self._mqttCBSubstitution(workspaceCode);
    workspaceCode = self._mqttSubscriptionSubstitution(workspaceCode);
    workspaceCode = self._ezTimerCBSubstitution(workspaceCode);
    workspaceCode = self._reservedVariablesSubstitution(workspaceCode);

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

    for (let key in self.reservedVariables) {
      let globals = '';
      for (let varName of self.reservedVariables[key]) {
        globals += varName + ' = ';
      }
      globals += 'None\n';
      code += globals;
    }
    code += '\n';

    code += workspaceCode;

    return code
  };

  this._reservedVariablesSubstitution = function(code) {
    let placeholderRegexStr = '([^\S\r\n]*)' + self.RESERVED_VARIABLES_PLACEHOLDER;
    let placeholderRegexG = new RegExp(placeholderRegexStr, 'g');
    let placeholderRegex = new RegExp(placeholderRegexStr);

    let reservedVariables = [];
    for (let key in self.reservedVariables) {
      for (let varName of self.reservedVariables[key]) {
        reservedVariables.push(varName);
      }
    }
    const globalString = reservedVariables.length ?
      Blockly.Python.INDENT + 'global ' + reservedVariables.join(', ') + '\n' :
      '';

    let matches = code.matchAll(placeholderRegexG);
    for (let _ of matches) {
      code = code.replace(placeholderRegex, globalString);
    }

    return code;
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
      for (let topic in self.mqttSubscriptions) {
        let cb = self.mqttSubscriptions[topic];
        if (first) {
          first = false;
          replacementCode += spaces + 'if ';
        } else {
          replacementCode += spaces + 'elif ';
        }

        replacementCode += 'topic == b\'' + topic + '\':\n';
        replacementCode += spaces + '    ' + cb;
      }
      code = code.replace(placeholderRegex, replacementCode);
    }

    return code;
  }

  this._mqttSubscriptionSubstitution = function(code) {
    let placeholderRegexStr = '([^\S\r\n]*)' + self.MQTT_SUBSCRIPTION_PLACEHOLDER;
    let placeholderRegexG = new RegExp(placeholderRegexStr, 'g');
    let placeholderRegex = new RegExp(placeholderRegexStr);

    let replacementCode = '';
    for (let topic in self.mqttSubscriptions) {
      replacementCode += 'ioty_mqtt.subscribe(b\'' + topic + '\')\n';
    }

    let matches = code.matchAll(placeholderRegexG);
    for (let _ of matches) {
      let prefixSpaces = code.match(placeholderRegex)[1];
      code = code.replace(placeholderRegex, prefixSpaces + replacementCode);
    }

    return code;
  }

  this._ezTimerCBSubstitution = function(code) {
    let placeholderRegexStr = '([^\S\r\n]*)' + self.EZ_TIMER_CALLBACK_PLACEHOLDER;
    let placeholderRegexG = new RegExp(placeholderRegexStr, 'g');
    let placeholderRegex = new RegExp(placeholderRegexStr);

    let replacementCode = '';
    for (let cb of self.ezTimerCb) {
      replacementCode += 'ez_timer_obj.set_interval(' + cb.function + ', ' + cb.interval + ', offset=' + cb.offset + ')\n';
    }

    let matches = code.matchAll(placeholderRegexG);
    for (let _ of matches) {
      let prefixSpaces = code.match(placeholderRegex)[1];
      code = code.replace(placeholderRegex, prefixSpaces + replacementCode);
    }

    return code;
  }

  //
  // Python Generators
  //

  this.procedures_defreturn = function(block) {
    // First, add a 'global' statement for every variable that is not shadowed by
    // a local parameter.
    const globals = [];
    const workspace = blockly.workspace;
    const usedVariables = Blockly.Variables.allUsedVarModels(workspace) || [];
    for (const variable of usedVariables) {
      const varName = variable.name;
      // getVars returns parameter names, not ids, for procedure blocks
      if (!block.getVars().includes(varName)) {
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

    // Generate function code
    const funcName = Blockly.Python.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Names.NameType.PROCEDURE);
    const args = [];
    const variables = block.getVars();
    for (let i = 0; i < variables.length; i++) {
      args[i] = Blockly.Python.nameDB_.getName(variables[i], Blockly.Names.NameType.VARIABLE);
    }
    let statements = Blockly.Python.statementToCode(block, 'STACK');
    let returnValue = Blockly.Python.valueToCode(block, 'RETURN', Blockly.Python.ORDER_NONE) || '';
    if (returnValue) {
      returnValue = Blockly.Python.INDENT + 'return ' + returnValue + '\n';
    } else if (!statements) {
      statements = Blockly.Python.INDENT + 'pass';
    }
    let code =
      'def ' + funcName + '(' + args.join(', ') + '):\n'
      + globalString
      + self.RESERVED_VARIABLES_PLACEHOLDER
      + statements
      + returnValue;

    Blockly.Python.definitions_[funcName] = code;

    return null;
  }

  // Start
  this.when_started = function(block) {
    var start_type = block.getFieldValue('start_type');

    self.startType = start_type;

    var code = '#\n# When Started, run the following code\n#\n';
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

  this.touch_read_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = block.getFieldValue('pin');

    var code = 'pin.touch_read(' + pin + ')';

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

  this.adv_set_pin_mode = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
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

  this.adv_digital_read_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);

    var code = 'pin.digital_read(' + pin + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.adv_digital_write_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pin.digital_write(' + pin + ', ' + value + ')\n';

    return code;
  };

  this.adv_analog_read_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);

    var code = 'pin.analog_read(' + pin + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.adv_touch_read_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);

    var code = 'pin.touch_read(' + pin + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.adv_set_analog_write_freq = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.Python.ORDER_NONE);

    var code = 'pin.set_analog_write_freq(' + pin + ', ' + frequency + ')\n';

    return code;
  };

  this.adv_analog_write_pin = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pin.analog_write(' + pin + ', ' + value + ')\n';

    return code;
  };

  this.adv_servo_write_deg = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var deg = Blockly.Python.valueToCode(block, 'deg', Blockly.Python.ORDER_NONE);

    var code = 'pin.servo_write_deg(' + pin + ', ' + deg + ')\n';

    return code;
  };

  this.adv_servo_write_us = function(block) {
    self.iotyImports['pin'] = 'pin';

    var pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var us = Blockly.Python.valueToCode(block, 'us', Blockly.Python.ORDER_NONE);

    var code = 'pin.servo_write_us(' + pin + ', ' + us + ')\n';

    return code;
  };

  this.adv_hc_sr04_ping = function(block) {
    self.iotyImports['pin'] = 'pin';

    var trig = Blockly.Python.valueToCode(block, 'trig', Blockly.Python.ORDER_ATOMIC);
    var echo = Blockly.Python.valueToCode(block, 'echo', Blockly.Python.ORDER_ATOMIC);
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

  this.comment = function(block) {
    var value = block.getFieldValue('value');

    // var code = '\n# ' + value + '\n\n';
    var code = '';

    for (let line of value.split('\n')) {
      code += '\n# ' + line;
    }

    code += '\n\n';

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
      code = '(time.ticks_ms() / 1000)';
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
    } else if (type == 'HEX') {
      type = 'hex(';
    }

    var code = type + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.bytes = function(block) {
    const bytestring = block.getFieldValue('bytestring');

    let outstring = '';
    let escaped = false;
    for (c of bytestring) {
      if (c == "'" && escaped == false) {
        outstring += '\\';
      }
      outstring += c;
      if (c == '\\' && escaped == false) {
        escaped = true;
      } else {
        escaped = false;
      }
    }

    let code = 'b\'' + outstring + '\'';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bytearray = function(block) {
    const bytestring = block.getFieldValue('bytestring');

    let outstring = '';
    let escaped = false;
    for (c of bytestring) {
      if (c == "'" && escaped == false) {
        outstring += '\\';
      }
      outstring += c;
      if (c == '\\' && escaped == false) {
        escaped = true;
      } else {
        escaped = false;
      }
    }

    let code = 'bytearray(b\'' + outstring + '\')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bytearray_by_size = function(block) {
    var size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);

    let code = 'bytearray(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bytearray_get_slice = function(block) {
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var start = Blockly.Python.valueToCode(block, 'start', Blockly.Python.ORDER_ATOMIC);
    var end = Blockly.Python.valueToCode(block, 'end', Blockly.Python.ORDER_ATOMIC);

    let code = variable + '[' + start + ':' + end + ']';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bytearray_set_slice = function(block) {
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var start = Blockly.Python.valueToCode(block, 'start', Blockly.Python.ORDER_ATOMIC);
    var end = Blockly.Python.valueToCode(block, 'end', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    let code = variable + '[' + start + ':' + end + '] = ' + value + '\n';

    return code;
  };

  this.decode = function(block) {
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = value + '.decode(\'utf-8\')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.encode = function(block) {
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = value + '.encode(\'utf-8\')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.unpack = function(block) {
    self.imports['struct'] = 'import struct';

    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var format = block.getFieldValue('format');

    var code = 'struct.unpack(\'' + format + '\', ' + value + ')';

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

  this.base64_encode = function(block) {
    self.imports['binascii'] = 'import binascii';

    let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    let code = 'binascii.b2a_base64(' + value + ')[:-1].decode()';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.base64_decode = function(block) {
    self.imports['binascii'] = 'import binascii';

    let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    let code = 'binascii.a2b_base64(' + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.binary_op = function(block) {
    var value1 = Blockly.Python.valueToCode(block, 'value1', Blockly.Python.ORDER_ATOMIC);
    var op = block.getFieldValue('op');
    var value2 = Blockly.Python.valueToCode(block, 'value2', Blockly.Python.ORDER_ATOMIC);

    var code = value1 + ' ' + op + ' ' + value2;

    return [code, Blockly.Python.ORDER_RELATIONAL];
  };

  this.binary_not = function(block) {
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = `~` + value;

    return [code, Blockly.Python.ORDER_RELATIONAL];
  };

  this.binary_shift = function(block) {
    var value1 = Blockly.Python.valueToCode(block, 'value1', Blockly.Python.ORDER_ATOMIC);
    var op = block.getFieldValue('op');
    var value2 = Blockly.Python.valueToCode(block, 'value2', Blockly.Python.ORDER_ATOMIC);

    var code = value1 + ' ' + op + ' ' + value2;

    return [code, Blockly.Python.ORDER_RELATIONAL];
  };

  this.neopixel_init = function(block) {
    self.imports['ioty_neopixel'] = 'import ioty_neopixel';

    var pin = block.getFieldValue('pin');
    var pixels = Blockly.Python.valueToCode(block, 'pixels', Blockly.Python.ORDER_ATOMIC);
    var format = block.getFieldValue('format');

    var code = 'ioty_neopixel.init(' + pin + ', ' + pixels + ', format=' + format + ')\n';

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
    self.imports['ioty_neopixel'] = 'import ioty_neopixel';

    var hue = Blockly.Python.valueToCode(block, 'hue', Blockly.Python.ORDER_ATOMIC);
    var saturation = Blockly.Python.valueToCode(block, 'saturation', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'ioty_neopixel.hsv2rgb(' + hue + ', ' + saturation + ', ' + value + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.neopixel_set = function(block) {
    self.imports['ioty_neopixel'] = 'import ioty_neopixel';

    var pin = block.getFieldValue('pin');
    var pixel = Blockly.Python.valueToCode(block, 'pixel', Blockly.Python.ORDER_NONE);
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'ioty_neopixel.set(' + pin + ', ' + pixel + ', ' + color + ')\n';

    return code;
  };

  this.neopixel_fill = function(block) {
    self.imports['ioty_neopixel'] = 'import ioty_neopixel';

    var pin = block.getFieldValue('pin');
    var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'ioty_neopixel.fill(' + pin + ', ' + color + ')\n';

    return code;
  };

  this.neopixel_write = function(block) {
    self.imports['ioty_neopixel'] = 'import ioty_neopixel';

    var pin = block.getFieldValue('pin');

    var code = 'ioty_neopixel.write(' + pin + ')\n';

    return code;
  };

  this.connect_to_wifi = function(block) {
    self.imports['ioty_wifi'] = 'import ioty.wifi';
    self.reservedVariables['connect_to_wifi'] = ['ioty_wifi'];

    var ssid = block.getFieldValue('ssid');
    var password = block.getFieldValue('password');

    ssid = escapeSingleQuotes(ssid);
    password = escapeSingleQuotes(password);

    var code =
      'ioty_wifi = ioty.wifi.connect(\'' + ssid + '\', \'' + password + '\')\n'

    return code;
  };

  this.connect_to_wifi_blocks_input = function(block) {
    self.imports['ioty_wifi'] = 'import ioty.wifi';
    self.reservedVariables['connect_to_wifi'] = ['ioty_wifi'];

    let ssid = Blockly.Python.valueToCode(block, 'ssid', Blockly.Python.ORDER_NONE);
    let password = Blockly.Python.valueToCode(block, 'password', Blockly.Python.ORDER_NONE);

    var code =
      'ioty_wifi = ioty.wifi.connect(' + ssid + ', ' + password + ')\n'

    return code;
  };

  this.connect_to_configured_wifi = function(block) {
    self.imports['ioty_wifi'] = 'import ioty.wifi';
    self.reservedVariables['connect_to_wifi'] = ['ioty_wifi'];

    var code =
      'ioty_wifi = ioty.wifi.connect_configured()\n'

    return code;
  };

  this.wlan_get_ip = function(block) {
    var code = 'ioty.wifi.get_ip()';

    return [code, Blockly.Python.ORDER_NONE];
  };

  this.start_as_ap = function(block) {
    self.imports['ioty_wifi'] = 'import ioty.wifi';
    self.reservedVariables['start_as_ap'] = ['ioty_ap'];

    var ssid = block.getFieldValue('ssid');
    var password = block.getFieldValue('password');

    ssid = escapeSingleQuotes(ssid);
    password = escapeSingleQuotes(password);

    var code =
      'ioty_wifi = ioty.wifi.start_ap(\'' + ssid + '\', \'' + password + '\')\n'

    return code;
  };

  this.wlan_scan = function(block) {
    self.imports['ioty_wifi'] = 'import ioty.wifi';

    var code = 'ioty.wifi.scan()';

    return [code, Blockly.Python.ORDER_NONE];
  };

  this.wlan_is_present = function(block) {
    self.imports['ioty_wifi'] = 'import ioty.wifi';

    var ssid = Blockly.Python.valueToCode(block, 'ssid', Blockly.Python.ORDER_NONE);

    var code = 'ioty.wifi.is_present(' + ssid + ')';

    return [code, Blockly.Python.ORDER_NONE];
  };

  this.wlan_is_connected = function(block) {
    self.imports['ioty_wifi'] = 'import ioty.wifi';

    var code = 'ioty.wifi.isconnected()';

    return [code, Blockly.Python.ORDER_NONE];
  };

  this.setBluetoothCmds = function(block) {
    let value = block.getFieldValue('value');

    if (self.startType != 'RUN' && self.startType != 'WAIT') {
      return '# Enable / Disable receiving commands requires no code as Bluetooth is not enabled.\n';
    }

    if (value == 'DISABLED') {
      value = 'False';
    } else {
      value = 'True';
    }

    let code = 'ioty.monitor.ble_service.allowProgramming = ' + value + '\n';

    return code;
  };

  this.try_except = function(block) {
    // Usual stuff
    var tryStatements = Blockly.Python.statementToCode(block, 'try');
    var exceptStatements = Blockly.Python.statementToCode(block, 'except');

    var code =
      'try:\n' +
      (tryStatements ? tryStatements : '    pass\n') +
      'except:\n' +
      (exceptStatements ? exceptStatements : '    pass\n');

    return code;
  };

  this.run_python = function(block) {
    let value = block.getFieldValue('value');

    let code = value + '\n';

    return code;
  };

  this.run_python_and_return = function(block) {
    let value = block.getFieldValue('value');

    let code = value;

    return [code, Blockly.Python.ORDER_NONE];
  };

  this.mqtt_connect_to_server = function(block) {
    self.imports['umqtt'] = 'from umqtt.robust import MQTTClient';
    self.imports['machine'] = 'import machine';
    self.imports['binascii'] = 'import binascii';
    self.reservedVariables['mqtt_connect_to_server'] = ['ioty_mqtt'];

    var server = block.getFieldValue('server');
    var port = block.getFieldValue('port');
    var name = block.getFieldValue('name');
    var password = block.getFieldValue('password');
    var ssl = block.getFieldValue('ssl');

    let sslParams = '';
    if (ssl == 'SSL') {
      sslParams = ',ssl=True, ssl_params={\'server_hostname\':\'' + server + '\'}';
    }

    name = escapeSingleQuotes(name);
    password = escapeSingleQuotes(password);

    var code =
      '\n# MQTT callback\n' +
      'def ioty_mqtt_cb(topic, msg):\n' +
      '    ' + self.MQTT_CALLBACK_PLACEHOLDER +
      '\n# Connect to MQTT server\n' +
      'ioty_mqtt = MQTTClient(' +
        'binascii.hexlify(machine.unique_id()), \'' + server + '\'' +
        ', port=' + port +
        ', user=\'' + name + '\'' +
        ', password=\'' + password + '\'' +
        ', keepalive=60' +
        sslParams +
        ')\n' +
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

    topic = escapeSingleQuotes(topic);

    let functionName = 'ioty_mqtt_cb_' + topic.replaceAll(/\W*/g, '');

    self.mqttSubscriptions[topic] = functionName + '(msg.decode())\n';

    var code =
      '\n# MQTT callback for topic ' + topic + '\n' +
      'def ' + functionName + '(mqtt_msg):\n'
      + globalString
      + self.RESERVED_VARIABLES_PLACEHOLDER;

    code += statements ? statements : '    pass\n';

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

    topic = escapeSingleQuotes(topic);

    var code = 'ioty_mqtt.publish(b\'' + topic + '\', bytes(' + value + ', \'utf-8\'))\n'

    return code;
  };

  this.mqtt_publish_bytes = function(block) {
    var topic = block.getFieldValue('topic');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    topic = escapeSingleQuotes(topic);

    var code = 'ioty_mqtt.publish(b\'' + topic + '\', ' + value + ')\n'

    return code;
  };

  this.i2c_init = function(block) {
    self.imports['machine'] = 'import machine';

    var id = block.getFieldValue('id');
    var freq = block.getFieldValue('freq');

    self.reservedVariables['i2c' + id] = ['i2c' + id];

    var code = 'i2c' + id + ' = machine.I2C(' + id + ', freq=' + freq + ')\n';

    return code;
  };

  this.i2c_init_with_pins = function(block) {
    self.imports['machine'] = 'import machine';

    var id = block.getFieldValue('id');
    var scl = block.getFieldValue('scl');
    var sda = block.getFieldValue('sda');
    var freq = block.getFieldValue('freq');

    self.reservedVariables[id] = [id];

    let cmd = 'I2C';
    let channel = id.slice(-1) + ', '
    if (id.slice(0,4) == 'soft') {
      cmd = 'SoftI2C';
      channel = '';
    }

    var code = id + ' = machine.' + cmd + '(' + channel + 'scl=machine.Pin(' + scl + '), sda=machine.Pin(' + sda + '), freq=' + freq + ')\n';

    return code;
  };

  this.i2c_scan = function(block) {
    var id = block.getFieldValue('id');

    var code = id + '.scan()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.i2c_writeto_mem = function(block) {
    self.imports['struct'] = 'import struct';

    var id = block.getFieldValue('id');
    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var register = Blockly.Python.valueToCode(block, 'register', Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');

    var code = id + '.writeto_mem(' + address + ', ' + register + ', struct.pack(\'' + format + '\', ' + value + '))\n';

    return code;
  };

  this.i2c_readfrom_mem = function(block) {
    self.imports['struct'] = 'import struct';

    var id = block.getFieldValue('id');
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

    var code = 'struct.unpack(\'' + format + '\', ' + id + '.readfrom_mem(' + address + ', ' + register + ', ' + size + '))[0]';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.i2c_writeto = function(block) {
    self.imports['struct'] = 'import struct';

    var id = block.getFieldValue('id');
    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');
    var stop = block.getFieldValue('stop');

    let stopParam = '';
    if (stop != 'STOP') {
      stopParam = ', False';
    }

    var code = id + '.writeto(' + address + ', struct.pack(\'' + format + '\', ' + value + ')' + stopParam + ')\n';

    return code;
  };

  this.i2c_readfrom = function(block) {
    self.imports['struct'] = 'import struct';

    var id = block.getFieldValue('id');
    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');
    var stop = block.getFieldValue('stop');

    let stopParam = '';
    if (stop != 'STOP') {
      stopParam = ', False';
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

    var code = 'struct.unpack(\'' + format + '\', ' + id + '.readfrom(' + address + ', ' + size + stopParam + '))[0]';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.i2c_readfrom_bytes = function(block) {
    var id = block.getFieldValue('id');
    var address = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_NONE);
    var bytes = Blockly.Python.valueToCode(block, 'bytes', Blockly.Python.ORDER_NONE);
    var stop = block.getFieldValue('stop');

    let stopParam = '';
    if (stop != 'STOP') {
      stopParam = ', False';
    }

    var code = id + '.readfrom(' + address + ', ' + bytes + stopParam + ')';

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
    self.imports['machine'] = 'import machine';

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

  this.file_write_binary = function(block) {
    var variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    var code = variable + '.write(' + value + ')\n';

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

  this.file_list_dir = function(block) {
    self.imports['os'] = 'import os';

    var path = Blockly.Python.valueToCode(block, 'path', Blockly.Python.ORDER_NONE);

    var code = 'os.listdir(' + path + ')';

    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  };

  this.sdcard_init = function(block) {
    self.imports['machine'] = 'import machine';
    self.imports['os'] = 'import os';

    let slot = block.getFieldValue('slot');
    let cs = block.getFieldValue('cs');
    let sck = block.getFieldValue('sck');
    let mosi = block.getFieldValue('mosi');
    let miso = block.getFieldValue('miso');
    let dirname = Blockly.Python.valueToCode(block, 'dirname', Blockly.Python.ORDER_NONE);

    var code =
      'sdcard = machine.SDCard(slot=' + slot + ', sck=Pin(' + sck + '), miso=Pin(' + miso + '), mosi=Pin(' + mosi + '), cs=Pin(' + cs + '))\n' +
      'os.mount(sdcard, ' + dirname + ')\n';
    return code;
  };

  this.sdcard_deinit = function(block) {
    self.imports['machine'] = 'import machine';
    self.imports['os'] = 'import os';

    let dirname = Blockly.Python.valueToCode(block, 'dirname', Blockly.Python.ORDER_NONE);

    var code =
      'os.umount(' + dirname + ')\n' +
      'sdcard.deinit()\n';
    return code;
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

  this.mpu6050_init = function(block) {
    self.imports['mpu6050'] = 'import mpu6050';
    self.reservedVariables['mpu6050_init'] = ['mpu6050_device'];

    var id = block.getFieldValue('id');
    var addr = block.getFieldValue('addr');

    var code =
      'mpu6050_device = mpu6050.MPU6050(' + id + ', ' + addr + ')\n';
    return code;
  };

  this.mpu6050_calibrate = function(block) {
    var code = 'mpu6050_device.calibrate_gyro()\n';

    return code;
  };

  this.mpu6050_reset = function(block) {
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let z = Blockly.Python.valueToCode(block, 'z', Blockly.Python.ORDER_NONE);

    if (!x) { x = '0'; }
    if (!y) { y = '0'; }
    if (!z) { z = '0'; }

    var code = 'mpu6050_device.reset_gyro(' + x + ', ' + y + ', ' + z + ')\n';

    return code;
  };

  this.mpu6050_update = function(block) {
    var code = 'mpu6050_device.update_angle()\n';

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

    var code = 'mpu6050_device.' + func + '()';

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

    var code = 'mpu6050_device.' + func + '()';

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

    var code = 'mpu6050_device.' + func + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mpu6050_temperature = function(block) {
    var devType = block.getFieldValue('type');

    var code = 'mpu6050_device.temperature_' + devType + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mpu6050_get_calibration = function(block) {
    var code = 'mpu6050_device.get_calibration()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mpu6050_set_calibration = function(block) {
    var calibration = Blockly.Python.valueToCode(block, 'calibration', Blockly.Python.ORDER_NONE);

    var code = 'mpu6050_device.set_calibration(' + calibration + ')\n';

    return code;
  };

  this.pca9685_init = function(block) {
    self.imports['pca9685'] = 'import pca9685';
    self.reservedVariables['pca9685_init'] = ['pca9685_device'];

    var id = block.getFieldValue('id');
    var addr = block.getFieldValue('addr');

    var code = 'pca9685_device = pca9685.PCA9685(' + id + ', ' + addr + ')\n';

    return code;
  };

  this.pca9685_set_freq = function(block) {
    var freq = block.getFieldValue('freq');

    var code = 'pca9685_device.set_frequency(' + freq + ')\n';

    return code;
  };

  this.pca9685_analog_write = function(block) {
    var channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pca9685_device.pwm(' + channel + ', ' + value + ')\n';

    return code;
  };

  this.pca9685_write_angle = function(block) {
    var channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pca9685_device.servo_deg(' + channel + ', ' + value + ')\n';

    return code;
  };

  this.pca9685_write_us = function(block) {
    var channel = Blockly.Python.valueToCode(block, 'channel', Blockly.Python.ORDER_ATOMIC);
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    var code = 'pca9685_device.servo_us(' + channel + ', ' + value + ')\n';

    return code;
  };

  this.ssd1306_init = function(block) {
    self.imports['ssd1306'] = 'import ssd1306';
    self.reservedVariables['ssd1306_init'] = ['ssd1306_i2c'];

    var id = block.getFieldValue('id');
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var addr = block.getFieldValue('addr');

    var code =
      'ssd1306_i2c = ssd1306.SSD1306_I2C(' + width + ', ' + height + ', ' + id +', ' + addr + ')\n'+
      'ssd1306_i2c.init_display()\n';

    return code;
  };

  this.ssd1306_init_sh1106 = function(block) {
    self.imports['ssd1306'] = 'import ssd1306';
    self.reservedVariables['ssd1306_init'] = ['ssd1306_i2c'];

    var id = block.getFieldValue('id');
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var addr = block.getFieldValue('addr');

    var code =
      'ssd1306_i2c = ssd1306.SSD1306_I2C(' + width + ', ' + height + ', ' + id + ', ' + addr + ', driver=ssd1306.TYPE_SH1106)\n'+
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

    if (fill == 'True') {
      fill = ', True';
    } else {
      fill = '';
    }

    var code = 'ssd1306_i2c.rect(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + color + fill + ')\n';

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

  this.dict_key_value_input = function(block) {
    var variable = Blockly.Python.valueToCode(block, 'variable', Blockly.Python.ORDER_NONE);
    if (variable == '') {
      variable = 'None';
    }

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
    self.reservedVariables['urequests_simple_advance'] = ['urequest'];

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
      param += ', headers=' + header;
    }

    var code =
      'try:\n' +
      '    urequest = urequests.request(\'' + method + '\', ' + url + param + ')\n' +
      '    ' + variable + ' = urequest' + return_method + '\n' +
      '    urequest.close()\n' +
      on_success +
      'except:\n';

    if (on_fail) {
      code += on_fail;
    } else {
      code += '    pass\n';
    }

    return code;
  };

  this.urequests_connect = function(block) {
    self.imports['urequests'] = 'import urequests';
    self.reservedVariables['urequests_simple_advance'] = ['urequest'];

    let method = block.getFieldValue('method');
    var url = Blockly.Python.valueToCode(block, 'url', Blockly.Python.ORDER_ATOMIC);
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
      param += ', headers=' + header;
    }

    var code =
      'try:\n' +
      '    urequest = urequests.request(\'' + method + '\', ' + url + param + ')\n' +
      on_success +
      'except:\n';

    if (on_fail) {
      code += on_fail;
    } else {
      code += '    pass\n';
    }

    return code;
  };

  this.urequests_read = function(block) {
    let size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);

    let code = 'urequest.read(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.urequests_settimeout = function(block) {
    let timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_ATOMIC);

    let code = 'urequest.settimeout(' + timeout + ')\n';

    return code;
  };

  this.esp_now_init = function(block) {
    self.imports['network'] = 'import network';
    self.imports['espnow'] = 'import espnow';
    self.reservedVariables['esp_now_init'] = ['esp_now'];

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
    self.reservedVariables['ez_httpd_init'] = ['ezhttpd'];

    let addr = Blockly.Python.valueToCode(block, 'addr', Blockly.Python.ORDER_ATOMIC);
    let port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);

    var code = 'ezhttpd = ez_httpd.HTTPD(address=' + addr + ', port=' + port + ')\n';

    return code;
  };

  this.ez_httpd_available = function(block) {
    var code = 'ezhttpd.available()';

    return [code, Blockly.Python.ORDER_ATOMIC];
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

  this.ez_httpd_send_bytes = function(block) {
    let response = Blockly.Python.valueToCode(block, 'response', Blockly.Python.ORDER_ATOMIC);

    var code = 'ezhttpd.send_bytes(' + response + ')\n';

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
    self.reservedVariables['i2c_lcd_init'] = ['lcd'];

    var id = block.getFieldValue('id');
    var lines = block.getFieldValue('lines');
    var columns = block.getFieldValue('columns');
    var addr = block.getFieldValue('addr');

    var code =
      'lcd = i2c_lcd.LCD(' + id + ', ' + addr + ', ' + lines + ', ' + columns + ')\n';

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
    self.reservedVariables['dht_init'] = ['dht_device'];

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
    self.reservedVariables['ez_ds18x20_init'] = ['ds_device'];

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
    self.reservedVariables['non_block_init'] = ['nblock'];

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

    self.reservedVariables['uart' + id] = ['uart' + id];

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
    self.reservedVariables['gps_init'] = ['gps_device'];

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
    self.reservedVariables['hx711_init'] = ['hx711_device'];

    var dt = block.getFieldValue('dt');
    var sck = block.getFieldValue('sck');

    var code = 'hx711_device = hx711.HX711(' + dt + ', ' + sck + ')\n';

    return code;
  };

  this.hx711_read = function(block) {
    let code = 'hx711_device.read()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.hx710_init = function(block) {
    self.imports['hx710'] = 'import hx710';
    self.reservedVariables['hx710_init'] = ['hx710_device'];

    var dt = block.getFieldValue('dt');
    var sck = block.getFieldValue('sck');

    var code = 'hx710_device = hx710.HX710(' + dt + ', ' + sck + ')\n';

    return code;
  };

  this.hx710_read = function(block) {
    var next = block.getFieldValue('next');

    let code = 'hx710_device.read(hx710.' + next + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ez_timer_init = function(block) {
    self.imports['ez_timer'] = 'import ez_timer';
    self.reservedVariables['ez_timer_init'] = ['ez_timer_obj'];

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
      + globalString
      + self.RESERVED_VARIABLES_PLACEHOLDER;

    code += statements;

    Blockly.Python.definitions_[functionName] = code;

    return null;
  };

  this.ez_timer_set_timeout = function(block) {
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
    var interval = block.getFieldValue('timeout');
    var statements = Blockly.Python.statementToCode(block, 'statements');

    var code =
      'def ez_timer_timeout_fn():\n'
      + globalString
      + self.RESERVED_VARIABLES_PLACEHOLDER
      + statements
      + 'ez_timer_obj.set_timeout(ez_timer_timeout_fn, ' + interval + ')\n';

    return code;
  };

  this.spi_init = function(block) {
    self.imports['machine'] = 'import machine';

    var id = block.getFieldValue('id');
    var baudrate = block.getFieldValue('baudrate');
    var sck = block.getFieldValue('sck');
    var mosi = block.getFieldValue('mosi');
    var miso = block.getFieldValue('miso');

    self.reservedVariables[id] = [id];

    let cmd = 'SPI';
    let channel = id.slice(-1) + ', ';
    if (id.slice(0,4) == 'soft') {
      cmd = 'SoftSPI';
      channel = '';
    }

    var code =
      id + ' = machine.' + cmd + '(' + channel + 'baudrate=' + baudrate + ', sck=Pin(' + sck + '), mosi=Pin(' + mosi + '), miso=Pin(' + miso + '))\n';

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

    var code = 'struct.unpack(\'' + format + '\', ' + id + '.read(' + size + '))[0]';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.spi_write = function(block) {
    self.imports['struct'] = 'import struct';

    var id = block.getFieldValue('id');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);
    var format = block.getFieldValue('format');

    var code = id + '.write(struct.pack(\'' + format + '\', ' + value + '))\n';

    return code;
  };

  this.mfrc522_init = function(block) {
    self.imports['mfrc522'] = 'import mfrc522';
    self.reservedVariables['mfrc522_init'] = ['mfrc522_device'];

    var spi = block.getFieldValue('spi');
    var rst = block.getFieldValue('rst');
    var cs = block.getFieldValue('cs');

    var code =
      'mfrc522_device = mfrc522.MFRC522(' + spi + ', ' + rst + ', ' + cs + ')\n';

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
    self.reservedVariables['qmc5883l_init'] = ['qmc5883l_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');
    let scale = block.getFieldValue('scale');

    let code =
      'qmc5883l_device = qmc5883l.QMC5883L(' + id + ', addr=' + addr + ', scale=qmc5883l.SCALE_' + scale + ')\n';

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

  this.hmc5883l_init = function(block) {
    self.imports['hmc5883l'] = 'import hmc5883l';
    self.reservedVariables['hmc5883l_init'] = ['hmc5883l_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');
    let scale = block.getFieldValue('scale');

    let code =
      'hmc5883l_device = hmc5883l.HMC5883L(' + id + ', addr=' + addr + ', scale=hmc5883l.SCALE_' + scale + ')\n';

    return code;
  };

  this.hmc5883l_read = function(block) {
    let code = 'hmc5883l_device.read()\n';

    return code;
  };

  this.hmc5883l_value = function(block) {
    let axis = block.getFieldValue('axis');

    let code = 'hmc5883l_device.get_' + axis + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bmp280_init = function(block) {
    self.imports['bmp280'] = 'import bmp280';
    self.reservedVariables['bmp280_init'] = ['bmp280_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'bmp280_device = bmp280.BMP280(' + id + ', addr=' + addr + ')\n';

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
    self.reservedVariables['max30102_init'] = ['max30102_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');
    let red = block.getFieldValue('red');
    let ir = block.getFieldValue('ir');

    let code =
      'max30102_device = max30102.MAX30102(' + id + ', addr=' + addr + ', red_led=' + red + ', ir_led=' + ir + ')\n';

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

  this.vl53l0x_init = function(block) {
    self.imports['vl53l0x'] = 'import vl53l0x';
    self.reservedVariables['vl53l0x_init'] = ['vl53l0x_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'vl53l0x_device = vl53l0x.VL53L0X(' + id + ', addr=' + addr + ')\n' +
      'vl53l0x_device.start()\n';

    return code;
  };

  this.vl53l0x_read = function(block) {
    let code = 'vl53l0x_device.read()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.vl53l1x_init = function(block) {
    self.imports['vl53l1x'] = 'import vl53l1x';
    self.reservedVariables['vl53l1x_init'] = ['vl53l1x_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'vl53l1x_device = vl53l1x.VL53L1X(' + id + ', addr=' + addr + ')\n' +
      'vl53l1x_device.start()\n';

    return code;
  };

  this.vl53l1x_read = function(block) {
    let code = 'vl53l1x_device.read()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.vl53l1x_set_distance_mode = function(block) {
    let mode = block.getFieldValue('mode');

    let code =
      'vl53l1x_device.set_distance_mode_' + mode + '()\n';

    return code;
  };

  this.mqtt_logger_init = function(block) {
    self.imports['mqtt_logger'] = 'import mqtt_logger';

    let topic = block.getFieldValue('topic');
    let size = block.getFieldValue('size');

    topic = escapeSingleQuotes(topic);
    let dev_topic = topic + '_dev';

    self.mqttSubscriptions[dev_topic] = 'mqtt_logger.handle_request(ioty_mqtt, \'' + topic + '\', msg)\n';

    let code =
      'mqtt_logger.init(\'' + topic + '\', ' + size + ')\n';

    return code;
  };

  this.mqtt_logger_log_with_time = function(block) {
    var topic = block.getFieldValue('topic');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    topic = escapeSingleQuotes(topic);

    var code = 'mqtt_logger.log_with_time(ioty_mqtt, \'' + topic + '\', ' + value + ')\n';

    return code;
  };

  this.mqtt_logger_log = function(block) {
    var topic = block.getFieldValue('topic');
    var value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    topic = escapeSingleQuotes(topic);

    var code = 'mqtt_logger.log(ioty_mqtt, \'' + topic + '\', ' + value + ')\n';

    return code;
  };

  this.ds3231_init = function(block) {
    self.imports['ds3231'] = 'import ds3231';
    self.reservedVariables['ds3231_init'] = ['ds3231_device'];

    var id = block.getFieldValue('id');
    var addr = block.getFieldValue('addr');

    var code = 'ds3231_device = ds3231.DS3231(' + id + ', ' + addr + ')\n';

    return code;
  };

  this.ds3231_date_time_get = function(block) {
    var code = 'ds3231_device.datetime()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ds3231_date_time_set = function(block) {
    var dateTime = Blockly.Python.valueToCode(block, 'dateTime', Blockly.Python.ORDER_NONE);

    var code = 'ds3231_device.datetime(' + dateTime + ')\n';

    return code;
  };

  this.bme280_init = function(block) {
    self.imports['bme280'] = 'import bme280';
    self.reservedVariables['bme280_init'] = ['bme280_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'bme280_device = bme280.BME280(' + id + ', addr=' + addr + ')\n';

    return code;
  };

  this.bme280_read = function(block) {
    let code = 'bme280_device.read()\n';

    return code;
  };

  this.bme280_temperature = function(block) {
    let code = 'bme280_device.get_temperature()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bme280_pressure = function(block) {
    let code = 'bme280_device.get_pressure()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bme280_altitude = function(block) {
    let code = 'bme280_device.get_altitude()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bme280_humidity = function(block) {
    let code = 'bme280_device.get_humidity()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.apds9960_init = function(block) {
    self.imports['apds9960'] = 'import apds9960';
    self.reservedVariables['apds9960_init'] = ['apds9960_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'apds9960_device = apds9960.APDS9960(' + id + ', addr=' + addr + ')\n';

    return code;
  };

  this.apds9960_enable_light = function(block) {
    let gain = block.getFieldValue('gain');
    let speed = block.getFieldValue('speed');

    let code = 'apds9960_device.enable_light_sensor(apds9960.' + gain + ', ' + speed +')\n';

    return code;
  };

  this.apds9960_disable_light = function(block) {
    let code = 'apds9960_device.disable_light_sensor()\n';

    return code;
  };

  this.apds9960_read_light = function(block) {
    let type = block.getFieldValue('type');

    if (type == 'c') {
      type = '[0]';
    } else if (type == 'r') {
      type = '[1]';
    } else if (type == 'g') {
      type = '[2]';
    } else if (type == 'b') {
      type = '[3]';
    } else if (type == 'all') {
      type = '';
    }

    let code = 'apds9960_device.read_light()' + type;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.apds9960_enable_prox = function(block) {
    let gain = block.getFieldValue('gain');
    let led = block.getFieldValue('led');

    let code = 'apds9960_device.enable_prox_sensor(apds9960.' + gain + ', apds9960.' + led +')\n';

    return code;
  };

  this.apds9960_disable_prox = function(block) {
    let code = 'apds9960_device.disable_prox_sensor()\n';

    return code;
  };

  this.apds9960_read_prox = function(block) {
    let code = 'apds9960_device.read_prox()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.apds9960_enable_gesture = function(block) {
    let gain = block.getFieldValue('gain');
    let led = block.getFieldValue('led');

    let code = 'apds9960_device.enable_gesture_sensor(apds9960.' + gain + ', apds9960.' + led +')\n';

    return code;
  };

  this.apds9960_disable_gesture = function(block) {
    let code = 'apds9960_device.disable_gesture_sensor()\n';

    return code;
  };

  this.apds9960_read_gesture = function(block) {
    let code = 'apds9960_device.read_gesture()\n';

    return code;
  };

  this.apds9960_get_gesture = function(block) {
    let code = 'apds9960_device.get_gesture()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gy33_i2c_init = function(block) {
    self.imports['gy33_i2c'] = 'import gy33_i2c';
    self.reservedVariables['gy33_i2c_init'] = ['gy33_i2c_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'gy33_i2c_device = gy33_i2c.GY33_I2C(' + id + ', addr=' + addr + ')\n';

    return code;
  };

  this.gy33_i2c_read_raw = function(block) {
    let type = block.getFieldValue('type');

    if (type == 'c') {
      type = '[3]';
    } else if (type == 'r') {
      type = '[0]';
    } else if (type == 'g') {
      type = '[1]';
    } else if (type == 'b') {
      type = '[2]';
    } else if (type == 'all') {
      type = '';
    }

    let code = 'gy33_i2c_device.read_raw()' + type;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gy33_i2c_read_calibrated = function(block) {
    let type = block.getFieldValue('type');

    if (type == 'c') {
      type = '[3]';
    } else if (type == 'r') {
      type = '[0]';
    } else if (type == 'g') {
      type = '[1]';
    } else if (type == 'b') {
      type = '[2]';
    } else if (type == 'all') {
      type = '';
    }

    let code = 'gy33_i2c_device.read_calibrated()' + type;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gy33_i2c_set_led = function(block) {
    let power = block.getFieldValue('power');

    let code = 'gy33_i2c_device.set_led(' + power + ')\n';

    return code;
  };

  this.gy33_i2c_calibrate_white = function(block) {
    let code = 'gy33_i2c_device.calibrate_white()\n';

    return code;
  };

  this.gy33_i2c_calibrate_black = function(block) {
    let code = 'gy33_i2c_device.calibrate_black()\n';

    return code;
  };

  this.gy33_uart_init = function(block) {
    self.imports['gy33_uart'] = 'import gy33_uart';
    self.reservedVariables['gy33_uart_init'] = ['gy33_uart_device'];

    let uart = block.getFieldValue('uart');

    let code =
      'gy33_uart_device = gy33_uart.GY33_UART(uart' + uart + ')\n' +
      'gy33_uart_device.set_output(True, False, False)\n';

    return code;
  };

  this.gy33_uart_update = function(block) {
    let code = 'gy33_uart_device.update()\n';

    return code;
  };

  this.gy33_uart_get_raw = function(block) {
    let type = block.getFieldValue('type');

    if (type == 'c') {
      type = '[3]';
    } else if (type == 'r') {
      type = '[0]';
    } else if (type == 'g') {
      type = '[1]';
    } else if (type == 'b') {
      type = '[2]';
    } else if (type == 'all') {
      type = '';
    }

    let code = 'gy33_uart_device.get_raw()' + type;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gy33_uart_get_calibrated = function(block) {
    let type = block.getFieldValue('type');

    if (type == 'c') {
      type = '[3]';
    } else if (type == 'r') {
      type = '[0]';
    } else if (type == 'g') {
      type = '[1]';
    } else if (type == 'b') {
      type = '[2]';
    } else if (type == 'all') {
      type = '';
    }

    let code = 'gy33_uart_device.get_calibrated()' + type;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.gy33_uart_set_led = function(block) {
    let power = block.getFieldValue('power');

    let code = 'gy33_uart_device.set_led(' + power + ')\n';

    return code;
  };

  this.gy33_uart_set_integration_time = function(block) {
    let time = block.getFieldValue('time');

    let code = 'gy33_uart_device.set_integration_time(' + time + ')\n';

    return code;
  };

  this.gy33_uart_calibrate_white = function(block) {
    let code = 'gy33_uart_device.calibrate_white()\n';

    return code;
  };

  this.gy33_uart_calibrate_black = function(block) {
    let code = 'gy33_uart_device.calibrate_black()\n';

    return code;
  };

  this.tcs3472_init = function(block) {
    self.imports['tcs3472'] = 'import tcs3472';
    self.reservedVariables['tcs3472_init'] = ['tcs3472_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'tcs3472_device = tcs3472.TCS3472(' + id + ', addr=' + addr + ')\n';

    return code;
  };

  this.tcs3472_read_raw = function(block) {
    let type = block.getFieldValue('type');

    if (type == 'c') {
      type = '[0]';
    } else if (type == 'r') {
      type = '[1]';
    } else if (type == 'g') {
      type = '[2]';
    } else if (type == 'b') {
      type = '[3]';
    } else if (type == 'all') {
      type = '';
    }

    let code = 'tcs3472_device.read()' + type;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.tcs3472_read_calibrated = function(block) {
    let type = block.getFieldValue('type');

    if (type == 'c') {
      type = '[0]';
    } else if (type == 'r') {
      type = '[1]';
    } else if (type == 'g') {
      type = '[2]';
    } else if (type == 'b') {
      type = '[3]';
    } else if (type == 'all') {
      type = '';
    }

    let code = 'tcs3472_device.read_calibrated()' + type;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.tcs3472_set_gain = function(block) {
    let gain = block.getFieldValue('gain');

    let code = 'tcs3472_device.set_gain(' + gain + ')\n';

    return code;
  };

  this.tcs3472_set_integration_time = function(block) {
    let ms = block.getFieldValue('ms');

    let code = 'tcs3472_device.set_integration_time(' + ms + ')\n';

    return code;
  };

  this.tcs3472_calibrate_white = function(block) {
    let code = 'tcs3472_device.calibrate_white()\n';

    return code;
  };

  this.tcs3472_calibrate_black = function(block) {
    let code = 'tcs3472_device.calibrate_black()\n';

    return code;
  };

  this.tween_start = function(block) {
    self.imports['tween'] = 'import tween';

    let id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_NONE);
    let type = block.getFieldValue('type');
    let y0 = Blockly.Python.valueToCode(block, 'y0', Blockly.Python.ORDER_NONE);
    let y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_NONE);
    let x0 = Blockly.Python.valueToCode(block, 'x0', Blockly.Python.ORDER_NONE);
    let durationOrSpeedSelection = block.getFieldValue('durationOrSpeedSelection');
    let durationOrSpeedValue = Blockly.Python.valueToCode(block, 'durationOrSpeedValue', Blockly.Python.ORDER_NONE);

    let durationOrSpeed;
    if (durationOrSpeedSelection == 'DURATION') {
      durationOrSpeed = ', duration=' + durationOrSpeedValue;
    } else {
      durationOrSpeed = ', speed=' + durationOrSpeedValue;
    }

    let code =
      'tween.start(' + id + ', tween.' + type + ', ' + y0 + ', ' + y1 + ', ' + x0 + durationOrSpeed + ')\n';

    return code;
  };

  this.tween_get = function(block) {
    let id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);

    let code = 'tween.get(' + id + ', ' + x + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.tween_is_ended = function(block) {
    let id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);

    let code = 'tween.is_ended(' + id + ', ' + x + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.tween_remove = function(block) {
    let id = Blockly.Python.valueToCode(block, 'id', Blockly.Python.ORDER_NONE);

    let code =
      'tween.remove(' + id + ')\n';

    return code;
  };

  this.max6675_init = function(block) {
    self.imports['max6675'] = 'import max6675';
    self.reservedVariables['max6675_init'] = ['max6675_device'];

    let cs = block.getFieldValue('cs');
    let spi = block.getFieldValue('spi');

    let code =
      'max6675_device = max6675.MAX6675(' + spi + ', ' + cs + ')\n';

    return code;
  };

  this.max6675_read = function(block) {
    let unit = block.getFieldValue('unit');

    let code = 'max6675_device.read_' + unit + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.encoder_init = function(block) {
    self.imports['encoder'] = 'import encoder';
    self.reservedVariables['encoder_init'] = ['encoder_device'];

    let pin1 = block.getFieldValue('pin1');
    let pin2 = block.getFieldValue('pin2');

    let code =
      'encoder_device = encoder.Encoder(' + pin1 + ', ' + pin2 + ')\n';

    return code;
  };

  this.encoder_get_position = function(block) {
    let code = 'encoder_device.position()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.encoder_set_position = function(block) {
    let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_NONE);

    let code = 'encoder_device.position(' + value + ')\n';

    return code;
  };

  this.encoder_get_speed = function(block) {
    let code = 'encoder_device.speed()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.huskylens_init_i2c = function(block) {
    self.imports['huskylib'] = 'import huskylib';
    self.reservedVariables['huskylens_init'] = ['huskylens'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'huskylens = huskylib.HuskyLensI2C(' + id + ', ' + addr + ')\n';

    return code;
  };

  this.huskylens_init_uart = function(block) {
    self.imports['huskylib'] = 'import huskylib';
    self.reservedVariables['huskylens_init'] = ['huskylens'];

    let uart = block.getFieldValue('uart');

    let code =
      'huskylens = huskylib.HuskyLensUART(uart' + uart + ')\n';

    return code;
  };

  this.huskylens_change_mode = function(block) {
    let mode = block.getFieldValue('mode');

    let code =
      'huskylens.algorithm(huskylib.' + mode + ')\n';

    return code;
  };

  this.huskylens_request = function(block) {
    let type = block.getFieldValue('type');

    let code =
      'huskylens.' + type + '()\n';

    return code;
  };

  this.huskylens_requestByID = function(block) {
    let type = block.getFieldValue('type');
    let ID = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);

    let code =
      'huskylens.' + type + '(' + ID + ')\n';

    return code;
  };

  this.huskylens_results = function(block) {
    let code = 'huskylens.results';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.huskylens_idInResults = function(block) {
    let ID = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);

    let code = 'huskylens.idInResults(' + ID + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.huskylens_get = function(block) {
    let type = block.getFieldValue('type');

    let code = 'huskylens.' + type + '()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.huskylens_closestBlockToCenter = function(block) {
    let type = block.getFieldValue('type');

    let code = 'huskylens.closestBlockToCenterInResults()';

    if (type != 'ALL') {
      code += '[\'' + type + '\']';
    }

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.huskylens_closestArrowToCenter = function(block) {
    let type = block.getFieldValue('type');

    let code = 'huskylens.closestArrowToCenterInResults()';

    if (type != 'ALL') {
      code += '[\'' + type + '\']';
    }

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.huskylens_forget = function(block) {
    let code =
      'huskylens.forget()\n';

    return code;
  };

  this.huskylens_learn = function(block) {
    let ID = Blockly.Python.valueToCode(block, 'ID', Blockly.Python.ORDER_NONE);

    let code =
      'huskylens.learn(' + ID + ')\n';

    return code;
  };

  this.huskylens_customText = function(block) {
    let text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);

    let code =
      'huskylens.customText(' + text + ', ' + x + ', ' + y + ')\n';

    return code;
  };

  this.huskylens_clearText = function(block) {
    let code =
      'huskylens.clearText()\n';

    return code;
  };

  this.huskylens_saveLoadModel = function(block) {
    let type = block.getFieldValue('type');
    let slot = Blockly.Python.valueToCode(block, 'slot', Blockly.Python.ORDER_NONE);

    let code =
      'huskylens.' + type + 'ModelToSDCard(' + slot + ')\n';

    return code;
  };

  this.huskylens_saveImage = function(block) {
    let type = block.getFieldValue('type');

    let code =
      'huskylens.save' + type + 'ToSDCard()\n';

    return code;
  };

  this.tca9548a_init = function(block) {
    self.imports['tca9548a'] = 'import tca9548a';
    self.reservedVariables['tca9548a_init'] = ['tca9548a_device'];

    var id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'tca9548a_device = tca9548a.TCA9548A(' + id + ', ' + addr + ')\n';

    return code;
  };

  this.tca9548a_get_port = function(block) {
    let code = 'tca9548a_device.get_port()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.tca9548a_set_port = function(block) {
    let port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_NONE);
    let others = block.getFieldValue('others');

    if (others == 'DEACTIVATE') {
      others = '';
    } else {
      others = ', deactivate_others=False';
    }

    let code = 'tca9548a_device.set_port(' + port + others + ')\n';

    return code;
  };

  this.music_init = function(block) {
    self.imports['music'] = 'import music';
    self.reservedVariables['music_init'] = ['music_device'];

    let pin = block.getFieldValue('pin');

    let code =
      'music_device = music.Music(' + pin + ')\n';

    return code;
  };

  this.music_play_tone = function(block) {
    let freq = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_NONE);
    let ms = Blockly.Python.valueToCode(block, 'ms', Blockly.Python.ORDER_NONE);
    let wait = block.getFieldValue('wait');

    let code =
      'music_device.play_tone(' + freq + ', ' + ms + ', wait=' + wait + ')\n';

    return code;
  };

  this.music_play_notes = function(block) {
    let notes = Blockly.Python.valueToCode(block, 'notes', Blockly.Python.ORDER_NONE);
    let loops = Blockly.Python.valueToCode(block, 'loops', Blockly.Python.ORDER_NONE);
    let wait = block.getFieldValue('wait');

    let code =
      'music_device.play_notes(' + notes + ', wait=' + wait + ', loops=' + loops + ')\n';

    return code;
  };

  this.music_play_rtttl = function(block) {
    let rtttl = Blockly.Python.valueToCode(block, 'rtttl', Blockly.Python.ORDER_NONE);
    let loops = Blockly.Python.valueToCode(block, 'loops', Blockly.Python.ORDER_NONE);
    let wait = block.getFieldValue('wait');

    let code =
      'music_device.play_rtttl(' + rtttl + ', wait=' + wait + ', loops=' + loops + ')\n';

    return code;
  };

  this.music_is_playing = function(block) {
    let code = 'music_device.is_playing()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.music_update = function(block) {
    let code =
      'music_device.update()\n';

    return code;
  };

  this.music_stop = function(block) {
    let code =
      'music_device.stop()\n';

    return code;
  };

  this.scaled_text_init = function(block) {
    self.imports['scaled_text'] = 'import scaled_text';
    self.reservedVariables['scaled_text_init'] = ['text_scaler'];

    let type = block.getFieldValue('type');

    let fbObject;
    let fbType;
    if (type == 'SSD1306') {
      fbObject = 'ssd1306_i2c';
      fbType = 'scaled_text.SSD1306';
    } else if (type == 'ILI9341') {
      fbObject = 'ili9341_device';
      fbType = 'scaled_text.ILI9341';
    } else if (type == 'ST7789') {
      fbObject = 'st7789_device';
      fbType = 'scaled_text.ST7789';
    }

    let code =
      'text_scaler = scaled_text.ScaledText(' + fbObject + ', fb_type=' + fbType + ')\n';

    return code;
  };

  this.scaled_text_text = function(block) {
    let text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    let scale = block.getFieldValue('scale');

    let code = 'text_scaler.text(' + text + ', ' + x + ', ' + y + ', ' + color + ', scale=' + scale + ')\n';

    return code;
  };

  this.scaled_text_text_with_background = function(block) {
    let text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    let background = Blockly.Python.valueToCode(block, 'background', Blockly.Python.ORDER_ATOMIC);
    let scale = block.getFieldValue('scale');

    let code = 'text_scaler.text(' + text + ', ' + x + ', ' + y + ', ' + color + ', scale=' + scale + ', background=' + background + ')\n';

    return code;
  };

  this.png_decoder_render = function(block) {
    self.imports['PNGdecoder'] = 'import PNGdecoder';

    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);
    let type = block.getFieldValue('type');
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    let format = block.getFieldValue('format');

    if (type == 'SSD1306') {
      type = 'ssd1306_i2c.pixel';
    } else if (type == 'ILI9341') {
      type = 'ili9341_device.draw_pixel';
    } else if (type == 'ST7789') {
      type = 'st7789_device.pixel';
    }

    let code =
      'PNGdecoder.png(' + filename + ', callback=' + type + ', format=PNGdecoder.' + format + ').render(' + x + ', ' + y + ')\n';

    return code;
  };

  this.bmp_image_open = function(block) {
    self.imports['bmp_image'] = 'import bmp_image';
    self.reservedVariables['bmp_image_open'] = ['bmp_image_file'];

    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_ATOMIC);

    let code =
      'bmp_image_file = bmp_image.BMP(' + filename + ')\n';

    return code;
  };

  this.bmp_image_close = function(block) {
    let code =
      'bmp_image_file.close()\n';

    return code;
  };

  this.bmp_image_render = function(block) {
    let type = block.getFieldValue('type');
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    let format = block.getFieldValue('format');

    if (type == 'SSD1306') {
      type = 'ssd1306_i2c.pixel';
    } else if (type == 'ILI9341') {
      type = 'ili9341_device.draw_pixel';
    } else if (type == 'ST7789') {
      type = 'st7789_device.pixel';
    }

    let code =
      'bmp_image_file.render(' + type + ', ' + x + ', ' + y + ', format=bmp_image.' + format + ')\n';

    return code;
  };

  this.bmp_image_get_pixel = function(block) {
    let code = 'bmp_image_file.get_pixel(format=bmp_image.LIST)';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bmp_image_width = function(block) {
    let code = 'bmp_image_file.width';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bmp_image_height = function(block) {
    let code = 'bmp_image_file.height';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.bmp_image_depth = function(block) {
    let code = 'bmp_image_file.depth';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.hid_keyboard_init = function(block) {
    self.imports['hid_services'] = 'import hid_services';
    self.reservedVariables['hid_keyboard_init'] = ['hid_keyboard'];

    let name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_keyboard = hid_services.Keyboard(' + name + ')\n' +
      'hid_keyboard.start()\n';

    return code;
  };

  this.hid_keyboard_advertising = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_keyboard.';
    if (type == 'START') {
      code += 'start_advertising()\n';
    } else {
      code += 'stop_advertising()\n';
    }

    return code;
  };

  this.hid_keyboard_status = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_keyboard.get_state() is hid_services.Keyboard.DEVICE_' + type;

    return [code, Blockly.Python.ORDER_RELATIONAL];
  };

  this.hid_keyboard_send_string = function(block) {
    let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_keyboard.send_string(' + value + ')\n';

    return code;
  };

  this.hid_keyboard_send_key = function(block) {
    let key = block.getFieldValue('key');
    let lctrl = block.getFieldValue('lctrl');
    let lshift = block.getFieldValue('lshift');
    let lalt = block.getFieldValue('lalt');
    let lmeta = block.getFieldValue('lmeta');
    let rctrl = block.getFieldValue('rctrl');
    let rshift = block.getFieldValue('rshift');
    let ralt = block.getFieldValue('ralt');
    let rmeta = block.getFieldValue('rmeta');

    let code =
      'hid_keyboard.send_key(' + key +
      ', left_control=' + lctrl +
      ', left_shift=' + lshift +
      ', left_alt=' + lalt +
      ', left_gui=' + lmeta +
      ', right_control=' + rctrl +
      ', right_shift=' + rshift +
      ', right_alt=' + ralt +
      ', right_gui=' + rmeta + ')\n';

    return code;
  };

  this.hid_mouse_init = function(block) {
    self.imports['hid_services'] = 'import hid_services';
    self.reservedVariables['hid_mouse_init'] = ['hid_mouse'];

    let type = block.getFieldValue('type');

    let name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_mouse = hid_services.Mouse(' + name + ', \'' + type + '\')\n' +
      'hid_mouse.start()\n';

    return code;
  };

  this.hid_mouse_advertising = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_mouse.';
    if (type == 'START') {
      code += 'start_advertising()\n';
    } else {
      code += 'stop_advertising()\n';
    }

    return code;
  };

  this.hid_mouse_status = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_mouse.get_state() is hid_services.Mouse.DEVICE_' + type;

    return [code, Blockly.Python.ORDER_RELATIONAL];
  };

  this.hid_mouse_send_rel = function(block) {
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_mouse.send_rel(' + x + ', ' + y + ', ' + w + ')\n';

    return code;
  };

  this.hid_mouse_send_abs = function(block) {
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_mouse.send_abs(' + x + ', ' + y + ')\n';

    return code;
  };

  this.hid_mouse_send_btns = function(block) {
    let left = block.getFieldValue('left');
    let right = block.getFieldValue('right');
    let middle = block.getFieldValue('middle');

    let code =
      'hid_mouse.send_buttons(' + left + ', ' + right + ', ' + middle + ')\n';

    return code;
  };

  this.hid_ccd_init = function(block) {
    self.imports['hid_services'] = 'import hid_services';
    self.reservedVariables['hid_ccd_init'] = ['hid_ccd'];

    let name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_ccd = hid_services.ConsumerControl(' + name + ')\n' +
      'hid_ccd.start()\n';

    return code;
  };

  this.hid_ccd_advertising = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_ccd.';
    if (type == 'START') {
      code += 'start_advertising()\n';
    } else {
      code += 'stop_advertising()\n';
    }

    return code;
  };

  this.hid_ccd_status = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_ccd.get_state() is hid_services.ConsumerControl.DEVICE_' + type;

    return [code, Blockly.Python.ORDER_RELATIONAL];
  };

  this.hid_ccd_send_key = function(block) {
    let key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_ccd.send_key(' + key + ')\n';

    return code;
  };

  this.hid_ccd_send_key_select = function(block) {
    let key = block.getFieldValue('key');

    let code =
      'hid_ccd.send_key(' + key + ')\n';

    return code;
  };

  this.hid_joystick_init = function(block) {
    self.imports['hid_services'] = 'import hid_services';
    self.reservedVariables['hid_joystick_init'] = ['hid_joystick'];

    let name = Blockly.Python.valueToCode(block, 'name', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_joystick = hid_services.Joystick(' + name + ')\n' +
      'hid_joystick.start()\n';

    return code;
  };

  this.hid_joystick_advertising = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_joystick.';
    if (type == 'START') {
      code += 'start_advertising()\n';
    } else {
      code += 'stop_advertising()\n';
    }

    return code;
  };

  this.hid_joystick_status = function(block) {
    let type = block.getFieldValue('type');

    let code = 'hid_joystick.get_state() is hid_services.Joystick.DEVICE_' + type;

    return [code, Blockly.Python.ORDER_RELATIONAL];
  };

  this.hid_joystick_send_axes = function(block) {
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);

    let code =
      'hid_joystick.send_axes(' + x + ', ' + y + ')\n';

    return code;
  };

  this.hid_joystick_send_btns = function(block) {
    let b1 = block.getFieldValue('b1');
    let b2 = block.getFieldValue('b2');
    let b3 = block.getFieldValue('b3');
    let b4 = block.getFieldValue('b4');
    let b5 = block.getFieldValue('b5');
    let b6 = block.getFieldValue('b6');
    let b7 = block.getFieldValue('b7');
    let b8 = block.getFieldValue('b8');

    let code =
      'hid_joystick.send_buttons(' +
      b1 + ', ' +
      b2 + ', ' +
      b3 + ', ' +
      b4 + ', ' +
      b5 + ', ' +
      b6 + ', ' +
      b7 + ', ' +
      b8 + ')\n';

    return code;
  };

  this.yx5300_init = function(block) {
    self.imports['yx5300'] = 'import yx5300';
    self.reservedVariables['yx5300_init'] = ['yx5300_device'];

    var uart = block.getFieldValue('uart');

    var code = 'yx5300_device = yx5300.YX5300(uart' + uart + ')\n';

    return code;
  };

  this.yx5300_play = function(block) {
    var code = 'yx5300_device.play()\n';

    return code;
  };

  this.yx5300_play_index = function(block) {
    let index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC);

    var code = 'yx5300_device.play_index(' + index + ')\n';

    return code;
  };

  this.yx5300_play_folder_index = function(block) {
    let folder = Blockly.Python.valueToCode(block, 'folder', Blockly.Python.ORDER_ATOMIC);
    let index = Blockly.Python.valueToCode(block, 'index', Blockly.Python.ORDER_ATOMIC);

    var code = 'yx5300_device.play_folder_index(' + folder + ', ' + index + ')\n';

    return code;
  };

  this.yx5300_play_next = function(block) {
    var code = 'yx5300_device.play_next()\n';

    return code;
  };

  this.yx5300_play_prev = function(block) {
    var code = 'yx5300_device.play_prev()\n';

    return code;
  };

  this.yx5300_pause = function(block) {
    var code = 'yx5300_device.pause()\n';

    return code;
  };

  this.yx5300_stop = function(block) {
    var code = 'yx5300_device.stop()\n';

    return code;
  };

  this.yx5300_set_volume = function(block) {
    let volume = Blockly.Python.valueToCode(block, 'volume', Blockly.Python.ORDER_ATOMIC);

    var code = 'yx5300_device.set_volume(' + volume + ')\n';

    return code;
  };

  this.ld2410_init = function(block) {
    self.imports['ld2410'] = 'import ld2410';
    self.reservedVariables['ld2410_init'] = ['ld2410_device'];

    var uart = block.getFieldValue('uart');

    var code = 'ld2410_device = ld2410.LD2410(uart' + uart + ')\n';

    return code;
  };

  this.ld2410_update = function(block) {
    var code = 'ld2410_device.update()\n';

    return code;
  };

  this.ld2410_get_target = function(block) {
    let code = 'ld2410_device.get_target_data()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ld2410_get_engineering = function(block) {
    let code = 'ld2410_device.get_engineering_data()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ld2410_engineering_mode = function(block) {
    var type = block.getFieldValue('type');

    var code =
      'ld2410_device.enable_config()\n' +
      'ld2410_device.' + type + '_engineering_mode()\n' +
      'ld2410_device.disable_config()\n';

    return code;
  };

  this.ld2410_set_max = function(block) {
    let moving = block.getFieldValue('moving');
    let stationary = block.getFieldValue('stationary');
    let inactivity = Blockly.Python.valueToCode(block, 'inactivity', Blockly.Python.ORDER_ATOMIC);

    var code =
      'ld2410_device.enable_config()\n' +
      'ld2410_device.set_max_values(' + moving + ', ' + stationary + ', ' + inactivity + ')\n' +
      'ld2410_device.disable_config()\n';

    return code;
  };

  this.ld2410_set_sensitivity = function(block) {
    let gate = block.getFieldValue('gate');
    let moving = Blockly.Python.valueToCode(block, 'moving', Blockly.Python.ORDER_ATOMIC);
    let stationary = Blockly.Python.valueToCode(block, 'stationary', Blockly.Python.ORDER_ATOMIC);

    var code =
      'ld2410_device.enable_config()\n' +
      'ld2410_device.set_gate_sensitivity(' + gate + ', ' + moving + ', ' + stationary + ')\n' +
      'ld2410_device.disable_config()\n';

    return code;
  };

  this.ld2410_factory_reset = function(block) {
    var code =
      'ld2410_device.enable_config()\n' +
      'ld2410_device.factory_reset()\n' +
      'ld2410_device.restart()\n';

    return code;
  };

  this.stepper_wheels_init = function(block) {
    self.imports['stepper_wheels'] = 'import stepper_wheels';
    self.reservedVariables['stepper_wheels_init'] = ['sw_controller', 'sw_motor0', 'sw_motor1', 'sw_motor2', 'sw_motor3'];

    var id = block.getFieldValue('id');
    var addr = block.getFieldValue('addr');

    var code =
      'sw_controller = stepper_wheels.Controller(' + id + ', ' + addr + ')\n' +
      'sw_motor0 = sw_controller.get_motor(0)\n' +
      'sw_motor1 = sw_controller.get_motor(1)\n' +
      'sw_motor2 = sw_controller.get_motor(2)\n' +
      'sw_motor3 = sw_controller.get_motor(3)\n';

    return code;
  };

  this.stepper_wheels_enable = function(block) {
    var enable = block.getFieldValue('enable');

    var code = 'sw_controller.' + enable + '()\n';

    return code;
  };

  this.stepper_wheels_reset = function(block) {
    var code = 'sw_controller.reset()\n';

    return code;
  };

  this.stepper_wheels_motor_run = function(block) {
    var index = block.getFieldValue('index');
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);

    var code =
      'sw_motor' + index + '.run(' + speed + ')\n';

    return code;
  };

  this.stepper_wheels_motor_run_steps = function(block) {
    var index = block.getFieldValue('index');
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_NONE);
    var wait = block.getFieldValue('wait');

    var code =
      'sw_motor' + index + '.run_steps(' + speed + ', ' + steps + ', wait=' + wait + ')\n';

    return code;
  };

  this.stepper_wheels_motor_stop = function(block) {
    var index = block.getFieldValue('index');

    var code =
      'sw_motor' + index + '.stop()\n';

    return code;
  };

  this.stepper_wheels_motor_reset_steps = function(block) {
    var index = block.getFieldValue('index');

    var code =
      'sw_motor' + index + '.reset_steps()\n';

    return code;
  };

  this.stepper_wheels_motor_get_steps = function(block) {
    var index = block.getFieldValue('index');

    var code =
      'sw_motor' + index + '.steps()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.stepper_wheels_motor_set_acceleration = function(block) {
    var index = block.getFieldValue('index');
    let acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_NONE);

    var code =
      'sw_motor' + index + '.set_acceleration(' + acceleration + ')\n';

    return code;
  };

  this.stepper_wheels_init_drive = function(block) {
    self.reservedVariables['stepper_wheels_init_drive'] = ['sw_drive'];

    var left = block.getFieldValue('left');
    var right = block.getFieldValue('right');

    if (left.includes(',')) {
      left = '(' + left + ')';
    }
    if (right.includes(',')) {
      right = '(' + right + ')';
    }

    var code =
      'sw_drive = sw_controller.get_drive(' + left + ', ' + right + ')\n';

    return code;
  };

  this.stepper_wheels_drive_tank = function(block) {
    let left = Blockly.Python.valueToCode(block, 'left', Blockly.Python.ORDER_NONE);
    let right = Blockly.Python.valueToCode(block, 'right', Blockly.Python.ORDER_NONE);

    var code =
      'sw_drive.move_tank(' + left + ', ' + right + ')\n';

    return code;
  };

  this.stepper_wheels_drive_tank_steps = function(block) {
    let left = Blockly.Python.valueToCode(block, 'left', Blockly.Python.ORDER_NONE);
    let right = Blockly.Python.valueToCode(block, 'right', Blockly.Python.ORDER_NONE);
    let steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_NONE);
    var wait = block.getFieldValue('wait');

    var code =
      'sw_drive.move_tank_steps(' + left + ', ' + right + ', ' + steps + ', wait=' + wait + ')\n';

    return code;
  };

  this.stepper_wheels_drive_steering = function(block) {
    let steering = Blockly.Python.valueToCode(block, 'steering', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);

    var code =
      'sw_drive.move_steering(' + steering + ', ' + speed + ')\n';

    return code;
  };

  this.stepper_wheels_drive_steering_steps = function(block) {
    let steering = Blockly.Python.valueToCode(block, 'steering', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_NONE);
    var wait = block.getFieldValue('wait');

    var code =
      'sw_drive.move_steering_steps(' + steering + ', ' + speed + ', ' + steps + ', wait=' + wait + ')\n';

    return code;
  };

  this.stepper_wheels_drive_stop = function(block) {
    var code = 'sw_drive.stop()\n';

    return code;
  };

  this.stepper_wheels_drive_reset_steps = function(block) {
    var code = 'sw_drive.reset_steps()\n';

    return code;
  };

  this.stepper_wheels_drive_get_steps = function(block) {
    var type = block.getFieldValue('type');


    var code = 'sw_drive.' + type + 'steps()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.stepper_wheels_drive_set_acceleration = function(block) {
    let acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_NONE);

    var code =
      'sw_drive.set_acceleration(' + acceleration + ')\n';

    return code;
  };

  this.stepper_wheels_init_delta = function(block) {
    self.reservedVariables['stepper_wheels_init_delta'] = ['sw_delta'];

    var mode = block.getFieldValue('mode');
    var motor0 = block.getFieldValue('motor0');
    var motor1 = block.getFieldValue('motor1');
    var motor2 = block.getFieldValue('motor2');
    var max_speed = block.getFieldValue('max_speed');

    var code =
      'sw_delta = sw_controller.get_delta(\'' + mode + '\', ' + motor0 + ', ' + motor1 + ', ' + motor2 + ', ' + max_speed + ')\n';

    return code;
  };

  this.stepper_wheels_delta_move_turn = function(block) {
    let direction = Blockly.Python.valueToCode(block, 'direction', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let turn = Blockly.Python.valueToCode(block, 'turn', Blockly.Python.ORDER_NONE);

    var code =
      'sw_delta.move_and_turn(' + direction + ', ' + speed + ', ' + turn + ')\n';

    return code;
  };

  this.stepper_wheels_delta_move_steps = function(block) {
    let direction = Blockly.Python.valueToCode(block, 'direction', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_NONE);
    var wait = block.getFieldValue('wait');

    var code =
      'sw_delta.move_steps(' + direction + ', ' + speed + ', ' + steps + ', wait=' + wait + ')\n';

    return code;
  };

  this.stepper_wheels_delta_turn_steps = function(block) {
    let turn = Blockly.Python.valueToCode(block, 'turn', Blockly.Python.ORDER_NONE);
    let steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_NONE);
    var wait = block.getFieldValue('wait');

    var code =
      'sw_delta.turn_steps(' + turn + ', ' + steps + ', wait=' + wait + ')\n';

    return code;
  };

  this.stepper_wheels_delta_stop = function(block) {
    var code = 'sw_delta.stop()\n';

    return code;
  };

  this.stepper_wheels_delta_set_acceleration = function(block) {
    let acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_NONE);

    var code =
      'sw_delta.set_acceleration(' + acceleration + ')\n';

    return code;
  };

  this.stepper_wheels_init_mecanum = function(block) {
    self.reservedVariables['stepper_wheels_init_mecanum'] = ['sw_mecanum'];

    var motor0 = block.getFieldValue('motor0');
    var motor1 = block.getFieldValue('motor1');
    var motor2 = block.getFieldValue('motor2');
    var motor3 = block.getFieldValue('motor3');
    var max_speed = block.getFieldValue('max_speed');

    var code =
      'sw_mecanum = sw_controller.get_mecanum(' + motor0 + ', ' + motor1 + ', ' + motor2 + ', ' + motor3 + ', ' + max_speed + ')\n';

    return code;
  };

  this.stepper_wheels_mecanum_move_turn = function(block) {
    let direction = Blockly.Python.valueToCode(block, 'direction', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let turn = Blockly.Python.valueToCode(block, 'turn', Blockly.Python.ORDER_NONE);

    var code =
      'sw_mecanum.move_and_turn(' + direction + ', ' + speed + ', ' + turn + ')\n';

    return code;
  };

  this.stepper_wheels_mecanum_move_steps = function(block) {
    let direction = Blockly.Python.valueToCode(block, 'direction', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_NONE);
    var wait = block.getFieldValue('wait');

    var code =
      'sw_mecanum.move_steps(' + direction + ', ' + speed + ', ' + steps + ', wait=' + wait + ')\n';

    return code;
  };

  this.stepper_wheels_mecanum_turn_steps = function(block) {
    let turn = Blockly.Python.valueToCode(block, 'turn', Blockly.Python.ORDER_NONE);
    let steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_NONE);
    var wait = block.getFieldValue('wait');

    var code =
      'sw_mecanum.turn_steps(' + turn + ', ' + steps + ', wait=' + wait + ')\n';

    return code;
  };

  this.stepper_wheels_mecanum_stop = function(block) {
    var code = 'sw_mecanum.stop()\n';

    return code;
  };

  this.stepper_wheels_mecanum_set_acceleration = function(block) {
    let acceleration = Blockly.Python.valueToCode(block, 'acceleration', Blockly.Python.ORDER_NONE);

    var code =
      'sw_mecanum.set_acceleration(' + acceleration + ')\n';

    return code;
  };

  this.camera_init = function(block) {
    self.imports['camera'] = 'import camera';

    var format = block.getFieldValue('format');
    var framesize = block.getFieldValue('framesize');
    var clock = block.getFieldValue('clock');

    var code = 'camera.init(0, format=camera.' + format + ', framesize=camera.' + framesize + ', xclk_freq=camera.' + clock + ', fb_location=camera.PSRAM)\n';

    return code;
  };

  this.camera_deinit = function(block) {
    var code = 'camera.deinit()\n';

    return code;
  };

  this.camera_capture = function(block) {
    var code = 'camera.capture()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.camera_set_whitebalance = function(block) {
    var mode = block.getFieldValue('mode');

    var code = 'camera.whitebalance(camera.' + mode + ')\n';

    return code;
  };

  this.camera_set_saturation = function(block) {
    var level = block.getFieldValue('level');

    var code = 'camera.saturation(' + level + ')\n';

    return code;
  };

  this.camera_set_brightness = function(block) {
    var level = block.getFieldValue('level');

    var code = 'camera.set_brightness(' + level + ')\n';

    return code;
  };

  this.camera_set_contrast = function(block) {
    var level = block.getFieldValue('level');

    var code = 'camera.set_contrast(' + level + ')\n';

    return code;
  };

  this.camera_set_quality = function(block) {
    var quality = block.getFieldValue('quality');

    var code = 'camera.set_quality(' + quality + ')\n';

    return code;
  };

  this.mv_find_blobs_yuv = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var minY = block.getFieldValue('minY');
    var maxY = block.getFieldValue('maxY');
    var minU = block.getFieldValue('minU');
    var maxU = block.getFieldValue('maxU');
    var minV = block.getFieldValue('minV');
    var maxV = block.getFieldValue('maxV');
    var pixels_threshold = block.getFieldValue('pixels_threshold');

    var code = 'mv.find_blobs_yuv422(' + buf + ', ' + width + ', ' + height + ', (' + minY + ', ' + maxY + ', ' + minU + ', ' + maxU + ', ' + minV + ', ' + maxV + '), ' + pixels_threshold + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_find_blobs_grayscale = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var minI = block.getFieldValue('minI');
    var maxI = block.getFieldValue('maxI');
    var pixels_threshold = block.getFieldValue('pixels_threshold');

    var code = 'mv.find_blobs_grayscale(' + buf + ', ' + width + ', ' + height + ', (' + minI + ', ' + maxI + '), ' + pixels_threshold + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_find_circle_single = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var radius = block.getFieldValue('radius');
    var pixels_threshold = block.getFieldValue('pixels_threshold');

    var code = 'mv.hough_circles_single(' + buf + ', ' + width + ', ' + height + ', ' + radius + ', ' + pixels_threshold + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_edge_detect = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var minV = block.getFieldValue('minV');
    var maxV = block.getFieldValue('maxV');

    var code = 'mv.edge_detect(' + buf + ', ' + width + ', ' + height + ', ' + minV + ', ' + maxV + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_yuv_to_grayscale = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);

    var code = 'mv.yuv422_to_grayscale(' + buf + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_gaussian_blur_3x3_gray = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');

    var code = 'mv.gaussian_blur_3x3_gray(' + buf + ', ' + width + ', ' + height + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_gaussian_blur_3x3_yuv = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');

    var code = 'mv.gaussian_blur_3x3_yuv422(' + buf + ', ' + width + ', ' + height + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_sobel = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');

    var code = 'mv.sobel(' + buf + ', ' + width + ', ' + height + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_scale_grayscale = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var factor = block.getFieldValue('factor');

    var code = 'mv.scale_grayscale(' + buf + ', ' + width + ', ' + height + ', ' + factor + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_crop_grayscale = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var height = block.getFieldValue('height');
    var left = block.getFieldValue('left');
    var top = block.getFieldValue('top');
    var out_width = block.getFieldValue('out_width');
    var out_height = block.getFieldValue('out_height');

    var code = 'mv.crop_grayscale(' + buf + ', ' + width + ', ' + height + ', ' + left + ', ' + top + ', ' + out_width + ', ' + out_height + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_crop_row_grayscale = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var top = block.getFieldValue('top');
    var out_height = block.getFieldValue('out_height');

    var code = 'mv.crop_row_grayscale(' + buf + ', ' + width + ', ' + top + ', ' + out_height + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.mv_crop_row_yuv = function(block) {
    self.imports['mv'] = 'import mv';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    var width = block.getFieldValue('width');
    var top = block.getFieldValue('top');
    var out_height = block.getFieldValue('out_height');

    var code = 'mv.crop_row_yuv422(' + buf + ', ' + width + ', ' + top + ', ' + out_height + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.wheeled_drives_steering = function(block) {
    self.imports['wheeled_drives'] = 'import wheeled_drives';

    let steering = Blockly.Python.valueToCode(block, 'steering', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);

    let code = 'wheeled_drives.steering(' + steering + ', ' + speed + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.wheeled_drives_joystick = function(block) {
    self.imports['wheeled_drives'] = 'import wheeled_drives';

    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let max_speed = block.getFieldValue('max_speed');

    let code = 'wheeled_drives.joystick(' + x + ', ' + y + ', ' + max_speed + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.wheeled_drives_delta = function(block) {
    self.imports['wheeled_drives'] = 'import wheeled_drives';

    let mode = block.getFieldValue('mode');
    let direction = Blockly.Python.valueToCode(block, 'direction', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let rotation = Blockly.Python.valueToCode(block, 'rotation', Blockly.Python.ORDER_NONE);
    let max_speed = block.getFieldValue('max_speed');

    let code = 'wheeled_drives.delta("' + mode + '", ' + direction + ', ' + speed + ', ' + rotation + ', ' + max_speed + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.wheeled_drives_mecanum = function(block) {
    self.imports['wheeled_drives'] = 'import wheeled_drives';

    let direction = Blockly.Python.valueToCode(block, 'direction', Blockly.Python.ORDER_NONE);
    let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_NONE);
    let rotation = Blockly.Python.valueToCode(block, 'rotation', Blockly.Python.ORDER_NONE);
    let max_speed = block.getFieldValue('max_speed');

    let code = 'wheeled_drives.mecanum(' + direction + ', ' + speed + ', ' + rotation + ', ' + max_speed + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ili9341_init = function(block) {
    self.imports['ili9341'] = 'import ili9341';
    self.reservedVariables['ili9341_init'] = ['ili9341_device'];

    let spi = block.getFieldValue('spi');
    let cs = block.getFieldValue('cs');
    let dc = block.getFieldValue('dc');
    let rst = block.getFieldValue('rst');
    let width = block.getFieldValue('width');
    let height = block.getFieldValue('height');
    let rotation = block.getFieldValue('rotation');
    let mirror = block.getFieldValue('mirror');
    let bgr = block.getFieldValue('bgr');

    var code = 'ili9341_device = ili9341.Display(' + spi + ', cs=Pin(' + cs + '), dc=Pin(' + dc + '), rst=Pin(' + rst + '), width=' + width + ', height=' + height + ', rotation=' + rotation + ', mirror=' + mirror + ', bgr=' + bgr + ')\n';

    return code;
  };

  this.ili9341_color = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let color = block.getFieldValue('color');

    var code = 'ili9341.color565' + color;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ili9341_rgb = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_NONE);
    let green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_NONE);
    let blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_NONE);

    var code = 'ili9341.color565(' + red + ', ' + green + ', ' + blue + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ili9341_hsv = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);
    let s = Blockly.Python.valueToCode(block, 's', Blockly.Python.ORDER_NONE);
    let v = Blockly.Python.valueToCode(block, 'v', Blockly.Python.ORDER_NONE);

    var code = 'ili9341.hsv565(' + h + ', ' + s + ', ' + v + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.ili9341_clear = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'ili9341_device.clear(' + color + ')\n';

    return code;
  };

  this.ili9341_text8x8 = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let background = Blockly.Python.valueToCode(block, 'background', Blockly.Python.ORDER_NONE);
    let rotate = block.getFieldValue('rotate');

    var code = 'ili9341_device.draw_text8x8(' + x + ', ' + y + ', ' + text + ', ' + color + ', background=' + background + ', rotate=' + rotate + ')\n';

    return code;
  };

  this.ili9341_text_with_font = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_NONE);
    let font = Blockly.Python.valueToCode(block, 'font', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let background = Blockly.Python.valueToCode(block, 'background', Blockly.Python.ORDER_NONE);
    let rotate = block.getFieldValue('rotate');

    let landscape = 'False';
    let rotate_180 = 'False';
    if (rotate == 90 || rotate == 270) {
      landscape = 'True';
    }
    if (rotate == 90 || rotate == 180) {
      rotate_180 = 'True';
    }

    var code = 'ili9341_device.draw_text(' + x + ', ' + y + ', ' + text + ', ' + font + ', ' + color + ', background=' + background + ', landscape=' + landscape + ', rotate_180=' + rotate_180 + ')\n';

    return code;
  };

  this.ili9341_pixel = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'ili9341_device.draw_pixel(' + x + ', ' + y + ', ' + color + ')\n';

    return code;
  };

  this.ili9341_line = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_NONE);
    let y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_NONE);
    let x2 = Blockly.Python.valueToCode(block, 'x2', Blockly.Python.ORDER_NONE);
    let y2 = Blockly.Python.valueToCode(block, 'y2', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    if (y1 == y2) {
      if (parseInt(x2) > parseInt(x1)) {
        var code = 'ili9341_device.draw_hline(' + x1 + ', ' + y1 + ', ' + (parseInt(x2) - parseInt(x1)) + ', ' + color + ')\n';
      } else {
        var code = 'ili9341_device.draw_hline(' + x2 + ', ' + y2 + ', ' + (parseInt(x1) - parseInt(x2)) + ', ' + color + ')\n';
      }
    } else if (x1 == x2) {
      if (parseInt(y2) > parseInt(y1)) {
        var code = 'ili9341_device.draw_vline(' + x1 + ', ' + y1 + ', ' + (parseInt(y2) - parseInt(y1)) + ', ' + color + ')\n';
      } else {
        var code = 'ili9341_device.draw_vline(' + x2 + ', ' + y2 + ', ' + (parseInt(y1) - parseInt(y2)) + ', ' + color + ')\n';
      }
    } else {
      var code = 'ili9341_device.draw_line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + color + ')\n';
    }

    return code;
  };

  this.ili9341_rectangle = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_NONE);
    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let fill = block.getFieldValue('fill');

    let cmd = 'draw_rectangle';
    if (fill == 'True') {
      cmd = 'fill_rectangle'
    }

    var code = 'ili9341_device.' + cmd + '(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + color + ')\n';

    return code;
  };

  this.ili9341_ellipse = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let xr = Blockly.Python.valueToCode(block, 'xr', Blockly.Python.ORDER_NONE);
    let yr = Blockly.Python.valueToCode(block, 'yr', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let fill = block.getFieldValue('fill');

    if (xr == yr) {
      let cmd = 'draw_circle';
      if (fill == 'True') {
        cmd = 'fill_circle';
      }
      var code = 'ili9341_device.' + cmd + '(' + x + ', ' + y + ', ' + xr + ', ' + color + ')\n';
    } else {
      let cmd = 'draw_ellipse';
      if (fill == 'True') {
        cmd = 'fill_ellipse';
      }
      var code = 'ili9341_device.' + cmd + '(' + x + ', ' + y + ', ' + xr + ', ' + yr + ', ' + color + ')\n';
    }

    return code;
  };

  this.ili9341_image_from_file = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_NONE);
    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);

    var code = 'ili9341_device.draw_image(' + filename + ', ' + x + ', ' + y + ', ' + w + ', ' + h + ')\n';

    return code;
  };

  this.ili9341_image_from_buf = function(block) {
    self.imports['ili9341'] = 'import ili9341';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_NONE);
    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);

    var code = 'ili9341_device.draw_sprite(' + buf + ', ' + x + ', ' + y + ', ' + w + ', ' + h + ')\n';

    return code;
  };

  this.xglcd_font_load = function(block) {
    self.imports['xglcd_font'] = 'import xglcd_font';

    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);
    let width = block.getFieldValue('width');
    let height = block.getFieldValue('height');

    var code = 'xglcd_font.XglcdFont(' + filename + ', ' + width + ', ' + height + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.xpt2046_init = function(block) {
    self.imports['xpt2046'] = 'import xpt2046';
    self.reservedVariables['xpt2046_init'] = ['xpt2046_device'];

    let spi = block.getFieldValue('spi');
    let cs = block.getFieldValue('cs');
    let int = block.getFieldValue('int');
    let width = block.getFieldValue('width');
    let height = block.getFieldValue('height');
    let x_min = block.getFieldValue('x_min');
    let x_max = block.getFieldValue('x_max');
    let y_min = block.getFieldValue('y_min');
    let y_max = block.getFieldValue('y_max');
    let rotation = block.getFieldValue('rotation');

    var code = 'xpt2046_device = xpt2046.Touch(' + spi + ', cs=Pin(' + cs + '), int_pin=Pin(' + int + '), width=' + width + ', height=' + height + ', x_min=' + x_min + ', x_max=' + x_max + ', y_min=' + y_min + ', y_max=' + y_max + ', rotation=' + rotation + ')\n';

    return code;
  };

  this.xpt2046_get_pos = function(block) {
    self.imports['xpt2046'] = 'import xpt2046';

    var code = 'xpt2046_device.get_pos()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.xpt2046_in_rect = function(block) {
    self.imports['xpt2046'] = 'import xpt2046';

    let pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_NONE);
    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);

    var code = 'xpt2046.in_rect(' + pos + ', ' + x + ', ' + y + ', ' + w + ', ' + h + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.xpt2046_in_circle = function(block) {
    self.imports['xpt2046'] = 'import xpt2046';

    let pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let r = Blockly.Python.valueToCode(block, 'r', Blockly.Python.ORDER_NONE);

    var code = 'xpt2046.in_circle(' + pos + ', ' + x + ', ' + y + ', ' + r + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.st7789_init = function(block) {
    self.imports['st7789'] = 'import st7789';
    self.reservedVariables['st7789_init'] = ['st7789_device'];

    let spi = block.getFieldValue('spi');
    let cs = block.getFieldValue('cs');
    let dc = block.getFieldValue('dc');
    let rst = block.getFieldValue('rst');
    let size = block.getFieldValue('size');

    let width = size.split('_')[0]
    let height = size.split('_')[1]

    var code =
      'st7789_device = st7789.ST7789(' + spi + ', ' + width + ', ' + height + ', cs=machine.Pin(' + cs + ', machine.Pin.OUT), dc=machine.Pin(' + dc + ', machine.Pin.OUT), reset=machine.Pin(' + rst + ', machine.Pin.OUT))\n' +
      'st7789_device.init()\n';

    return code;
  };

  this.st7789_color = function(block) {
    self.imports['st7789'] = 'import st7789';

    let color = block.getFieldValue('color');

    var code = 'st7789.color565' + color;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.st7789_rgb = function(block) {
    self.imports['st7789'] = 'import st7789';

    let red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_NONE);
    let green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_NONE);
    let blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_NONE);

    var code = 'st7789.color565(' + red + ', ' + green + ', ' + blue + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.st7789_hsv = function(block) {
    self.imports['st7789'] = 'import st7789';

    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);
    let s = Blockly.Python.valueToCode(block, 's', Blockly.Python.ORDER_NONE);
    let v = Blockly.Python.valueToCode(block, 'v', Blockly.Python.ORDER_NONE);

    var code = 'st7789.hsv565(' + h + ', ' + s + ', ' + v + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.st7789_fill = function(block) {
    self.imports['st7789'] = 'import st7789';

    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'st7789_device.fill(' + color + ')\n';

    return code;
  };

  this.st7789_text8x8 = function(block) {
    self.imports['st7789'] = 'import st7789';

    let text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let background = Blockly.Python.valueToCode(block, 'background', Blockly.Python.ORDER_NONE);
    let rotate = block.getFieldValue('rotate');

    var code = 'st7789_device.text8x8(' + x + ', ' + y + ', ' + text + ', ' + color + ', background=' + background + ', rotate=' + rotate + ')\n';

    return code;
  };

  this.st7789_text_with_font = function(block) {
    self.imports['st7789'] = 'import st7789';

    let text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_NONE);
    let font = Blockly.Python.valueToCode(block, 'font', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let background = Blockly.Python.valueToCode(block, 'background', Blockly.Python.ORDER_NONE);
    let rotate = block.getFieldValue('rotate');

    let landscape = 'False';
    let rotate_180 = 'False';
    if (rotate == 90 || rotate == 270) {
      landscape = 'True';
    }
    if (rotate == 90 || rotate == 180) {
      rotate_180 = 'True';
    }

    var code = 'st7789_device.text(' + x + ', ' + y + ', ' + text + ', ' + font + ', ' + color + ', background=' + background + ', landscape=' + landscape + ', rotate_180=' + rotate_180 + ')\n';

    return code;
  };

  this.st7789_pixel = function(block) {
    self.imports['st7789'] = 'import st7789';

    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    var code = 'st7789_device.pixel(' + x + ', ' + y + ', ' + color + ')\n';

    return code;
  };

  this.st7789_line = function(block) {
    self.imports['st7789'] = 'import st7789';

    let x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_NONE);
    let y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_NONE);
    let x2 = Blockly.Python.valueToCode(block, 'x2', Blockly.Python.ORDER_NONE);
    let y2 = Blockly.Python.valueToCode(block, 'y2', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);

    if (y1 == y2) {
      if (parseInt(x2) > parseInt(x1)) {
        var code = 'st7789_device.hline(' + x1 + ', ' + y1 + ', ' + (parseInt(x2) - parseInt(x1)) + ', ' + color + ')\n';
      } else {
        var code = 'st7789_device.hline(' + x2 + ', ' + y2 + ', ' + (parseInt(x1) - parseInt(x2)) + ', ' + color + ')\n';
      }
    } else if (x1 == x2) {
      if (parseInt(y2) > parseInt(y1)) {
        var code = 'st7789_device.vline(' + x1 + ', ' + y1 + ', ' + (parseInt(y2) - parseInt(y1)) + ', ' + color + ')\n';
      } else {
        var code = 'st7789_device.vline(' + x2 + ', ' + y2 + ', ' + (parseInt(y1) - parseInt(y2)) + ', ' + color + ')\n';
      }
    } else {
      var code = 'st7789_device.line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' + color + ')\n';
    }

    return code;
  };

  this.st7789_rectangle = function(block) {
    self.imports['st7789'] = 'import st7789';

    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_NONE);
    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let fill = block.getFieldValue('fill');

    let cmd = 'rect';
    if (fill == 'True') {
      cmd = 'fill_rect'
    }

    var code = 'st7789_device.' + cmd + '(' + x + ', ' + y + ', ' + w + ', ' + h + ', ' + color + ')\n';

    return code;
  };

  this.st7789_ellipse = function(block) {
    self.imports['st7789'] = 'import st7789';

    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let xr = Blockly.Python.valueToCode(block, 'xr', Blockly.Python.ORDER_NONE);
    let yr = Blockly.Python.valueToCode(block, 'yr', Blockly.Python.ORDER_NONE);
    let color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_NONE);
    let fill = block.getFieldValue('fill');

    if (xr == yr) {
      let cmd = 'circle';
      if (fill == 'True') {
        cmd = 'fill_circle';
      }
      var code = 'st7789_device.' + cmd + '(' + x + ', ' + y + ', ' + xr + ', ' + color + ')\n';
    } else {
      let cmd = 'ellipse';
      if (fill == 'True') {
        cmd = 'fill_ellipse';
      }
      var code = 'st7789_device.' + cmd + '(' + x + ', ' + y + ', ' + xr + ', ' + yr + ', ' + color + ')\n';
    }

    return code;
  };

  this.st7789_image_from_file = function(block) {
    self.imports['st7789'] = 'import st7789';

    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_NONE);
    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);

    var code = 'st7789_device.image(' + filename + ', ' + x + ', ' + y + ', ' + w + ', ' + h + ')\n';

    return code;
  };

  this.st7789_image_from_buf = function(block) {
    self.imports['st7789'] = 'import st7789';

    let buf = Blockly.Python.valueToCode(block, 'buf', Blockly.Python.ORDER_NONE);
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    let w = Blockly.Python.valueToCode(block, 'w', Blockly.Python.ORDER_NONE);
    let h = Blockly.Python.valueToCode(block, 'h', Blockly.Python.ORDER_NONE);

    var code = 'st7789_device.sprite(' + buf + ', ' + x + ', ' + y + ', ' + w + ', ' + h + ')\n';

    return code;
  };

  this.lds02rr_init = function(block) {
    self.imports['lds02rr'] = 'import lds02rr';
    self.reservedVariables['lds02rr_init'] = ['lds02rr_device'];

    var uart = block.getFieldValue('uart');

    var code = 'lds02rr_device = lds02rr.LDS02RR(uart' + uart + ')\n';

    return code;
  };

  this.lds02rr_update = function(block) {
    var code = 'lds02rr_device.update()\n';

    return code;
  };

  this.lds02rr_rpm = function(block) {
    let code = 'lds02rr_device.get_rpm()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.lds02rr_distances = function(block) {
    let code = 'lds02rr_device.get_distances()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.amg8833_init = function(block) {
    self.imports['amg8833'] = 'import amg8833';
    self.reservedVariables['amg8833_init'] = ['amg8833_device'];

    let id = block.getFieldValue('id');
    let addr = block.getFieldValue('addr');

    let code =
      'amg8833_device = amg8833.AMG8833(' + id + ', ' + addr + ')\n';

    return code;
  };

  this.amg8833_set_ma_mode = function(block) {
    let mode = block.getFieldValue('mode');

    let code =
      'amg8833_device.set_moving_average_mode(' + mode + ')\n';

    return code;
  };

  this.amg8833_read = function(block) {
    let code =
      'amg8833_device.read()\n';

    return code;
  };

  this.amg8833_get_buf = function(block) {
    let format = block.getFieldValue('format');

    let code =
      'amg8833_device.get_buf(format=amg8833.' + format + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.amg8833_get_temperature = function(block) {
    let x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    let y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);

    let code =
      'amg8833_device.get_temperature(' + x + ', ' + y + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.amg8833_get_thermistor_temperature = function(block) {
    let code =
      'amg8833_device.get_thermistor_temperature()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.vs1003_init = function(block) {
    self.imports['vs1003'] = 'import vs1003';
    self.reservedVariables['vs1003_init'] = ['vs1003_device'];

    let spi = block.getFieldValue('spi');
    let xcs = block.getFieldValue('xcs');
    let xdcs = block.getFieldValue('xdcs');
    let dreq = block.getFieldValue('dreq');
    let xrst = block.getFieldValue('xrst');

    var code = 'vs1003_device = vs1003.VS1003(' + spi + ', xcs=' + xcs + ', xdcs=' + xdcs + ', dreq=' + dreq + ', xrst=' + xrst + ')\n';

    return code;
  };

  this.vs1003_set_stream_mode = function(block) {
    let mode = block.getFieldValue('mode');

    var code = 'vs1003_device.set_stream_mode(' + mode + ')\n';

    return code;
  };

  this.vs1003_set_volume = function(block) {
    let vol = Blockly.Python.valueToCode(block, 'vol', Blockly.Python.ORDER_NONE);

    var code = 'vs1003_device.set_volume(' + vol + ')\n';

    return code;
  };

  this.vs1003_dreq_ready = function(block) {
    let code =
      'vs1003_device.dreq_ready()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.vs1003_play_bytes = function(block) {
    let data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_NONE);

    var code = 'vs1003_device.play_bytes(' + data + ')\n';

    return code;
  };

  this.vs1003_play_file = function(block) {
    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);

    var code = 'vs1003_device.play_file(' + filename + ')\n';

    return code;
  };

  this.vs1003_reset = function(block) {
    let code = 'vs1003_device.reset()\n';

    return code;
  };

  this.vs1003_start_recording_to_file = function(block) {
    let filename = Blockly.Python.valueToCode(block, 'filename', Blockly.Python.ORDER_NONE);
    let hp = block.getFieldValue('hp');
    let gain = block.getFieldValue('gain');
    let source = block.getFieldValue('source');

    let line = 'False';
    if (source == 'LINE') {
      line = 'True';
    }

    let code = 'vs1003_device.start_recording_to_file(' + filename + ', hp=' + hp + ', gain=' + gain + ', line_in=' + line + ')\n';

    return code;
  };

  this.vs1003_record_to_file = function(block) {
    let code = 'vs1003_device.record_to_file()\n';

    return code;
  };

  this.vs1003_stop_recording_to_file = function(block) {
    let code = 'vs1003_device.stop_recording_to_file()\n';

    return code;
  };

  this.bytesBuffer_init = function(block) {
    self.imports['circularBuffer'] = 'import circularBuffer';

    let size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);

    var code = 'circularBuffer.BytesBuffer(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.circularBuffer_can_write = function(block) {
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    let size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);

    var code = variable + '.can_write(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.circularBuffer_write = function(block) {
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    let data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);

    var code = variable + '.write(' + data + ')\n';

    return code;
  };

  this.circularBuffer_can_read = function(block) {
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    let size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);

    var code = variable + '.can_read(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.circularBuffer_read = function(block) {
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');
    let size = Blockly.Python.valueToCode(block, 'size', Blockly.Python.ORDER_ATOMIC);

    var code = variable + '.read(' + size + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.circularBuffer_free_space = function(block) {
    let variable = Blockly.Python.nameDB_.getNameForUserVariable_(block.getFieldValue('variable'), 'VARIABLE');

    var code = variable + '.free_space()';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.idle = function(block) {
    self.imports['machine'] = 'import machine';


    let code = 'machine.idle()\n';

    return code;
  };

  this.lightsleep = function(block) {
    self.imports['machine'] = 'import machine';
    let duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);

    let code = 'machine.lightsleep(' + duration + ')\n';

    return code;
  };

  this.deepsleep = function(block) {
    self.imports['machine'] = 'import machine';
    let duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);

    let code = 'machine.deepsleep(' + duration + ')\n';

    return code;
  };

  this.wake_reason = function(block) {
    self.imports['machine'] = 'import machine';
    let reason = block.getFieldValue('reason');;

    let code = 'machine.wake_reason() == machine.' + reason;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.reset_cause = function(block) {
    self.imports['machine'] = 'import machine';
    let reason = block.getFieldValue('reason');;

    let code = 'machine.reset_cause() == machine.' + reason;

    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  this.start_watchdog = function(block) {
    self.imports['machine'] = 'import machine';
    let duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);

    let code = 'watchdog_timer = machine.WDT(timeout=' + duration + ')\n';

    return code;
  };

  this.feed_watchdog = function(block) {
    self.imports['machine'] = 'import machine';

    let code = 'watchdog_timer.feed()\n';

    return code;
  };


}

