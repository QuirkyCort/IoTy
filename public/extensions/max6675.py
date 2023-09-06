import struct
from machine import Pin

class MAX6675:
    def __init__(self, spi, cs):
        self.spi = spi
        self.cs = Pin(cs, Pin.OUT, value=1)

    def read_celsius(self):
        self.cs.value(0)
        val = struct.unpack('>H', self.spi.read(2))[0]
        self.cs.value(1)

        if val & 4:
            return -1
        return (val >> 3) / 4

    def read_fahrenheit(self):
        val = self.read_celsius()
        return (val * 9/5) + 32

    def read_kelvin(self):
        val = self.read_celsius()
        return val + 273.15
