var extensions = new function() {
  var self = this;

  this.availableExtensions = [
    {
      id: 'mpu6050',
      name: 'MPU-6050 (Gyro and Accelerometer)',
      files: ['mpu6050.py'],
      description:
        '<p>' +
          'The MPU-6050 (often sold as a GY-521 module) contains a 3-axis gyroscope and 3-axis accelerometer.' +
          'This extension allows you to read the MPU-6050 via I2C, and additionally provides calibration routines to correct for errors, and integration routines to obtain heading.' +
        '</p>'
    },
    {
      id: 'pca9685',
      name: 'PCA-9685 (PWM / Servo Driver)',
      files: ['pca9685.py'],
      description:
        '<p>' +
          'The PCA-9685 is a 16-channel 12-bit PWM driver, commonly used to drive RC servos.' +
          'This extension allows you to control the PCA-9685 via I2C.' +
        '</p>'
    },
    {
      id: 'ssd1306',
      name: 'SSD-1306 (OLED Screen)',
      files: ['ssd1306.py'],
      description:
        '<p>' +
          'The SSD-1306 is an OLED screen that can display text and images.' +
          'This extension allows you to control the SSD-1306 via I2C.' +
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

  this.processExtensions = function() {

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