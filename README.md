# IoTy

Internet-of-Things made easy

Try it out at https://quirkycort.github.io/IoTy/public/editor.html

## Requirements

* ESP32 [1]
* Webbrowser that support Web Bluetooth (ie. Chrome) [2]

[1] IoTy was developed using the ESP32-WROOM-32 chip, on a ESP32 DEV KIT DOIT board.
It should work with any ESP32, and even non-ESP32 board, provided that...

* It has built-in Bluetooth Low Energy (BLE).
* It has a boot button wired to GPIO 0 (...either built-in or external)
* An LED connected to GPIO 2 helps with detecting the boot-up sequence, but is not essential

[2] Chrome and other Chrome based browsers (eg. Edge, Opera) should work on all platforms (eg. Windows, Mac, Linux, Android), **except iOS**.
This is because Apple forces all webbrowsers on iOS to be based on the Safari engine, and **Safari do not support Web Bluetooth**.
On linux, you'll need to enable web-bluetooth using chrome://flags/#enable-web-bluetooth

## Setup

You'll need to setup your ESP32 with the IoTy firmware before using it with IoTy for the first time.
This only need to be done once.

### 1) Install MicroPython

Follow the instructions to here : https://docs.micropython.org/en/latest/esp32/tutorial/intro.html

### 2) Select a name

Edit the file "_ioty_name" in the "public/firmware" folder to set the bluetooth name for your device.
**Keep within 8 characters**.

### 3) Install pyboard

Download the pyboard.py command line utility by following the instructions here https://docs.micropython.org/en/latest/reference/pyboard.py.html

This is needed to transfer the IoTy firmware to the ESP32.

### 4) Reformat Filesystem (Optional)

It is recommended to reformat the device filesystem to Littlefs.
Littlefs is a filesystem designed for flash-based devices, and is much more resistant to filesystem corruption.

Follow the instructions here https://docs.micropython.org/en/latest/reference/filesystem.html#littlefs

### 5) Make a directory

Create the "ioty" directory on the ESP32 using the following command...

```
pyboard.py --device /dev/ttyUSB0 -f mkdir ioty
```

The "/dev/ttyUSB0" will need to be changed to whatever makes sense for your computer.

### 6) Transfer IoTy files

Transfer the IoTy files to the ESP32 using the following command.
Make sure you are in the "public/firmware" directory first.

```
pyboard.py --device /dev/ttyUSB0 -f cp boot.py _ioty_name :
pyboard.py --device /dev/ttyUSB0 -f cp ioty/* :ioty/
```

### 7) Restart the device and put it into program mode

Restart your ESP32 (...press the reset button or power-cycle it); the built-in LED should flash 3 times.
Before the 3 flashes complete, press and hold the boot button until the 3 flashes complete and the LED should stay on.

Your device is now ready to be connected and programmed via the IoTy site at https://quirkycort.github.io/IoTy/public/editor.html

## Programming the ESP32

### 1) Write your program

Write your program using either blocks or Python.

### 2) Connect device

Open the kebab menu (...3 vertical dots next to the word "Disconnect") and select "Connect".
Select your device and click "Pair".

### 3) Download program

After connection, open the kebab menu and select "Download to device".
Restart your device after download completes.

## Monitoring the program (Optional)

When your program is running, you can connect to your device to view the output of print statements and error messages in the "Monitor" tab.

To prevent missing any messages that were transmitted before connection is completed, you can set the "When Started" block to "wait for connection".
If you're using Python, add...

```
ioty.monitor.wait_for_connection()
```

...to the top of your code.
This will cause program execution to pause until you have connected to your device.