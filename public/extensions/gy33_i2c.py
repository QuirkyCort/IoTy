import struct

class GY33_I2C:
    def __init__(self, i2c, addr=90):
        self.i2c = i2c
        self.addr = addr

        # Reasonable defaults with led at max
        self.cal = [
            [76, 1413],
            [183, 2348],
            [170, 2162],
            [439, 5838]
        ]

    # From 0 (off) to 10 (max)
    def set_led(self, pwr=0):
        cfg = 0xA0 - pwr * 16
        self.i2c.writeto_mem(self.addr, 0x10, bytes([cfg]))

    def calibrate_white_balance(self):
        cfg = self.i2c.readfrom_mem(self.addr, 0x10, 1)
        cfg = bytes([cfg[0] | 1])
        self.i2c.writeto_mem(self.addr, 0x10, cfg)

    # Returns [Raw Red, Raw Green, Raw Blue, Clear, Lux, Color Temperature, Red, Green, Blue, Color]
    def read_all(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 16)
        return struct.unpack('>HHHHHHBBBB', data)

    # Returns [Raw Red, Raw Green, Raw Blue, Clear]
    def read_raw(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 8)
        return struct.unpack('>HHHH', data)

    # Returns calibrated Red, Green, Blue, Clear
    def read_calibrated(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 8)
        color = struct.unpack('>HHHH', data)
        result = [0,0,0,0]
        for i in range(4):
            result[i] = 255 * (color[i] - self.cal[i][0]) // (self.cal[i][1] - self.cal[i][0])
        return result

    def calibrate_white(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 8)
        color = struct.unpack('>HHHH', data)
        for i in range(4):
            self.cal[i][1] = color[i]

    def calibrate_black(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 8)
        color = struct.unpack('>HHHH', data)
        for i in range(4):
            self.cal[i][0] = color[i]
