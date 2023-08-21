import struct

# The wiring for this device is rather peculiar...
#
# GY33  ESP32
# ====  =====
# CT    SCL
# DR    SDA
# SO    GND (seems to select I2C mode)
#
# It's not clear what the pins labeled SCL and SDA on the GY33 are for.
# Device may support UART, but I didn't test it.
# Sampling time is around 100ms; if you try to read more often than that,
# you'll start to get repeated results.

class GY33:
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
    def set_led_power(self, pwr=00):
        cfg = 0xA0 - pwr * 16
        self.i2c.writeto_mem(self.addr, 0x10, bytes([cfg]))

    # Returns [Raw Red, Raw Green, Raw Blue, Clear, Lux, Color Temperature, Red, Green, Blue, Color]
    def read_all(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 16)
        return struct.unpack('>HHHHHHBBBB', data)

    # Returns [Raw Red, Raw Green, Raw Blue, Clear]
    def read_raw(self):
        data = self.i2c.readfrom_mem(self.addr, 0x00, 8)
        return struct.unpack('>HHHH', data)

    def read(self):
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
