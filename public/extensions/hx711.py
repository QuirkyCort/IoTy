from machine import Pin
from micropython import const
import time

DATA_BITS = const(24)
WAIT_TIMEOUT = const(5)

class HX711:
    def __init__(self, dt_pin, sck_pin):
        self.dt_pin = Pin(dt_pin, Pin.IN)
        self.sck_pin = Pin(sck_pin, Pin.OUT, value=0)

        self._wait()
        for _ in range(DATA_BITS):
            self.sck_pin.value(1)
            self.sck_pin.value(0)
        self._set_channel()

    def _set_channel(self):
        # Channel A with gain 128
        self.sck_pin.value(1)
        self.sck_pin.value(0)

    def _wait(self):
        start = time.time()
        while self.dt_pin.value():
            time.sleep_ms(1)
            if (time.time() - start) > WAIT_TIMEOUT:
                raise Exception('Device not ready')

    def read(self):
        data = 0
        self._wait()
        for _ in range(DATA_BITS):
            self.sck_pin.value(1)
            self.sck_pin.value(0)
            data = data << 1 | self.dt_pin.value()
        self._set_channel()

        if data & (1 << (DATA_BITS - 1)):
            data -= 1 << DATA_BITS
        return data