import time
import math
from machine import Pin
from micropython import const

OP_READ = const(b'\x03')
OP_WRITE = const(b'\x02')

REG_MODE = const(b'\x00')
REG_STATUS = const(b'\x01')
REG_BASS = const(b'\x02')
REG_CLOCKF = const(b'\x03')
REG_VOL = const(b'\x0b')


class VS1003:
    def __init__(self, spi, xcs, xdcs, dreq, xrst):
        self.spi = spi
        self.xcs = Pin(xcs, Pin.OUT, value=1)
        self.xdcs = Pin(xdcs, Pin.OUT, value=1)
        self.dreq = Pin(dreq, Pin.IN)
        self.xrst = Pin(xrst, Pin.OUT, value=0)
        self.mode = bytearray([8, 0])
        self.reset()
        self.write_reg(REG_VOL, b'\x00\x00')
        self.set_clock(5, 3)

    def reset(self):
        self.xrst.value(0)
        time.sleep_us(2)
        self.xrst.value(1)
        while self.dreq.value() == 0:
            pass

    def soft_reset(self):
        self.write_reg(REG_MODE, b'\x00\x04')
        while self.dreq.value() == 0:
            pass

    def write_reg(self, reg, data):
        while self.dreq.value() == 0:
            pass
        self.xcs.value(0)
        time.sleep_us(1)
        self.spi.write(OP_WRITE + reg)
        self.spi.write(data)
        time.sleep_us(1)
        self.xcs.value(1)
        time.sleep_us(2)

    def read_reg(self, reg):
        while self.dreq.value() == 0:
            pass
        self.xcs.value(0)
        time.sleep_us(1)
        self.spi.write(OP_READ + reg)
        value = self.spi.read(2)
        time.sleep_us(1)
        self.xcs.value(1)
        time.sleep_us(2)
        return value

    def write_data(self, data):
        while self.dreq.value() == 0:
            pass
        self.xdcs.value(0)
        self.spi.write(data)
        self.xdcs.value(1)

    def dreq_ready(self):
        return self.dreq.value()

    def flush_buffer(self):
        zeros = b'\x00' * 32
        for _ in range(64):
            self.write_data(zeros)

    def get_status(self):
        return self.read_reg(REG_STATUS)

    def set_clock(self, mul, add):
        b1 = (mul << 5) + (add << 3)
        self.write_reg(REG_CLOCKF, bytes([b1, 0]))

    def set_volume(self, vol):
        vol = math.floor(math.log(vol, 10) * 254)
        if vol > 254:
            vol = 0
        else:
            vol = (254 - vol) // 4
        self.write_reg(REG_VOL, bytes([vol, vol]))

    def set_stream_mode(self, v):
        if v:
            self.mode[1] |= 0x40
        else:
            self.mode[1] &= 0xbf
        self.write_reg(REG_MODE, self.mode)

    def play_bytes(self, data):
        for i in range(len(data) // 32):
            self.write_data(data[i*32:(i+1)*32])

    def play_file(self, filename):
        with open(filename, 'rb') as f:
            while True:
                d = f.read(32)
                if d:
                    self.write_data(d)
                else:
                    break
        self.flush_buffer()