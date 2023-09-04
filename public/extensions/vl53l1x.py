import time
import struct

VL51L1X_DEFAULT_CONFIGURATION = bytes([
0x00,0x01,0x01,0x01,0x02,0x00,0x02,0x08,0x00,
0x08,0x10,0x01,0x01,0x00,0x00,0x00,0x00,0xff,
0x00,0x0F,0x00,0x00,0x00,0x00,0x00,0x20,0x0b,
0x00,0x00,0x02,0x0a,0x21,0x00,0x00,0x05,0x00,
0x00,0x00,0x00,0xc8,0x00,0x00,0x38,0xff,0x01,
0x00,0x08,0x00,0x00,0x01,0xdb,0x0f,0x01,0xf1,
0x0d,0x01,0x68,0x00,0x80,0x08,0xb8,0x00,0x00,
0x00,0x00,0x0f,0x89,0x00,0x00,0x00,0x00,0x00,
0x00,0x00,0x01,0x0f,0x0d,0x0e,0x0e,0x00,0x00,
0x02,0xc7,0xff,0x9B,0x00,0x00,0x00,0x01,0x00,
0x00
])

class VL53L1X:
    def __init__(self,i2c, addr=0x29):
        self.i2c = i2c
        self.addr = addr
        self.init()

    def init(self):
        self.i2c.writeto_mem(self.addr, 0x2D, VL51L1X_DEFAULT_CONFIGURATION, addrsize=16)
        time.sleep_ms(103)

    def start(self):
        self.i2c.writeto_mem(self.addr, 0x86, b'\x01', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x87, b'\x40', addrsize=16)

    def stop(self):
        self.i2c.writeto_mem(self.addr, 0x87, b'\x00', addrsize=16)

    def check_data_ready(self):
        status = self.i2c.readfrom_mem(self.addr, 0x31, 1, addrsize=16)[0]
        return (status & 1) == 1

    def clear_interrupt(self):
        self.i2c.writeto_mem(self.addr, 0x86, b'\x01', addrsize=16)

    def read(self):
        return struct.unpack('>H', self.i2c.readfrom_mem(self.addr, 0x96, 2, addrsize=16))[0]

    def get_distance_mode(self):
        status = self.i2c.readfrom_mem(self.addr, 0x4B, 1, addrsize=16)[0]
        if status == 0x14:
            return 1
        elif status == 0x0A:
            return 2
        else:
            return 0

    def get_timing_budget(self):
        status = struct.unpack('>H', self.i2c.readfrom_mem(self.addr, 0x5E, 2, addrsize=16))[0]
        if status == 0x001D:
            return 15
        elif status == 0x0051 or status == 0x001E:
            return 20
        elif status == 0x00D6 or status == 0x0060:
            return 33
        elif status == 0x1AE or status == 0x00AD:
            return 50
        elif status == 0x02E1 or status == 0x01CC:
            return 100
        elif status == 0x03E1 or status == 0x02D9:
            return 200
        elif status == 0x0591 or status == 0x048F:
            return 500
        return 0

    def set_timing_budget(self, ms):
        dm = self.get_distance_mode()

        if dm == 0:
            return
        elif dm == 1:
            config = {
                15:  [b'\x00\x1D', b'\x00\x27'],
                20:  [b'\x00\x51', b'\x00\x6E'],
                33:  [b'\x00\xD6', b'\x00\x6E'],
                50:  [b'\x01\xAE', b'\x01\xE8'],
                100: [b'\x02\xE1', b'\x03\x88'],
                200: [b'\x03\xE1', b'\x04\x96'],
                500: [b'\x05\x91', b'\x05\xC1']
            }
        else:
            config = {
                20:  [b'\x00\x1E', b'\x00\x22'],
                33:  [b'\x00\x60', b'\x00\x6E'],
                50:  [b'\x00\xAD', b'\x00\xC6'],
                100: [b'\x01\xCC', b'\x01\xEA'],
                200: [b'\x02\xD9', b'\x02\xF8'],
                500: [b'\x04\x8F', b'\x04\xA4']
            }

        if ms in config:
            self.i2c.writeto_mem(self.addr, 0x5E, config[ms][0], addrsize=16)
            self.i2c.writeto_mem(self.addr, 0x61, config[ms][1], addrsize=16)

    def set_distance_mode_short(self):
        tBudget = self.get_timing_budget()
        self.i2c.writeto_mem(self.addr, 0x4B, b'\x14', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x60, b'\x07', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x63, b'\x05', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x69, b'\x38', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x78, b'\x07\x05', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x7A, b'\x06\x06', addrsize=16)
        self.set_timing_budget(tBudget)

    def set_distance_mode_long(self):
        tBudget = self.get_timing_budget()
        self.i2c.writeto_mem(self.addr, 0x4B, b'\x0A', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x60, b'\x0F', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x63, b'\x0D', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x69, b'\xB8', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x78, b'\x0F\x0D', addrsize=16)
        self.i2c.writeto_mem(self.addr, 0x7A, b'\x0E\x0E', addrsize=16)
        self.set_timing_budget(tBudget)

