import struct
import math
from micropython import const

SCALE_880G = const(0b000)
SCALE_1300G = const(0b001)
SCALE_1900G = const(0b010)
SCALE_2500G = const(0b011)
SCALE_4000G = const(0b100)
SCALE_4700G = const(0b101)
SCALE_5600G = const(0b110)
SCALE_8100G = const(0b111)

class HMC5883L:
    def __init__(self, i2c, addr=30, scale=SCALE_1300G):
        self.i2c = i2c
        self.addr = addr
        self.scale = scale
        self.x = 0
        self.y = 0
        self.z = 0
        self.init_device()

    def init_device(self):
        # 75Hz, 8 samples average, no bias
        self.i2c.writeto_mem(self.addr, 0x00, struct.pack('B', 0b01111000))
        self.i2c.writeto_mem(self.addr, 0x01, struct.pack('B', self.scale << 5))
        # continuous mode, normal speed I2C
        self.i2c.writeto_mem(self.addr, 0x02, struct.pack('B', 0))

    def read(self):
        data = self.i2c.readfrom_mem(self.addr, 0x03, 6)
        self.x, self.z, self.y = struct.unpack('>hhh', data)

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
