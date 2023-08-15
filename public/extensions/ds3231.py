class DS3231:
    def __init__(self, i2c, addr=104):
        self.i2c = i2c
        self.addr = addr

    def datetime(self, dt=None):
        if dt == None:
            return self.get_datetime()
        else:
            return self.set_datetime(dt)

    def get_datetime(self):
        data = self.i2c.readfrom_mem(self.addr, 0, 7)
        return [
            2000 + decodeToDec(data[6]),
            decodeToDec(data[5] & 0x7F),
            decodeToDec(data[4]),
            decodeToDec(data[3]),
            decodeToDec(data[2] & 0x3F),
            decodeToDec(data[1]),
            decodeToDec(data[0]),
            0
        ]

    def set_datetime(self, dt):
        b = bytes([
            encodeToByte(dt[6]),
            encodeToByte(dt[5]),
            encodeToByte(dt[4]),
            encodeToByte(dt[3]),
            encodeToByte(dt[2]),
            encodeToByte(dt[1]),
            encodeToByte(dt[0] - 2000)
        ])
        self.i2c.writeto_mem(self.addr, 0, b)

def decodeToDec(byte):
    return ((byte >> 4) * 10) + (byte & 0x0F)

def encodeToByte(dec):
    return ((dec // 10) << 4) + (dec % 10)