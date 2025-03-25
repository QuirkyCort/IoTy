import time
import math
import struct
from machine import Pin
from micropython import const

OP_READ = const(b'\x03')
OP_WRITE = const(b'\x02')

REG_MODE = const(b'\x00')
REG_STATUS = const(b'\x01')
REG_BASS = const(b'\x02')
REG_CLOCKF = const(b'\x03')
REG_HDAT0 = const(b'\x08')
REG_HDAT1 = const(b'\x09')
REG_VOL = const(b'\x0b')
REG_AICTRL0 = const(b'\x0c')
REG_AICTRL1 = const(b'\x0d')

RIFF_HEADER = const(b'RIFF____WAVEfmt \x14\x00\x00\x00\x11\x00\x01\x00________\x00\x01\x04\x00\x02\x00\xf9\x01fact\x04\x00\x00\x00____data____')


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

    def _activate_adpcm_mode(self, hp=False, gain=0, line_in=False):
        self.write_reg(REG_AICTRL0, b'\x00\x15')
        self.write_reg(REG_AICTRL1, struct.pack('>H', gain))
        mode = 0x18
        if hp:
            mode |= 0x20
        if line_in:
            mode |= 0x40
        self.write_reg(REG_MODE, bytes([mode, 0x04]))

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

    def read_adpcm_block(self):
        buf = bytearray(256)
        ptr = 0
        while ptr < 127:
            available = struct.unpack('>H', self.read_reg(REG_HDAT1))[0]
            if available > 896:
                time.sleep_us(100)
                continue
            read_count = min(128 - ptr, available)
            for _ in range(read_count):
                buf[2*ptr:2*ptr+2] = self.read_reg(REG_HDAT0)
                ptr += 1
        return buf

    def get_riff_header(self, blocks_count=0, sample_rate=8000):
        length = len(RIFF_HEADER)
        buf = bytearray(length)
        buf[0:length] = RIFF_HEADER
        buf[4:8] = struct.pack('<I', blocks_count * 256 + 52)
        buf[24:28] = struct.pack('<I', sample_rate)
        buf[28:32] = struct.pack('<I', int(sample_rate * 256 / 505))
        buf[48:52] = struct.pack('<I', blocks_count * 505)
        buf[56:60] = struct.pack('<I', blocks_count * 256)
        return buf

    def start_recording_to_file(self, filename, hp=False, gain=0, line_in=False):
        self.file = open(filename, 'wb')
        self.written_blocks = 0
        self.file.write(RIFF_HEADER)
        self._activate_adpcm_mode(hp, gain, line_in)

    def record_to_file(self):
        self.file.write(self.read_adpcm_block())
        self.written_blocks += 1

    def stop_recording_to_file(self):
        self.file.seek(0)
        self.file.write(self.get_riff_header(self.written_blocks))
        self.file.close()
