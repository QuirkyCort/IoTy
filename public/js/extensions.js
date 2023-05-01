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
      name: 'SSD-1306 (OLED Screen)',
      files: [
        ['ssd1306.py', 'extensions/ssd1306.py?v=470f8a8c'],
      ],
      description:
        '<p>' +
          'The SSD-1306 is an OLED screen that can display text and monochrome images. ' +
          'This extension allows you to draw text, lines, and shapes on the SSD-1306 via I2C.' +
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
  ]

  this.init = function() {
  };

  this.loadDialog = function() {
    let $body = $('<div class="selectExtensions"></div>');
    let $extensions = $('<div class="extensions"></div>');

    for (let extension of self.availableExtensions) {
      $extensions.append(self.drawExtension(extension));
    }

    $body.append($extensions);

    let $buttons = $(
      '<button type="button" class="close btn-light">' + i18n.get('#extensions-close#') + '</button>'
    );

    let $dialog = dialog(i18n.get('#extensions-select_extensions#'), $body, $buttons);
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
      if (main.settings.extensions.includes(extension.id)) {
        blockly.workspace.getToolbox().getToolboxItemById(extension.id).show()
      } else {
        blockly.workspace.getToolbox().getToolboxItemById(extension.id).hide()
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