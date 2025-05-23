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
        self.uart_buf = bytearray(100)
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
                    if char == HEADER_SYNC:
                        buf[0] = char
                        ptr += 1
                else:
                    buf[ptr] = char
                    ptr += 1
                    if ptr == HEADER_LENGTH:
                        if self._header_valid():
                            self.payload_length = struct.unpack('>H', buf[6:8])[0]
                        else:
                            ptr = 0
                    elif ptr == HEADER_LENGTH + self.payload_length + 2:
                        ptr = 0
                        if self._checksum_correct():
                            self.ptr = ptr
                            return self._parse_frame()
        self.ptr = ptr
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
        measurements = self.measurements
        measurement_ptr = self.measurement_ptr
        buf = self.buf
        integer = self.integer
        strength = self.strength
        self.speed = buf[8]
        offset_angle, start_angle = struct.unpack('>HH', buf[9:13])
        start_angle /= 100

        if start_angle < self._prev_start_angle and integer == False:
            measurement_ptr = 0
        self._prev_start_angle = start_angle

        count = (self.payload_length - 5) / 3
        angle_step = FRAME_ANGLE / count
        for i in range(count):
            angle = start_angle + i * angle_step
            strength_val, distance = struct.unpack('>BH', buf[13+i*3:16+i*3])
            if integer:
                measurements[round(angle)] = distance >> 2
            else:
                measurements[measurement_ptr][0] = angle
                measurements[measurement_ptr][1] = distance >> 2
                if strength:
                    measurements[measurement_ptr][2] = strength_val
                measurement_ptr += 1
        self.measurement_ptr = measurement_ptr
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
