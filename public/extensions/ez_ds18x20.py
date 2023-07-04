import onewire
import ds18x20
import machine
import time

class DS18X20:
    def __init__(self, pin):
        self.ow = onewire.OneWire(machine.Pin(pin))
        self.dev = ds18x20.DS18X20(self.ow)
        self.roms = self.dev.scan()
        self.roms.sort()

    def device_count(self):
        return len(self.roms)

    def convert_temp(self):
        self.dev.convert_temp()
        time.sleep_ms(750)

    def read_temp(self, i=0):
        return self.dev.read_temp(self.roms[i])