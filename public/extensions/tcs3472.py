import struct
import time

class TCS3472:
    def __init__(self, i2c, addr=41):
        self.i2c = i2c
        self.addr = addr

        # Reasonable defaults with led at max
        self.cal = [
            [439, 5838],
            [76, 1413],
            [183, 2348],
            [170, 2162]
        ]

        self.init()

    def _reg_read(self, addr, size):
        return self.i2c.readfrom_mem(self.addr, 0xA0 | addr, size)

    def _reg_write(self, addr, val):
        return self.i2c.writeto_mem(self.addr, 0xA0 | addr, val)

    def init(self):
        self.i2c.writeto(self.addr, b'\x80')
        self._reg_write(0x00, b'\x03')
        time.sleep_ms(10)

    def set_gain(self, gain):
        gain = int(gain)
        if gain < 0:
            gain = 0
        elif gain > 3:
            gain = 3

        self._reg_write(0x0F, bytes([gain]))

    def set_integration_time(self, ms):
        config = int(256 - ms / 2.4)
        if config < 0:
            config = 0
        elif config > 255:
            config = 255
        self._reg_write(0x01, bytes([config]))

    # Returns raw Clear, Red, Green, Blue
    def read(self):
        data = self._reg_read(0x14, 8)
        return struct.unpack('<HHHH', data)

    # Returns calibrated Clear, Red, Green, Blue
    def read_calibrated(self):
        color = self.read()
        result = [0,0,0,0]
        for i in range(4):
            result[i] = 255 * (color[i] - self.cal[i][0]) // (self.cal[i][1] - self.cal[i][0])
        return result

    def calibrate_white(self):
        color = self.read()
        for i in range(4):
            self.cal[i][1] = color[i]

    def calibrate_black(self):
        color = self.read()
        for i in range(4):
            self.cal[i][0] = color[i]
