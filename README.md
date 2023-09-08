# IoTy

Internet-of-Things made easy

Try it out at https://quirkycort.github.io/IoTy/public/editor.html

## Requirements

* ESP32 [1]
* Any webbrowser [2]

[1] IoTy was developed using the ESP32-WROOM-32 chip, on a ESP32 DEV KIT DOIT board.
It should work with any ESP32, and even non-ESP32 board, provided that...

* It has a boot button wired to GPIO 0 (...either built-in or external)
* An LED connected to GPIO 2 helps with detecting the boot-up sequence, but is not essential

[2] Bluetooth and Serial programming mode only works with Chrome (...but not on iOS), while Access Point and Internet programming mode works on all devices.

## Setup

You'll need to setup your ESP32 with the IoTy firmware before using it with IoTy for the first time.
This only need to be done once.

The recommended way to setup the ESP32 is to use this page: https://quirkycort.github.io/IoTy-Flash/public/index.html

For an alternative way (not recommended) of setting up your ESP32, view this page: https://github.com/QuirkyCort/IoTy/wiki/Non%E2%80%90browser-based-setup

## Connecting to the IoTy device

You can connect to and program your IoTy device using 4 different modes.
View their respective pages for details on how to connect.

* [Serial Mode](https://github.com/QuirkyCort/IoTy/wiki/Connecting-via-Serial-mode) Best mode if your computer supports it.
* [Bluetooth Mode](https://github.com/QuirkyCort/IoTy/wiki/Connecting-via-Bluetooth-mode) Slower and buggy on old computers. Best choice if using an Android phone/tablet.
* [Access Point Mode](https://github.com/QuirkyCort/IoTy/wiki/Connecting-via-Access-Point-mode) Works with everything, but a lot of hassle to connect.
* [Internet Mode](https://github.com/QuirkyCort/IoTy/wiki/Connecting-via-Internet-Mode) Need to configure IoTy device using another mode first, but otherwise fast and works with everything.

## Programming the ESP32

### 1) Write your program

Open https://quirkycort.github.io/IoTy/public/editor.html and write your program using either blocks or Python.

### 2) Connect device

Connect your device using Serial, Bluetooth, Access Point, or Internet mode.

### 3) Download program

After connection, open the kebab menu and select "Download to device".
Restart your device after download completes.

## Monitoring the program (Optional) (Serial, Bluetooth, and Internet Mode only)

When your program is running, you can connect to your device to view the output of print statements and error messages in the "Monitor" tab.

To prevent missing any messages that were transmitted before connection is completed, you can set the "When Started" block to "wait for Bluetooth connection" (Bluetooth Mode) or "wait for Internet connection" (Internet Mode).
This is not necessary for Serial mode.
If you're using Python, add...

### Bluetooth Mode
```
import ioty.monitor
ioty.monitor.wait_for_connection()
```

### Internet Mode
```
import ioty.monitor_mqtt
```

...to the top of your code.
This will cause program execution to pause until you have connected to your device.
