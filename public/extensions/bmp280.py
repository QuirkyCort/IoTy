import struct
import time

class BMP280:
    def __init__(self, i2c, addr=118):
        self.i2c = i2c
        self.addr = addr
        self.init_device()

    def init_device(self):
        self.i2c.writeto_mem(self.addr, 0xE0, struct.pack('B', 0xB6)) # Reset
        time.sleep_ms(2)

        data = self.i2c.readfrom_mem(self.addr, 0x88, 24)
        self.cal = struct.unpack('<HhhHhhhhhhhh', data)

        config = 0 # 0.5ms standby (shortest), no filter, SPI disabled
        self.i2c.writeto_mem(self.addr, 0xF5, struct.pack('B', config))

        data_options = 0
        data_options |= 0b01000000 # 17bit temperature
        data_options |= 0b00010100 # 16x oversampling pressure
        data_options |= 0b00000011 # Normal mode
        self.i2c.writeto_mem(self.addr, 0xF4, struct.pack('B', data_options))

        time.sleep_ms(40)

    def read(self):
        data = self.i2c.readfrom_mem(self.addr, 0xF7, 3)
        self.raw_p = data[0] << 12 | data[1] << 4 | data[2] >> 4

        data = self.i2c.readfrom_mem(self.addr, 0xFA, 3)
        self.raw_t = data[0] << 12 | data[1] << 4 | data[2] >> 4

        self.calc_t()
        self.calc_p()
        self.calc_alt()

        return (self.raw_t, self.raw_p)

    def calc_t(self):
        var1 =   (( (self.raw_t >> 3) - (self.cal[0] << 1)) * self.cal[1]) >> 11
        var2 = ((((self.raw_t >> 4) - self.cal[0]) * ((self.raw_t >> 4) - self.cal[0])) >> 12) * self.cal[2] >> 14
        self.t_fine = var1 + var2
        t = (self.t_fine * 5 + 128) >> 8
        self.temperature = t / 100
        return

    def calc_p(self):
        var1 = self.t_fine - 128000
        var2 = var1 * var1 * self.cal[8]
        var2 = var2 + ((var1 * self.cal[7]) << 17)
        var2 = var2 + (self.cal[6] << 35)
        var1 = ((var1 * var1 * self.cal[5]) >> 8) + ((var1 * self.cal[4]) << 12)
        var1 = ((1 << 47) + var1) * self.cal[3] >> 33
        if var1 == 0:
            self.pressure = 0
        p = 1048576 - self.raw_p
        p = (((p << 31) - var2) * 3125) // var1
        var1 = (self.cal[11] * (p >> 13) * (p >> 13)) >> 25
        var2 = (self.cal[10] * p) >> 19
        p = ((p + var1 + var2) >> 8) + (self.cal[9] << 4)
        self.pressure = p / 256
        return

    def calc_alt(self):
        self.altitude = 44307.693960000004 * (1 - (self.pressure / 101325) ** 0.190284)
        return

    def get_temperature(self):
        return self.temperature

    def get_pressure(self):
        return self.pressure

    def get_altitude(self):
        return self.altitude
