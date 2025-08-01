var extensions = new function() {
  var self = this;

  this.availableExtensions = [
    {
      id: 'mpu6050',
      name: 'MPU-6050 / MPU-6500 (Gyro and Accelerometer)',
      files: [
        ['mpu6050.py', 'extensions/mpu6050.py?v=04b76ab3'],
      ],
      description:
        '<p>' +
          'This extension is for the MPU-6050 and MPU-6500. ' +
          'Both devices contains a 3-axis gyroscope, 3-axis accelerometer, and a temperature sensor. ' +
          'Most functions are the same, but note that you will need to specify the device type when reading temperature. ' +
        '</p>' +
        '<p>' +
          'The MPU-6050 is often sold as a GY-521 module, while the MPU-6500 may be sold on its own or as a MPU-9250 (...which integrates the MPU-6500 with an AK8963). ' +
        '</p>' +
        '<p>' +
          'This extension allows you to read the device via I2C, and additionally provides calibration routines to correct for errors, and integration routines to obtain headings.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/10-Gyro.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'pca9685',
      name: 'PCA-9685 (PWM / Servo Driver)',
      files: [
        ['pca9685.py', 'extensions/pca9685.py?v=56308430'],
      ],
      description:
        '<p>' +
          'The PCA-9685 is a 16-channel 12-bit PWM driver, commonly used to drive RC servos. ' +
          'This extension allows you to control the PCA-9685 via I2C.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/20-Servo-driver.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'ssd1306',
      name: 'SSD-1306 and SH-1106 (OLED Screen)',
      files: [
        ['ssd1306.py', 'extensions/ssd1306.py?v=783dd801'],
      ],
      description:
        '<p>' +
          'The SSD-1306 is an OLED screen that can display text and monochrome images. ' +
          'This extension allows you to draw text, lines, and shapes on the SSD-1306 via I2C. ' +
          'It also supports the SH-1106 OLED screen.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/30-SSD1306.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'urequests',
      name: 'urequests (HTTP Requests)',
      files: [
        ['urequests.py', 'extensions/urequests.py?v=8f775290'],
      ],
      description:
        '<p>' +
          'This extension allows you to make http request (ie. retrieve webpages). ' +
          'You can use this to retrieve normal webpages, as well as useful data (eg. weather) from <a href="https://github.com/public-apis/public-apis">public APIs</a>.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/100-Extensions_Software/10-urequests.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'ioty_neopixel',
      name: 'Neopixel (WS2812 LEDs)',
      files: [
        ['ioty_neopixel.py', 'extensions/ioty_neopixel.py?v=d1501cc5'],
      ],
      description:
        '<p>' +
          'NeoPixels (aka WS2812 LEDs), are full-colour LEDs where you can control each individual LED brightness and color. ' +
          'If using Python, you can use the built-in <a href="https://docs.micropython.org/en/latest/esp32/quickref.html#neopixel-and-apa106-driver">neopixel</a> module without any extensions. ' +
          'This extensions is a thin wrapper over the built-in neopixel module to allow programming the Neopixel without an object-oriented approach.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/40-Neopixel.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'espnow',
      name: 'ESP-NOW',
      files: [],
      description:
        '<p>' +
          'The ESP-NOW protocol allows direct communication between up to 20 registered peers, without requiring a WiFi access point. ' +
        '</p>' +
        '<p>' +
          'This extensions only add blocks; no additional Python files are added or required.' +
        '</p>'
    },
    {
      id: 'ez_espnow',
      name: 'EZ ESP-NOW',
      files: [
        ['ez_espnow.py', 'extensions/ez_espnow.py?v=9abb0dd0'],
      ],
      description:
        '<p>' +
          'This is an easy to use version of ESP-NOW that doesn\'t require the peer\'s MAC address. ' +
          'Instead, each device will set a group, and messages are broadcast to all devices within the same group (similar to the microbit "radio"). ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/100-Extensions_Software/20-EZ-ESP-NOW.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'ez_httpd',
      name: 'EZ HTTP Server',
      files: [
        ['ez_httpd.py', 'extensions/ez_httpd.py?v=9b0d36a2'],
      ],
      description:
        '<p>' +
          'This extensions allows your IoTy device to act as a HTTP (Web) server and handle requests. ' +
          'To use it, 1) Start AP mode or connect to WiFi, 2) Init a HTTPD object, 3) wait_for_connection, 4) send_response. ' +
        '</p>' +
        '<p>' +
          'In AP mode, the address of the IoTy device will be http://194.168.4.1. ' +
          'If connected to WiFi, use the "IP address" block to retrieve your address.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/100-Extensions_Software/30-EZ-HTTPD.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'ucsv',
      name: 'uCSV',
      files: [
        ['ucsv.py', 'extensions/ucsv.py?v=574bc69e'],
      ],
      description:
        '<p>' +
          'This extensions allows your IoTy device to read and write CSV files. ' +
          'The extension largely complies with <a href="https://datatracker.ietf.org/doc/html/rfc4180.html">RFC 4180</a>, and expects fields to be separated by commas and the use of double quotes. ' +
        '</p>'
    },
    {
      id: 'i2c_lcd',
      name: 'I2C LCD (HD44780 + PCF8574)',
      files: [
        ['i2c_lcd.py', 'extensions/i2c_lcd.py?v=41df1d70'],
      ],
      description:
        '<p>' +
          'The HD44780 is a popular LCD screen, often paired with a PCF8574 IO expander for I2C control. ' +
          'This extensions allows you to write text to such a screen. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/50-I2C-LCD.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'dht',
      name: 'Temperature and Humidity Sensors (DHT11, DHT22, AM2302)',
      files: [],
      description:
        '<p>' +
          'The DHT series of sensors provides both temperature and humidity readings. ' +
          'When using this extension, be sure to run the "measure" command before reading the temperature or humidity.' +
        '</p>' +
        '<p>' +
          'This extensions only add blocks; no additional Python files are added or required.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/60-DHT11.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'ez_ds18x20',
      name: 'Temperature Sensors (DS18S20, DS18B20)',
      files: [
        ['ez_ds18x20.py', 'extensions/ez_ds18x20.py?v=150465f7'],
      ],
      description:
        '<p>' +
          'The DS18X20 series of sensors provides temperature readings via the OneWire protocol. ' +
          'This extension provides a thin wrapper around the ds18x20 module built into micropython, allowing you to read multiple sensors using their index number instead of their serial code. ' +
          'When using this extension, be sure to run the "convert temp" command before reading the temperature.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/70-EZ-DS18X20.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'non_block',
      name: 'Non-Blocking Read',
      files: [
        ['non_block.py', 'extensions/non_block.py?v=9268c687'],
      ],
      description:
        '<p>' +
          'This module allows you to perform non-blocking read from the terminal/stdin. ' +
          'Unlike the "input" block, this module will not wait for input and will always return immediately. ' +
        '</p>' +
        '<p>' +
          'If available data is less than what is requested, both the "read" and "readline" will return an empty string. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/100-Extensions_Software/40-non-block.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'gps',
      name: 'GPS (NMEA over serial)',
      files: [
        ['gps.py', 'extensions/gps.py?v=337de3ec'],
      ],
      description:
        '<p>' +
          'This module allows you read GPS modules that returns NMEA data over serial. ' +
          'Most common GPS modules are of this type and should work. ' +
          'To keep things simple, only Latitude, Longitude, Altitude, Date, and Time are parsed. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/80-GPS.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'hx711',
      name: 'HX711 (Analog-to-Digital, Load Cell)',
      files: [
        ['hx711.py', 'extensions/hx711.py?v=74ec13a3'],
      ],
      description:
        '<p>' +
          'This module allows you read the HX711 Analog-to-Digital converter. ' +
          'This device is commonly used with load cells for weight / force measurement. ' +
          'It return a unitless value, so calibration is required if you want to measure weight. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/90-hx711.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'hx710',
      name: 'HX710 (Analog-to-Digital)',
      files: [
        ['hx710.py', 'extensions/hx710.py?v=f4ebbc89'],
      ],
      description:
        '<p>' +
          'This module allows you read the HX710 Analog-to-Digital converter. ' +
          'The HX710A contains a temperature sensor, while the HX710B contains an analog voltage sensor. ' +
        '</p>' +
        '<p>' +
          'This device is may be found in load cells for weight / force measurement or in pressure sensors. ' +
          'It return a unitless value, so calibration is required if you want to measure weight. ' +
        '</p>' +
        '<p>' +
          'When taking a reading, you can specify the type of the next reading.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/100-hx710.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'ez_timer',
      name: 'EZ Timer',
      files: [
        ['ez_timer.py', 'extensions/ez_timer.py?v=396da716'],
      ],
      description:
        '<p>' +
          'This module allows you easily create a function that runs at a fixed interval. ' +
          'It can also let you run code after a timeout without blocking. ' +
        '</p>' +
        '<p>' +
          'It has 1ms resolution and uses polling, so there are no guarantees for the exact time that the timer runs. ' +
          'As long as you run update frequently, it should be fairly accurate (...within a few ms).' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/100-Extensions_Software/50-EZ-Timer.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'mfrc522',
      name: 'MFRC522 (RFID Reader)',
      files: [
        ['mfrc522.py', 'extensions/mfrc522.py?v=b2856cc4'],
      ],
      description:
        '<p>' +
          'This module allows you read the ID from an RFID card using an MFRC522 based RFID reader. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/110-MFRC522.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'qmc5883l',
      name: 'QMC5883L (Magnetic Sensor)',
      files: [
        ['qmc5883l.py', 'extensions/qmc5883l.py?v=5c554f09'],
      ],
      description:
        '<p>' +
          'The QMC5883L is often used as a magnetic compass for navigation purposes. ' +
        '</p>' +
        '<p>' +
          'It is often found in the form of a GY-271 module, but note that the GY-271 may also be equipped with a HMC5883L instead. ' +
          'You can check by doing an I2C scan; the QMC5883L will have an address of 0x0D (13), while the HMC5883L uses address 0x1E (30).' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/120-Magnetic-Sensor.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'hmc5883l',
      name: 'HMC5883L (Magnetic Sensor)',
      files: [
        ['hmc5883l.py', 'extensions/hmc5883l.py?v=bf37280e'],
      ],
      description:
        '<p>' +
          'The HMC5883L is often used as a magnetic compass for navigation purposes. ' +
        '</p>' +
        '<p>' +
          'It is often found in the form of a GY-271 module, but note that the GY-271 may also be equipped with a GMC5883L instead. ' +
          'You can check by doing an I2C scan; the QMC5883L will have an address of 0x0D (13), while the HMC5883L uses address 0x1E (30).' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/120-Magnetic-Sensor.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'bmp280',
      name: 'BMP280 (Temperature, Barometric Pressure Sensor)',
      files: [
        ['bmp280.py', 'extensions/bmp280.py?v=1d5a86a4'],
      ],
      description:
        '<p>' +
          'The BMP280 is a barometric pressure sensor often used for calculating altitude from pressure. ' +
          'This extension allows you to read temperature, pressure, and the calculated altitude. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/130-Barometric-Pressure.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'max30102',
      name: 'MAX30102 (Heart Rate Sensor and Pulse Oximeter)',
      files: [
        ['max30102.py', 'extensions/max30102.py?v=07b08871'],
      ],
      description:
        '<p>' +
          'The MAX30102 is an integrated pulse oximetry and heart-rate monitor module. ' +
          'This extension allows you to detect heart beats, read heart rate (bpm), and get the raw readings (IR and Red). ' +
          'Calculation of SpO2 is currently not provided by this extension. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/140-Heart-Rate.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'vl53l0x',
      name: 'VL53L0X (Time-of-Flight laser ranging)',
      files: [
        ['vl53l0x.py', 'extensions/vl53l0x.py?v=2f4f655e'],
      ],
      description:
        '<p>' +
          'The VL53L0X is a Time-of-Flight (ToF) laser ranging module. ' +
          'It is similar to the VL53L1X, but with a shorter range of 2 meters. ' +
          'This extension allows you to read the distance in millimeters (mm).' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/150-ToF.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'vl53l1x',
      name: 'VL53L1X (Time-of-Flight laser ranging)',
      files: [
        ['vl53l1x.py', 'extensions/vl53l1x.py?v=de29e581'],
      ],
      description:
        '<p>' +
          'The VL53L1X is a Time-of-Flight (ToF) laser ranging module. ' +
          'It is similar to the VL53L0X, but with a longer range of 4 meters. ' +
          'This extension allows you to read the distance in millimeters (mm).' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/150-ToF.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'mqtt_logger',
      name: 'MQTT Logger',
      files: [
        ['mqtt_logger.py', 'extensions/mqtt_logger.py?v=43819f32'],
      ],
      description:
        '<p>' +
          'This extension allows you to log data to an internal circular buffer, and send it out via MQTT when it receives a request for it. ' +
          'It should be used together with the "Chart" widget in the MQTT App Builder.' +
        '</p>'
    },
    {
      id: 'ds3231',
      name: 'DS3231 (Real-Time Clock)',
      files: [
        ['ds3231.py', 'extensions/ds3231.py?v=ad5ebfc9'],
      ],
      description:
        '<p>' +
          'The DS3231 is a real-time clock, often found as a module with a backup battery that allows it to keep the time when your device is otherwise powered off. ' +
        '</p>' +
        '<p>' +
          'This extension allows you read and write to the DS3231 in a format that is compatible with "machine.RTC", allowing you to easily set or save your device time. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/160-rtc-ds3231.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'bme280',
      name: 'BME280 (Temperature, Humidity, Barometric Pressure Sensor)',
      files: [
        ['bme280.py', 'extensions/bme280.py?v=9991299f'],
      ],
      description:
        '<p>' +
          'The BME280 is a barometric pressure sensor often used for calculating altitude from pressure. ' +
          'It is similar to the BMP280, but provides an additional humidity value. ' +
          'This extension allows you to read temperature, humidity, pressure, and the calculated altitude. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/130-Barometric-Pressure.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'apds9960',
      name: 'APDS9960 (Proximity, Ambient Light (RGB), Gesture Sensor)',
      files: [
        ['apds9960.py', 'extensions/apds9960.py?v=6682cbe3'],
      ],
      description:
        '<p>' +
          'The APDS9960 can detect proximity (up to a few cm), ambient light level and color, and gestures (...move your hand left/right/up/down near the sensor). ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/170-apds9960.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'gy33_i2c',
      name: 'GY33 I2C (Light and Color sensor)',
      files: [
        ['gy33_i2c.py', 'extensions/gy33_i2c.py?v=4119fa1d'],
      ],
      description:
        '<p>' +
          'The GY33 contains a TCS3472 light and color sensor, but has an additional micro-controller and cannot use a normal TCS3472 driver. ' +
          'It also provides a pair of controllable white LED to illuminate the target surface. ' +
        '</p>' +
        '<p>' +
          'This extension allows you to read the raw and calibrated values, perform calibration if required, and control the LED.' +
        '</p>' +
        '<p>' +
          'The GY33 supports both UART and I2C. ' +
          'This extension is for the I2C interface (S0 needs to be grounded). ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/180-gy33_i2c.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'gy33_uart',
      name: 'GY33 UART (Light and Color sensor)',
      files: [
        ['gy33_uart.py', 'extensions/gy33_uart.py?v=25537a86'],
      ],
      description:
        '<p>' +
          'The GY33 contains a TCS3472 light and color sensor, but has an additional micro-controller and cannot use a normal TCS3472 driver. ' +
          'It also provides a pair of controllable white LED to illuminate the target surface. ' +
        '</p>' +
        '<p>' +
          'This extension allows you to read the raw and calibrated values, perform calibration if required, and control the LED.' +
        '</p>' +
        '<p>' +
          'The GY33 supports both UART and I2C. ' +
          'This extension is for the UART interface (S0 needs to be unconnected). ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/190-gy33_uart.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'tcs3472',
      name: 'TCS3472 (Light and Color sensor)',
      files: [
        ['tcs3472.py', 'extensions/tcs3472.py?v=17df07e0'],
      ],
      description:
        '<p>' +
          'The TCS3472 is a light and color sensor. ' +
          'It is capable of reading red, green, blue, and clear light values. ' +
        '</p>' +
        '<p>' +
          'This extension allows you to read the raw and calibrated values, and perform calibration if required.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/200-tcs3472.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'tween',
      name: 'Tween (Inbetweening, Animation)',
      files: [
        ['tween.py', 'extensions/tween.py?v=0dd8e83c'],
      ],
      description:
        '<p>' +
          'It is often undesirable to start and stop something instantly. ' +
          'For example, when moving a servo arm, you might want it to start slow, gradually speed up, then slow down when it approaches its destination. ' +
        '</p>' +
        '<p>' +
          'With this extension, you can provide the start, stop, and duration (or speed), and it will generate the intermediate steps for you with the appropriate <a href="https://easings.net/">easing</a> function. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/100-Extensions_Software/60-tween.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'max6675',
      name: 'MAX6675 (Thermocouple board)',
      files: [
        ['max6675.py', 'extensions/max6675.py?v=e34287d1'],
      ],
      description:
        '<p>' +
          'The MAX6675 digitize and returns the readings from a type-K thermocouple using the SPI interface. ' +
          'Temperature resolution is 0.25C and readings can be as high as 1024C (...provided a suitable thermocouple is used). ' +
        '</p>' +
        '<p>' +
          'Note that the MAX6675 performs a measurement and stores the result after every read. ' +
          'On the next read, it returns the stored result. ' +
          'This means that the result may be very outdated if reading is infrequent. ' +
          'To get the latest measurement, perform a read, wait 0.22secs, then read again.' +
        '</p>' +
        '<p>' +
          'When wiring this device, SO should be connected to the MISO pin, and there are no connections for the MOSI pin. ' +
          'CS should be connected to any pin that supports digital write.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/210-max6675.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'encoder',
      name: 'Encoder (Incremental, Quadrature)',
      files: [
        ['encoder.py', 'extensions/encoder.py?v=810de3d7'],
      ],
      description:
        '<p>' +
          'Incremental encoders are used to detect motor movements as well as some knobs. ' +
          'It can detect direction, relative position, and speed. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/220-encoder.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'huskylens',
      name: 'Husky Lens (AI Camera)',
      files: [
        ['huskylib.py', 'extensions/huskylib.py?v=41abe07e'],
      ],
      description:
        '<p>' +
          'The Husky Lens is a camera with onboard machine vision features. ' +
          'It can perform object tracking, face recognition, object recognition, line tracking, color recognition, and tag recognition (April tags). ' +
        '</p>' +
        '<p>' +
          'This device can be wired in I2C mode (T -> SDA, R -> SCL), or UART mode (T -> Rx, R -> Tx). ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/230-husky-lens.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'tca9548a',
      name: 'TCA9548A (I2C Multiplexer)',
      files: [
        ['tca9548a.py', 'extensions/tca9548a.py?v=02f7ffce'],
      ],
      description:
        '<p>' +
          'Normally, you cannot have multiple I2C devices with the same address on the same I2C pins. ' +
          'The TCA9548A allows you to overcome this limitation by multiplexing one pair of I2C pins (SCL/SDA) into 8 separate ports, allowing you to use up to 8 devices with the same address. ' +
        '</p>'
    },
    {
      id: 'music',
      name: 'Music (Tone)',
      files: [
        ['music.py', 'extensions/music.py?v=d2df4f08'],
      ],
      description:
        '<p>' +
          'Plays tones, musical notes, and songs in Ring Tone Text Transfer Language (RTTTL) format. ' +
          'Find more RTTTL songs <a href="https://picaxe.com/rtttl-ringtones-for-tune-command/">here</a>, or <a href="https://eddmann.com/nokia-composer-web/">compose</a> your own.' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/250-music.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'scaled_text',
      name: 'Scaled Text',
      files: [
        ['scaled_text.py', 'extensions/scaled_text.py?v=16fe1e11'],
      ],
      description:
        '<p>' +
          'This extension works with other extensions that draws to screen (eg. SSD-1306), and provides drawing of larger text. ' +
          'The built-in micropython frame buffer only provides an 8x8 pixels font, which can be too small to read for some. ' +
          'This extension overcomes this by scaling the built-in font (eg. 2 times, 3 times) before drawing it. ' +
        '</p>' +
        '<p>' +
          'When using this extension, you should continue to use the original "fill" and "show" functions; this extension only replaces the "text" function. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/260-Scaled-Text.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'png_decoder',
      name: 'PNG Decoder',
      files: [
        ['PNGdecoder.py', 'extensions/PNGdecoder.py?v=5dc92f20'],
      ],
      description:
        '<p>' +
          'This extension allows you to decoder and render a PNG image on screen. ' +
          'In blocks mode, you can only render the image to a supported display type. ' +
          'In Python, you can render to any type of display by providing a suitable callback. ' +
        '</p>' +
        '<p>' +
          'Images can be uploaded using the "Files on Device..." option in the 3-dots menu. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/270-PNG-decoder.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'bmp_image',
      name: 'BMP Image',
      files: [
        ['bmp_image.py', 'extensions/bmp_image.py?v=aced5b14'],
      ],
      description:
        '<p>' +
          'This extension allows you to decoder and render a BMP image on screen. ' +
          'You can directly render the image to a supported display type, or extract out each pixel value one at a time. ' +
        '</p>' +
        '<p>' +
          'Images can be uploaded using the "Files on Device..." option in the 3-dots menu. ' +
          'Image must be uncompressed, and of 1/4/8/16/24/32 bits depth. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/280-BMP-Image.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'adv_pins',
      name: 'Advanced Pins',
      files: [],
      description:
        '<p>' +
          'This extension provides alternative "Pins" blocks which accepts block inputs for pin numbers. ' +
          'This is useful when iterating through pins, and when using devices with different pin numberings. ' +
          'You will need to ensure that the selected pins are capable of the requested mode (eg. analog read, output) as there are no checks. ' +
        '</p>' +
        '<p>' +
          'This extensions only add blocks; no additional Python files are added or required.' +
        '</p>'
    },
    {
      id: 'hid_services',
      name: 'Bluetooth LE Human Interface Devices',
      files: [
        ['hid_services.py', 'extensions/hid_services.py?v=f07a95e0'],
      ],
      description:
        '<p>' +
          'This extension allows the ESP32 to emulate a BLE HID device (eg. keyboard, mouse, joystick). ' +
          'You can use it to send keyboard/mouse/joystick commands to your computer or phone. ' +
        '</p>' +
        '<p>' +
          'Currently only works with micropython 1.19.1 and 1.23.0. ' +
          'Bluetooth should be disabled in the "When Started" block. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/100-Extensions_Software/70-BLE-HID.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'yx5300',
      name: 'YX5300 / YX6300 MP3 Players',
      files: [
        ['yx5300.py', 'extensions/yx5300.py?v=6626559d'],
      ],
      description:
        '<p>' +
          'This extension allows control of the UART based YX5300 and YX6300 MP3 players. ' +
          'These are often sold as "Catalex" Serial MP3. ' +
        '</p>' +
        '<p>' +
          'The audio files should be stored in MP3 or WAV format, on a microSD card formatted in FAT16, VFAT, or FAT32. ' +
          'The files should be prefixed with a unique 3 digit number (eg. 001Bohemian_Rhapsody.mp3, 002Money_for_Nothing.mp3), and may optionally be in folders named "01", "02", etc. ' +
          'Max of 99 folders and 255 songs per folder.' +
        '</p>' +
        '<p>' +
          'Note that the file index is based on the order that the file is written to the microSD card, and not the filename! ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/290-serial-mp3.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'ld2410',
      name: 'LD2410 Human Presence Radar',
      files: [
        ['ld2410.py', 'extensions/ld2410.py?v=ec57d3b2'],
      ],
      description:
        '<p>' +
          'The LD2410 uses a 24GHz radar to detect the presence of people. ' +
          'Unlike Infrared or Ultrasonic sensors, it can detect both moving and stationary people, and provide an approximate range. ' +
        '</p>' +
        '<p>' +
          'The LD2410 communicates via UART and an optional IO pin (...which provides a present / not-present signal).' +
        '</p>' +
        '<p>' +
          'This library allows you to control and read the detailed sensor data via UART. ' +
          'Note that the default baudrate is 256000. ' +
        '</p>' +
        '<p><a href="https://tutorials.aposteriori.com.sg/120-IoTy/110-Extensions_Hardware/300-ld2410.html" target="_blank">Documentations</a></p>'
    },
    {
      id: 'stepper_wheels',
      name: 'Stepper Wheels',
      files: [
        ['stepper_wheels.py', 'extensions/stepper_wheels.py?v=13aeff7e'],
      ],
      description:
        '<p>' +
          '<a href="https://github.com/QuirkyCort/stepper_wheels" target="_blank">Stepper Wheels</a> is a firmware that allows you to use a stepper motor controller to drive the wheels on a robot. ' +
          'These controllers are typically used to drive 3D printers / CNC / Laser cutters, and are available at a low cost. ' +
        '</p>' +
        '<p>' +
          'The Stepper Wheels controller communicates via I2C, with a default address of 85 (0x55). ' +
        '</p>'
    },
    {
      id: 'stepper_wheels_drives',
      name: 'Stepper Wheels Drives',
      files: [],
      description:
        '<p>' +
          'Provides various driving control for the Stepper Wheels extension. ' +
          'Currently supports Differential (2 wheels), Delta Drive, and Mecanum Drive.' +
        '</p>' +
        '<p>' +
          'This extension only adds blocks; you must also add the Stepper Wheels extension. ' +
        '</p>'
    },
    {
      id: 'camera',
      name: 'Camera',
      files: [],
      description:
        '<p>' +
          'Provides blocks for reading the camera on an ESP32-Cam. ' +
          'You must use a firmware with camera support for this to work. ' +
          'Note that in the ESP32-Cam...' +
        '</p>' +
        '<p>' +
          '<ul>' +
            '<li>You cannot use the boot button in your program. It interferes with the camera.</li>' +
            '<li>Camera LED is on pin 4; digital_write 1 to activate.</li>' +
            '<li>Red indicator LED on pin 33; digital_write 0 to activate.</li>' +
          '</ul>' +
        '</p>' +
        '<p>' +
          'This extension only adds blocks. ' +
        '</p>'
    },
    {
      id: 'mv',
      name: 'Machine Vision',
      files: [
        ['mv.py', 'extensions/mv.py?v=f9106325'],
      ],
      description:
        '<p>' +
          'Provides functions for Machine Vision tasks. ' +
          'Currently, functions for blob detection, circle detection, edge detection, and blurring are available.' +
        '</p>' +
        '<p>' +
          'Some tools to support this extension can be found here: <a href="https://github.com/QuirkyCort/misc/tree/main/machine_vision">https://github.com/QuirkyCort/misc/tree/main/machine_vision</a>' +
        '</p>'
    },
    {
      id: 'wheeled_drives',
      name: 'Wheeled Drives',
      files: [
        ['wheeled_drives.py', 'extensions/wheeled_drives.py?v=d0314d9d'],
      ],
      description:
        '<p>' +
          'Provides functions for calculating motor speed when controlling different types of wheeled robot (eg. 2 wheeled, 3 omni-wheels, mecanum). ' +
        '</p>'
    },
    {
      id: 'ili9341',
      name: 'ILI9341 Display',
      files: [
        ['ili9341.py', 'extensions/ili9341.py?v=b99501ca'],
      ],
      description:
        '<p>' +
          'The ILI9341 is a color LCD display that can display text and images. ' +
          'It is used in the ESP32-2432S028R (aka. Cheap Yellow Display, CYD). ' +
        '</p>' +
        '<p>' +
          'When using this display, the SPI interface should be initialized at a high speed; 80000000 is recommended. ' +
          'You may also need to turn on the backlight (pin 21 for the CYD). ' +
          'On the CYD, you should use SPI channel 1 and sck=Pin(14), mosi=Pin(13), miso=Pin(12). ' +
        '</p>' +
        '<p>' +
          'Default settings are for the CYD; you may need to change it if you are using an external display with different wirings. ' +
        '</p>'
    },
    {
      id: 'xglcd_font',
      name: 'X-GLCD Font',
      files: [
        ['xglcd_font.py', 'extensions/xglcd_font.py?v=c8c11221'],
      ],
      description:
        '<p>' +
          'This extension is used to load fonts in the X-GLCD format. ' +
          'The loaded font can be used with the ILI9341 Display extension to draw text. ' +
        '</p>' +
        '<p>' +
          'No font files are included with this extension. ' +
          'You can download one from <a href="https://github.com/rdagger/micropython-ili9341/tree/master/fonts">https://github.com/rdagger/micropython-ili9341/tree/master/fonts</a> and upload it to your device.' +
        '</p>'
    },
    {
      id: 'xpt2046',
      name: 'ADS7843 / XPT2046 Touchscreen Controller',
      files: [
        ['xpt2046.py', 'extensions/xpt2046.py?v=b38b55f3'],
      ],
      description:
        '<p>' +
          'The ADS7843/XPT2046 is resistive touchscreen controller that can return the touch position in X and Y coordinates. ' +
          'It is used in the ESP32-2432S028R (aka. Cheap Yellow Display, CYD). ' +
        '</p>' +
        '<p>' +
          'On the CYD, you should use SPI channel 2 to communicate with this device, and use sck=Pin(25), mosi=Pin(32), miso=Pin(39). ' +
        '</p>' +
        '<p>' +
          'Default settings are for the CYD; you may need to change it if you are using an external device with different wirings. ' +
        '</p>'
    },
    {
      id: 'st7789',
      name: 'ST7789 Display',
      files: [
        ['st7789.py', 'extensions/st7789.py?v=b462e9b3'],
      ],
      description:
        '<p>' +
          'The ST7789 is a color LCD display that can display text and images. ' +
        '</p>' +
        '<p>' +
          'When using this display, the SPI interface should be initialized at a high speed; 20000000 is recommended. ' +
          'You may also need to turn on the backlight (pin 4 for the TTGO). ' +
          'On the TTGO, you should use SPI channel 1 and sck=Pin(18), mosi=Pin(19), miso=Pin(12). ' +
        '</p>' +
        '<p>' +
          'Default settings are for the TTGO; you may need to change it if you are using an external display with different wirings. ' +
        '</p>'
    },
    {
      id: 'lds02rr',
      name: 'LDS02RR LIDAR (Xiaomi / Roborock / Neato XV11)',
      files: [
        ['lds02rr.py', 'extensions/lds02rr.py?v=82983e3f'],
      ],
      description:
        '<p>' +
          'The LDS02RR is a low cost 2D LIDAR designed for use in vacuum cleaners. ' +
          'There are many similar designs for this LIDAR, and this extension is compatible with those described as Xiaomi / Roborock LDS02RR and the Neato XV11 LIDAR. ' +
        '</p>' +
        '<p>' +
          'The motor RPM needs to be between 180 to 349 RPM to transmit valid data. ' +
          'This extension does not control the motor RPM, and you should control it by adjusting the motor voltage or with PWM. ' +
        '</p>' +
        '<p>' +
          'UART must be initialized at baudrate 115200. ' +
        '</p>'
    },
    {
      id: 'amg8833',
      name: 'AMG8833 IR Thermal Camera',
      files: [
        ['amg8833.py', 'extensions/amg8833.py?v=c9f520ce'],
      ],
      description:
        '<p>' +
          'The AMG8833 contains an 8x8 array of IR thermal sensors. ' +
          'It can be used to detect hot or warm objects (eg. a human) from a distance.' +
        '</p>'
    },
    {
      id: 'vs1003',
      name: 'VS1003 MP3/WMA Audio CODEC',
      files: [
        ['vs1003.py', 'extensions/vs1003.py?v=33718775'],
      ],
      description:
        '<p>' +
          'The VS1003 is a single-chip MP3/WMA/MIDI audio decoder and ADPCM encoder. ' +
          'Unlike the YX5300 MP3 player which requires an SD card, the VS1003 can receive audio data via SPI, allowing it to play files on the micropython filesystem or from the internet.' +
        '</p>'
    },
    {
      id: 'circularBuffer',
      name: 'Circular Buffer',
      files: [
        ['circularBuffer.py', 'extensions/circularBuffer.py?v=6cddbf7e'],
      ],
      description:
        '<p>' +
          'Provides a <a href="https://en.wikipedia.org/wiki/Circular_buffer">circular buffer</a> useful for buffering data (ie. when streaming data from the internet). ' +
        '</p>'
    },
    {
      id: 'system',
      name: 'System',
      files: [],
      description:
      '<p>' +
        'Provides access to system functions such as deepsleep and watchdog timer. ' +
      '</p>' +
      '<p>' +
        'Be careful when using these blocks, as improper use may prevent you from programming your device. ' +
        'If that occurs, you can usually recover by putting the device into programming mode (...hold the boot button while clicking reset).' +
      '</p>' +
      '<p>' +
        'This extensions only add blocks; no additional Python files are added or required.' +
      '</p>'
    },
    {
      id: 'coind4',
      name: 'COIN-D4 LIDAR',
      files: [
        ['coind4.py', 'extensions/coind4.py?v=3814a093'],
      ],
      description:
        '<p>' +
          'The COIN-D4 is a low cost 2D dToF LIDAR. ' +
          'Compared to a triangulation LIDAR, the COIN-D4 is much smaller and has a shorter minimum distance. ' +
        '</p>' +
        '<p>' +
          'As I do not have access to the COIN-D4 documentation, this extension is written based on the M1C1_Mini protocol and may not support all features of the COIN-D4. ' +
          'Basic features such as start / stop and retrieval of distance readings are supported. ' +
        '</p>' +
        '<p>' +
          'UART must be initialized at baudrate 230400. ' +
        '</p>'
    },
    {
      id: 'delta2d',
      name: 'Delta 2D LIDAR',
      files: [
        ['delta2d.py', 'extensions/delta2d.py?v=60a5901e'],
      ],
      description:
        '<p>' +
          'The Delta-2D is a low cost 2D LIDAR designed for use in vacuum cleaners. ' +
          'There are many similar designs for this LIDAR (eg. Delta-2A), and this extension is may be compatible with them. ' +
        '</p>' +
        '<p>' +
          'The motor RPM needs to be between 180 to 349 RPM to transmit valid data. ' +
          'This extension does not control the motor RPM, and you should control it by adjusting the motor voltage or with PWM. ' +
        '</p>' +
        '<p>' +
          'UART must be initialized at baudrate 115200. ' +
          'If using a differente variant (eg. Delta-2A), you may need to use 230400. ' +
        '</p>'
    },
    {
      id: 'pms7003',
      name: 'PMS7003 (Particle Concentration Sensor)',
      files: [
        ['pms7003.py', 'extensions/pms7003.py?v=85695624'],
      ],
      description:
        '<p>' +
          'The PMS7003 is a particle concentration sensor typically used for measuring air quality. ' +
        '</p>' +
        '<p>' +
          'This driver should also work with the PMS5003, but is untested on that sensor. ' +
        '</p>' +
        '<p>' +
          'UART must be initialized at baudrate 9600. ' +
        '</p>'
    },
    {
      id: 'ags10',
      name: 'AGS10 (TVOC Sensor)',
      files: [
        ['ags10.py', 'extensions/ags10.py?v=52c08b82'],
      ],
      description:
        '<p>' +
          'The AGS10 is a sensor for measuring the quantity of Total Volatile Organic Compounds (TVOC) in air. ' +
          'Output is in ppb (parts per billion). ' +
        '</p>' +
        '<p>' +
          'Upon power up, it can take around 2 mins for the sensor to pre-heat, before readings are available. ' +
          'It is also important not to read more than once every 1.5 seconds. ' +
        '</p>'
    },
    {
      id: 'mlx90640',
      name: 'MLX90640 (Thermal Camera)',
      files: [
        ['mlx90640.py', 'extensions/mlx90640.py?v=09841071'],
      ],
      description:
        '<p>' +
          'The MLX90640 is a 32x24 pixels thermal IR array with factory calibration. ' +
          'It can be used to detect hot or warm objects (eg. a human) from a distance.' +
        '</p>' +
        '<p>' +
          'It is recommended to set the I2C bus to a higher speed (eg. 400kHz) when using this device.' +
        '</p>'
    },
  ]

  this.init = function() {

  };

  this.loadDialog = function() {
    let $body = $('<div></div>');
    let $search = $('<div class="search">Search: <input type="text" id="extensionsSearch"><input type="checkbox" id="extensionsInstalled"> Installed</div>')
    let $extensions = $('<div class="extensions"></div>');
    let $searchInput = $search.find('#extensionsSearch');
    let $installedInput = $search.find('#extensionsInstalled');

    for (let extension of self.availableExtensions) {
      $extensions.append(self.drawExtension(extension));
    }

    function filterExtensions() {
      let searchTerm = $searchInput.val().toLowerCase();
      let installed = $installedInput[0].checked;
      $extensions[0].childNodes.forEach(function(item){
        let itemText = item.innerText.toLowerCase();
        if (itemText.includes(searchTerm)) {
          if (installed) {
            if (item.getElementsByClassName('buttons')[0].classList.contains('remove')) {
              item.classList.remove('hide');
            } else {
              item.classList.add('hide');
            }
          } else {
            item.classList.remove('hide');
          }
        } else {
          item.classList.add('hide');
        }
      });
    }

    $searchInput.on('input', filterExtensions);
    $installedInput.on('change', filterExtensions);

    $body.append($search);
    $body.append($extensions);

    let $buttons = $(
      '<button type="button" class="close btn-light">' + i18n.get('#extensions-close#') + '</button>'
    );

    let $dialog = dialog(i18n.get('#extensions-select_extensions#'), $body, $buttons, 'selectExtensions');
    $buttons.click(function() {
      self.processExtensions();
      $dialog.close();
    });
    $('#extensionsSearch')[0].focus();

    return $dialog;
  };

  this.processExtensions = async function() {
    if (typeof blockly.workspace == 'undefined') {
      setTimeout(self.processExtensions, 500);
      return;
    }

    for (extension of self.availableExtensions) {
      if (main.settings.extensions.includes(extension.id)) {
        await self.processFilesManager(extension);
      }
    }
    filesManager.select('main.py');

    for (extension of self.availableExtensions) {
      let item = blockly.workspace.getToolbox().getToolboxItemById(extension.id);
      if (item == null) {
        continue;
      }
      if (main.settings.extensions.includes(extension.id)) {
        item.show();
      } else {
        item.hide();
      }
    }

    window.dispatchEvent(new Event('resize'));
  }

  this.processFilesManager = async function(extension) {
    for (file of extension.files) {
      if (! (file in filesManager.files)) {
        let response = await fetch(file[1]);
        let content = await response.text();
        filesManager.add(file[0], content);
      }
    }
  };

  this.drawExtension = function(extension) {
    let $extension = $(
      '<div class="extension">' +
        '<div class="title">' + extension.name + '</div>' +
        '<div class="description">' + extension.description + '</div>' +
      '</div>'
    );
    let $buttons = $(
      '<div class="buttons install">' +
        '<button class="install">Install</button>' +
        '<button class="remove">Remove</button>' +
      '</div>'
    );
    $extension.append($buttons);

    $buttons.find('.remove').click(function(){
      self.removeExtension(extension);
      $buttons.addClass('install');
      $buttons.removeClass('remove');
    });
    $buttons.find('.install').click(function(){
      self.addExtension(extension);
      $buttons.removeClass('install');
      $buttons.addClass('remove');
    });

    if (main.settings.extensions.includes(extension.id)) {
      $buttons.removeClass('install');
      $buttons.addClass('remove');
    }

    return $extension;
  };

  this.addExtension = function(extension) {
    if (! main.settings.extensions.includes(extension.id)) {
      main.settings.extensions.push(extension.id);
    }
  };

  this.removeExtension = function(extension) {
    main.settings.extensions = main.settings.extensions.filter(val => val != extension.id);
  };
}

// Init class
extensions.init();