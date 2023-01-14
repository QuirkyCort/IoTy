from ioty.ble import BLE_Service
from ioty.http import HTTP_Service

from machine import Pin
from time import sleep_ms

def main():
    led = Pin(2, Pin.OUT)
    btn = Pin(0, Pin.IN, Pin.PULL_UP)

    for _ in range(3):
        led.on()
        sleep_ms(200)
        led.off()
        sleep_ms(200)

    if btn.value() == 0:
        led.on()

        ble_mode = False
        for _ in range(200):
            sleep_ms(10)
            if btn.value() == 1:
                ble_mode = True
                break

        if ble_mode:
            BLE_Service()

            while True:
                sleep_ms(10)
        else:
            while True:
                led.on()
                sleep_ms(50)
                led.off()
                sleep_ms(50)
                if btn.value() == 1:
                    break
            HTTP_Service()

main()