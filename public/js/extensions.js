var extensions = new function() {
  var self = this;

  this.availableExtensions = [
    {
      id: 'mpu6050',
      name: 'MPU-6050 (Gyro and Accelerometer)',
      files: [
        ['mpu6050.py', 'extensions/mpu6050.py?v=8803b4ba'],
      ],
      description:
        '<p>' +
          'The MPU-6050 (often sold as a GY-521 module) contains a 3-axis gyroscope and 3-axis accelerometer. ' +
          'This extension allows you to read the MPU-6050 via I2C, and additionally provides calibration routines to correct for errors, and integration routines to obtain headings.' +
        '</p>'
    },
    {
      id: 'pca9685',
      name: 'PCA-9685 (PWM / Servo Driver)',
      files: [
        ['pca9685.py', 'extensions/pca9685.py?v=3aee7687'],
      ],
      description:
        '<p>' +
          'The PCA-9685 is a 16-channel 12-bit PWM driver, commonly used to drive RC servos. ' +
          'This extension allows you to control the PCA-9685 via I2C.' +
        '</p>'
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
          'This extension allows you to draw text, lines, and shapes on the SSD-1306 via I2C.' +
          'It also supports the SH-1106 OLED screen.' +
        '</p>'
    },
    {
      id: 'urequests',
      name: 'urequests (HTTP Requests)',
      files: [
        ['urequests.py', 'extensions/urequests.py?v=9467c710'],
      ],
      description:
        '<p>' +
          'This extension allows you to make http request (ie. retrieve webpages). ' +
          'You can use this to retrieve normal webpages, as well as useful data (eg. weather) from <a href="https://github.com/public-apis/public-apis">public APIs</a>.' +
        '</p>'
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
        '</p>'
    },
    {
      id: 'espnow',
      name: 'ESP-NOW',
      files: [],
      description:
        '<p>' +
          'The ESP-NOW protocol allows direct communication between up to 20 registered peers, without requiring a WiFi access point. ' +
          'To use this extension, your device must be loaded with a <a href="https://github.com/glenn20/micropython-espnow-images">firmware supporting ESP-NOW</a>. ' +
        '</p>' +
        '<p>' +
          'This extensions only add blocks; no additional Python files are added or required.' +
        '</p>'
    },
    {
      id: 'ez_espnow',
      name: 'EZ ESP-NOW',
      files: [
        ['ez_espnow.py', 'extensions/ez_espnow.py?v=270742f4'],
      ],
      description:
        '<p>' +
          'This is an easy to use version of ESP-NOW that doesn\'t require the peer\'s MAC address. ' +
          'Instead, each device will set a group, and messages are broadcast to all devices within the same group (similar to the microbit "radio"). ' +
          'To use this extension, your device must be loaded with a <a href="https://github.com/glenn20/micropython-espnow-images">firmware supporting ESP-NOW</a>. ' +
        '</p>'
    },
    {
      id: 'ez_httpd',
      name: 'EZ HTTP Server',
      files: [
        ['ez_httpd.py', 'extensions/ez_httpd.py?v=d86791a2'],
      ],
      description:
        '<p>' +
          'This extensions allows your IoTy device to act as a HTTP (Web) server and handle requests. ' +
          'To use it, 1) Start AP mode or connect to WiFi, 2) Init a HTTPD object, 3) wait_for_connection, 4) send_response. ' +
        '</p>' +
        '<p>' +
          'In AP mode, the address of the IoTy device will be http://194.168.4.1. ' +
          'If connected to WiFi, use the "IP address" block to retrieve your address.' +
        '</p>'
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
        '</p>'
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
        '</p>'
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
        '</p>'
    },
    {
      id: 'non_block',
      name: 'Non-Blocking Read',
      files: [
        ['non_block.py', 'extensions/non_block.py?v=9268c687'],
      ],
      description:
        '<p>' +
          'This module allows you to perform non-blocking read from the terminal/stdin.' +
          'Unlike the "input" block, this module will not wait for input and will always return immediately. ' +
        '</p>' +
        '<p>' +
          'If available data is less than what is requested, the "read" function will return whatever is available, while "readline" will return an empty string. ' +
        '</p>'
    },
    {
      id: 'gps',
      name: 'GPS (NMEA over serial)',
      files: [
        ['gps.py', 'extensions/gps.py?v=20ce00ab'],
      ],
      description:
        '<p>' +
          'This module allows you read GPS modules that returns NMEA data over serial. ' +
          'Most common GPS modules are of this type and should work. ' +
          'To keep things simple, only Latitude, Longitude, Altitude, Date, and Time are parsed. ' +
        '</p>'
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
        '</p>'
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
        '</p>'
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
        '</p>'
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
        '</p>'
    },
    {
      id: 'hmc5883l',
      name: 'HMC5883L (Magnetic Sensor)',
      files: [
        ['hmc5883l.py', 'extensions/hmc5883l.py?v=55220922'],
      ],
      description:
        '<p>' +
          'The HMC5883L is often used as a magnetic compass for navigation purposes. ' +
        '</p>' +
        '<p>' +
          'It is often found in the form of a GY-271 module, but note that the GY-271 may also be equipped with a GMC5883L instead. ' +
          'You can check by doing an I2C scan; the QMC5883L will have an address of 0x0D (13), while the HMC5883L uses address 0x1E (30).' +
        '</p>'
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
        '</p>'
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
        '</p>'
    },
    {
      id: 'vl53l0x',
      name: 'VL53L0x (Time-of-Flight laser ranging)',
      files: [
        ['vl53l0x.py', 'extensions/vl53l0x.py?v=2f4f655e'],
      ],
      description:
        '<p>' +
          'The VL53L0X is a Time-of-Flight (ToF) laser ranging module. ' +
          'It is similar to the VL53L1X, but with a shorter range of 2 meters.' +
          'This extension allows you to read the distance in millimeters (mm).' +
        '</p>'
    },
    {
      id: 'vl53l1x',
      name: 'VL53L1x (Time-of-Flight laser ranging)',
      files: [
        ['vl53l1x.py', 'extensions/vl53l1x.py?v=de29e581'],
      ],
      description:
        '<p>' +
          'The VL53L1X is a Time-of-Flight (ToF) laser ranging module. ' +
          'It is similar to the VL53L0X, but with a longer range of 4 meters.' +
          'This extension allows you to read the distance in millimeters (mm).' +
        '</p>'
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
        '</p>'
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
        '</p>'
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
        '</p>'
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
          'For wiring details, please see <a href="https://github.com/QuirkyCort/micropython-gy33">this page</a>.' +
        '</p>'
    },
    {
      id: 'gy33_uart',
      name: 'GY33 UART (Light and Color sensor)',
      files: [
        ['gy33_uart.py', 'extensions/gy33_uart.py?v=5f8cfc5a'],
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
          'For wiring details, please see <a href="https://github.com/QuirkyCort/micropython-gy33">this page</a>.' +
        '</p>'
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