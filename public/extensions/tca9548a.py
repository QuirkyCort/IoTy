class TCA9548A:
    def __init__(self, i2c, addr=112):
        self.i2c = i2c
        self.addr = addr

    def set_port(self, port, deactivate_others=True):
        if port == -1:
            cmd = 0
        else:
            if deactivate_others:
                cmd = 1 << port
            else:
                cmd = self.i2c.readfrom(self.addr, 1)[0]
                cmd |= 1 << port
        self.i2c.writeto(self.addr, bytes([cmd]))

    def get_port(self):
        b = self.i2c.readfrom(self.addr, 1)[0]
        for i in range(8):
            if b & (1 << i):
                return i
        return -1