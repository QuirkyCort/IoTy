import struct
from micropython import const

MEASUREMENT_SYNC = const(0xFA)
DATA_INVALID = const(2)
STRENGTH_WARNING = const(1)

class LDS02RR:
    def __init__(self, uart):
        self.uart = uart
        self.distances = [-1] * 360
        self.strengths = [-1] * 360
        self.buf = bytearray(22)
        self.ptr = 0
        self.speed = 0

    def update(self):
        last_read = None
        while self.uart.any():
            char = self.uart.read(1)[0]

            if self.ptr == 0:
                if char == MEASUREMENT_SYNC:
                    self.buf[0] = char
                    self.ptr += 1
            else:
                self.buf[self.ptr] = char
                self.ptr += 1
                if self.ptr == 22:
                    last_read = self._parse_measurement()
                    self.ptr = 0
        return last_read

    def get_distances(self):
        return self.distances

    def get_strengths(self):
        return self.strengths

    def get_rpm(self):
        return self.speed / 64

    def _checksum_correct(self):
        checksum = 0
        values = struct.unpack('<HHHHHHHHHH', self.buf)
        for value in values:
            checksum = (checksum << 1) + value
            checksum %= 0xFFFFFFFF
        calculated = (checksum + (checksum >> 15)) & 0x7FFF
        given = struct.unpack('<H', self.buf[-2:])[0]

        return calculated == given

    def _parse_sample(self, index):
        flags = self.buf[index + 1] >> 6
        distance = ((self.buf[index + 1] & 0x3f) << 8) | self.buf[index]
        strength = (self.buf[index + 3] << 8) | self.buf[index + 2]
        return distance, strength, flags

    def _parse_measurement(self):
        if not self._checksum_correct():
            return None
        sample_index = self.buf[1] - 0xa0
        self.speed = struct.unpack('h', self.buf[2:4])[0]
        for i in range(4):
            index = 4 + i * 4
            distance, strength, flags = self._parse_sample(index)
            pos = sample_index * 4 + i
            if flags & DATA_INVALID:
                self.distances[pos] = distance
                self.strengths[pos] = strength
            else:
                self.distances[pos] = -1
                self.strengths[pos] = -1
        return pos