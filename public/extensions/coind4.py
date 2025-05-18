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
        self.uart_buf = bytearray(100)
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
            for _ in range(420):
                if strength:
                    self.measurements.append([0.0, -1, 0])
                else:
                    self.measurements.append([0.0, -1])

    def update(self):
        buf = self.buf
        ptr = self.ptr
        uart_buf = self.uart_buf
        while self.uart.any():
            count = self.uart.readinto(uart_buf)

            for i in range(count):
                char = uart_buf[i]
                if ptr == 0:
                    if char == DATA_HEADER[0]:
                        buf[0] = char
                        ptr += 1
                elif ptr == 1:
                    if char == DATA_HEADER[1]:
                        buf[1] = char
                        ptr += 1
                    else:
                        ptr = 0
                else:
                    buf[ptr] = char
                    ptr += 1
                    if ptr == HEADER_LENGTH:
                        self.sample_count = buf[3]
                        if self.sample_count > 25 or self.sample_count == 0:
                            ptr = 0
                    elif ptr == HEADER_LENGTH + self.sample_count * 3:
                        ptr = 0
                        if self._checksum_correct():
                            self.ptr = ptr
                            return self._parse_frame()
        self.ptr = ptr
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
        integer = self.integer
        strength = self.strength
        buf = self.buf
        measurements = self.measurements
        measurement_ptr = self.measurement_ptr

        start_angle, end_angle = struct.unpack('<HH', buf[4:8])
        start_angle = start_angle >> 1
        end_angle = end_angle >> 1
        if buf[2] & 1:
            self.speed = (buf[2] >> 1) / 10

        if start_angle < self._prev_start_angle and integer == False:
            measurement_ptr = 0
        self._prev_start_angle = start_angle

        if self.sample_count > 1:
            angle_step = (end_angle - start_angle) // (self.sample_count - 1)
        else:
            angle_step = 0

        for i in range(self.sample_count):
            start_index = HEADER_LENGTH + i * 3
            # exposure_mode = 0x03 & buf[start_index]
            distance = buf[start_index+1] >> 2 | buf[start_index+2] << 6
            angle = start_angle + i * angle_step
            if integer:
                measurements[(angle // 64) % 360] = distance
            else:
                measurements[measurement_ptr][0] = angle / 64
                measurements[measurement_ptr][1] = distance
                if strength:
                    measurements[measurement_ptr][2] = buf[start_index+2] >> 2 | (0x03 & buf[start_index+1]) << 6
                measurement_ptr += 1
        self.measurement_ptr = measurement_ptr

        if end_angle > 22080: # 345 * 64
            if not integer:
                for i in range(measurement_ptr, len(measurements)):
                    measurements[i][1] = -1
            return True
        return False

    def _checksum_correct(self):
        buf = self.buf
        cs = buf[1] ^ buf[3] ^ buf[5] ^ buf[7]
        for i in range(self.sample_count):
            cs ^= buf[12+i*3]
        if cs != buf[9]:
            return False

        cs = buf[0] ^ buf[2] ^ buf[4] ^ buf[6]
        for i in range(self.sample_count):
            cs ^= buf[10+i*3]
            cs ^= buf[11+i*3]
        if cs != buf[8]:
            return False

        return True
