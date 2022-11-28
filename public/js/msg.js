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
    en: 'Range from 0 to 65535',
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
  '#blk-to_red#': {
    en: 'to red',
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
  '#main-connect#': {
    en: 'Connect',
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
  '#main-disconnect#': {
    en: 'Disconnect',
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