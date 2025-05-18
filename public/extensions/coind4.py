import struct
from micropython import const

CMD_HEADER = const(b'\xAA\x55')
DATA_HEADER = const(b'\xAA\x55')
HEADER_LENGTH = const(10)
FRAME_LENGTH = const(85)

class CoinD4:
    def __init__(self, uart, strength=False, integer=True):
        self.uart = uart
        self.strength = strength
        self.integer = integer
        self.buf = bytearray(FRAME_LENGTH)
        self.ptr = 0
        self.speed = 0
        self.measurements = []
        self.sample_count = 0
        self.measurement_ptr = 0
        self._prev_start_angle = 0
        if self.integer:
            for _ in range(360):
                self.measurements.append(-1)
        else:
            for _ in range(450):
                if strength:
                    self.measurements.append([0.0, -1, 0])
                else:
                    self.measurements.append([0.0, -1])

    def update(self):
        while self.uart.any():
            chars = self.uart.read(100)

            for char in chars:
                if self.ptr == 0:
                    if char == DATA_HEADER[0]:
                        self.buf[0] = char
                        self.ptr += 1
                elif self.ptr == 1:
                    if char == DATA_HEADER[1]:
                        self.buf[1] = char
                        self.ptr += 1
                    else:
                        self.ptr = 0
                else:
                    self.buf[self.ptr] = char
                    self.ptr += 1
                    if self.ptr == HEADER_LENGTH:
                        self.sample_count = self.buf[3]
                        if self.sample_count > 25 or self.sample_count == 0:
                            self.ptr = 0
                    elif self.ptr == HEADER_LENGTH + self.sample_count * 3:
                        self.ptr = 0
                        if self._checksum_correct():
                            return self._parse_frame()
        return False

    def _send_cmd(self, code):
        cmd = bytearray(4)
        cmd[0:2] = CMD_HEADER
        cmd[2] = code
        cmd[3] = cmd[0] ^ cmd[1] ^ cmd[2]
        self.uart.write(cmd)

    def start(self):
        self._send_cmd(0xF0)

    def set_high_exposure(self):
        self._send_cmd(0xF1)

    def set_low_exposure(self):
        self._send_cmd(0xF2)

    def stop(self):
        self._send_cmd(0xF5)

    def get_measurements(self):
        return self.measurements

    def get_rpm(self):
        return self.speed * 60

    def _parse_frame(self):
        start_angle, end_angle = struct.unpack('<HH', self.buf[4:8])
        start_angle = start_angle >> 1
        end_angle = end_angle >> 1
        if self.buf[2] & 1:
            self.speed = (self.buf[2] >> 1) / 10

        if start_angle < self._prev_start_angle and self.integer == False:
            self.measurement_ptr = 0
        self._prev_start_angle = start_angle

        if self.sample_count > 1:
            angle_step = (end_angle - start_angle) // (self.sample_count - 1)
        else:
            angle_step = 0

        for i in range(self.sample_count):
            start_index = HEADER_LENGTH + i * 3
            # exposure_mode = 0x03 & self.buf[start_index]
            distance = self.buf[start_index+1] >> 2 | self.buf[start_index+2] << 6
            angle = start_angle + i * angle_step
            if self.integer:
                self.measurements[(angle // 64) % 360] = distance
            else:
                self.measurements[self.measurement_ptr][0] = angle / 64
                self.measurements[self.measurement_ptr][1] = distance
                if self.strength:
                    self.measurements[self.measurement_ptr][2] = self.buf[start_index+2] >> 2 | (0x03 & self.buf[start_index+1]) << 6
                self.measurement_ptr += 1

        if end_angle > 22080: # 345 * 64
            for i in range(self.measurement_ptr, len(self.measurements)):
                self.measurements[i][1] = -1
            return True
        return False

    def _checksum_correct(self):
        cs = self.buf[1] ^ self.buf[3] ^ self.buf[5] ^ self.buf[7]
        for i in range(self.sample_count):
            cs ^= self.buf[12+i*3]
        if cs != self.buf[9]:
            return False

        cs = self.buf[0] ^ self.buf[2] ^ self.buf[4] ^ self.buf[6]
        for i in range(self.sample_count):
            cs ^= self.buf[10+i*3]
            cs ^= self.buf[11+i*3]
        if cs != self.buf[8]:
            return False

        return True
