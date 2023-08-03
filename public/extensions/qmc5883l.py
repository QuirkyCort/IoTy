import struct
import math
from micropython import const

SCALE_2G = const(0x00)
SCALE_8G = const(0x10)

class QMC5883L:
    def __init__(self, i2c, addr=13, scale=SCALE_2G):
        self.i2c = i2c
        self.addr = addr
        self.scale = scale
        self.x = 0
        self.y = 0
        self.z = 0
        self.init_device()

    def init_device(self):
        self.i2c.writeto_mem(self.addr, 0x0B, struct.pack('<B', 1))
        mode = 0x0D | self.scale # 200Hz, 512 OSR, Continuous
        self.i2c.writeto_mem(self.addr, 0x09, struct.pack('<B', mode))

    def read(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 6)
        self.x, self.y, self.z = struct.unpack('<hhh', data)
        # self.x = data[0] | (data[1] << 8)
        # self.y = data[2] | (data[3] << 8)
        # self.z = data[4] | (data[5] << 8)

        return (self.x, self.y, self.z)

    def get_x(self):
        return self.x

    def get_y(self):
        return self.y

    def get_z(self):
        return self.z

    def get_all(self):
        return (self.x, self.y, self.z)

def heading(x, y):
    rad = math.atan2(y, x)

    if rad < 0:
        rad += 2 * math.pi

    deg = rad * 180 / math.pi
    return deg
