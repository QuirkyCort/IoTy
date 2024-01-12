var extensions = new function() {
  var self = this;

  this.availableExtensions = [
    {
      id: 'mpu6050',
      name: 'MPU-6050 / MPU-6500 (Gyro and Accelerometer)',
      files: [
        ['mpu6050.py', 'extensions/mpu6050.py?v=e3310054'],
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
        '</p>'
    },
    {
      id: 'pca9685',
      name: 'PCA-9685 (PWM / Servo Driver)',
      files: [
        ['pca9685.py', 'extensions/pca9685.py?v=b8af3a92'],
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
      name: 'VL53L0X (Time-of-Flight laser ranging)',
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
      name: 'VL53L1X (Time-of-Flight laser ranging)',
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
        '</p>'
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
          'This means that the result may be very outdated if reading is infrequent.' +
          'To get the latest measurement, perform a read, wait 0.22secs, then read again.' +
        '</p>' +
        '<p>' +
          'When wiring this device, SO should be connected to the MISO pin, and there are no connections for the MOSI pin. ' +
          'CS should be connected to any pin that supports digital write.' +
        '</p>'
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
        '</p>'
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
        '</p>'
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
        ['music.py', 'extensions/music.py?v=89544506'],
      ],
      description:
        '<p>' +
          'Plays tones, musical notes, and songs in Ring Tone Text Transfer Language (RTTTL) format. ' +
          'Find more RTTTL songs <a href="https://picaxe.com/rtttl-ringtones-for-tune-command/">here</a>, or <a href="https://eddmann.com/nokia-composer-web/">compose</a> your own.' +
        '</p>'
    },
    {
      id: 'scaled_text',
      name: 'Scaled Text',
      files: [
        ['scaled_text.py', 'extensions/scaled_text.py?v=fd8996d0'],
      ],
      description:
        '<p>' +
          'This extension works with other extensions using the frame buffer (eg. SSD-1306), and provides drawing of larger text. ' +
          'The built-in micropython frame buffer only provides an 8x8 pixels font, which can be too small to read for some. ' +
          'This extension overcomes this by scaling the built-in font (eg. 2 times, 3 times) before drawing it. ' +
        '</p>' +
        '<p>' +
          'When using this extension, you should continue to use the original "fill" and "show" functions; this extension only replaces the "text" function. ' +
        '</p>'
    },
    {
      id: 'png_decoder',
      name: 'PNG Decoder',
      files: [
        ['PNGdecoder.py', 'extensions/PNGdecoder.py?v=98b17ad5'],
      ],
      description:
        '<p>' +
          'This extension allows you to decoder and render a PNG image on screen. ' +
          'In blocks mode, you can only render the image to a supported display type (...currently SSD-1306 and the SH-1106 which uses the same extension). ' +
          'In Python, you can render to any type of display by providing a suitable callback. ' +
        '</p>' +
        '<p>' +
          'Images can be uploaded using the "Files on Device..." option in the 3-dots menu. ' +
        '</p>'
    },
    {
      id: 'bmp_image',
      name: 'BMP Image',
      files: [
        ['bmp_image.py', 'extensions/bmp_image.py?v=16689a30'],
      ],
      description:
        '<p>' +
          'This extension allows you to decoder and render a BMP image on screen. ' +
          'You can directly render the image to a supported display type (...currently SSD-1306 and the SH-1106 which uses the same extension), ' +
          'or extract out each pixel value one at a time. ' +
        '</p>' +
        '<p>' +
          'Images can be uploaded using the "Files on Device..." option in the 3-dots menu. ' +
          'Image must be uncompressed, and of 1/4/8/16/24/32 bits depth. ' +
        '</p>'
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
        ['hid_services.py', 'extensions/hid_services.py?v=a4f25ed2'],
      ],
      description:
        '<p>' +
          'This extension allows the ESP32 to emulate a BLE HID device (eg. keyboard, mouse, joystick). ' +
          'You can use it to send keyboard/mouse/joystick commands to your computer or phone. ' +
        '</p>' +
        '<p>' +
          'Currently only works with micropython 1.19.1. ' +
          'Bluetooth should be disabled in the "When Started" block. ' +
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