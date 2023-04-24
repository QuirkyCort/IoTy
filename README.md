# IoTy

Internet-of-Things made easy

Try it out at https://quirkycort.github.io/IoTy/public/editor.html

## Requirements

* ESP32 [1]
* Any webbrowser [2]

[1] IoTy was developed using the ESP32-WROOM-32 chip, on a ESP32 DEV KIT DOIT board.
It should work with any ESP32, and even non-ESP32 board, provided that...

* It has built-in Bluetooth Low Energy (BLE).
* It has a boot button wired to GPIO 0 (...either built-in or external)
* An LED connected to GPIO 2 helps with detecting the boot-up sequence, but is not essential

[2] Bluetooth programming mode only works with Chrome and other Chrome based browsers (eg. Edge, Opera), on all platforms (eg. Windows, Mac, Linux, Android), **except iOS**.
This is because Apple forces all webbrowsers on iOS to be based on the Safari engine, and **Safari do not support Web Bluetooth**.
On linux, you'll need to enable web-bluetooth using chrome://flags/#enable-web-bluetooth

## Setup

You'll need to setup your ESP32 with the IoTy firmware before using it with IoTy for the first time.
This only need to be done once.

If you are an educator, you may want to pre-setup your ESP32 for your students so that they can then program it through their webbrowser without having to install anything.

### 1) Install MicroPython

Follow the instructions to here : https://docs.micropython.org/en/latest/esp32/tutorial/intro.html

### 2) Select a name

Edit the file "_ioty_name" in the "public/firmware" folder to set the name for your device.
**Keep within 8 characters**.

### 3) Install pyboard

Download the pyboard.py command line utility by following the instructions here https://docs.micropython.org/en/latest/reference/pyboard.py.html

This is needed to transfer the IoTy firmware to the ESP32.

### 4) Reformat Filesystem (Optional)

It is recommended to reformat the device filesystem to Littlefs.
Littlefs is a filesystem designed for flash-based devices, and is much more resistant to filesystem corruption.

Follow the instructions here https://docs.micropython.org/en/latest/reference/filesystem.html#littlefs

### 5) Make directories

Create the necessary directories on the ESP32 using the following command...

```
pyboard.py --device /dev/ttyUSB0 -f mkdir ioty
pyboard.py --device /dev/ttyUSB0 -f mkdir umqtt
```

The "/dev/ttyUSB0" will need to be changed to whatever makes sense for your computer.

### 6) Transfer IoTy files

Transfer the IoTy files to the ESP32 using the following command.
Make sure you are in the "public/firmware" directory first.

```
pyboard.py --device /dev/ttyUSB0 -f cp ioty/* :ioty/
pyboard.py --device /dev/ttyUSB0 -f cp umqtt/* :umqtt/
pyboard.py --device /dev/ttyUSB0 -f cp boot.py _ioty_name :
```

### 7) Restart the device

Restart your ESP32 (...press the reset button or power-cycle it).

There are 3 different ways to put your device into program mode and connect to it.
See the next section for details.

## Connecting to the IoTy device

You can connect to and program your IoTy device using 3 different modes.

### Bluetooth Mode

In this mode, your browser will connect directly to the IoTy device using Web Bluetooth.

Pro
* No need to configure WiFi.
* No need for internet access.

Con
* Only works with Chrome and Chrome based browsers.
* Does not work on iOS (even with Chrome).
* Computer must support Bluetooth Low Energy.
* Tends to have compatibility issues with older computers.
* Program transfer can be slower than other modes.

**Bluetooth Mode (Steps)**

1. Restart your ESP32 (...press the reset button); the built-in LED should flash 3 times.
2. Before the 3 flashes complete, press and hold the boot button until the 3 flashes complete and the LED should stay on.
3. Open https://quirkycort.github.io/IoTy/public/editor.html
4. Open the kebab menu (...3 vertical dots next to the word "Disconnect") and switch "Connection Mode" to Bluetooth.
5. From the kebab menu, select "Connect (Bluetooth)".
6. Select your device and click "Pair".

### Access Point Mode

This mode is only used for configuring the network connection for your device to enable Internet mode.
After configuration, you will need to use Internet mode to program your device.

Pro
* Works with any browser.

Con
* Can't be used to program device, only for configuring network connection.

**Access Point Mode (Steps)**

1. Restart your ESP32 (...press the reset button); the built-in LED should flash 3 times.
2. Before the 3 flashes complete, press and hold the boot button until the LED flashes rapidly.
4. On your computer, search for an open WiFi access point with the name of your device and connect to it. You will lose internet access at this point.
5. If your computer has a mobile network connection, you will need to disable it.
6. From the menu, click "App -> Access Point Page".
7. Fill in the network configuration info and submit.
8. Restart your device, and use Internet mode to program your device.

### Internet Mode

In this mode, your IoTy device will connect to an MQTT broker.
The IoTy webpage will connect to the same MQTT broker and download programs to your device through it.

Pro
* Works with any browser.
* Fast program transfer.

Con
* IoTy device must first be configured to connect to your router and the MQTT broker using another mode.
* IoTy device needs to be provided with internet access. This may be problematic in places (eg. schools) where WiFi access may be restricted to authorised devices only.

**Internet Mode (Steps): Configure network**

1. Connect to your IoTy device using Bluetooth or Access Point mode.
2. Open the kebab menu (...3 vertical dots next to the word "Disconnect") and select "Configure Device Network".
3. Fill in your router SSID and password, as well as the host, port, username, and password for your MQTT broker.
4. Click "Ok".

**Internet Mode (Steps): Connect**

1. Restart your ESP32 (...press the reset button); the built-in LED should flash 3 times.
2. Before the 3 flashes complete, press and hold the boot button until the 3 flashes complete and the LED should stay on.
3. If the device network was configured, the LED should start double blinking every 0.5s. After a few seconds, the LED should stay on again.
4. Open https://quirkycort.github.io/IoTy/public/editor.html
5. Open the kebab menu (...3 vertical dots next to the word "Disconnect") and switch "Connection Mode" to Bluetooth.
6. From the kebab menu, select "Connect (Bluetooth)".
7. Select your device and click "Pair".

## Programming the ESP32

### 1) Write your program

Open https://quirkycort.github.io/IoTy/public/editor.html and write your program using either blocks or Python.

### 2) Connect device

Connect your device using Bluetooth, Access Point, or Internet mode.

### 3) Download program

After connection, open the kebab menu and select "Download to device".
Restart your device after download completes.

## Monitoring the program (Optional) (Bluetooth Mode only)

When your program is running, you can connect to your device to view the output of print statements and error messages in the "Monitor" tab.

To prevent missing any messages that were transmitted before connection is completed, you can set the "When Started" block to "wait for connection".
If you're using Python, add...

```
ioty.monitor.wait_for_connection()
```

...to the top of your code.
This will cause program execution to pause until you have connected to your device.

**WARNING** Do not use "wait for connection" if you are not using Bluetooth mode.