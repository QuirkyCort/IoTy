from micropython import const

class AGS10:
    def __init__(self, i2c, addr=26):
        self.i2c = i2c
        self.addr = addr

    def read(self):
        data = self.i2c.readfrom_mem(self.addr, 0, 5)

        if self._crc(data) != data[4]:
            return None

        status = data[0]
        tvoc = (data[1] << 16) | (data[2] << 8) | data[3]

        if status & 0x01:
            return None # Sensor not ready
        return tvoc

    def _crc(self, data):
        crc = 0xFF
        for i in range(4):
            crc ^= data[i]
            for _ in range(8):
                if crc & 0x80:
                    crc = (crc << 1) ^ 0x31
                else:
                    crc <<= 1
            crc &= 0xFF
        return crc

    def set_zero_to_current(self):
        self.i2c.writeto_mem(self.addr, 0x01, bytes([0x00, 0x0C, 0x00, 0x00, 0xAC]))

    def set_zero_to_factory(self):
        self.i2c.writeto_mem(self.addr, 0x01, bytes([0x00, 0x0C, 0xFF, 0xFF, 0x81]))
