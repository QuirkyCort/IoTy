from machine import Pin
from micropython import const
import time

DATA_BITS = const(24)
WAIT_TIMEOUT = const(5)

DIFF_10HZ = const(1)
TEMPERATURE_AVOLTAGE = const(2)
DIFF_40HZ = const(3)

class HX710:
    def __init__(self, dt_pin, sck_pin):
        self.dt_pin = Pin(dt_pin, Pin.IN)
        self.sck_pin = Pin(sck_pin, Pin.OUT, value=0)
        self._wait()

    def _wait(self):
        start = time.time()
        while self.dt_pin.value():
            time.sleep_ms(1)
            if (time.time() - start) > WAIT_TIMEOUT:
                raise Exception('Device not ready')

    def read(self, next=DIFF_10HZ):
        data = 0
        self._wait()
        for _ in range(DATA_BITS):
            self.sck_pin.value(1)
            self.sck_pin.value(0)
            data = data << 1 | self.dt_pin.value()

        for _ in range(next):
            self.sck_pin.value(1)
            self.sck_pin.value(0)

        if data & (1 << (DATA_BITS - 1)):
            data -= 1 << DATA_BITS
        return data