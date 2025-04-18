import os
from machine import Pin
from time import sleep_ms
import ioty.constants as constants

def main():
    led = Pin(constants._LED_PIN, Pin.OUT)
    btn = Pin(constants._BOOT_PIN, Pin.IN, Pin.PULL_UP)

    def led_on():
        led.value(constants._LED_ON)

    def led_off():
        led.value(constants._LED_OFF)

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

    def start_mqtt_ble_mode():
        try:
            from ioty.ble import BLE_Service
            BLE_Service()
        except:
            pass

        try:
            mqtt = start_mqtt()
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
            start_mqtt_ble_mode()
        else:
            start_ap_mode()

    if not ble_mode:
        try:
            os.stat('main.py')
        except:
            led_on()
            start_mqtt_ble_mode()

main()