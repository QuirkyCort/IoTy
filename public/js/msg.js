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
  '#blk-adv_set_pin#': {
    en: 'adv: set pin'
  },
  '#blk-set_pin_tooltip#': {
    en: 'Set the pin as input (for reading), output (for writing), or input with pullup (for reading, is high if unconnected).',
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
  '#blk-adv_read_pin#': {
    en: 'adv: digital read pin',
  },
  '#blk-read_pin_tooltip#': {
    en: 'Returns a 1 if pin is high (3.3V) and a 0 if pin is low (0V)',
  },
  '#blk-write_pin#': {
    en: 'digital write pin',
  },
  '#blk-adv_write_pin#': {
    en: 'adv: digital write pin',
  },
  '#blk-write_pin_tooltip#': {
    en: 'Write a 1 to turn the pin on (3.3V), and a 0 to turn it off (0V).',
  },
  '#blk-to#': {
    en: 'to',
  },
  '#blk-analog_read_pin#': {
    en: 'analog read pin',
  },
  '#blk-adv_analog_read_pin#': {
    en: 'adv: analog read pin',
  },
  '#blk-analog_read_pin_tooltip#': {
    en: 'Range from 0 to 65535, corresponding to approximately 0 to 3.3V.',
  },
  '#blk-touch_read_pin#': {
    en: 'touch read pin',
  },
  '#blk-adv_touch_read_pin#': {
    en: 'adv: touch read pin',
  },
  '#blk-touch_read_pin_tooltip#': {
    en: 'Returns an integer corresponding to the capacitance. Values are smaller when touched, and must be calibrated for each board / environment.',
  },
  '#blk-set_analog_write_freq#': {
    en: 'Set analog write frequency on pin',
  },
  '#blk-adv_set_analog_write_freq#': {
    en: 'adv: Set analog write frequency on pin',
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
  '#blk-adv_analog_write_pin#': {
    en: 'adv: analog write pin',
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
  '#blk-sleep_for_tooltip#': {
    en: 'Suspend the program for the specified time. You can use this to add delays to a program.',
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
    en: 'This blocks does nothing and is only used for comments. Multiple lines are supported.',
  },
  '#blk-read_input_with_prompt#': {
    en: 'prompt for input with message',
  },
  '#blk-type_cast#': {
    en: 'convert to',
  },
  '#blk-type_cast_tooltip#': {
    en: 'Convert from one data type into another.',
  },
  '#blk-bytes_tooltip#': {
    en: 'Returns a bytes object. Bytes objects can be indexed like a list, but cannot be modified.',
  },
  '#blk-bytearray_tooltip#': {
    en: 'Returns a bytearray. Bytearray works just like a bytes object, but can be modified.',
  },
  '#blk-of_size#': {
    en: 'of size',
  },
  '#blk-bytearray_by_size_tooltip#': {
    en: 'Returns a bytearray of the specified size initialized to all 0.',
  },
  '#blk-set_slice#': {
    en: 'set slice',
  },
  '#blk-bytearray_set_slice_tooltip#': {
    en: 'Set a slice of a bytearray object to the specified value.',
  },
  '#blk-get_slice#': {
    en: 'get slice',
  },
  '#blk-bytearray_get_slice_tooltip#': {
    en: 'Get a slice of a bytearray object.',
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
  '#blk-adv_servo_write#': {
    en: 'adv: servo write pin',
  },
  '#blk-servo_write_deg_tooltip#': {
    en: 'Set the servo to the specified degrees. The actual angle may vary depending on the type of servo.',
  },
  '#blk-servo_write_us_tooltip#': {
    en: 'Send a micro-seconds signal to the servo. Most servos accepts a range of 1000 to 2000.',
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
  '#blk-adv_hc_sr04_ping_trig#': {
    en: 'adv: HC-SR04 ping trig',
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
  '#blk-connect_to_wifi_blocks_input_tooltip#': {
    en: 'Works the same as the other \\"Connect to WiFi\\" block, but allows blocks input for SSID and Password.',
  },
  '#blk-connect_to_mqtt_server#': {
    en: 'MQTT: Connect to server',
  },
  '#blk-connect_to_mqtt_server_tooltip#': {
    en: 'Connects to the server with the specified username and password. Will throw an error if the user or password is invalid.',
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
  '#blk-mqtt_check_msg_tooltip#': {
    en: 'Checks for messages. You must run this frequently. The \\"MQTT: On receive message for topic\\" block will not run if you do not run this.',
  },
  '#blk-mqtt_on_receive#': {
    en: 'MQTT: On receive message for topic',
  },
  '#blk-mqtt_on_receive_tooltip#': {
    en: 'This function will run when a new message is found when running \\"MQTT: Check for message\\".',
  },
  '#blk-with_mqtt_msg#': {
    en: 'with: mqtt_msg',
  },
  '#blk-mqtt_msg_tooltip#': {
    en: 'This variable will contain the received message in string format. This block can only be used in a \\"MQTT: On receive message for topic\\" block.',
  },
  '#blk-mqtt_publish#': {
    en: 'MQTT: Publish to topic',
  },
  '#blk-mqtt_publish_tooltip#': {
    en: 'Encodes the specified string in UTF-8 format and publish it to the specified topic.',
  },
  '#blk-message#': {
    en: 'message',
  },
  '#blk-mqtt_publish_bytes#': {
    en: 'MQTT: Publish bytes to topic',
  },
  '#blk-mqtt_publish_bytes_tooltip#': {
    en: 'Publish the bytes object to the specified topic.',
  },
  '#blk-i2c_init#': {
    en: 'init',
  },
  '#blk-i2c_init_tooltip#': {
    en: 'Initialize I2C device 1 or 2 using their default pins. If you need Soft I2C or different pins, use the other \\"init I2C\\" block',
  },
  '#blk-i2c_init_with_pins_tooltip#': {
    en: 'A more advanced version of init i2c that allows setting of SCL and SDA pins',
  },
  '#blk-on_pins#': {
    en: 'on pins',
  },
  '#blk-freq#': {
    en: 'freq',
  },
  '#blk-i2c_scan#': {
    en: 'scan for i2c devices on',
  },
  '#blk-i2c_writeto_addr#': {
    en: 'write to address',
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
    en: 'read from address',
  },
  '#blk-number_of_bytes#': {
    en: '# bytes',
  },
  '#blk-i2c_readfrom_bytes_tooltip#': {
    en: 'read the specified number of bytes and return a bytes object',
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
  '#main-import_functions#': {
    en: 'Import functions from blocks file',
    fr: 'Importer une fonction depuis une sauvegarde',
    el: 'Εισαγωγή συναρτήσεων από αρχείο μπλοκ',
    nl: 'Importeer functies van blokkenbestand',
    de: 'Importiere Funktionen von Blöckedatei',
    he: 'יבא פונקציות',
    ru: 'Импортировать функции из блок-программы',
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
  '#main-runSelectedBlock#': {
    en: 'Run selected block',
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
  '#main-softResetDevice#': {
    en: 'Soft Reset Device',
  },
  '#main-resetDevice#': {
    en: 'Reset Device',
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
  '#main-invalid_blocks_file#': {
    en: 'Invalid Blocks file (...maybe it contains Python instead?)',
  },
  '#main-invalid_python_file#': {
    en: 'Invalid Python file (...maybe it contains Blocks instead?)',
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
    en: 'init MPU-6050 on',
  },
  '#blk-mpu6050_init_tooltip#': {
    en: 'You must have an \\"init i2c\\" block before this',
  },
  '#blk-with_address#': {
    en: 'with address',
  },
  '#blk-mpu6050_calibrate#': {
    en: 'calibrate MPU-6050',
  },
  '#blk-mpu6050_calibrate_tooltip#': {
    en: 'Ensure that the MPU-6050 is stationary during calibration',
  },
  '#blk-mpu6050_reset#': {
    en: 'reset MPU-6050 gyro angles x/y/z',
  },
  '#blk-mpu6050_reset_tooltip#': {
    en: 'Resets all angles to the specified values',
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
  '#blk-mpu6050_accel_tooltip#': {
    en: 'Returns the acceleration in milligravity.',
  },
  '#blk-mpu6050_get_gyro#': {
    en: 'MPU-6050 rotation rate',
  },
  '#blk-mpu6050_gyro_tooltip#': {
    en: 'Returns the gyro rotation rate in degrees per second.',
  },
  '#blk-mpu6050_temperature#': {
    en: 'MPU-6050 temperature for type',
  },
  '#blk-mpu6050_temperature_tooltip#': {
    en: 'Returns the temperature in degrees C. Make sure to select the correct device type.',
  },
  '#blk-mpu6050_get_angle#': {
    en: 'MPU-6050 angle',
  },
  '#blk-mpu6050_get_angle_tooltip#': {
    en: 'You must run \\"update gyro angles\\" frequently to get a valid angle.',
  },
  '#blk-mpu6050_get_calibration#': {
    en: 'MPU-6050 calibration data',
  },
  '#blk-mpu6050_get_calibration_tooltip#': {
    en: 'Returns the x, y, and z error in a list.',
  },
  '#blk-mpu6050_set_calibration#': {
    en: 'set MPU-6050 calibration',
  },
  '#blk-mpu6050_set_calibration_tooltip#': {
    en: 'Expects a list of x, y, z error as input.',
  },
  '#blk-pca9685_init#': {
    en: 'init PCA-9685 on',
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
    en: 'init SSD-1306 on',
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
    en: 'init SH-1106 on',
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
  '#blk-connect_to#': {
    en: 'connect to',
  },
  '#blk-urequests_connect_tooltip#': {
    en: 'This block separates the connection and the request, allowing you to stream data.',
  },
  '#blk-urequests_read#': {
    en: 'urequest read',
  },
  '#blk-bytes#': {
    en: 'bytes',
  },
  '#blk-urequests_read_tooltip#': {
    en: 'Read up to the specified number of bytes. If set to -1, the entire response will be read. If settimeout is set to 0, it will return a None if no data is available to read.',
  },
  '#blk-urequests_settimeout#': {
    en: 'urequest: set timeout to',
  },
  '#blk-urequests_settimeout_tooltip#': {
    en: 'Timeout in seconds. If 0, the socket will be in non-blocking mode. If set to None, it will be in blocking mode. If non-zero, an exception will be raised if the timeout expires before a read/write completes.',
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
    en: 'Password must be either empty (open AP) or at least 8 characters long.',
  },
  '#blk-wlan_scan#': {
    en: 'scan for WiFi',
  },
  '#blk-wlan_scan_tooltip#': {
    en: 'Returns a list of available WiFi networks. Returns a list of tuples containing (ssid, bssid, channel, RSSI, authmode, hidden).',
  },
  '#blk-wlan_is_present#': {
    en: 'WiFi SSID',
  },
  '#blk-is_present#': {
    en: 'is present',
  },
  '#blk-wlan_is_present_tooltip#': {
    en: 'Returns True if the specified WiFi SSID is available.',
  },
  '#blk-wlan_is_connected#': {
    en: 'WiFi is connected',
  },
  '#blk-wlan_is_connected_tooltip#': {
    en: 'Returns True if connected to a router or if a client is connected to your device (AP Mode), else returns None.',
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
  '#blk-write_binary_to#': {
    en: 'write binary data to',
  },
  '#blk-file_write_binary_tooltip#': {
    en: 'Write a Bytes object to file.',
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
  '#blk-list_dir#': {
    en: 'list dir',
  },
  '#blk-file_list_dir_tooltip#': {
    en: 'Returns directory content as a list of strings',
  },
  '#blk-sdcard_init#': {
    en: 'init sdcard on slot',
  },
  '#blk-sdcard_init_tooltip#': {
    en: 'Init and mount the sdcard. Default values are for the Cheap Yellow Display, and may need to be changed depending on your sdcard wiring.',
  },
  '#blk-sdcard_deinit#': {
    en: 'deinit sdcard at mount point',
  },
  '#blk-sdcard_deinit_tooltip#': {
    en: 'Unmount and deinit the sdcard. This frees up the SPI slot for other uses.',
  },
  '#blk-sck#': {
    en: 'sck',
  },
  '#blk-miso#': {
    en: 'miso',
  },
  '#blk-mount_point#': {
    en: 'mount point',
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
  '#blk-ez_httpd_send_bytes#': {
    en: 'send response in bytes',
  },
  '#blk-ez_httpd_send_bytes_tooltip#': {
    en: 'Send a bytes object to the client. This must be after a wait_for_connection.',
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
    en: 'Read a single rom from the CSV file and return a list. This will raise an exception when there are no more rows to read.',
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
    en: 'init I2C LCD on',
  },
  '#blk-with_lines#': {
    en: 'with lines',
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
    en: 'Read the specified number of characters. Use -1 to read all available characters.',
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
    en: 'Write a String. If \\"New line\\" is enabled, a new line character will be added to the end.',
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
  '#blk-encode_tooltip#': {
    en: 'Encode a string into a bytes object using the utf-8 encoding.',
  },
  '#blk-unpack#': {
    en: 'unpack data',
  },
  '#blk-using_format#': {
    en: 'using format',
  },
  '#blk-unpack_tooltip#': {
    en: 'Unpack a bytes object using the provided format. Returns a tuple containing the results. See the help URL for details of the format string.',
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
  '#blk-hx710_init_with_dt_pin#': {
    en: 'init hx710 with dt pin',
  },
  '#blk-hx710_init_tooltip#': {
    en: 'Initialize the HX710 on the specified pin. You must run this before performing any reads.',
  },
  '#blk-hx710_read#': {
    en: 'hx710: read value and set next read to',
  },
  '#blk-hx710_read_tooltip#': {
    en: 'Read from the HX710 and set the type of the next read. Note that this setting does not affect the current read. The return value is unitless; you must calibrate it yourself. ',
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
    en: 'init QMC5883L on',
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
    en: 'init HMC5883L on',
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
    en: 'init BMP280 on',
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
    en: 'receiving of commands via bluetooth is',
  },
  '#blk-setBluetoothCmds_tooltip#': {
    en: 'Normally, the IoTy device will continue to receive commands (eg. Download programs) over bluetooth when running a program. If disabled, you must switch to programming mode to program your device.',
  },
  '#blk-max30102_init#': {
    en: 'init MAX30102 on',
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
    en: 'init VL53L0X on',
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
    en: 'init VL53L1X on',
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
    en: 'init DS3231 on',
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
    en: 'init BME280 on',
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
    en: 'init APDS9960 on',
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
    en: 'init GY33 (I2C) on',
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
    en: 'init TCS3472 on',
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
  '#blk-encoder_init#': {
    en: 'init encoder on pin',
  },
  '#blk-encoder_init_tooltip#': {
    en: 'init encoder. If the direction is incorrect, reverse the pins settings.',
  },
  '#blk-encoder_get_position#': {
    en: 'encoder: get position',
  },
  '#blk-encoder_get_position_tooltip#': {
    en: 'Note that encoder knobs will often produce 2 steps for every one \\"click\\".',
  },
  '#blk-encoder_get_speed#': {
    en: 'encoder: get speed',
  },
  '#blk-encoder_get_speed_tooltip#': {
    en: 'Returns the average speed (pulse per sec) between the last two signals, or the last signal and the current time (...if it has been some time since the last pulse). Speed below 5 will be reported as 0.',
  },
  '#blk-encoder_set_position#': {
    en: 'encoder: set position',
  },
  '#blk-encoder_set_position_tooltip#': {
    en: 'Set the current encoder position readings to the specified value.',
  },
  '#blk-huskylens_init_i2c#': {
    en: 'init Husky Lens in I2C mode on',
  },
  '#blk-huskylens_init_i2c_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-huskylens_init_uart#': {
    en: 'init Husky Lens in UART mode on ',
  },
  '#blk-huskylens_init_uart_tooltip#': {
    en: 'You must have an \\"init UART\\" block with the appropriate pins and baudrate set before this.',
  },
  '#blk-huskylens_request#': {
    en: 'huskylens: request data of type',
  },
  '#blk-huskylens_request_tooltip#': {
    en: 'You must run a request block before reading results',
  },
  '#blk-and_ID#': {
    en: 'and ID',
  },
  '#blk-huskylens_requestByID_tooltip#': {
    en: 'You must run a request block before reading results. Only the specified ID will appear in the result.',
  },
  '#blk-huskylens_results#': {
    en: 'huskylens: results',
  },
  '#blk-huskylens_results_tooltip#': {
    en: 'The results of an earlier request. The return value is always a list of dictionaries.',
  },
  '#blk-huskylens_idInResults#': {
    en: 'huskylens: check if results contains ID',
  },
  '#blk-huskylens_idInResults_tooltip#': {
    en: 'Returns a True if the results contains the specified ID, else returns False.',
  },
  '#blk-huskylens_get#': {
    en: 'huskylens: get',
  },
  '#blk-huskylens_get_tooltip#': {
    en: 'You do not need to perform a request before this block; it will generate its own request.',
  },
  '#blk-of_block_closest_to_center_of_screen_from_results#': {
    en: 'of block closest to center of screen from results',
  },
  '#blk-huskylens_closestBlockToCenter_tooltip#': {
    en: 'Be sure to check if the Full Result is not None first, before reading the keys, else you might get an error.',
  },
  '#blk-of_arrow_closest_to_center_of_screen_from_results#': {
    en: 'of arrow closest to center of screen from results',
  },
  '#blk-huskylens_closestArrowToCenter_tooltip#': {
    en: 'Be sure to check if the Full Result is not None first, before reading the keys, else you might get an error.',
  },
  '#blk-huskylens_forget#': {
    en: 'huskylens: forget all learning data',
  },
  '#blk-huskylens_forget_tooltip#': {
    en: 'Forgets all learning data. If you have already save the learning data to SD card, you can restore it even after a forget.',
  },
  '#blk-huskylens_learn#': {
    en: 'huskylens: learn and save to ID',
  },
  '#blk-huskylens_learn_tooltip#': {
    en: 'Perform a learn based on the current mode and save the result to the specified ID',
  },
  '#blk-huskylens_change_mode#': {
    en: 'huskylens: change mode to',
  },
  '#blk-huskylens_change_mode_tooltip#': {
    en: 'You must perform a new request after changing mode for the results to change',
  },
  '#blk-huskylens_customText#': {
    en: 'huskylens: draw text',
  },
  '#blk-at_position_x#': {
    en: 'at position x',
  },
  '#blk-and_y#': {
    en: 'and y',
  },
  '#blk-huskylens_customText_tooltip#': {
    en: 'Draw the specified text on screen. Note that xy specifies the top left corner of the text, and that the screen is 320 by 240.',
  },
  '#blk-huskylens_clearText#': {
    en: 'huskylens: clear text',
  },
  '#blk-huskylens_clearText_tooltip#': {
    en: 'Clears all text from screen',
  },
  '#blk-huskylens#': {
    en: 'huskylens:',
  },
  '#blk-learned_models_on_slot#': {
    en: 'learned models on slot',
  },
  '#blk-of_sdcard#': {
    en: 'of SD card',
  },
  '#blk-huskylens_saveLoadModel_tooltip#': {
    en: 'Save or load all the learned models to the specified slot on the SD card',
  },
  '#blk-huskylens_saveImage#': {
    en: 'huskylens: take',
  },
  '#blk-and_save_to_sdcard#': {
    en: 'and save to SD card',
  },
  '#blk-huskylens_saveImage_tooltip#': {
    en: 'Capture a photo or screenshot and save to the SD card',
  },
  '#blk-tca9548a_init#': {
    en: 'init TCA9548A on',
  },
  '#blk-tca9548a_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-tca9548a_set_port#': {
    en: 'tca9548a: set port to',
  },
  '#blk-tca9548a_set_port_tooltip#': {
    en: 'Activate the specified port number and deactivates the rest or leave them unchanged. Port number can range from 0 to 7. Set -1 to deactive all ports.',
  },
  '#blk-tca9548a_get_port#': {
    en: 'tca9548a: get port',
  },
  '#blk-tca9548a_get_port_tooltip#': {
    en: 'Returns the currently active port. If multiple ports are active, this will return only the lowest active port. Returns -1 if all ports are deactivated.',
  },
  '#blk-music_init#': {
    en: 'init music device on pin',
  },
  '#blk-music_init_tooltip#': {
    en: 'The specified pin should be connected to a passive piezoelectric speaker, headphones, or audio amplifier',
  },
  '#blk-music_play_tone#': {
    en: 'music: play tone of',
  },
  '#blk-music_play_tone_tooltip#': {
    en: 'If set to \\"don\'t wait\\", you must run update frequently to play the tone.',
  },
  '#blk-music_play_notes#': {
    en: 'music: play notes',
  },
  '#blk-music_play_notes_tooltip#': {
    en: 'Notes should be in the RTTTL format, but exclude the title and settings (ie. notes only). If set to \\"don\'t wait\\", you must run update frequently to play the song.',
  },
  '#blk-repeat#': {
    en: 'repeat',
  },
  '#blk-music_play_rtttl#': {
    en: 'music: play RTTTL',
  },
  '#blk-music_play_rtttl_tooltip#': {
    en: 'Songs should be in the RTTTL format (including title and settings). If set to \\"don\'t wait\\", you must run update frequently to play the song.',
  },
  '#blk-music_is_playing#': {
    en: 'music: is playing',
  },
  '#blk-music_is_playing_tooltip#': {
    en: 'Returns True if the music is still playing. Only meaningful when set to \\"don\'t wait\\".',
  },
  '#blk-music_update#': {
    en: 'music: update',
  },
  '#blk-music_update_tooltip#': {
    en: 'When \\"don\'t wait\\" is set, you must run this frequently to play the music.',
  },
  '#blk-music_stop#': {
    en: 'music: stop',
  },
  '#blk-music_stop_tooltip#': {
    en: 'Stops the music. Only meaningful when set to \\"don\'t wait\\".',
  },
  '#blk-scaled_text_init#': {
    en: 'init scaled text for device',
  },
  '#blk-scaled_text_init_tooltip#': {
    en: 'The device must be initialized before this block.',
  },
  '#blk-scaled_text_text#': {
    en: 'draw scaled text',
  },
  '#blk-scaled_text_text_tooltip#': {
    en: 'Works the same as the normal text function, but with an additional scale option. Does not clear the background. You may need to use \\"show\\" after writing.',
  },
  '#blk-scaled_text_text_with_background#': {
    en: 'draw scaled text',
  },
  '#blk-scaled_text_text_with_background_tooltip#': {
    en: 'Works the same as the normal text function, but with an additional scale option. Clears the background with the provided color. You may need to use \\"show\\" after writing.',
  },
  '#blk-scale#': {
    en: 'scale',
  },
  '#blk-png_decoder_render#': {
    en: 'render PNG image',
  },
  '#blk-png_decoder_render_tooltip#': {
    en: 'Set the offset if you do not want the image to appear at the top left corner. Run \\"show\\" after render to display the image on screen.',
  },
  '#blk-to_display#': {
    en: 'to display',
  },
  '#blk-with_offset_x#': {
    en: 'with offset x',
  },
  '#blk-convert_format#': {
    en: 'convert format',
  },
  '#blk-bmp_image_open#': {
    en: 'bmp image: open file',
  },
  '#blk-bmp_image_open_tooltip#': {
    en: 'Opens a BMP file for later use',
  },
  '#blk-bmp_image_render#': {
    en: 'bmp image: render image',
  },
  '#blk-bmp_image_render_tooltip#': {
    en: 'Renders the image to screen.',
  },
  '#blk-bmp_image_close#': {
    en: 'bmp image: close file',
  },
  '#blk-bmp_image_close_tooltip#': {
    en: 'Close the BMP file. You will need to open it again if you want to use it.',
  },
  '#blk-bmp_image_get_pixel#': {
    en: 'bmp image: get pixel',
  },
  '#blk-bmp_image_get_pixel_tooltip#': {
    en: 'Returns the next pixel value (RGB tuple) on each call. Starts from bottom left corner.',
  },
  '#blk-bmp_image_get_pixel_raw#': {
    en: 'bmp image: get pixel (raw)',
  },
  '#blk-bmp_image_get_pixel_raw_tooltip#': {
    en: 'Same as \\"get pixel\\", but returns raw value. The raw value is... (8bits or less: palette index), (16bits: 16bits bytes object), (24bits or more: RGB tuple)',
  },
  '#blk-bmp_image_width#': {
    en: 'bmp image: width',
  },
  '#blk-bmp_image_width_tooltip#': {
    en: 'Gets the width of the image in pixels',
  },
  '#blk-bmp_image_height#': {
    en: 'bmp image: height',
  },
  '#blk-bmp_image_height_tooltip#': {
    en: 'Gets the height of the image in pixels',
  },
  '#blk-bmp_image_depth#': {
    en: 'bmp image: depth',
  },
  '#blk-bmp_image_depth_tooltip#': {
    en: 'Gets the depth (bits per pixel) of the image',
  },
  '#blk-hid_keyboard_init#': {
    en: 'init BLE Keyboard with name',
  },
  '#blk-hid_keyboard_init_tooltip#': {
    en: 'Initialize a Bluetooth Keyboard with the given name. The device will only be visible after advertising is started.',
  },
  '#blk-hid_keyboard_advertising#': {
    en: 'advertising the BLE Keyboard',
  },
  '#blk-hid_keyboard_advertising_tooltip#': {
    en: 'The device will only be visible if advertising is started.',
  },
  '#blk-hid_keyboard_status#': {
    en: 'BLE Keyboard status is',
  },
  '#blk-hid_keyboard_status_tooltip#': {
    en: 'Checks the status of the keyboard. You should only send keypresses when the status is \\"Connected\\".',
  },
  '#blk-hid_keyboard_send_string#': {
    en: 'BLE Keyboard: send string',
  },
  '#blk-hid_keyboard_send_string_tooltip#': {
    en: 'Only the characters on a US keyboard is supported, and special keys (eg. Backspace) cannot be sent using this block.',
  },
  '#blk-hid_keyboard_send_key#': {
    en: 'BLE Keyboard: send key',
  },
  '#blk-hid_keyboard_send_key_tooltip#': {
    en: 'Send special keys. For normal keys (eg. a-z), use send string instead.',
  },
  '#blk-with_modifier#': {
    en: 'with modifier',
  },
  '#blk-hid_mouse_init#': {
    en: 'init BLE Mouse with name',
  },
  '#blk-hid_mouse_init_tooltip#': {
    en: 'Initialize a Bluetooth Mouse with the given name and mode. The device will only be visible after advertising is started.',
  },
  '#blk-hid_mouse_advertising#': {
    en: 'advertising the BLE Mouse',
  },
  '#blk-hid_mouse_advertising_tooltip#': {
    en: 'The device will only be visible if advertising is started.',
  },
  '#blk-hid_mouse_status#': {
    en: 'BLE Mouse status is',
  },
  '#blk-hid_mouse_status_tooltip#': {
    en: 'Checks the status of the mouse. You should only send commands when the status is \\"Connected\\".',
  },
  '#blk-hid_mouse_send_rel#': {
    en: 'BLE Mouse: send axis X',
  },
  '#blk-y#': {
    en: 'Y',
  },
  '#blk-and_wheel#': {
    en: 'and wheel',
  },
  '#blk-hid_mouse_send_rel_tooltip#': {
    en: 'Only works in relative mode. Sends the relative position of the axis. Range from -127 to 127.',
  },
  '#blk-hid_mouse_send_btns#': {
    en: 'BLE Mouse: send buttons',
  },
  '#blk-hid_mouse_send_btns_tooltip#': {
    en: 'Send the state of the mouse buttons. To simulate a mouse click, you should usually send a down, followed by an up.',
  },
  '#blk-hid_mouse_send_abs#': {
    en: 'BLE Mouse: send position X',
  },
  '#blk-hid_mouse_send_abs_tooltip#': {
    en: 'Only works in absolute mode. Sends the absolute position of the mouse from 0 to 32767. Note that these are scaled to the screen (ie. 32767 is always the extreme right/bottom regardless of screen size).',
  },
  '#blk-hid_ccd_init#': {
    en: 'init BLE CCD with name',
  },
  '#blk-hid_ccd_init_tooltip#': {
    en: 'Initialize a Bluetooth Consumer Control Device with the given name. The device will only be visible after advertising is started.',
  },
  '#blk-hid_ccd_advertising#': {
    en: 'advertising the BLE CCD',
  },
  '#blk-hid_ccd_advertising_tooltip#': {
    en: 'The device will only be visible if advertising is started.',
  },
  '#blk-hid_ccd_status#': {
    en: 'BLE CCD status is',
  },
  '#blk-hid_ccd_status_tooltip#': {
    en: 'Checks the status of the ccd. You should only send commands when the status is \\"Connected\\".',
  },
  '#blk-hid_ccd_send_key#': {
    en: 'BLE CCD: send key',
  },
  '#blk-hid_ccd_send_key_tooltip#': {
    en: 'Sends the specified key code. See https://www.usb.org/sites/default/files/hut1_21_0.pdf (Consumer Page) for list of codes.',
  },
  '#blk-hid_ccd_send_key_select_tooltip#': {
    en: 'A list of common key codes for easy use.',
  },
  '#blk-hid_joystick_init#': {
    en: 'init BLE Joystick with name',
  },
  '#blk-hid_joystick_init_tooltip#': {
    en: 'Initialize a Bluetooth Joystick with the given name. The device will only be visible after advertising is started.',
  },
  '#blk-hid_joystick_advertising#': {
    en: 'advertising the BLE Joystick',
  },
  '#blk-hid_joystick_advertising_tooltip#': {
    en: 'The device will only be visible if advertising is started.',
  },
  '#blk-hid_joystick_status#': {
    en: 'BLE Joystick status is',
  },
  '#blk-hid_joystick_status_tooltip#': {
    en: 'Checks the status of the joystick. You should only send commands when the status is \\"Connected\\".',
  },
  '#blk-hid_joystick_send_axes#': {
    en: 'BLE Joystick: send axis X',
  },
  '#blk-hid_joystick_send_axes_tooltip#': {
    en: 'Sends the relative position of the axis. Range from -127 to 127.',
  },
  '#blk-hid_joystick_send_btns#': {
    en: 'BLE Joystick: send buttons',
  },
  '#blk-hid_joystick_send_btns_tooltip#': {
    en: 'Send the state of the joystick buttons.',
  },
  '#blk-yx5300_init#': {
    en: 'init yx5300 on',
  },
  '#blk-yx5300_init_tooltip#': {
    en: 'You must have an \\"init UART\\" block with the appropriate pins and baudrate set to 9600 before this.',
  },
  '#blk-yx5300_play#': {
    en: 'yx5300: play',
  },
  '#blk-yx5300_play_tooltip#': {
    en: 'Resume playing the current track',
  },
  '#blk-yx5300_play_index#': {
    en: 'yx5300: play song index',
  },
  '#blk-yx5300_play_index_tooltip#': {
    en: 'Play the song with the specified index.',
  },
  '#blk-yx5300_play_folder_index#': {
    en: 'yx5300: play song in folder',
  },
  '#blk-and_index#': {
    en: 'and index',
  },
  '#blk-yx5300_play_folder_index_tooltip#': {
    en: 'Play the song in the specified folder and index',
  },
  '#blk-yx5300_play_next#': {
    en: 'yx5300: play next track',
  },
  '#blk-yx5300_play_next_tooltip#': {
    en: 'Play the next track',
  },
  '#blk-yx5300_play_prev#': {
    en: 'yx5300: play the prev track',
  },
  '#blk-yx5300_play_prev_tooltip#': {
    en: 'Play the prev track',
  },
  '#blk-yx5300_pause#': {
    en: 'yx5300: pause',
  },
  '#blk-yx5300_pause_tooltip#': {
    en: 'Pause playback. If you run \\"play\\" after this, the playback will continue at the point it was paused.',
  },
  '#blk-yx5300_stop#': {
    en: 'yx5300: stop',
  },
  '#blk-yx5300_stop_tooltip#': {
    en: 'Stop playback. If you run \\"play\\" after this, the playback will restart from the beginning of the track.',
  },
  '#blk-yx5300_set_volume#': {
    en: 'yx5300: set volume',
  },
  '#blk-yx5300_set_volume_tooltip#': {
    en: 'Set the volume. Max of 30.',
  },
  '#blk-ld2410_init#': {
    en: 'init ld2410 on',
  },
  '#blk-ld2410_init_tooltip#': {
    en: 'You must have an \\"init UART\\" block with the appropriate pins and baudrate (default to 256000) set correctly before this.',
  },
  '#blk-ld2410_update#': {
    en: 'ld2410: update',
  },
  '#blk-ld2410_update_tooltip#': {
    en: 'Run this frequently to read data from the module.',
  },
  '#blk-ld2410_get_target#': {
    en: 'ld2410: get target data',
  },
  '#blk-ld2410_get_target_tooltip#': {
    en: 'Returns a list containing (state, moving target dist (cm), moving target energy, stationary target dist (cm), stationary target energy, detection distance). \\"state\\" is (0: None, 1: Moving target, 2: Stationary target, 3: Both target). ',
  },
  '#blk-ld2410_get_engineering#': {
    en: 'ld2410: get engineering data',
  },
  '#blk-ld2410_get_engineering_tooltip#': {
    en: 'Returns a list containing (max moving gate, max stationary gate, list of moving gate energy, list of stationary gate energy). Engineering mode must be enabled.',
  },
  '#blk-ld2410_engineering_mode#': {
    en: 'ld2410: engineering mode',
  },
  '#blk-ld2410_engineering_mode_tooltip#': {
    en: 'Enable or disable engineering mode. Must be enabled to retrieve engineering data.',
  },
  '#blk-ld2410_set_max#': {
    en: 'ld2410: set max moving gate:',
  },
  '#blk-stationary_gate#': {
    en: 'stationary gate:',
  },
  '#blk-and_inactivity_time#': {
    en: 'and inactivity time',
  },
  '#blk-ld2410_set_max_tooltip#': {
    en: 'Sets the maximum gate for each detection type. Targets beyond the max gate will not be detected.',
  },
  '#blk-ld2410_set_sensitivity#': {
    en: 'ld2410: set sensitivity for gate',
  },
  '#blk-to_moving_energy#': {
    en: 'to moving energy:',
  },
  '#blk-and_stationary_energy#': {
    en: 'and stationary energy',
  },
  '#blk-ld2410_set_sensitivity_tooltip#': {
    en: 'Sets the sensitivity for each gate. Targets energy below the set limits will not be detected.',
  },
  '#blk-ld2410_factory_reset#': {
    en: 'ld2410: factory reset',
  },
  '#blk-ld2410_factory_reset_tooltip#': {
    en: 'Reset all settings to the factory default',
  },
  '#blk-stepper_wheels_init#': {
    en: 'init stepper wheels controller on',
  },
  '#blk-stepper_wheels_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-stepper_wheels_init_drive#': {
    en: 'init movement drive with left motor on port',
  },
  '#blk-and_right_motor_on_port#': {
    en: 'and right motor on port',
  },
  '#blk-stepper_wheels_init_drive_tooltip#': {
    en: 'If you have more than one motor on each side, you can specify them seperated by a comma. Eg. \\"0,1\\".',
  },
  '#blk-stepper_wheels_enable#': {
    en: 'the stepper wheels controller',
  },
  '#blk-stepper_wheels_enable_tooltip#': {
    en: 'The stepper controller is enabled by default. Disable it to let the wheels turn freely.',
  },
  '#blk-stepper_wheels_reset#': {
    en: 'reset the stepper wheels controller',
  },
  '#blk-stepper_wheels_reset_tooltip#': {
    en: 'Resetting the controller will stop all motors and set all positions to zero.',
  },
  '#blk-stepper_wheels_drive_tank#': {
    en: 'move tank with left speed',
  },
  '#blk-and_right_speed#': {
    en: 'and right speed',
  },
  '#blk-stepper_wheels_drive_tank_tooltip#': {
    en: 'Wheels will move continuously until given another command. Speed in in steps per second.',
  },
  '#blk-stepper_wheels_drive_tank_steps#': {
    en: 'move tank with left speed',
  },
  '#blk-steps#': {
    en: 'steps',
  },
  '#blk-stepper_wheels_drive_tank_steps_tooltip#': {
    en: 'Speed in in steps per second. If set to \\"wait for completion\\", the program will wait for the movement to complete before running the next block.',
  },
  '#blk-stepper_wheels_drive_steering#': {
    en: 'move steering with direction',
  },
  '#blk-stepper_wheels_drive_steering_tooltip#': {
    en: 'Direction ranges from -100 (left) to 0 (straight) to 100 (right).',
  },
  '#blk-stepper_wheels_drive_steering_steps#': {
    en: 'move steering with direction',
  },
  '#blk-stepper_wheels_drive_steering_steps_tooltip#': {
    en: 'Direction ranges from -100 (left) to 0 (straight) to 100 (right). If set to \\"wait for completion\\", the program will wait for the movement to complete before running the next block.',
  },
  '#blk-stepper_wheels_drive_stop#': {
    en: 'stop moving',
  },
  '#blk-stepper_wheels_drive_stop_tooltip#': {
    en: 'Immediately stop all wheels for the movement drive.',
  },
  '#blk-stepper_wheels_drive_reset_steps#': {
    en: 'reset position of motors in movement drive',
  },
  '#blk-stepper_wheels_drive_reset_steps_tooltip#': {
    en: 'Reset the the steps count to zero.',
  },
  '#blk-stepper_wheels_drive_get_steps#': {
    en: 'position of motors in movement drive for',
  },
  '#blk-stepper_wheels_drive_get_steps_tooltip#': {
    en: 'Get the steps count for the specified motor.',
  },
  '#blk-stepper_wheels_drive_set_acceleration#': {
    en: 'set drive acceleration to',
  },
  '#blk-steps_per_second_per_second#': {
    en: 'steps per second per second',
  },
  '#blk-stepper_wheels_drive_set_acceleration_tooltip#': {
    en: 'Affects acceleration and decceleration when running for steps. Commands which only specifies speed always changes speed immediately without acceleration.',
  },
  '#blk-stepper_wheels_motor_run#': {
    en: 'run motor on port',
  },
  '#blk-at#': {
    en: 'at',
  },
  '#blk-steps_per_second#': {
    en: 'steps per second',
  },
  '#blk-stepper_wheels_motor_run_tooltip#': {
    en: 'Motor will move continuously until given another command.',
  },
  '#blk-stepper_wheels_motor_run_steps#': {
    en: 'run motor on port',
  },
  '#blk-stepper_wheels_motor_run_steps_tooltip#': {
    en: 'If set to \\"wait for completion\\", the program will wait for the movement to complete before running the next block.',
  },
  '#blk-stepper_wheels_motor_stop#': {
    en: 'stop motor on port',
  },
  '#blk-stepper_wheels_motor_stop_tooltip#': {
    en: 'Immediately stop the motor',
  },
  '#blk-stepper_wheels_motor_reset_steps#': {
    en: 'reset position of motor on port',
  },
  '#blk-stepper_wheels_motor_reset_steps_tooltip#': {
    en: 'Reset the the steps count to zero.',
  },
  '#blk-stepper_wheels_motor_get_steps#': {
    en: 'position of motor on port',
  },
  '#blk-stepper_wheels_motor_get_steps_tooltip#': {
    en: 'Get the steps count for the specified motor.',
  },
  '#blk-stepper_wheels_motor_set_acceleration#': {
    en: 'set acceleration for motor on port',
  },
  '#blk-stepper_wheels_motor_set_acceleration_tooltip#': {
    en: 'Affects acceleration and decceleration when running for steps. Commands which only specifies speed always changes speed immediately without acceleration.'
  },
  '#blk-stepper_wheels_init_delta#': {
    en: 'init delta drive of type',
  },
  '#blk-with_motors#': {
    en: 'with motors',
  },
  '#blk-and_max_speed#': {
    en: 'and max speed',
  },
  '#blk-stepper_wheels_init_delta_tooltip#': {
    en: 'V type: center wheel is at the back. A type: center wheel is at the front.',
  },
  '#blk-stepper_wheels_delta_move_turn#': {
    en: 'delta drive: move in direction',
  },
  '#blk-and_rotation#': {
    en: 'and rotation',
  },
  '#blk-stepper_wheels_delta_move_turn_tooltip#': {
    en: 'Will move continuously until given another command. Direction is in degrees.',
  },
  '#blk-stepper_wheels_delta_move_steps#': {
    en: 'delta drive: move in direction',
  },
  '#blk-stepper_wheels_delta_move_steps_tooltip#': {
    en: 'If set to \\"wait for completion\\", the program will wait for the movement to complete before running the next block.',
  },
  '#blk-stepper_wheels_delta_turn_steps#': {
    en: 'delta drive: turn at speed',
  },
  '#blk-stepper_wheels_delta_turn_steps_tooltip#': {
    en: 'If set to \\"wait for completion\\", the program will wait for the movement to complete before running the next block.',
  },
  '#blk-stepper_wheels_delta_stop#': {
    en: 'delta drive: stop',
  },
  '#blk-stepper_wheels_delta_stop_tooltip#': {
    en: 'Immediately stop all wheels.',
  },
  '#blk-stepper_wheels_delta_set_acceleration#': {
    en: 'delta drive: set acceleration to',
  },
  '#blk-stepper_wheels_delta_set_acceleration_tooltip#': {
    en: 'Affects acceleration and decceleration when running for steps. Commands which only specifies speed always changes speed immediately without acceleration.',
  },
  '#blk-stepper_wheels_init_mecanum#': {
    en: 'init mecanum drive',
  },
  '#blk-stepper_wheels_init_mecanum_tooltip#': {
    en: 'Motors should be \\"Front Left\\", \\"Front Right\\", \\"Rear Left\\", \\"Rear Right\\"',
  },
  '#blk-stepper_wheels_mecanum_move_turn#': {
    en: 'mecanum drive: move in direction',
  },
  '#blk-stepper_wheels_mecanum_move_turn_tooltip#': {
    en: 'Will move continuously until given another command. Direction is in degrees.',
  },
  '#blk-stepper_wheels_mecanum_move_steps#': {
    en: 'mecanum drive: move in direction',
  },
  '#blk-stepper_wheels_mecanum_move_steps_tooltip#': {
    en: 'If set to \\"wait for completion\\", the program will wait for the movement to complete before running the next block.',
  },
  '#blk-stepper_wheels_mecanum_turn_steps#': {
    en: 'mecanum drive: turn at speed',
  },
  '#blk-stepper_wheels_mecanum_turn_steps_tooltip#': {
    en: 'If set to \\"wait for completion\\", the program will wait for the movement to complete before running the next block.',
  },
  '#blk-stepper_wheels_mecanum_stop#': {
    en: 'mecanum drive: stop',
  },
  '#blk-stepper_wheels_mecanum_stop_tooltip#': {
    en: 'Immediately stop all wheels.',
  },
  '#blk-stepper_wheels_mecanum_set_acceleration#': {
    en: 'mecanum drive: set acceleration to',
  },
  '#blk-stepper_wheels_mecanum_set_acceleration_tooltip#': {
    en: 'Affects acceleration and decceleration when running for steps. Commands which only specifies speed always changes speed immediately without acceleration.',
  },
  '#blk-camera_init#': {
    en: 'init camera with format',
  },
  '#blk-and_framesize#': {
    en: 'and framesize',
  },
  '#blk-and_clock#': {
    en: 'and clock',
  },
  '#blk-camera_init_tooltip#': {
    en: 'Large framesize may crash the ESP32, especially when not using JPEG. To reinitialize the camera, you must \\"deinit\\" first.',
  },
  '#blk-camera_deinit#': {
    en: 'deinit camera',
  },
  '#blk-camera_deinit_tooltip#': {
    en: 'You must deinitialize the camera before you can initialize it again.',
  },
  '#blk-camera_capture#': {
    en: 'camera get image',
  },
  '#blk-camera_capture_tooltip#': {
    en: 'Returns the last captured image (...which may be a long time ago) as a bytes object. To get the latest image, perform two captures consecutively and use the second image.',
  },
  '#blk-camera_set_whitebalance#': {
    en: 'camera set whitebalance',
  },
  '#blk-camera_set_whitebalance_tooltip#': {
    en: 'Sets the whitebalance.',
  },
  '#blk-camera_set_saturation#': {
    en: 'camera set saturation',
  },
  '#blk-camera_set_saturation_tooltip#': {
    en: 'Sets the saturation',
  },
  '#blk-camera_set_brightness#': {
    en: 'camera set brightness',
  },
  '#blk-camera_set_brightness_tooltip#': {
    en: 'Sets the brightness',
  },
  '#blk-camera_set_contrast#': {
    en: 'camera set contrast',
  },
  '#blk-camera_set_contrast_tooltip#': {
    en: 'Sets the contrast',
  },
  '#blk-camera_set_quality#': {
    en: 'camera set quality',
  },
  '#blk-camera_set_quality_tooltip#': {
    en: 'Sets the quality of the JPEG image. Ranges from 10 (highest quality) to 63 (lowest quality).',
  },
  '#blk-mv_find_blobs_yuv#': {
    en: 'find blobs from YUV422 image',
  },
  '#blk-mv_find_blobs_yuv_tooltip#': {
    en: 'The detection will act on only a quarter of the pixels, skipping all odd columns and rows. Return value is a list of matches sorted by pixel_count (largest first). Each match is a list containing: pixel_count, center_x, center_y, x, y, width, height.',
  },
  '#blk-of_width#': {
    en: 'of width',
  },
  '#blk-and_height#': {
    en: 'and height',
  },
  '#blk-with_min_max_Y#': {
    en: 'with min/max Y:',
  },
  '#blk-U#': {
    en: 'U:',
  },
  '#blk-V#': {
    en: 'V:',
  },
  '#blk-and_at_least#': {
    en: 'and at least',
  },
  '#blk-pixels#': {
    en: 'pixels',
  },
  '#blk-mv_find_blobs_grayscale#': {
    en: 'find blobs from Grayscale image',
  },
  '#blk-mv_find_blobs_grayscale_tooltip#': {
    en: 'The detection will act on all of the pixels. Return value is a list of matches sorted by pixel_count (largest first). Each match is a list containing: pixel_count, center_x, center_y, x, y, width, height.',
  },
  '#blk-with_min_max_intensity#': {
    en: 'with min/max intensity:',
  },
  '#blk-mv_yuv_to_grayscale#': {
    en: 'convert YUV422 image to Grayscale',
  },
  '#blk-mv_yuv_to_grayscale_tooltip#': {
    en: 'Takes a bytes object containing YUV422 data and return a bytes object containing grayscale data.',
  },
  '#blk-mv_gaussian_blur_3x3_gray#': {
    en: 'perform a 3x3 gaussian blur on Grayscale image',
  },
  '#blk-mv_gaussian_blur_3x3_gray_tooltip#': {
    en: 'Takes a bytes object containing grayscale data and return a bytes object containing blurred grayscale data.',
  },
  '#blk-mv_gaussian_blur_3x3_yuv#': {
    en: 'perform a 3x3 gaussian blur on YUV422 image',
  },
  '#blk-mv_gaussian_blur_3x3_yuv_tooltip#': {
    en: 'Takes a bytes object containing YUV422 data and return a bytes object containing blurred YUV422 data.',
  },
  '#blk-mv_sobel#': {
    en: 'perform a sobel filter on Grayscale image',
  },
  '#blk-mv_sobel_tooltip#': {
    en: 'Takes a bytes object containing grayscale data and return a list containing derivatives (...rate of intensity change).',
  },
  '#blk-mv_edge_detect#': {
    en: 'perform edge detection on Grayscale image',
  },
  '#blk-with_min_max_threshold#': {
    en: 'with min/max threshold',
  },
  '#blk-mv_edge_detect_tooltip#': {
    en: 'Takes a bytes object containing grayscale data and return a bytes object with edges marked as 255 and non-edges as 0. Pixels above max will always be marked as edge, those below min will always be marked as non-edge, those in-between will be marked as edge if they are next to an edge.',
  },
  '#blk-mv_find_circle_single#': {
    en: 'find circles from edge detection image',
  },
  '#blk-with_circle_radius#': {
    en: 'with circle radius',
  },
  '#blk-mv_find_circle_single_tooltip#': {
    en: 'The input should be a bytes object returned by an edge detect block. Return value is a list of matches sorted by pixel_count (largest first). Each match is a list containing: pixel_count, x, y.',
  },
  '#blk-mv_scale_grayscale#': {
    en: 'scale down Grayscale image',
  },
  '#blk-by_factor#': {
    en: 'by factor',
  },
  '#blk-mv_scale_grayscale_tooltip#': {
    en: 'Takes a bytes object containing grayscale data and return a bytes object containing scaled down grayscale data. The scale factor must be an integer.',
  },
  '#blk-mv_crop_grayscale#': {
    en: 'crop Grayscale image',
  },
  '#blk-from_left_top#': {
    en: 'from left/top',
  },
  '#blk-and_width_height#': {
    en: 'and width/height',
  },
  '#blk-mv_crop_grayscale_tooltip#': {
    en: 'Takes a bytes object containing grayscale data and return a bytes object containing cropped grayscale data. This can only operate on grayscale images.',
  },
  '#blk-mv_crop_row_grayscale#': {
    en: 'crop by row Grayscale image',
  },
  '#blk-from_top#': {
    en: 'from top',
  },
  '#blk-and_height#': {
    en: 'and height',
  },
  '#blk-mv_crop_row_grayscale_tooltip#': {
    en: 'Can only crop by row (ie. the output image will have the same width as the input image), but is much faster and more memory efficient than the normal crop.',
  },
  '#blk-mv_crop_row_yuv#': {
    en: 'crop by row YUV422 image',
  },
  '#blk-mv_crop_row_yuv_tooltip#': {
    en: 'Can only crop by row (ie. the output image will have the same width as the input image), but is much faster and more memory efficient than the normal crop. This one works on YUV422 images.',
  },
  '#blk-wheeled_drives_steering#': {
    en: 'motor speed for steering',
  },
  '#blk-wheeled_drives_steering_tooltip#': {
    en: 'Steering value should range from -100 to 100. Returns a list containing speed for left and right motors.',
  },
  '#blk-wheeled_drives_joystick#': {
    en: 'motor speed for joystick x',
  },
  '#blk-wheeled_drives_joystick_tooltip#': {
    en: 'x and y values should range from negative to positive. Magnitude is used as the speed. Returns a list containing speed for left and right motors.',
  },
  '#blk-wheeled_drives_delta#': {
    en: 'motor speed for delta drive of type',
  },
  '#blk-wheeled_drives_delta_tooltip#': {
    en: 'Direction should be in degrees. Rotation is in motor speed. Returns a list containing speed for three motors.',
  },
  '#blk-direction#': {
    en: 'direction',
  },
  '#blk-speed#': {
    en: 'speed',
  },
  '#blk-rotation#': {
    en: 'rotation',
  },
  '#blk-wheeled_drives_mecanum#': {
    en: 'motor speed for mecanum drive with direction',
  },
  '#blk-wheeled_drives_mecanum_tooltip#': {
    en: 'Direction should be in degrees. Rotation is in motor speed. Returns a list containing speed for four motors.',
  },
  '#blk-ili9341_init#': {
    en: 'init ILI9341 on',
  },
  '#blk-ili9341_init_tooltip#': {
    en: 'You must have a \\"init SPI\\" block before this. It should be set to a high baudrate (eg. 80000000).',
  },
  '#blk-cs#': {
    en: 'cs',
  },
  '#blk-dc#': {
    en: 'dc',
  },
  '#blk-rst#': {
    en: 'rst',
  },
  '#blk-width#': {
    en: 'width',
  },
  '#blk-mirror#': {
    en: 'mirror',
  },
  '#blk-bgr#': {
    en: 'bgr',
  },
  '#blk-ili9341_clear#': {
    en: 'ILI9341 clear screen with color',
  },
  '#blk-ili9341_clear_tooltip#': {
    en: 'Fills the entire screen with the specified color.',
  },
  '#blk-ili9341_color#': {
    en: 'ILI9341 color',
  },
  '#blk-ili9341_color_tooltip#': {
    en: 'This color block is not compatible with the color blocks from other extensions (eg. Neopixel).',
  },
  '#blk-ili9341_rgb#': {
    en: 'ILI9341 RGB',
  },
  '#blk-ili9341_rgb_tooltip#': {
    en: 'This color block is not compatible with the color blocks from other extensions (eg. Neopixel).',
  },
  '#blk-ili9341_hsv#': {
    en: 'ILI9341 HSV',
  },
  '#blk-ili9341_hsv_tooltip#': {
    en: 'H ranges from 0 to 360. S and V from 0 to 1. This color block is not compatible with the color blocks from other extensions (eg. Neopixel).',
  },
  '#blk-ili9341_text8x8#': {
    en: 'ILI9341 draw 8x8 text',
  },
  '#blk-ili9341_text8x8_tooltip#': {
    en: 'Draws text using the built-in 8x8 font.',
  },
  '#blk-background#': {
    en: 'background',
  },
  '#blk-ili9341_text_with_font#': {
    en: 'ILI9341 draw text',
  },
  '#blk-ili9341_text_with_font_tooltip#': {
    en: 'Draws text using the provided font object. You should use the xglcd extension to load a font file.',
  },
  '#blk-font#': {
    en: 'font',
  },
  '#blk-ili9341_ellipse#': {
    en: 'ILI9341 draw ellipse at x,y',
  },
  '#blk-ili9341_ellipse_tooltip#': {
    en: 'Draws an ellipse. If you need a circle, set both the x and y radius to the same value.',
  },
  '#blk-fill#': {
    en: 'fill',
  },
  '#blk-ili9341_line#': {
    en: 'ILI9341 draw line from x,y',
  },
  '#blk-ili9341_line_tooltip#': {
    en: 'Draws a line from x1,y1 to x2,y2.',
  },
  '#blk-x2y2#': {
    en: 'x2,y2',
  },
  '#blk-ili9341_pixel#': {
    en: 'ILI9341 draw pixel at x,y',
  },
  '#blk-ili9341_pixel_tooltip#': {
    en: 'Draws a single pixel at the specified location.',
  },
  '#blk-ili9341_rectangle#': {
    en: 'ILI9341 draw rectangle at x,y',
  },
  '#blk-ili9341_rectangle_tooltip#': {
    en: 'Draws a rectangle at the specified location.',
  },
  '#blk-ili9341_image_from_file#': {
    en: 'ILI9341 draw image from file',
  },
  '#blk-ili9341_image_from_file_tooltip#': {
    en: 'Load a raw RGB565 image from the specified file and draw it on screen.',
  },
  '#blk-ili9341_image_from_buf#': {
    en: 'ILI9341 draw image from buf',
  },
  '#blk-ili9341_image_from_buf_tooltip#': {
    en: 'The supplied buf must contain raw RGB565 data (eg. read from a file in binary mode).',
  },
  '#blk-xglcd_font_load#': {
    en: 'load xglcd font from file',
  },
  '#blk-xglcd_font_load_tooltip#': {
    en: 'Load a font in the X-GLCD format, and return a font object. Width and Height must match font file (ie. you cannot scale it).',
  },
  '#blk-xpt2046_init#': {
    en: 'init XPT2046 on',
  },
  '#blk-xpt2046_init_tooltip#': {
    en: 'You must have a \\"init SPI\\" block before this.',
  },
  '#blk-int#': {
    en: 'int',
  },
  '#blk-min_max_x#': {
    en: 'min/max x',
  },
  '#blk-min_max_y#': {
    en: 'min/max y',
  },
  '#blk-xpt2046_get_pos#': {
    en: 'xpt2046 get position',
  },
  '#blk-xpt2046_get_pos_tooltip#': {
    en: 'Returns the x and y position of the detected touch as a list, or None if no touch is detected.',
  },
  '#blk-xpt2046_in_rect#': {
    en: 'touch position',
  },
  '#blk-xpt2046_in_rect_tooltip#': {
    en: 'Touch position should be a list containing the x and y values.',
  },
  '#blk-is_in_rectangle#': {
    en: 'is in rectangle',
  },
  '#blk-xy#': {
    en: 'x/y',
  },
  '#blk-wh#': {
    en: 'w/h',
  },
  '#blk-xpt2046_in_circle#': {
    en: 'touch position',
  },
  '#blk-xpt2046_in_circle_tooltip#': {
    en: 'Touch position should be a list containing the x and y values.',
  },
  '#blk-is_in_circle#': {
    en: 'is in circle',
  },
  '#blk-r#': {
    en: 'r',
  },
  '#blk-st7789_init#': {
    en: 'init ST7789 on',
  },
  '#blk-st7789_init_tooltip#': {
    en: 'You must have a \\"init SPI\\" block before this. It should be set to a high baudrate (eg. 20000000).',
  },
  '#blk-size#': {
    en: 'size',
  },
  '#blk-st7789_fill#': {
    en: 'ST7789 fill screen with color',
  },
  '#blk-st7789_fill_tooltip#': {
    en: 'Fills the entire screen with the specified color.',
  },
  '#blk-st7789_color#': {
    en: 'ST7789 color',
  },
  '#blk-st7789_color_tooltip#': {
    en: 'This color block is not compatible with the color blocks from other extensions (eg. Neopixel).',
  },
  '#blk-st7789_rgb#': {
    en: 'ST7789 RGB',
  },
  '#blk-st7789_rgb_tooltip#': {
    en: 'This color block is not compatible with the color blocks from other extensions (eg. Neopixel).',
  },
  '#blk-st7789_hsv#': {
    en: 'ST7789 HSV',
  },
  '#blk-st7789_hsv_tooltip#': {
    en: 'H ranges from 0 to 360. S and V from 0 to 1. This color block is not compatible with the color blocks from other extensions (eg. Neopixel).',
  },
  '#blk-st7789_text8x8#': {
    en: 'ST7789 draw 8x8 text',
  },
  '#blk-st7789_text8x8_tooltip#': {
    en: 'Draws text using the built-in 8x8 font.',
  },
  '#blk-st7789_text_with_font#': {
    en: 'ST7789 draw text',
  },
  '#blk-st7789_text_with_font_tooltip#': {
    en: 'Draws text using the provided font object. You should use the xglcd extension to load a font file.',
  },
  '#blk-st7789_ellipse#': {
    en: 'ST7789 draw ellipse at x,y',
  },
  '#blk-st7789_ellipse_tooltip#': {
    en: 'Draws an ellipse. If you need a circle, set both the x and y radius to the same value.',
  },
  '#blk-st7789_line#': {
    en: 'ST7789 draw line from x,y',
  },
  '#blk-st7789_line_tooltip#': {
    en: 'Draws a line from x1,y1 to x2,y2.',
  },
  '#blk-st7789_pixel#': {
    en: 'ST7789 draw pixel at x,y',
  },
  '#blk-st7789_pixel_tooltip#': {
    en: 'Draws a single pixel at the specified location.',
  },
  '#blk-st7789_rectangle#': {
    en: 'ST7789 draw rectangle at x,y',
  },
  '#blk-st7789_rectangle_tooltip#': {
    en: 'Draws a rectangle at the specified location.',
  },
  '#blk-st7789_image_from_file#': {
    en: 'ST7789 draw image from file',
  },
  '#blk-st7789_image_from_file_tooltip#': {
    en: 'Load a raw RGB565 image from the specified file and draw it on screen.',
  },
  '#blk-st7789_image_from_buf#': {
    en: 'ST7789 draw image from buf',
  },
  '#blk-st7789_image_from_buf_tooltip#': {
    en: 'The supplied buf must contain raw RGB565 data (eg. read from a file in binary mode).',
  },
  '#blk-lds02rr_init#': {
    en: 'init LDS02RR on',
  },
  '#blk-lds02rr_init_tooltip#': {
    en: 'You must have an \\"init UART\\" block with the appropriate pins and baudrate (115200) set correctly before this.',
  },
  '#blk-lds02rr_update#': {
    en: 'lds02rr: update',
  },
  '#blk-lds02rr_update_tooltip#': {
    en: 'Run this frequently to read data from the sensor. The readings will not change if you do not run this.',
  },
  '#blk-lds02rr_rpm#': {
    en: 'lds02rr: get rpm',
  },
  '#blk-lds02rr_rpm_tooltip#': {
    en: 'Get the LIDAR RPM. Will return 0 if RPM data isn\'t available yet.',
  },
  '#blk-lds02rr_distances#': {
    en: 'lds02rr: get distances',
  },
  '#blk-lds02rr_distances_tooltip#': {
    en: 'Returns a list with 360 items, each representing the range in mm.',
  },
  '#blk-amg8833_init#': {
    en: 'init AMG8833 on',
  },
  '#blk-amg8833_init_tooltip#': {
    en: 'You must have an \\"init I2C\\" block before this',
  },
  '#blk-amg8833_set_ma_mode#': {
    en: 'amg8833: set moving average mode to',
  },
  '#blk-amg8833_set_ma_mode_tooltip#': {
    en: 'In moving average mode, the readings will be less noisy, but respond slower to changes.',
  },
  '#blk-amg8833_read#': {
    en: 'amg8833: read',
  },
  '#blk-amg8833_read_tooltip#': {
    en: 'Takes one set of readings from the sensor. You must run this before getting temperature.',
  },
  '#blk-amg8833_get_buf#': {
    en: 'amg8833: get buffer',
  },
  '#blk-amg8833_get_buf_tooltip#': {
    en: 'Retrieve the temperature data as a bytes array. You must perform a \\"read\\" before this.',
  },
  '#blk-amg8833_get_temperature#': {
    en: 'amg8833: get temperature at x',
  },
  '#blk-amg8833_get_temperature_tooltip#': {
    en: 'Retrieve the temperature (Celsius) at the specified position in the array. You must perform a \\"read\\" before this.',
  },
  '#blk-amg8833_get_thermistor_temperature#': {
    en: 'amg8833: get thermistor temperature',
  },
  '#blk-amg8833_get_thermistor_temperature_tooltip#': {
    en: 'Retrieve the temperature (Celsius) of the sensor chip.',
  },
  '#blk-vs1003_init#': {
    en: 'init VS1003 on',
  },
  '#blk-xcs#': {
    en: 'xcs',
  },
  '#blk-xdcs#': {
    en: 'xdcs',
  },
  '#blk-dreq#': {
    en: 'dreq',
  },
  '#blk-xrst#': {
    en: 'xrst',
  },
  '#blk-vs1003_init_tooltip#': {
    en: 'You must have an \\"init SPI\\" block before this. The dreq pin is used in input mode, while the rest must be output capable.',
  },
  '#blk-vs1003_set_stream_mode#': {
    en: 'vs1003: set stream mode to',
  },
  '#blk-vs1003_set_stream_mode_tooltip#': {
    en: 'If set to true, the VS1003 will automatically adjust playback speed to match the incoming data rate.',
  },
  '#blk-vs1003_set_volume#': {
    en: 'vs1003: set volume to',
  },
  '#blk-vs1003_set_volume_tooltip#': {
    en: 'Sets the volume. Max of 10.',
  },
  '#blk-vs1003_dreq_ready#': {
    en: 'vs1003: dreq ready',
  },
  '#blk-vs1003_dreq_ready_tooltip#': {
    en: 'If True, you can safely send up to 32 bytes of data to the VS1003.',
  },
  '#blk-vs1003_play_bytes#': {
    en: 'vs1003: play bytes',
  },
  '#blk-vs1003_play_bytes_tooltip#': {
    en: 'Play the specified bytes. If dreq ready is False or if sending more than 32 bytes, this function may take a while to complete.',
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