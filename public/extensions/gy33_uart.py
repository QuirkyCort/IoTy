import time

TYPE_RAW = 0x15
TYPE_LCC = 0x25
TYPE_PROCESSED = 0x45
TYPE_I2C = 0x55

HEADER = 0x5A

class GY33_UART:
    def __init__(self, uart):
        self.uart = uart
        self.header = 0
        self.frame_type = 0
        self.recv_buf = bytearray(8)
        self.recv_ptr = 0
        self.recv_length = -1

        self.raw = [0, 0, 0, 0]
        self.lcc = [0, 0, 0]
        self.processed = [0, 0, 0]
        self.i2c_addr = -1

        # Reasonable defaults with led at max
        self.cal = [
            [76, 1413],
            [183, 2348],
            [170, 2162],
            [439, 5838]
        ]

    def update(self, wait=False, timeout=1000):
        start = time.ticks_ms()
        while self.uart.any() or wait:
            if wait and time.ticks_diff(time.ticks_ms(), start) > timeout:
                return

            c = self.uart.read(1)
            if c == None:
                continue
            c = c[0]

            if self.header == 2:
                if self._read_frame(c):
                    return
            elif c == HEADER:
                self._clear_frame()
                self.header += 1
            else:
                self.header = 0

    def _clear_frame(self):
        self.frame_type = 0
        self.recv_ptr = 0
        self.recv_length = -1

    def _read_frame(self, c):
        if self.frame_type == 0:
            if c in [TYPE_RAW, TYPE_LCC, TYPE_PROCESSED, TYPE_I2C]:
                self.frame_type = c
            else:
                self.header = 0
        elif self.recv_ptr == self.recv_length:
            if self._checksum_pass(c):
                self._parse_frame()
            self.header = 0
            self._clear_frame()
            return True
        elif self.recv_length == -1:
            self.recv_length = c
        else:
            self.recv_buf[self.recv_ptr] = c
            self.recv_ptr += 1

        return False

    def _parse_frame(self):
        if self.frame_type == TYPE_RAW:
            self._parse_raw()
        elif self.frame_type == TYPE_LCC:
            self._parse_lcc()
        elif self.frame_type == TYPE_PROCESSED:
            self._parse_processed()
        elif self.frame_type == TYPE_I2C:
            self._parse_i2c()

    def _checksum_pass(self, c):
        sum = HEADER + HEADER + self.frame_type + self.recv_length
        for i in range(self.recv_length):
            sum += self.recv_buf[i]
        sum %= 256

        return sum == c

    def _parse_raw(self):
        self.raw[0] = (self.recv_buf[0] << 8) + self.recv_buf[1]
        self.raw[1] = (self.recv_buf[2] << 8) + self.recv_buf[3]
        self.raw[2] = (self.recv_buf[4] << 8) + self.recv_buf[5]
        self.raw[3] = (self.recv_buf[6] << 8) + self.recv_buf[6]

    def _parse_lcc(self):
        self.lcc[0] = (self.recv_buf[0] << 8) + self.recv_buf[1]
        self.lcc[1] = (self.recv_buf[2] << 8) + self.recv_buf[3]
        self.lcc[2] = (self.recv_buf[4] << 8) + self.recv_buf[5]

    def _parse_processed(self):
        self.processed[0] = self.recv_buf[0]
        self.processed[1] = self.recv_buf[1]
        self.processed[2] = self.recv_buf[2]

    def _parse_i2c(self):
        self.i2c_addr = self.recv_buf[0]

    def _write_cmd(self, header, cmd):
        sum = (header + cmd) % 256
        self.uart.write(bytes([header, cmd, sum]))

    def set_output(self, raw, lcc, processed):
        cmd = 0x80
        if raw:
            cmd |= 4
        if lcc:
            cmd |= 2
        if processed:
            cmd |= 1

        self._write_cmd(0xA5, cmd)
        time.sleep_ms(100)

    def set_led(self, pwr=0, save=False):
        cmd = 0x60 + 0x0A - pwr
        self._write_cmd(0xA5, cmd)

        if save:
            self._write_cmd(0xA5, 0xCC)
        time.sleep_ms(100)

    def query_raw(self):
        self._write_cmd(0xA5, 0x51)

    def query_lcc(self):
        self._write_cmd(0xA5, 0x52)

    def query_processed(self):
        self._write_cmd(0xA5, 0x54)

    def query_i2c(self):
        self._write_cmd(0xAA, 0xF5)

    def set_baudrate(self, rate):
        if rate == 9600:
            self._write_cmd(0xA5, 0xAE)
        elif rate == 115200:
            self._write_cmd(0xA5, 0xAF)
        else:
            raise ValueError('baudrate must be 9600 or 115200')

    def calibrate_white_balance(self):
        self._write_cmd(0xA5, 0xBB)

    def set_i2c_addr(self, addr):
        if addr >= 0 and addr <= 127:
            self._write_cmd(0xAA, addr)
        else:
            raise ValueError('addr must be between 0 to 127')

    def set_integration_time(self, itime):
        if itime == 700:
            self._write_cmd(0xA5, 0x58)
        elif itime == 154:
            self._write_cmd(0xA5, 0x59)
        elif itime == 100:
            self._write_cmd(0xA5, 0x5A)
        elif itime == 24:
            self._write_cmd(0xA5, 0x5B)
        elif itime == 2.4:
            self._write_cmd(0xA5, 0x5C)
        else:
            raise ValueError('time must be 700, 154, 100, 24, or 2.4')
        time.sleep_ms(100)

    def calibrate_white(self):
        for i in range(4):
            self.cal[i][1] = self.raw[i]

    def calibrate_black(self):
        for i in range(4):
            self.cal[i][0] = self.raw[i]

    def get_raw(self):
        return self.raw

    def get_lcc(self):
        return self.lcc

    def get_processed(self):
        return self.processed

    def get_calibrated(self):
        cal = [0, 0, 0, 0]
        for i in range(4):
            cal[i] = 255 * (self.raw[i] - self.cal[i][0]) // (self.cal[i][1] - self.cal[i][0])
        return cal

    def get_i2c_addr(self):
        return self.i2c_addr >> 1