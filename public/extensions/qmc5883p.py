import struct
from micropython import const

SCALE_30G = const(0x00)
SCALE_12G = const(0x04)
SCALE_8G = const(0x08)
SCALE_2G = const(0x0C)


class QMC5883P:
    def __init__(self, i2c, addr=44, scale=SCALE_2G):
        self.i2c = i2c
        self.addr = addr
        self.scale = scale
        self.x = 0
        self.y = 0
        self.z = 0
        self.init_device()

    def init_device(self):
        # Set and reset, No self test, No soft reset
        mode = 0x00 | self.scale
        self.i2c.writeto_mem(self.addr, 0x0B, struct.pack('<B', mode))
        # Down sample: 1, Over sample: 8, 200Hz, Continuous mode
        self.i2c.writeto_mem(self.addr, 0x0A, struct.pack('B', 0b00001111))

    def read(self):
        data = self.i2c.readfrom_mem(self.addr, 0x01, 6)
        self.x, self.y, self.z = struct.unpack('<hhh', data)

        return (self.x, self.y, self.z)

    def get_x(self):
        return self.x

    def get_y(self):
        return self.y

    def get_z(self):
        return self.z

    def get_all(self):
        return (self.x, self.y, self.z)
