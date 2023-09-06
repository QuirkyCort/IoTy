let MSGS = {
  '#blk-pins#': {
    en: 'Pins',
  },
  '#blk-control#': {
    en: 'Control',
    tlh: 'SeH',
    es: 'Control',
    fr: 'Contrôle',
    el: 'Έλεγχος',
    nl: 'Controle',
    de: 'Kontrolle',
    pt: 'Controle',
    he: 'בקרה',
    ru: 'Управление',
    hu: 'Vezérlés',
  },
  '#blk-logic#': {
    en: 'Logic',
    tlh: 'wanl\'',
    es: 'Logica',
    fr: 'Logique',
    el: 'Λογική',
    nl: 'Logica',
    de: 'Logik',
    pt: 'Lógica',
    he: 'לוגיקה',
    ru: 'Условия',
    hu: 'Logika',
  },
  '#blk-loops#': {
    en: 'Loops',
    tlh: 'QoQ',
    es: 'Bucles',
    fr: 'Boucles',
    el: 'Επανάληψη',
    nl: 'Lussen',
    de: 'Schleife',
    pt: 'Loops',
    he: 'לולאות',
    ru: 'Циклы',
    hu: 'Ciklusok',
  },
  '#blk-math#': {
    en: 'Math',
    tlh: 'ma\'rIch',
    es: 'Matematica',
    fr: 'Maths',
    el: 'Μαθηματικά',
    nl: 'Rekenen',
    de: 'Mathematik',
    pt: 'Matemática',
    he: 'חישוב',
    ru: 'Математика',
    hu: 'Matematika',
  },
  '#blk-text#': {
    en: 'Text',
    tlh: 'wej',
    es: 'Texto',
    fr: 'Texte',
    el: 'Κείμενο',
    nl: 'Tekst',
    de: 'Text',
    pt: 'Texto',
    he: 'טֶקסט',
    ru: 'Текст',
    hu: 'Szöveg',
  },
  '#blk-lists#': {
    en: 'Lists',
    tlh: 'tlhegh',
    es: 'Listas',
    fr: 'Listes',
    el: 'Λίστες',
    nl: 'Lijsten',
    de: 'Listen',
    pt: 'Listas',
    he: 'רשימות',
    ru: 'Списки',
    hu: 'Listák',
  },
  '#blk-variables#': {
    en: 'Variables',
    tlh: 'qeylIS',
    es: 'Variables',
    fr: 'Variables',
    el: 'Μεταβλητές',
    nl: 'Variabelen',
    de: 'Variabeln',
    pt: 'Variáveis',
    he: 'משתנים',
    ru: 'Переменные',
    hu: 'Változók',
  },
  '#blk-functions#': {
    en: 'Functions',
    tlh: 'tlhaw\'DIyuS',
    es: 'Funciones',
    fr: 'Fonctions',
    el: 'Συναρτήσεις',
    nl: 'Functies',
    de: 'Funktionen',
    pt: 'Funções',
    he: 'פונקציות',
    ru: 'Функции',
    hu: 'Függvények',
  },
  '#blk-when_started#': {
    en: 'When Started',
    es: 'Al comenzar',
    fr: 'Au démarrage',
    el: 'Κατά την εκκίνηση',
    nl: 'Als gestart',
    de: 'Wenn gestartet',
    pt: 'Quando Começar',
    he: 'כשהתחיל',
    ru: 'Когда программа стартует',
    hu: 'Indításkor',
  },
  '#blk-set_pin#': {
    en: 'set pin'
  },
  '#blk-to_mode#': {
    en: 'to mode',
  },
  '#blk-input#': {
    en: 'input',
  },
  '#blk-input_pullup#': {
    en: 'input with pullup',
  },
  '#blk-output#': {
    en: 'output',
  },
  '#blk-read_pin#': {
    en: 'digital read pin',
  },
  '#blk-write_pin#': {
    en: 'digital write pin',
  },
  '#blk-to#': {
    en: 'to',
  },
  '#blk-analog_read_pin#': {
    en: 'analog read pin',
  },
  '#blk-analog_read_pin_tooltip#': {
    en: 'Range from 0 to 65535, corresponding to approximately 0 to 3.3V.',
  },
  '#blk-set_analog_write_freq#': {
    en: 'Set analog write frequency on pin',
  },
  '#blk-hz#': {
    en: 'Hz',
  },
  '#blk-set_analog_write_freq_tooltip#': {
    en: 'Range from 1Hz to 40,000,000Hz',
  },
  '#blk-analog_write_pin#': {
    en: 'analog write pin',
  },
  '#blk-analog_write_pin_tooltip#': {
    en: 'Range from 0 to 1023',
  },
  '#blk-sleep_for#': {
    en: 'sleep for',
    fr: 'attendre jusqu\'à',
    el: 'περίμενε για',
    nl: 'slaap voor',
    de: 'schlafe für',
    pt: 'espere por',
    he: 'הרדם למשך',
    ru: 'ждать',
    hu: 'várakozás',
  },
  '#blk-seconds#': {
    en: 'seconds',
    fr: 'secondes',
    el: 'δευτερόλεπτα',
    nl: 'seconden',
    de: 'Sekunden',
    pt: 'segundos',
    he: 'שניות',
    ru: 'секунд',
    hu: 'másodperc',
  },
  '#blk-milliseconds#': {
    en: 'milliseconds',
    fr: 'millisecondes',
    el: 'χιλιοστά του δευτερολέπτου',
    nl: 'milliseconden',
    de: 'Millisekunden',
    pt: 'millisegundos',
    he: 'אלפיות השנייה',
    ru: 'миллисекунд',
    hu: 'ezred másodperc',
  },
  '#blk-microseconds#': {
    en: 'microseconds',
  },
  '#blk-wait_until_connected#': {
    en: 'wait until connected',
  },
  '#blk-wait_until_connected_tooltip#': {
    en: 'Wait until the serial monitor is connected to the device. The serial monitor must not be disabled.',
  },
  '#blk-and#': {
    en: 'and',
    fr: 'et',
    el: 'και',
    nl: 'en',
    de: 'und',
    he: 'ו',
    ru: 'и',
    hu: 'és',
  },
  '#blk-for#': {
    en: 'for',
    fr: 'pour',
    el: 'για',
    nl: 'voor',
    de: 'für',
    he: 'ל',
    ru: 'для',
    hu: 'eddig:',
  },
  '#blk-time#': {
    en: 'time',
    fr: 'temps',
    el: 'χρόνος',
    nl: 'tijd',
    de: 'Zeit',
    he: 'זְמַן',
    ru: 'время',
    hu: 'idő',
  },
  '#blk-time_tooltip#': {
    en: 'Time since the start of the device',
  },
  '#blk-exit_program#': {
    en: 'exit program',
    fr: 'sortie du programme',
    el: 'Τερματισμός προγράμματος',
    nl: 'programma stoppen',
    de: 'beende Programm',
    pt: 'sair do programa',
    he: 'יציאה מהתוכנית',
    ru: 'остановить программу',
    hu: 'kilépés a programból',
  },
  '#blk-exit_tooltip#': {
    en: 'End the program',
    nl: 'Stop het programma',
    he: "סיים את התוכנית",
    ru: 'Остановить выполнение программы',
  },
  '#blk-comment#': {
    en: '# Comment:',
  },
  '#blk-comment_tooltip#': {
    en: 'This blocks does nothing and is only used for comments.',
  },
  '#blk-read_input_with_prompt#': {
    en: 'prompt for input with message',
  },
  '#blk-type_cast#': {
    en: 'convert to',
  },
  '#blk-neopixel_init#': {
    en: 'Initialize Neopixel at pin',
  },
  '#blk-with#': {
    en: 'with',
  },
  '#blk-led_as#': {
    en: 'leds as',
  },
  '#blk-neopixel_at_pin#': {
    en: 'Neopixel at pin',
  },
  '#blk-set_pixel#': {
    en: 'set pixel',
  },
  '#blk-set_all_pixels#': {
    en: 'set all pixels',
  },
  '#blk-to_color#': {
    en: 'to color',
  },
  '#blk-to_red#': {
    en: 'to red',
  },
  '#blk-red#': {
    en: 'red',
  },
  '#blk-green#': {
    en: 'green',
  },
  '#blk-blue#': {
    en: 'blue',
  },
  '#blk-white#': {
    en: 'white',
  },
  '#blk-hue#': {
    en: 'hue',
  },
  '#blk-to_hue#': {
    en: 'to hue',
  },
  '#blk-saturation#': {
    en: 'saturation',
  },
  '#blk-value#': {
    en: 'value',
  },
  '#blk-write_neopixel#': {
    en: 'write Neopixel at pin',
  },
  '#blk-servo_write#': {
    en: 'servo write pin',
  },
  '#blk-deg#': {
    en: '°',
  },
  '#blk-us#': {
    en: 'μs',
  },
  '#blk-hc_sr04_ping_trig#': {
    en: 'HC-SR04 ping trig',
  },
  '#blk-hc_sr04_ping_tooltip#': {
    en: 'Returns distance in cm. Max of around 412cm.',
  },
  '#blk-echo#': {
    en: 'echo',
  },
  '#blk-unit#': {
    en: 'unit',
  },
  '#blk-network#': {
    en: 'Network',
  },
  '#blk-connect_to_wifi#': {
    en: 'Connect to WiFi',
  },
  '#blk-with_password#': {
    en: 'with password',
  },
  '#blk-connect_to_wifi_tooltip#': {
    en: 'If the \\"When Started\\" block is set to \\"wait for Internet connection\\", your device will connect automatically and you should not use this block.',
  },
  '#blk-connect_to_mqtt_server#': {
    en: 'MQTT: Connect to server',
  },
  '#blk-on_port#': {
    en: 'on port',
  },
  '#blk-with_user#': {
    en: 'with user',
  },
  '#blk-and_password#': {
    en: 'and password',
  },
  '#blk-mqtt_wait_msg#': {
    en: 'MQTT: Wait for message',
  },
  '#blk-mqtt_check_msg#': {
    en: 'MQTT: Check for message',
  },
  '#blk-mqtt_on_receive#': {
    en: 'MQTT: On receive message for topic',
  },
  '#blk-with_mqtt_msg#': {
    en: 'with: mqtt_msg',
  },
  '#blk-mqtt_publish#': {
    en: 'MQTT: Publish to topic',
  },
  '#blk-message#': {
    en: 'message',
  },
  '#blk-i2c_init#': {
    en: 'init i2c on pins',
  },
  '#blk-freq#': {
    en: 'freq',
  },
  '#blk-i2c_scan#': {
    en: 'scan for i2c devices',
  },
  '#blk-i2c_writeto_addr#': {
    en: 'i2c write to address',
  },
  '#blk-with_value#': {
    en: 'with value',
  },
  '#blk-at_register#': {
    en: 'at register',
  },
  '#blk-of_format#': {
    en: 'of format',
  },
  '#blk-i2c_readfrom_addr#': {
    en: 'i2c read from address',
  },
  '#main-blocks#': {
    en: 'Blocks',
    tlh: 'Porgh',
    es: 'Bloques',
    fr: 'Blocs',
    el: 'Μπλοκ',
    nl: 'Blokken',
    de: 'Blöcke',
    he: 'בלוקים',
    ru: 'Блоки',
    hu: 'Blokk',
  },
  '#main-file#': {
    en: 'File',
    tlh: 'teywI\'',
    es: 'Archivo',
    fr: 'Fichier',
    el: 'Αρχείο',
    nl: 'Bestand',
    de: 'Datei',
    he: 'קובץ',
    ru: 'Файл',
    hu: 'Fájl',
  },
  '#main-new_program#': {
    en: 'New Program',
    fr: 'Nouveau programme',
    el: 'Νέο πρόγραμμα',
    nl: 'Nieuw programma',
    de: 'neues Programm',
    he: 'תוכנית חדשה',
    ru: 'Новая программа',
    hu: 'Új program',
  },
  '#main-load_blocks#': {
    en: 'Load blocks from your computer',
    fr: 'Téléverser une sauvegarde depuis l\'ordinateur',
    el: 'Φόρτωση μπλοκ από τον υπολογιστή σας',
    nl: 'Laad blokken vanaf de computer',
    de: 'Lade Blöcke von deinem Computer',
    he: 'טען בלוקים',
    ru: 'Загрузить блок-программу с компьютера',
    hu: 'Blokk program feltöltése',
  },
  '#main-save_blocks#': {
    en: 'Save blocks to your computer',
    fr: 'Télécharge une sauvegarde',
    el: 'Αποθηκεύστε μπλοκ στον υπολογιστή σας',
    nl: 'Sla blokken op op de computer',
    de: 'Speichere Blöcke auf deinem Computer',
    he: 'שמור בלוקים',
    ru: 'Сохранить блок-программу на компьютер',
    hu: 'Blokk program letöltése',
  },
  '#main-load_python#': {
    en: 'Load Python from your computer',
    fr: 'Téléverser un script Python depuis l\'ordinateur',
    el: 'Φόρτωση αρχείου Python από τον υπολογιστή σας',
    nl: 'Laad Python vanaf de computer',
    de: 'Öffne Python von deinem Computer',
    he: 'טען פייתון מהמחשב',
    ru: 'Загрузить Python-код с компьютера',
    hu: 'Python kód feltöltése',
  },
  '#main-save_python#': {
    en: 'Save Python to your computer',
    fr: 'Télécharge le script Python',
    el: 'Αποθηκεύστε το αρχείο Python στον υπολογιστή σας',
    nl: 'Sla Python op op de computer',
    de: 'Speichere Python auf deinem Computer',
    he: 'שמור פייתון למחשב',
    ru: 'Сохранить Python-код на компьютер',
    hu: 'Python kód letöltése',
  },
  '#main-save_json#': {
    en: 'Save code to JSON package (...for Access Point mode upload)',
  },
  '#main-save_firmware#': {
    en: 'Save firmware to JSON package (...for Access Point mode update)',
  },
  '#main-load_extension#': {
    en: 'Load extension...',
  },
  '#main-load_python_lib#': {
    en: 'Load Python module from your computer',
    nl: 'Laad Python module vanaf de computer',
    de: 'Lade Pythonmodule von deinem PC',
    he: 'טען מודול פייתון מהמחשב',
    hu: 'Python modul feltöltése',
  },
  '#main-save_python_lib#': {
    en: 'Save Python module to your computer',
    nl: 'Sla Python module op op de computer',
    de: 'Speicher Pythonmodule auf deinen PC',
    he: 'שמור מודול פייתון למחשב',
    hu: 'Python modul letöltése',
  },
  '#main-export_zip#': {
    en: 'Export zip package to your computer',
    fr: 'Exporter une archive zip',
    el: 'Εξαγωγή αρχείου zip στον υπολογιστή σας',
    nl: 'Exporteer zip bestand naar de computer',
    de: 'Exportiere eine zip Datei auf deinen Computer',
    he: 'יצא קובץ ZIP למחשב',
    ru: 'Экспортировать zip-архив',
    hu: 'ZIP csomag letöltése',
  },
  '#main-start_new_warning#': {
    en: 'Starting a new program will cause all unsaved work to be lost.',
    fr: 'Commencer un nouveau programme fera perdre tout le travail non sauvegardé.',
    el: 'Η δημιουργία ενός νέου προγράμματος θα προκαλέσει απώλεια όλων των μη αποθηκευμένων εργασιών.',
    nl: 'Een nieuw programma starten zal leiden tot het verlies van onopgeslagen werk.',
    de: 'WEnn du ein neues Programm beginnst, werden alle nicht gespeicherten Inhalte gelöscht',
    he: 'יצירת תוכנית חדשה תגרום לאיבוד כל עבודה שלא נשמרה',
    ru: 'Создание новой программы удалит всю не сохраненную работу.',
  },
  '#main-help#': {
    en: 'Help',
    tlh: 'QaH',
    es: 'Ayuda',
    fr: 'Aide',
    el: 'Βοήθεια',
    nl: 'Help',
    de: 'Hilfe',
    he: 'עזרה',
    ru: 'Справка',
    hu: 'Súgó',
  },
  '#main-whats_new#': {
    en: 'What\'s New',
    nl: 'Wat is nieuw',
    he: 'מה חדש',
    ru: 'Что нового',
    hu: 'Újdonságok',
  },
  '#main-about#': {
    en: 'About',
    fr: 'À propos',
    el: 'Σχετικά με',
    nl: 'Over',
    de: 'Über',
    he: 'אודות',
    ru: 'О программе',
    hu: 'Névjegy',
  },
  '#main-privacy#': {
    en: 'Privacy Policy',
    he: 'מדיניות פרטיות',
    ru: 'Политика конфиденциальности',
    hu: 'Adatvédelem',
  },
  '#main-connectMode#': {
    en: 'Connection Mode...',
  },
  '#main-connectBLE#': {
    en: 'Connect (Bluetooth)',
  },
  '#main-connectInet#': {
    en: 'Connect (Internet)...',
  },
  '#main-connectSerial#': {
    en: 'Connect (Serial)...',
  },
  '#main-download#': {
    en: 'Download to device',
  },
  '#main-erase#': {
    en: 'Erase device',
  },
  '#main-changeName#': {
    en: 'Change device name',
  },
  '#main-updateFirmware#': {
    en: 'Update Firmware',
  },
  '#main-checkVersion#': {
    en: 'Check Version',
  },
  '#main-getInfo#': {
    en: 'Get Device Info',
  },
  '#main-listFiles#': {
    en: 'Files on Device...',
  },
  '#main-configureDeviceNetwork#': {
    en: 'Configure Device Network...',
  },
  '#main-disconnect#': {
    en: 'Disconnect',
  },
  '#main-appBuilder_title#': {
    en: 'MQTT App Builder',
  },
  '#main-appBuilder_description#': {
    en: 'The MQTT App Builder allows you to build a web-based app that can control your IoTy device through the MQTT protocol.',
  },
  '#main-appBuilder_go#': {
    en: 'Go to MQTT App Builder',
  },
  '#main-apPage_title#': {
    en: 'Access Point Page',
  },
  '#main-apPage_description#': {
    en:
      '<p>You can access this page to program your device or configure your device network. Before connecting, please...</p>' +
      '<ol>' +
      '<li>Restart your ESP32 (...press the reset button); the built-in LED should flash 3 times.</li>' +
      '<li>Before the 3 flashes complete, press and hold the boot button until the LED flashes rapidly.</li>' +
      '<li>On your computer, search for an open WiFi access point with the name of your device and connect to it.</li>' +
      '<li>Click the "Go to Access Point Page" button.</li>' +
      '</ol>',
  },
  '#main-apPage_go#': {
    en: 'Go to Access Point Page',
  },
  '#main-flashFirmware_title#': {
    en: 'Flash Firmware',
  },
  '#main-flashFirmware_description#': {
    en: 'Use this to flash a new ESP-32 with the IoTy firmware. You can also use this to upgrade the firmware on an existing IoTy device.',
  },
  '#main-flashFirmware_go#': {
    en: 'Go to Firmware Flash Tool',
  },
  '#blockly-save#': {
    en: 'Save Now',
    fr: 'Enregistrer maintenant',
    el: 'Αποθήκευση τώρα',
    nl: 'Nu opslaan',
    de: 'Speicher jetzt',
    he: 'שמור',
    ru: 'Сохранить сейчас',
  },
  '#blockly-enable_blocks#': {
    en: 'Enable Blocks Mode',
    fr: 'Passer en mode Blocs',
    el: 'Ενεργοποίηση λειτουργίας μπλοκ',
    nl: 'Activeer blokken modus',
    de: 'Aktiviere Blöckemodus',
    he: 'אפשר מצב בלוקים',
    ru: 'Включить режим Блоков',
    hu: 'Blokk mód engedélyezése',
  },
  '#blockly-python_lost_warning#': {
    en: 'Enabling blocks mode will cause all Python changes to be lost.',
    fr: 'Passer en mode Blocs fera perdre toutes les modifications dans le code Python.',
    el: 'Η ενεργοποίηση της λειτουργίας μπλοκ θα προκαλέσει απώλεια όλων των αλλαγών Python',
    nl: 'Alle Python gaat verloren als blokken modus wordt geactiveerd.',
    de: 'Das aktivieren des Blöckemdus wird dazu führen, dass alle Pythonänderungen verloren sein werden',
    he: 'אפשור מצב בלוקים יגרום לכל שינויי פייתון להמחק.',
    ru: 'Включение режима Блоков удалит все изменения в Python-коде.',
    hu: 'A blokkolási mód engedélyezésével minden Python-módosítás elvész!',
  },
  '#python-save#': {
    en: 'Save Now',
    fr: 'Enregistrer maintenant',
    el: 'Αποθήκευση τώρα',
    nl: 'Nu opslaan',
    de: 'Speicher jetzt',
    he: 'שמור',
    ru: 'Сохранить сейчас',
    hu: 'Mentés most',
  },
  '#python-warning#': {
    en: 'Warning!',
    fr: 'Attention!',
    el: 'Προσοχή!',
    nl: 'Waarschuwing!',
    de: 'Warunung!',
    he: 'אזהרה!',
    ru: 'Внимание',
    hu: 'Figyelem!',
  },
  '#python-cannot_change_back_warning#': {
    en: 'Changes to Python code cannot be converted back into blocks!',
    fr: 'Les modifications faites dans le code Python ne pourront pas être converties en blocs !',
    el: 'Οι αλλαγές στον κώδικα Python δεν μπορούν να μετατραπούν ξανά σε μπλοκ!',
    nl: 'Veranderingen in de Python code worden niet omgezet in blokken!',
    de: 'Änderungen am Pythoncode können nicht zurück zu Blöcken konvertiert werden!',
    he: 'שינוים לקוד פייתון לא יכולים להיות מומרים חזרה לבלוקים!',
    ru: 'Изменения в Python-коде нельзя преобразовать в блоки!',
    hu: 'A Python kód módosításai nem konvertálhatók vissza blokkokká!',
  },
  '#monitor-send#': {
    en: 'Send',
  },
  '#monitor-clear#': {
    en: 'Clear Monitor',
  },
  '#extensions-close#': {
    en: 'Close',
  },
  '#extensions-select_extensions#': {
    en: 'Select Extensions',
  },
  '#blk-mpu6050_init#': {
    en: 'init MPU-6050 with address',
  },
  '#blk-mpu6050_init_tooltip#': {
    en: 'You must have an \\"init i2c\\" block before this',
  },
  '#blk-mpu6050_calibrate#': {
    en: 'calibrate MPU-6050',
  },
  '#blk-mpu6050_calibrate_tooltip#': {
    en: 'Ensure that the MPU-6050 is stationary during calibration',
  },
  '#blk-mpu6050_reset#': {
    en: 'reset MPU-6050 gyro angles',
  },
  '#blk-mpu6050_reset_tooltip#': {
    en: 'Resets all angles to zero',
  },
  '#blk-mpu6050_update#': {
    en: 'update MPU-6050 gyro angles',
  },
  '#blk-mpu6050_update_tooltip#': {
    en: 'Only needed for angle readings. Run this frequently to keep the angles accurate',
  },
  '#blk-mpu6050_get_accel#': {
    en: 'MPU-6050 acceleration',
  },
  '#blk-mpu6050_get_gyro#': {
    en: 'MPU-6050 rotation rate',
  },
  '#blk-mpu6050_get_angle#': {
    en: 'MPU-6050 angle',
  },
  '#blk-mpu6050_get_angle_tooltip#': {
    en: 'You must run \\"update gyro angles\\" frequently to get a valid angle.',
  },
  '#blk-pca9685_init#': {
    en: 'init PCA-9685 with address',
  },
  '#blk-pca9685_init_tooltip#': {
    en: 'You must have an \\"init i2c\\" block before this',
  },
  '#blk-pca9685_set_freq#': {
    en: 'set PCA-9685 freq to',
  },
  '#blk-pca9685_set_freq_tooltip#': {
    en: 'Most servos operates at 50Hz',
  },
  '#blk-pca9685_analog_write#': {
    en: 'analog write PCA-9685 channel',
  },
  '#blk-pca9685_analog_write_tooltip#': {
    en: 'Output value should range from 0 to 4095',
  },
  '#blk-pca9685_write_angle#': {
    en: 'set PCA-9685 channel',
  },
  '#blk-pca9685_write_angle_tooltip#': {
    en: 'Output value should range from 0° to 180°',
  },
  '#blk-pca9685_write_us#': {
    en: 'set PCA-9685 channel',
  },
  '#blk-pca9685_write_us_tooltip#': {
    en: 'Typical values for servos range from 1000 to 2000',
  },
  '#blk-ssd1306_init#': {
    en: 'init SSD-1306 with width',
  },
  '#blk-height#': {
    en: 'height',
  },
  '#blk-and_addr#': {
    en: 'and address',
  },
  '#blk-ssd1306_init_tooltip#': {
    en: 'You must have an \\"init i2c\\" block before this',
  },
  '#blk-ssd1306_init_sh1106#': {
    en: 'init SH-1106 with width',
  },
  '#blk-ssd1306_init_sh1106_tooltip#': {
    en: 'Use this to init a SH1106 display. After init, all the SSD1306 blocks can be used with the SH1106.',
  },
  '#blk-ssd1306_fill#': {
    en: 'fill SSD-1306 with color',
  },
  '#blk-ssd1306_fill_tooltip#': {
    en: 'Color should be either 1 or 0. You can use this to erase the screen.',
  },
  '#blk-ssd1306_show#': {
    en: 'SSD-1306 show',
  },
  '#blk-ssd1306_show_tooltip#': {
    en: 'You must run this to show what you have drawn to the screen',
  },
  '#blk-ssd1306_text#': {
    en: 'SSD-1306 draw text',
  },
  '#blk-at_xy#': {
    en: 'at x,y',
  },
  '#blk-and_color#': {
    en: 'and color',
  },
  '#blk-ssd1306_text_tooltip#': {
    en: 'You must run show to display the text on screen',
  },
  '#blk-ssd1306_pixel#': {
    en: 'SSD-1306 draw pixel at x,y',
  },
  '#blk-ssd1306_pixel_tooltip#': {
    en: 'You must run show to display the drawn pixel on screen',
  },
  '#blk-ssd1306_line#': {
    en: 'SSD-1306 draw line from x1,y1',
  },
  '#blk-to_x2y2#': {
    en: 'to x2,y2',
  },
  '#blk-ssd1306_line_tooltip#': {
    en: 'You must run show to display the drawn line on screen',
  },
  '#blk-ssd1306_rect#': {
    en: 'SSD-1306 draw rect at x,y',
  },
  '#blk-with_wh#': {
    en: 'with w,h',
  },
  '#blk-color#': {
    en: 'color',
  },
  '#blk-ssd1306_rect_tooltip#': {
    en: 'You must run show to display the drawn rectangle on screen',
  },
  '#blk-ssd1306_ellipse#': {
    en: 'SSD-1306 draw ellipse at x,y',
  },
  '#blk-with_xryr#': {
    en: 'with xr,yr',
  },
  '#blk-ssd1306_ellipse_tooltip#': {
    en: 'You must run show to display the drawn ellipse on screen',
  },
  '#blk-ssd1306_scroll#': {
    en: 'scroll SSD-1306 display with xstep,ystep',
  },
  '#blk-ssd1306_scroll_tooltip#': {
    en: 'Shift the content of the display.',
  },
  '#blk-dict#': {
    en: 'Dictionaries',
  },
  '#blk-dict_key_value_tooltip#': {
    en: 'Insert either a variable or another copy of this block into the first input',
  },
  '#blk-dict_empty#': {
    en: 'empty dictionary',
  },
  '#blk-dict_empty_tooltip#': {
    en: 'Creates an empty dict. Use the assignment block to set values.',
  },
  '#blk-set#': {
    en: 'set',
  },
  '#blk-dict_set_tooltip#': {
    en: 'Create an empty dictionary and assign it to a variable before setting values',
  },
  '#blk-data#': {
    en: 'Data',
  },
  '#blk-map#': {
    en: 'map',
  },
  '#blk-from_low#': {
    en: 'from low',
  },
  '#blk-high#': {
    en: 'high',
  },
  '#blk-to_low#': {
    en: 'to low',
  },
  '#blk-map_tooltip#': {
    en: 'Convert a value in the first range to a value in the second range.',
  },
  '#blk-json_dumps#': {
    en: 'json dump string',
  },
  '#blk-json_dumps_tooltip#': {
    en: 'Converts the provided data obj into a JSON string',
  },
  '#blk-json_loads#': {
    en: 'json load string',
  },
  '#blk-json_loads_tooltip#': {
    en: 'Converts the JSON string into a data obj',
  },
  '#blk-request_to#': {
    en: 'request to',
  },
  '#blk-and_put_result_in#': {
    en: 'and put result in',
  },
  '#blk-as#': {
    en: 'as',
  },
  '#blk-urequests_simple_tooltip#': {
    en: 'Simple requests. Note that https requests requires more RAM and may fail especially if Bluetooth is enabled.',
  },
  '#blk-in_body#': {
    en: 'in body',
  },
  '#blk-and_header#': {
    en: 'and header',
  },
  '#blk-on_success#': {
    en: 'on success',
  },
  '#blk-on_fail#': {
    en: 'on fail',
  },
  '#blk-urequests_advance_tooltip#': {
    en: 'The advance urequest allows setting of request header and body, as well as detection of error.',
  },
  '#blk-connect_to_configured_wifi#': {
    en: 'Connect to configured WiFi',
  },
  '#blk-connect_to_configured_wifi_tooltip#': {
    en: 'Connect to the WiFi hotspot that was configured via \\"Configure Device Network...\\". If the \\"When Started\\" block is set to \\"wait for Internet connection\\", your device will connect automatically and you should not use this block.',
  },
  '#blk-wlan_get_ip#': {
    en: 'IP address',
  },
  '#blk-wlan_get_ip_tooltip#': {
    en: 'After connecting to WiFi, you can use this to get your IP address.',
  },
  '#blk-start_as_ap#': {
    en: 'start as Access Point',
  },
  '#blk-start_as_ap_tooltip#': {
    en: 'If password is less than 8 characters long, an open AP (no password) will be created.',
  },
  '#blk-date_time_get#': {
    en: 'date and time',
  },
  '#blk-date_time_get_tooltip#': {
    en: 'Returns a list containing year, month, day, weekday, hours, minutes, seconds, subseconds.',
  },
  '#blk-date_time_set#': {
    en: 'set date and time to',
  },
  '#blk-date_time_set_tooltip#': {
    en: 'Input should be a list containing year, month, day, weekday, hours, minutes, seconds, subseconds.',
  },
  '#blk-date_time_set_ntp#': {
    en: 'set date/time automatically with timezone UTC+',
  },
  '#blk-date_time_set_ntp_tooltip#': {
    en: 'Device must have an internet connection to run this. ',
  },
  '#blk-file#': {
    en: 'File',
  },
  '#blk-to_open#': {
    en: 'to open',
  },
  '#blk-with_mode#': {
    en: 'with mode',
  },
  '#blk-and_type#': {
    en: 'and type',
  },
  '#blk-file_open_tooltip#': {
    en: 'Open a file for reading or writing',
  },
  '#blk-close_file#': {
    en: 'close file',
  },
  '#blk-file_close_tooltip#': {
    en: 'Close a previously opened file. You cannot read/write to the file after closing.',
  },
  '#blk-flush_file#': {
    en: 'flush file',
  },
  '#blk-file_flush_tooltip#': {
    en: 'Flush a file to storage. This ensures that written data will not be lost if the device loses power.',
  },
  '#blk-write_to#': {
    en: 'write to',
  },
  '#blk-file_write_tooltip#': {
    en: 'Write a String to file. If \\"New line\\" is enabled, each write will be on its own line.',
  },
  '#blk-read_one_line_from#': {
    en: 'read one line from',
  },
  '#blk-file_readline_tooltip#': {
    en: 'Read a single line of string. If all lines have been read, it will return an empty string.',
  },
  '#blk-read#': {
    en: 'read',
  },
  '#blk-characters_from#': {
    en: 'characters from',
  },
  '#blk-file_read_tooltip#': {
    en: 'Read the specified number of bytes. If set to -1, the entire file will be read.',
  },
  '#blk-is_file#': {
    en: 'is file',
  },
  '#blk-file_is_file_tooltip#': {
    en: 'Returns True if the specified path is a file',
  },
  '#blk-is_dir#': {
    en: 'is dir',
  },
  '#blk-file_is_dir_tooltip#': {
    en: 'Returns True if the specified path is a directory',
  },
  '#blk-microcontroller_temperature_in#': {
    en: 'microcontroller temperature in',
  },
  '#blk-esp32_temperature_tooltip#': {
    en: 'Internal temperature of the ESP32',
  },
  '#blk-microcontroller_hall_sensor#': {
    en: 'microcontroller hall sensor value',
  },
  '#blk-esp32_hall_sensor_tooltip#': {
    en: 'This measures the strength of the magnetic field near the microcontroller.',
  },
  '#blk-init_esp_now#': {
    en: 'Init ESP-NOW',
  },
  '#blk-esp_now_init_tooltip#': {
    en: 'Run this before any other ESP NOW blocks.',
  },
  '#blk-esp_now_add_peer#': {
    en: 'ESP-NOW add peer',
  },
  '#blk-esp_now_add_peer_tooltip#': {
    en: 'You can use \\"Get Device Info\\" on the peer to find its MAC address.',
  },
  '#blk-esp_now_remove_peer#': {
    en: 'ESP-NOW remove peer',
  },
  '#blk-esp_now_remove_peer_tooltip#': {
    en: 'You cannot send messages to a removed peer.',
  },
  '#blk-esp_now_send_message#': {
    en: 'ESP-NOW send message',
  },
  '#blk-esp_now_send_tooltip#': {
    en: 'Max of 250 bytes long.',
  },
  '#blk-esp_now_get_msg_wait_for#': {
    en: 'ESP-NOW get message, wait for',
  },
  '#blk-esp_now_get_msg_tooltip#': {
    en: 'Returns a list containing sender\'s MAC address and message. Set wait time to -1 to wait forever.',
  },
  '#blk-esp_now_msg_available#': {
    en: 'ESP-NOW message is available',
  },
  '#blk-esp_now_msg_available_tooltip#': {
    en: 'Returns a list containing sender\'s MAC address and message. Set wait time to -1 to wait forever.',
  },
  '#blk-init_ez_esp_now#': {
    en: 'Init EZ ESP-NOW',
  },
  '#blk-ez_esp_now_init_tooltip#': {
    en: 'Run this before any other EZ ESP NOW blocks.',
  },
  '#blk-ez_esp_now_set_group#': {
    en: 'EZ ESP-NOW set group',
  },
  '#blk-ez_esp_now_set_group_tooltip#': {
    en: 'You can only exchange messages with devices in the same group.',
  },
  '#blk-ez_esp_now_send_message#': {
    en: 'EZ_ESP-NOW send message',
  },
  '#blk-ez_esp_now_send_tooltip#': {
    en: 'Max of around 200 bytes long.',
  },
  '#blk-ez_esp_now_get_msg#': {
    en: 'EZ ESP-NOW get message',
  },
  '#blk-ez_esp_now_get_msg_tooltip#': {
    en: 'Returns the received message.',
  },
  '#blk-ez_httpd_init_with_addr#': {
    en: 'init with address set to',
  },
  '#blk-and_port#': {
    en: 'and port',
  },
  '#blk-ez_httpd_init_tooltip#': {
    en: 'Start a web server on your IoTy device. In Access Point mode, your IP address will be 192.168.4.1',
  },
  '#blk-ez_httpd_available#': {
    en: 'ez_httpd: connection available',
  },
  '#blk-ez_httpd_available_tooltip#': {
    en: 'If True, you can run \\"wait for connection\\" and expect it to complete without blocking',
  },
  '#blk-ez_httpd_wait_for_connection_and_put_url_in#': {
    en: 'wait for connection and put URL in',
  },
  '#blk-query_in#': {
    en: 'query in',
  },
  '#blk-content_in#': {
    en: 'content in',
  },
  '#blk-ez_httpd_wait_for_connection_tooltip#': {
    en: 'Wait for client connection. URL contains the request URL. Query contains a dictionary of the query string. Content contains the body of the request.',
  },
  '#blk-ez_httpd_send_response#': {
    en: 'send response',
  },
  '#blk-ez_httpd_send_response_tooltip#': {
    en: 'Send a response to the client. This must be after a wait_for_connection.',
  },
  '#blk-ez_httpd_send_file#': {
    en: 'send file',
  },
  '#blk-ez_httpd_send_file_tooltip#': {
    en: 'Send the content of the specified file to the client. This must be after a wait_for_connection. Make sure the file exists on the device.',
  },
  '#blk-ez_httpd_send_404#': {
    en: 'send 404 Not Found',
  },
  '#blk-ez_httpd_send_404_tooltip#': {
    en: 'Use this to indicate to the client that the requested URL is not available.',
  },
  '#blk-for_reading#': {
    en: 'for reading',
  },
  '#blk-ucsv_reader_tooltip#': {
    en: 'Opens a CSV file for reading. Read each row using either the read block, or by putting the CSV object into a \\"for each item in list\\" loop.',
  },
  '#blk-for_writing#': {
    en: 'for writing',
  },
  '#blk-ucsv_writer_tooltip#': {
    en: 'Opens a CSV file for writing. Use append mode to add to an existing file without destroying existing data.',
  },
  '#blk-read_one_row_from#': {
    en: 'read one row from',
  },
  '#blk-ucsv_readrow_tooltip#': {
    en: 'read a single rom from the CSV file and return a list',
  },
  '#blk-ucsv_writerow_tooltip#': {
    en: 'Write a row to the CSV file. The input must be a list',
  },
  '#blk-flush#': {
    en: 'flush',
  },
  '#blk-ucsv_flush_tooltip#': {
    en: 'Flush data to storage. This ensures that written data will not be lost if the device loses power. This can only be used with writer objects.',
  },
  '#blk-close#': {
    en: 'close',
  },
  '#blk-ucsv_close_tooltip#': {
    en: 'Close a previously opened CSV file. You cannot read/write to the file after closing.',
  },
  '#blk-i2c_lcd_init#': {
    en: 'init I2C LCD with lines',
  },
  '#blk-columns#': {
    en: 'columns',
  },
  '#blk-i2c_lcd_init_tooltip#': {
    en: 'You must have an \\"init i2c\\" block before this',
  },
  '#blk-i2c_lcd_putstr#': {
    en: 'i2c lcd draw text',
  },
  '#blk-i2c_lcd_putstr_tooltip#': {
    en: 'Draw the text at the current cursor position.',
  },
  '#blk-i2c_lcd_clear#': {
    en: 'i2c lcd clear screen',
  },
  '#blk-i2c_lcd_clear_tooltip#': {
    en: 'Clears the screen and move cursor to the top left.',
  },
  '#blk-i2c_lcd_move_to#': {
    en: 'i2c lcd move to x,y',
  },
  '#blk-i2c_lcd_move_to_tooltip#': {
    en: 'Move cursor to the specified x,y position.',
  },
  '#blk-i2c_lcd_cursor#': {
    en: 'i2c lcd cursor',
  },
  '#blk-i2c_lcd_cursor_tooltip#': {
    en: 'Switch the cursor on or off.',
  },
  '#blk-i2c_lcd_blink#': {
    en: 'i2c lcd blink cursor',
  },
  '#blk-i2c_lcd_blink_tooltip#': {
    en: 'Blinks the cursor.',
  },
  '#blk-i2c_lcd_display#': {
    en: 'i2c lcd display',
  },
  '#blk-i2c_lcd_display_tooltip#': {
    en: 'Switch the display on or off.',
  },
  '#blk-i2c_lcd_backlight#': {
    en: 'i2c lcd backlight',
  },
  '#blk-i2c_lcd_backlight_tooltip#': {
    en: 'Switch the backlight on or off.',
  },
  '#blk-dht_init#': {
    en: 'init DHT sensor type',
  },
  '#blk-dht_init_tooltip#': {
    en: 'Initialize the DHT sensor.',
  },
  '#blk-on_pin#': {
    en: 'on pin',
  },
  '#blk-dht_measure#': {
    en: 'dht measure',
  },
  '#blk-dht_measure_tooltip#': {
    en: 'Performs a measurement. You must run this before reading the temperature or humidity.',
  },
  '#blk-dht_temperature#': {
    en: 'dht temperature',
  },
  '#blk-dht_temperature_tooltip#': {
    en: 'Retrieve the temperature in Celsius from the last measurement. You must run a \\"measure\\" command first.',
  },
  '#blk-dht_humidity#': {
    en: 'dht humidity',
  },
  '#blk-dht_humidity_tooltip#': {
    en: 'Retrieve the humidity in percentage from the last measurement. You must run a \\"measure\\" command first.',
  },
  '#blk-ez_ds18x20_init#': {
    en: 'init DS18X20 sensor on pin',
  },
  '#blk-ez_ds18x20_init_tooltip#': {
    en: 'Initialize the DS18X20 sensor. Multiple sensors can be connected to the same pin.',
  },
  '#blk-ez_ds18x20_device_count#': {
    en: 'number of detected ds18x20 devices',
  },
  '#blk-ez_ds18x20_device_count_tooltip#': {
    en: 'Returns the number of detected devices.',
  },
  '#blk-ez_ds18x20_convert_temp#': {
    en: 'convert readings for all ds18x20 devices',
  },
  '#blk-ez_ds18x20_convert_temp_tooltip#': {
    en: 'Performs a temperature measurement. You must run this before reading the temperature.',
  },
  '#blk-ez_ds18x20_read_temp#': {
    en: 'ds18x20 temperature for sensor number',
  },
  '#blk-ez_ds18x20_read_temp_tooltip#': {
    en: 'Retrieve the temperature in Celsius for the specified sensor. You must run a \\"convert\\" command first.',
  },
  '#blk-math_atan2_tooltip#': {
    en: '2 argument arctangent. First argument is y, second is x.',
  },
  '#blk-non_block_init#': {
    en: 'init non-blocking read',
  },
  '#blk-non_block_init_tooltip#': {
    en: 'Initialize non-blocking read from stdin. You must run this before performing any non-blocking reads.',
  },
  '#blk-non_block_readline#': {
    en: 'non-blocking: read one line',
  },
  '#blk-non_block_readline_tooltip#': {
    en: 'Read one line in a non-blocking manner. The ending LF will be included in the returned line.',
  },
  '#blk-non_block_read#': {
    en: 'non-blocking: read',
  },
  '#blk-characters#': {
    en: 'characters',
  },
  '#blk-non_block_read_tooltip#': {
    en: 'The specified number of characters. Use -1 to read all available characters.',
  },
  '#blk-init#': {
    en: 'init',
  },
  '#blk-uart_init_tooltip#': {
    en: 'Initialize the hardware UART device with the specified baudrate and pins.',
  },
  '#blk-at_baudrate#': {
    en: 'at baudrate',
  },
  '#blk-with_tx_pin#': {
    en: 'with tx pin',
  },
  '#blk-and_rx_pin#': {
    en: 'and rx pin',
  },
  '#blk-available_characters_to_read#': {
    en: 'available characters to read',
  },
  '#blk-from#': {
    en: 'from',
  },
  '#blk-any_tooltip#': {
    en: 'Returns the available characters to read without blocking.',
  },
  '#blk-uart_read_tooltip#': {
    en: 'Read the specified number of bytes.  If you need a string, use a decode block. If set to -1, read as much data as possible. Returns None on timeout.'
  },
  '#blk-uart_readline_tooltip#': {
    en: 'Read one line in bytes. If you need a string, use a decode block. Returns None on timeout.'
  },
  '#blk-read_one_line#': {
    en: 'read one line',
  },
  '#blk-write#': {
    en: 'write',
  },
  '#blk-uart_write_tooltip#': {
    en: 'Write a String to file. If \\"New line\\" is enabled, each write will be on its own line.',
  },
  '#blk-uart_flush_tooltip#': {
    en: 'Waits until all data has been sent.',
  },
  '#blk-decode#': {
    en: 'decode',
  },
  '#blk-encode#': {
    en: 'encode',
  },
  '#blk-as_utf8#': {
    en: 'as utf-8',
  },
  '#blk-decode_tooltip#': {
    en: 'Decode a bytes object into a string using the utf-8 encoding.',
  },
  '#blk-gps_init#': {
    en: 'init GPS on',
  },
  '#blk-gps_init_tooltip#': {
    en: 'You must have an \\"init UART\\" block with the appropriate pins and baudrate set before this.',
  },
  '#blk-gps_update#': {
    en: 'gps: update',
  },
  '#blk-gps_update_tooltip#': {
    en: 'Run this frequently to read the GPS data from the module. The lat/lng/etc will not change if you do not run this.',
  },
  '#blk-gps_lat_as#': {
    en: 'gps: get latitude as',
  },
  '#blk-gps_lat_tooltip#': {
    en: 'Get the latitude in the specified format. Decimal Degree will return a float, while Degree Decimal Minute will return a list. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-gps_lng_as#': {
    en: 'gps: get longitude as',
  },
  '#blk-gps_lng_tooltip#': {
    en: 'Get the longitude in the specified format. Decimal Degree will return a float, while Degree Decimal Minute will return a list. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-gps_alt#': {
    en: 'gps: get altitude',
  },
  '#blk-gps_alt_tooltip#': {
    en: 'Get the longitude in meters. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-gps_date#': {
    en: 'gps: get date',
  },
  '#blk-gps_date_tooltip#': {
    en: 'Get the date as a list containing day, month, year. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-gps_time#': {
    en: 'gps: get time',
  },
  '#blk-gps_time_tooltip#': {
    en: 'Get the time as a list containing hour, minute, second. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-gps_datetime#': {
    en: 'gps: get date and time',
  },
  '#blk-gps_datetime_tooltip#': {
    en: 'Get the date and time as a list. The format is compatible with the \\"set date and time\\" block. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-gps_sog#': {
    en: 'gps: get speed over ground',
  },
  '#blk-gps_sog_tooltip#': {
    en: 'Get the speed over ground in m/s. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-gps_cog#': {
    en: 'gps: get course over ground',
  },
  '#blk-gps_cog_tooltip#': {
    en: 'Get the course over ground in degrees. \\"None\\" will be returned if GPS data is\'t available yet.',
  },
  '#blk-hx711_init_with_dt_pin#': {
    en: 'init hx711 with dt pin',
  },
  '#blk-and_sck_pin#': {
    en: 'and sck pin',
  },
  '#blk-hx711_init_tooltip#': {
    en: 'Initialize the HX711 on the specified pin. You must run this before performing any reads.',
  },
  '#blk-hx711_read#': {
    en: 'hx711: read value',
  },
  '#blk-hx711_read_tooltip#': {
    en: 'Read from the HX711. The return value is unitless; you must calibrate it yourself. ',
  },
  '#blk-ez_timer_init#': {
    en: 'init EZ Timer',
  },
  '#blk-ez_timer_init_tooltip#': {
    en: 'Timer starts upon initialization. You must run this before updating any timers.',
  },
  '#blk-ez_timer_update#': {
    en: 'ez_timer: Update',
  },
  '#blk-ez_timer_update_tooltip#': {
    en: 'Updates the timer. You must run this frequently.',
  },
  '#blk-ez_timer_run_every#': {
    en: 'ez_timer: Run every',
  },
  '#blk-with_starting_offset_of#': {
    en: 'with starting offset of',
  },
  '#blk-ez_timer_cb_tooltip#': {
    en: 'You must init the timer first, and run update frequently. Offset applies an delay to the first call of this function.',
  },
  '#blk-ez_timer_set_timeout#': {
    en: 'ez_timer: Run code after',
  },
  '#blk-ez_timer_set_timeout_tooltip#': {
    en: 'Runs the provide code after the specified duration. You must init the timer first, and run update frequently.',
  },
  '#blk-spi_init_with_baudrate#': {
    en: 'init spi with baudrate',
  },
  '#blk-with_sck#': {
    en: 'with sck',
  },
  '#blk-mosi#': {
    en: 'mosi',
  },
  '#blk-and_miso#': {
    en: 'and miso',
  },
  '#blk-spi_init_tooltip#': {
    en: 'Initialize the hardware SPI device with the specified baudrate and pins.',
  },
  '#blk-spi_write_tooltip#': {
    en: 'Write the specified value to the SPI device.',
  },
  '#blk-read_from#': {
    en: 'read from',
  },
  '#blk-spi_read_tooltip#': {
    en: 'Read from the SPI device. Number of bytes read is dependent on the format selected.',
  },
  '#blk-mfrc522_init#': {
    en: 'init MFRC522 on',
  },
  '#blk-with_rst#': {
    en: 'with rst',
  },
  '#blk-and_cs#': {
    en: 'and cs',
  },
  '#blk-mfrc522_init_tooltip#': {
    en: 'You must have an \\"init SPI\\" block with the appropriate pins and baudrate set before this.',
  },
  '#blk-mfrc522_card_present#': {
    en: 'mfrc522: card is present',
  },
  '#blk-mfrc522_card_present_tooltip#': {
    en: 'Returns True is a card is detected at the reader.',
  },
  '#blk-mfrc522_get_uid#': {
    en: 'mfrc522: get uid',
  },
  '#blk-mfrc522_get_uid_tooltip#': {
    en: 'Returns the card UID as a hex string. Use the \\"card is present\\" block first to ensure a card is present before running this block.',
  },
  '#blk-qmc5883l_init#': {
    en: 'init QMC5883L with address',
  },
  '#blk-and_scale#': {
    en: 'and scale',
  },
  '#blk-qmc5883l_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-qmc5883l_read#': {
    en: 'qmc5883l: read the sensor',
  },
  '#blk-qmc5883l_read_tooltip#': {
    en: 'You must perform a read before using the sensor value.',
  },
  '#blk-qmc5883l_value#': {
    en: 'qmc5883l: magnetic value in ',
  },
  '#blk-qmc5883l_value_tooltip#': {
    en: 'You must perform a read before using this block.',
  },
  '#blk-hmc5883l_init#': {
    en: 'init HMC5883L with address',
  },
  '#blk-hmc5883l_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-hmc5883l_read#': {
    en: 'hmc5883l: read the sensor',
  },
  '#blk-hmc5883l_read_tooltip#': {
    en: 'You must perform a read before using the sensor value.',
  },
  '#blk-hmc5883l_value#': {
    en: 'hmc5883l: magnetic value in ',
  },
  '#blk-hmc5883l_value_tooltip#': {
    en: 'You must perform a read before using this block.',
  },
  '#blk-bmp280_init#': {
    en: 'init BMP280 with address',
  },
  '#blk-bmp280_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-bmp280_read#': {
    en: 'bmp280: read the sensor',
  },
  '#blk-bmp280_read_tooltip#': {
    en: 'You must perform a read before using the sensor value.',
  },
  '#blk-bmp280_temperature#': {
    en: 'bmp280: temperature',
  },
  '#blk-bmp280_temperature_tooltip#': {
    en: 'You must perform a read before using this block. Value is in Celsius.',
  },
  '#blk-bmp280_pressure#': {
    en: 'bmp280: pressure',
  },
  '#blk-bmp280_pressure_tooltip#': {
    en: 'You must perform a read before using this block. Value is in pascal.',
  },
  '#blk-bmp280_altitude#': {
    en: 'bmp280: altitude',
  },
  '#blk-bmp280_altitude_tooltip#': {
    en: 'You must perform a read before using this block. Value is calculated from the pressure, and is in meters above sea level.',
  },
  '#blk-setBluetoothCmds#': {
    en: 'receving of commands via bluetooth is',
  },
  '#blk-setBluetoothCmds_tooltip#': {
    en: 'Normally, the IoTy device will continue to receive commands (eg. Download programs) over bluetooth when running a program. If disabled, you must switch to programming mode to program your device.',
  },
  '#blk-max30102_init#': {
    en: 'init MAX30102 with address',
  },
  '#blk-max30102_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-red_pwr#': {
    en: 'Red Power',
  },
  '#blk-ir_pwr#': {
    en: 'IR Power',
  },
  '#blk-max30102_read#': {
    en: 'max30102: read the sensor',
  },
  '#blk-max30102_read_tooltip#': {
    en: 'You must run this block frequently to check for new readings.',
  },
  '#blk-max30102_read_succeeded#': {
    en: 'max30102: read succeeded',
  },
  '#blk-max30102_read_succeeded_tooltip#': {
    en: 'Returns True when a previous read has successfully obtained data from the sensor. Returns False if there were no new data during the previous read.',
  },
  '#blk-max30102_beat#': {
    en: 'max30102: heartbeat detected',
  },
  '#blk-max30102_beat_tooltip#': {
    en: 'Returns True when a previous read has detected a heartbeat. You should only check this if the previous read succeeded.',
  },
  '#blk-max30102_bpm#': {
    en: 'max30102: heart rate',
  },
  '#blk-max30102_bpm_tooltip#': {
    en: 'Returns the heart rate in beats per minute.',
  },
  '#blk-max30102_spo2#': {
    en: 'max30102: SpO2',
  },
  '#blk-max30102_spo2_tooltip#': {
    en: 'Returns the Oxygen Saturation level (SpO2) in percentage.',
  },
  '#blk-max30102_value#': {
    en: 'max30102: raw value of ',
  },
  '#blk-max30102_value_tooltip#': {
    en: 'Returns the raw sensor value of the Red or IR LED.',
  },
  '#blk-max30102_read_temperature#': {
    en: 'max30102: temperature',
  },
  '#blk-max30102_read_temperature_tooltip#': {
    en: 'Returns the temperature of the max30102 chip.',
  },
  '#blk-try#': {
    en: 'try',
  },
  '#blk-except#': {
    en: 'except',
  },
  '#blk-try_except_tooltip#': {
    en: 'Test some code in \\"try\\", and run the code in \\"except\\" if an error occurs.',
  },
  '#blk-run_python#': {
    en: 'run python code',
  },
  '#blk-run_python_tooltip#': {
    en: 'You can provide any valid python code here, but it must be a single line.',
  },
  '#blk-run_python_and_return#': {
    en: 'run python code',
  },
  '#blk-run_python_and_return_tooltip#': {
    en: 'Run python code and return the result.',
  },
  '#blk-vl53l0x_init#': {
    en: 'init VL53L0X with address',
  },
  '#blk-vl53l0x_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-vl53l0x_read#': {
    en: 'vl53l0x: distance in mm',
  },
  '#blk-vl53l0x_read_tooltip#': {
    en: 'Returns -1 if the distance is too far.',
  },
  '#blk-vl53l1x_init#': {
    en: 'init VL53L1X with address',
  },
  '#blk-vl53l1x_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-vl53l1x_read#': {
    en: 'vl53l1x: distance in mm',
  },
  '#blk-vl53l1x_read_tooltip#': {
    en: 'If working poorly, try setting the distance mode and make sure the tape has been removed from the sensor.',
  },
  '#blk-vl53l1x_set_distance_mode#': {
    en: 'vl53l1x: set distance mode to',
  },
  '#blk-vl53l1x_set_distance_mode_tooltip#': {
    en: 'The sensor can work at all ranges in any mode, but will work better if the appropriate mode is set.',
  },
  '#blk-mqtt_logger_init#': {
    en: 'init mqtt logger with topic',
  },
  '#blk-and_size#': {
    en: 'and size',
  },
  '#blk-mqtt_logger_init_tooltip#': {
    en: 'Create a new data logger that will contain no more than the specified number of entries.',
  },
  '#blk-mqtt_logger_log_with_time#': {
    en: 'mqtt logger: log with current time to topic',
  },
  '#blk-and_data#': {
    en: 'and data',
  },
  '#blk-mqtt_logger_log_with_time_tooltip#': {
    en: 'Log the provided data (y-axis) together with the current time in seconds (x-axis).',
  },
  '#blk-mqtt_logger_log#': {
    en: 'mqtt logger: log data',
  },
  '#blk-mqtt_logger_log_tooltip#': {
    en: 'Log the provided data. Data must be a list with two items, the first is the x-axis and the second is the y-axis.',
  },
  '#blk-ds3231_init#': {
    en: 'init DS3231 with address',
  },
  '#blk-ds3231_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-ds3231_date_time_get#': {
    en: 'ds3231: date and time',
  },
  '#blk-ds3231_date_time_get_tooltip#': {
    en: 'Returns a list containing year, month, day, weekday, hours, minutes, seconds, subseconds. Subseconds is always 0 and is only present for compatibility with machine.RTC.',
  },
  '#blk-ds3231_date_time_set#': {
    en: 'ds3231: set date and time to',
  },
  '#blk-ds3231_date_time_set_tooltip#': {
    en: 'Input should be a list containing year, month, day, weekday, hours, minutes, seconds, subseconds. Subseconds is ignored and is only present for compatibility with machine.RTC.',
  },
  '#blk-bme280_init#': {
    en: 'init BME280 with address',
  },
  '#blk-bme280_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-bme280_read#': {
    en: 'bmp280: read the sensor',
  },
  '#blk-bme280_read_tooltip#': {
    en: 'You must perform a read before using the sensor value.',
  },
  '#blk-bme280_temperature#': {
    en: 'bme280: temperature',
  },
  '#blk-bme280_temperature_tooltip#': {
    en: 'You must perform a read before using this block. Value is in Celsius.',
  },
  '#blk-bme280_pressure#': {
    en: 'bme280: pressure',
  },
  '#blk-bme280_pressure_tooltip#': {
    en: 'You must perform a read before using this block. Value is in pascal.',
  },
  '#blk-bme280_altitude#': {
    en: 'bme280: altitude',
  },
  '#blk-bme280_altitude_tooltip#': {
    en: 'You must perform a read before using this block. Value is calculated from the pressure, and is in meters above sea level.',
  },
  '#blk-bme280_humidity#': {
    en: 'bme280: humidity',
  },
  '#blk-bme280_humidity_tooltip#': {
    en: 'You must perform a read before using this block. Value is in relative humidity percentage.',
  },
  '#blk-apds9960_init#': {
    en: 'init APDS9960 with addres',
  },
  '#blk-apds9960_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-apds9960_enable_light#': {
    en: 'apds9960: enable ambient light sensor with gain',
  },
  '#blk-and_speed#': {
    en: 'and speed',
  },
  '#blk-apds9960_enable_light_tooltip#': {
    en: 'Increasing speed will reduce sensitivity. At 0, each read will take 712ms, while at the max of 255, each read will take 2.78ms.',
  },
  '#blk-apds9960_disable_light#': {
    en: 'apds9960: disable ambient light sensor',
  },
  '#blk-apds9960_disable_light_tooltip#': {
    en: 'Disable the sensor to save power when not needed.',
  },
  '#blk-apds9960_read_light#': {
    en: 'apds9960: read ambient light of type',
  },
  '#blk-apds9960_read_light_tooltip#': {
    en: '\\"Clear\\" means light of any color. \\"Red, Green, Blue\\" refers to light of that color. \\"All\\" will return a list containing the clear, red, green, and blue values.',
  },
  '#blk-apds9960_enable_prox#': {
    en: 'apds9960: enable proximity sensor with gain',
  },
  '#blk-and_led#': {
    en: 'and led',
  },
  '#blk-apds9960_enable_prox_tooltip#': {
    en: 'Increasing gain and led power will increase detection range at the cost of more power.',
  },
  '#blk-apds9960_disable_prox#': {
    en: 'apds9960: disable proximity sensor',
  },
  '#blk-apds9960_disable_prox_tooltip#': {
    en: 'Disable the sensor to save power when not needed.',
  },
  '#blk-apds9960_read_prox#': {
    en: 'apds9960: read proximity',
  },
  '#blk-apds9960_read_prox_tooltip#': {
    en: 'WARNING! Proximity sensor will not work when gesture sensor is enabled.',
  },
  '#blk-apds9960_enable_gesture#': {
    en: 'apds9960: enable gesture sensor with gain',
  },
  '#blk-and_led#': {
    en: 'and led',
  },
  '#blk-apds9960_enable_gesture_tooltip#': {
    en: 'Enabling gesture will disable proximity. Increasing gain and led power will increase detection range at the cost of more power.',
  },
  '#blk-apds9960_disable_gesture#': {
    en: 'apds9960: disable gesture sensor',
  },
  '#blk-apds9960_disable_gesture_tooltip#': {
    en: 'Disable the sensor to save power when not needed.',
  },
  '#blk-apds9960_read_gesture#': {
    en: 'apds9960: read gesture',
  },
  '#blk-apds9960_read_gesture_tooltip#': {
    en: 'You need to perform a read first, then retrieve the value using \\"get gesture\\". Run frequently, as new gestures cannot be detected until old gestures are read.',
  },
  '#blk-apds9960_get_gesture#': {
    en: 'apds9960: get gesture',
  },
  '#blk-apds9960_get_gesture_tooltip#': {
    en: 'Possible values are \\"u\\" (up), \\"d\\" (down), \\"l\\" (left), \\"r\\" (right), \\"\\" (no gesture). You must perform a \\"read gesture\\" first to retrieve the gesture from the sensor.',
  },
  '#blk-gy33_i2c_init#': {
    en: 'init GY33 (I2C) with address',
  },
  '#blk-gy33_i2c_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-gy33_i2c_set_led#': {
    en: 'gy33_i2c: set LED power',
  },
  '#blk-gy33_i2c_set_led_tooltip#': {
    en: 'If you change the LED power, the default calibration will likely be very off, and you must perform your own calibration.',
  },
  '#blk-gy33_i2c_read_calibrated#': {
    en: 'gy33_i2c: read value of type',
  },
  '#blk-gy33_i2c_read_calibrated_tooltip#': {
    en: 'These values are calibrated to be approximately within the range of 0 (black) to 255 (white), but it is possible to exceed these.',
  },
  '#blk-gy33_i2c_read_raw#': {
    en: 'gy33_i2c: read raw value of type',
  },
  '#blk-gy33_i2c_read_raw_tooltip#': {
    en: 'These are uncalibrated values; useful if you wish to use your own calibration algorithm.',
  },
  '#blk-gy33_i2c_calibrate_white#': {
    en: 'gy33_i2c: calibrate white',
  },
  '#blk-gy33_i2c_calibrate_white_tooltip#': {
    en: 'Calibrate the white value. The sensor should be on a white surface when you run this.',
  },
  '#blk-gy33_i2c_calibrate_black#': {
    en: 'gy33_i2c: calibrate black',
  },
  '#blk-gy33_i2c_calibrate_black_tooltip#': {
    en: 'Calibrate the black value. The sensor should be on a black surface when you run this.',
  },
  '#blk-gy33_uart_init#': {
    en: 'init GY33 (UART) with address',
  },
  '#blk-gy33_uart_init_tooltip#': {
    en: 'You must have an \\"init UART\\" block with the appropriate pins and baudrate set before this.',
  },
  '#blk-gy33_uart_set_led#': {
    en: 'gy33_uart: set LED power',
  },
  '#blk-gy33_uart_set_led_tooltip#': {
    en: 'If you change the LED power, the default calibration will likely be very off, and you must perform your own calibration.',
  },
  '#blk-gy33_uart_set_integration_time#': {
    en: 'gy33_uart: set integration time',
  },
  '#blk-gy33_uart_set_integration_time_tooltip#': {
    en: 'Sets the integration time in milliseconds. A higher integration time will provide a higher resolution for the raw values, but at the expense of a lower update rate. If you change this, the default calibration will likely be very off, and you must perform your own calibration.',
  },
  '#blk-gy33_uart_update#': {
    en: 'gy33_uart: update',
  },
  '#blk-gy33_uart_update_tooltip#': {
    en: 'Run this frequently to read the data from the module. The sensor values will not change if you do not run this.',
  },
  '#blk-gy33_uart_get_calibrated#': {
    en: 'gy33_uart: get value of type',
  },
  '#blk-gy33_uart_get_calibrated_tooltip#': {
    en: 'These values are calibrated to be approximately within the range of 0 (black) to 255 (white), but it is possible to exceed these. You must run update first.',
  },
  '#blk-gy33_uart_get_raw#': {
    en: 'gy33_uart: get raw value of type',
  },
  '#blk-gy33_uart_get_raw_tooltip#': {
    en: 'These are uncalibrated values; useful if you wish to use your own calibration algorithm. You must run update first.',
  },
  '#blk-gy33_uart_calibrate_white#': {
    en: 'gy33_uart: calibrate white',
  },
  '#blk-gy33_uart_calibrate_white_tooltip#': {
    en: 'Calibrate the white value. The sensor should be on a white surface when you run this. You must run update first.',
  },
  '#blk-gy33_uart_calibrate_black#': {
    en: 'gy33_uart: calibrate black',
  },
  '#blk-gy33_uart_calibrate_black_tooltip#': {
    en: 'Calibrate the black value. The sensor should be on a black surface when you run this. You must run update first.',
  },
  '#blk-tcs3472_init#': {
    en: 'init TCS3472 with address',
  },
  '#blk-tcs3472_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-tcs3472_set_gain#': {
    en: 'tcs3472: set gain to',
  },
  '#blk-tcs3472_set_gain_tooltip#': {
    en: 'Sets the analog gain to scale the output value. If you change this, the default calibration will likely be very off, and you must perform your own calibration.',
  },
  '#blk-tcs3472_set_integration_time#': {
    en: 'tcs3472: set integration time to',
  },
  '#blk-tcs3472_set_integration_time_tooltip#': {
    en: 'Sets the integration time in milliseconds. A higher integration time will provide a higher resolution for the raw values, but at the expense of a lower update rate. If you change this, the default calibration will likely be very off, and you must perform your own calibration.',
  },
  '#blk-tcs3472_read_calibrated#': {
    en: 'tcs3472: read value of type',
  },
  '#blk-tcs3472_read_calibrated_tooltip#': {
    en: 'These values are calibrated to be approximately within the range of 0 (black) to 255 (white), but it is possible to exceed these.',
  },
  '#blk-tcs3472_read_raw#': {
    en: 'tcs3472: read raw value of type',
  },
  '#blk-tcs3472_read_raw_tooltip#': {
    en: 'These are uncalibrated values; useful if you wish to use your own calibration algorithm.',
  },
  '#blk-tcs3472_calibrate_white#': {
    en: 'tcs3472: calibrate white',
  },
  '#blk-tcs3472_calibrate_white_tooltip#': {
    en: 'Calibrate the white value. The sensor should be on a white surface when you run this.',
  },
  '#blk-tcs3472_calibrate_black#': {
    en: 'tcs3472: calibrate black',
  },
  '#blk-tcs3472_calibrate_black_tooltip#': {
    en: 'Calibrate the black value. The sensor should be on a black surface when you run this.',
  },
  '#blk-ms#': {
    en: 'ms',
  },
  '#blk-tween_start#': {
    en: 'start tween ID',
  },
  '#blk-tween_start_tooltip#': {
    en: 'ID is used to identify a tween and can be any value. \\"Start Time\\" is usually the time, but can be any numeric value.',
  },
  '#blk-type#': {
    en: 'type',
  },
  '#blk-start_value#': {
    en: 'start value',
  },
  '#blk-end_value#': {
    en: 'end value',
  },
  '#blk-start_time#': {
    en: 'start time',
  },
  '#blk-tween_remove#': {
    en: 'remove tween of ID',
  },
  '#blk-tween_remove_tooltip#': {
    en: 'It is not necessary to remove a tween; you can reuse the tween ID or just ignore it. But removing it may free up a bit of memory.',
  },
  '#blk-tween_get#': {
    en: 'get value of tween ID',
  },
  '#blk-tween_get_tooltip#': {
    en: 'ID should match the ID used when starting the tween. \\"Time\\" is usually the time, but can be any numeric value.',
  },
  '#blk-at_time#': {
    en: 'at time',
  },
  '#blk-tween_is_ended#': {
    en: 'tween of ID',
  },
  '#blk-tween_is_ended_tooltip#': {
    en: 'Returns true if the tween is ended at the given time. ID should match the ID used when starting the tween. \\"Time\\" is usually the time, but can be any numeric value.',
  },
  '#blk-is_ended_at_time#': {
    en: 'is ended at time',
  },
  '#blk-max6675_init#': {
    en: 'init max6675 on',
  },
  '#blk-max6675_init_tooltip#': {
    en: 'You must have an \\"init spi\\" block before this. The CS should be connected to any pin that supports digital write, and the MOSI pin need not be connected.',
  },
  '#blk-and_cs_pin#': {
    en: 'and CS pin',
  },
  '#blk-max6675_read#': {
    en: 'max6675: read temperature in',
  },
  '#blk-max6675_read_tooltip#': {
    en: 'This will return the measurement from the last read (...which could be very long ago). To get the latest measurement, perform a read, wait 0.22secs, then read again. Returns -1 if thermocouple is not connected.',
  },
  '#blk-binary_op_tooltip#': {
    en: 'This performs a binary operation. Both inputs must be integers.',
  },
  '#blk-binary_not#': {
    en: '~ (NOT)',
  },
  '#blk-binary_not_tooltip#': {
    en: 'This performs a binary not operation. The input must be an integer.',
  },
  '#blk-times#': {
    en: 'times',
  },
  '#blk-binary_shift_tooltip#': {
    en: 'This shifts the bits to the left or right by the specified number of times.',
  },
};
let MSGS_KEYS = Object.keys(MSGS);

let LANG = localStorage.getItem('LANG');
if (!LANG || LANG == '' || LANG == 'undefined') {
  LANG = 'en';
}

const RTL_LANGS = ['he'];
let RTL = false;
if (RTL_LANGS.indexOf(LANG) != -1) {
  RTL = true;
}

var i18n = new function() {
  var self = this;

  // Append to messages
  this.append = function(msgs) {
    MSGS = Object.assign(MSGS, msgs);
    MSGS_KEYS = Object.keys(MSGS);
  };

  // Get a single string
  this.get = function(requestedKey) {
    let messages = MSGS[requestedKey];
    if (typeof messages == 'undefined') {
      return requestedKey;
    }
    let message = messages[LANG]
    if (typeof message == 'undefined') {
      if (typeof messages['en'] == 'undefined') {
        return requestedKey;
      } else {
        return messages['en'];
      }
    }
    return message;
  };

  // Change all keys in provided string
  this.replace = function(input) {
    let regEx = '';
    for (let key of MSGS_KEYS) {
      regEx += key + '|';
    }
    regEx = regEx.slice(0, regEx.length - 1);
    regEx = new RegExp(regEx, 'g');
    return input.replace(regEx, function(key){
      return self.get(key);
    })
  }
}