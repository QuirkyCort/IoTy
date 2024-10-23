import struct
from micropython import const

HEIGHT = const(8)
WIDTH = const(8)

# Registers
PCTL = const(0)
RST = const(1)
FPSC = const(2)
INTC = const(3)
TTHL = const(0x0E)
PIXEL = const(0x80)

# Settings
NORMAL_MODE = b'\x00'
INITIAL_RESET = b'\x3F'
FPS_10 = b'\x00'
INT_OFF = b'\x00'

# Conversion for buffer
NO_CONVERSION = const(0)
UINT_16LE = const(1)
INT_16LE = const(2)

class AMG8833:
    def __init__(self, i2c, addr=105):
        self.i2c = i2c
        self.addr = addr
        self.init()

    def init(self):
        self.buf = bytearray(HEIGHT * WIDTH * 2)
        self.i2c.writeto_mem(self.addr, PCTL, NORMAL_MODE)
        self.i2c.writeto_mem(self.addr, RST, INITIAL_RESET)
        self.i2c.writeto_mem(self.addr, FPSC, FPS_10)
        self.i2c.writeto_mem(self.addr, INTC, INT_OFF)

    def set_moving_average_mode(self, value=True):
        mamod = b'\x00'
        if value:
            mamod = b'\x20'
        self.i2c.writeto_mem(self.addr, 0x1F, b'\x50')
        self.i2c.writeto_mem(self.addr, 0x1F, b'\x45')
        self.i2c.writeto_mem(self.addr, 0x1F, b'\x57')
        self.i2c.writeto_mem(self.addr, 0x07, mamod)
        self.i2c.writeto_mem(self.addr, 0x1F, b'\x00')

    def read(self):
        self.i2c.readfrom_mem_into(self.addr, PIXEL, self.buf)

    def get_buf(self, format=NO_CONVERSION):
        if format == NO_CONVERSION:
            return self.buf
        elif format == UINT_16LE:
            buf = bytearray(HEIGHT * WIDTH * 2)
            for i in range(0, HEIGHT * WIDTH * 2, 2):
                value = self.buf[i + 1] << 8 | self.buf[i]
                if value & 0x800:
                    value -= 0x1000
                value += 2048
                buf[i] = value & 0xff
                buf [i + 1] = value >> 8
            return buf
        elif format == INT_16LE:
            buf = bytearray(HEIGHT * WIDTH * 2)
            for i in range(0, HEIGHT * WIDTH * 2, 2):
                value = self.buf[i + 1] << 8 | self.buf[i]
                if value & 0x800:
                    value -= 0x1000
                struct.pack_into('<h', buf, i, value)
            return buf

    def get_temperature(self, x, y):
        pos = (y * WIDTH + x) * 2
        temperature = self.buf[pos + 1] << 8 | self.buf[pos]
        if temperature & 0x800:
            temperature -= 0x1000
        return temperature / 4

    def get_thermistor_temperature(self):
        raw = self.i2c.readfrom_mem(self.addr, TTHL, 2)
        temperature = raw[1] << 8 | raw[0]
        if temperature & 0x800:
            temperature -= 0x1000
        return temperature / 16
