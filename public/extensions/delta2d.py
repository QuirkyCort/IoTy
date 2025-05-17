import struct
from micropython import const

HEADER_SYNC = const(0xAA)
HEADER_LENGTH = const(8)
PAYLOAD_LENGTH = const(101)
CRC_LENGTH = const(2)
FRAME_ANGLE = const(22.5)

class Delta2D:
    def __init__(self, uart, strength=False, integer=True):
        self.uart = uart
        self.measurements = []
        self.buf = bytearray(HEADER_LENGTH + PAYLOAD_LENGTH)
        self.strength = strength
        self.integer = integer
        self.payload_length = 0
        self.ptr = 0
        self.measurement_ptr = 0
        self.speed = 0
        self._prev_start_angle = 0
        if self.integer:
            for _ in range(360):
                self.measurements.append(-1)
        else:
            for _ in range(32 * 16):
                if strength:
                    self.measurements.append([0.0, -1.0, 0])
                else:
                    self.measurements.append([0.0, -1.0])

    def update(self):
        while self.uart.any():
            chars = self.uart.read(100)

            for char in chars:
                if self.ptr == 0:
                    if char == HEADER_SYNC:
                        self.buf[0] = char
                        self.ptr += 1
                else:
                    self.buf[self.ptr] = char
                    self.ptr += 1
                    if self.ptr == HEADER_LENGTH:
                        if self._header_valid():
                            self.payload_length = struct.unpack('>H', self.buf[6:8])[0]
                        else:
                            self.ptr = 0
                    elif self.ptr == HEADER_LENGTH + self.payload_length + 2:
                        self.ptr = 0
                        if self._checksum_correct():
                            return self._parse_frame()
        return False

    def get_measurements(self):
        return self.measurements

    def get_rpm(self):
        return self.speed * 3

    def _header_valid(self):
        return (self.buf[3] == 1
            and self.buf[4] == 0x61
            and (self.buf[5] == 0xAD or self.buf[5] == 0xAE))

    def _parse_frame(self):
        if self.buf[5] == 0xAD:
            return self._parse_measurement_frame()
        else:
            return self._parse_health_frame()

    def _parse_health_frame(self):
        self.speed = self.buf[8]
        return False

    def _parse_measurement_frame(self):
        self.speed = self.buf[8]
        offset_angle, start_angle = struct.unpack('>HH', self.buf[9:13])
        start_angle /= 100
        if start_angle < self._prev_start_angle:
            for i in range(self.measurement_ptr, len(self.measurements)):
                self.measurements[i][0] = 0.0
                self.measurements[i][1] = -1.0
                if self.strength:
                    self.measurements[i][2] = 0
            self.measurement_ptr = 0
        self._prev_start_angle = start_angle
        count = (self.payload_length - 5) / 3
        angle_step = FRAME_ANGLE / count
        for i in range(count):
            angle = start_angle + i * angle_step
            strength, distance = struct.unpack('>BH', self.buf[13+i*3:16+i*3])
            if self.integer:
                self.measurements[round(angle)] = distance >> 2
            else:
                self.measurements[self.measurement_ptr][0] = angle
                self.measurements[self.measurement_ptr][1] = distance / 4
                if self.strength:
                    self.measurements[self.measurement_ptr][2] = strength
                self.measurement_ptr += 1
        if start_angle == 337.5:
            if self.integer:
                return True
            return True
        return False

    def _checksum_correct(self):
        checksum = 0
        for i in range(HEADER_LENGTH + self.payload_length):
            checksum += self.buf[i]
        crc_offset = HEADER_LENGTH + self.payload_length
        given = struct.unpack('>H', self.buf[crc_offset:crc_offset+2])[0]
        return checksum == given
