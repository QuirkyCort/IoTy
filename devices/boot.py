import _ioty_service

from machine import Pin
from time import sleep_ms

_NAME = 'IoTy-000'

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
        _ioty_service.BLE_Service()

        while True:
            sleep_ms(10)

main()