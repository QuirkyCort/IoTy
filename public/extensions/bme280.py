import struct
import time

class BME280:
    def __init__(self, i2c, addr=118):
        self.i2c = i2c
        self.addr = addr
        self.init_device()

    def init_device(self):
        self.i2c.writeto_mem(self.addr, 0xE0, struct.pack('B', 0xB6)) # Reset
        time.sleep_ms(2)

        data = self.i2c.readfrom_mem(self.addr, 0x88, 24)
        self.cal = list(struct.unpack('<HhhHhhhhhhhh', data))

        data = self.i2c.readfrom_mem(self.addr, 0xA1, 1)
        self.cal.append(struct.unpack('B', data)[0])

        data = self.i2c.readfrom_mem(self.addr, 0xE1, 2)
        self.cal.append(struct.unpack('<h', data)[0])

        data = self.i2c.readfrom_mem(self.addr, 0xE3, 1)
        self.cal.append(struct.unpack('B', data)[0])

        data = self.i2c.readfrom_mem(self.addr, 0xE4, 3)
        self.cal.append((data[0] << 4) | (data[1] & 0b1111))
        self.cal.append((data[2] << 4) | ((data[1] >> 4) & 0b1111))

        data = self.i2c.readfrom_mem(self.addr, 0xE7, 1)
        self.cal.append(struct.unpack('b', data)[0])

        config = 0 # 0.5ms standby (shortest), no filter, SPI disabled
        self.i2c.writeto_mem(self.addr, 0xF5, struct.pack('B', config))

        data_options = 0b011 # 4x oversampling humidity
        self.i2c.writeto_mem(self.addr, 0xF2, struct.pack('B', data_options))

        data_options = 0
        data_options |= 0b01000000 # 17bit temperature
        data_options |= 0b00010100 # 16x oversampling pressure
        data_options |= 0b00000011 # Normal mode
        self.i2c.writeto_mem(self.addr, 0xF4, struct.pack('B', data_options))

        time.sleep_ms(40)

    def read(self):
        data = self.i2c.readfrom_mem(self.addr, 0xF7, 8)
        self.raw_p = data[0] << 12 | data[1] << 4 | data[2] >> 4
        self.raw_t = data[3] << 12 | data[4] << 4 | data[5] >> 4
        self.raw_h = data[6] << 8 | data[7]

        self.calc_t()
        self.calc_p()
        self.calc_alt()
        self.calc_h()

        return (self.raw_t, self.raw_p, self.raw_h)

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

    def calc_h(self):
        h = self.t_fine - 76800
        h = (((((self.raw_h << 14) - (self.cal[15] << 20) - (self.cal[16] * h)) + (16384)) >> 15) * (((((((h * self.cal[17]) >> 10) * (((h * self.cal[14]) >> 11) + (32768))) >> 10) + (2097152)) * self.cal[13] + 8192) >> 14))
        h = (h - (((((h >> 15) * (h >> 15)) >> 7) * self.cal[12]) >> 4))
        if h < 0:
            h = 0
        elif h > 419430400:
            h = 419430400
        h >>= 12
        self.humidity = h / 1024
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

    def get_humidity(self):
        return self.humidity
