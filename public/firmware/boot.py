import os
from machine import Pin
from time import sleep_ms
import ioty.constants as constants

def main():
    if type(constants._LED_ON) == int:
        led = Pin(constants._LED_PIN, Pin.OUT)
    elif constants._LED_ON == 'n':
        import neopixel
        led = neopixel.NeoPixel(Pin(constants._LED_PIN), 1)
    btn = Pin(constants._BOOT_PIN, Pin.IN, Pin.PULL_UP)

    def led_on():
        if type(constants._LED_ON) == int:
            led.value(constants._LED_ON)
        elif constants._LED_ON == 'n':
            led.fill((0, 0, 50))
            led.write()

    def led_off():
        if type(constants._LED_ON) == int:
            led.value(1 - constants._LED_ON)
        elif constants._LED_ON == 'n':
            led.fill((0, 0, 0))
            led.write()

    def blink(ms,count=1):
        for _ in range(count):
            led_on()
            sleep_ms(ms)
            led_off()
            sleep_ms(ms)

    def start_mqtt():
        from ioty.mqtt import MQTT_Service

        mqtt = MQTT_Service()
        if not mqtt.read_config():
            return

        led_off()
        mqtt.connect_wifi()
        while not mqtt.wifi_isconnected():
            blink(50, 2)
            sleep_ms(500)
        led_off()

        mqtt.connect_mqtt()
        led_on()
        return mqtt

    def start_ble_mode():
        try:
            from ioty.ble import BLE_Service
            BLE_Service()
        except:
            pass

    def start_mqtt_mode():
        try:
            mqtt = start_mqtt()
            if mqtt == None:
                return
            while True:
                if mqtt:
                    mqtt.check_msg()
                sleep_ms(10)
        except:
            pass

    def start_ap_mode():
        from ioty.http import HTTP_Service

        while True:
            blink(50)
            if btn.value() == 1:
                break
        http = HTTP_Service()
        while True:
            http.wait_for_connection()
            blink(50)

    try:
        os.stat('_FASTBOOT')
    except:
        blink(200, 3)

    ble_mode = False
    if btn.value() == 0:
        led_on()

        for _ in range(200):
            sleep_ms(10)
            if btn.value() == 1:
                ble_mode = True
                break

        if ble_mode:
            start_ble_mode()
            start_mqtt_mode()
        else:
            start_ap_mode()

    if not ble_mode:
        try:
            os.stat('main.py')
        except:
            led_on()
            start_ble_mode()

main()