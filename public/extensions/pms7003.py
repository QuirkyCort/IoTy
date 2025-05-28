import struct
import time
from micropython import const

SYNC1 = const(0x42)
SYNC2 = const(0x4D)

CMD_ACTIVE = const(b'\x42\x4D\xE1\x00\x01\x01\x71')
CMD_PASSIVE = const(b'\x42\x4D\xE1\x00\x00\x01\x70')
CMD_SLEEP = const(b'\x42\x4D\xE4\x00\x00\x01\x73')
CMD_WAKE = const(b'\x42\x4D\xE4\x00\x01\x01\x74')
CMD_READ = const(b'\x42\x4D\xE2\x00\x00\x01\x71')


class PMS7003:
    def __init__(self, uart):
        self.uart = uart
        self.buf = bytearray(32)
        self.ptr = 0
        self.frame_length = 28
        self.measurements = {
            'PM1.0': -1,
            'PM2.5': -1,
            'PM10': -1,
            'PM1.0_ATM': -1,
            'PM2.5_ATM': -1,
            'PM10_ATM': -1,
            'PM0.3_COUNT': -1,
            'PM0.5_COUNT': -1,
            'PM1.0_COUNT': -1,
            'PM2.5_COUNT': -1,
            'PM5.0_COUNT': -1,
            'PM10_COUNT': -1
        }

    def update(self):
        new_measurement = False
        while self.uart.any():
            chars = self.uart.read(100)

            for char in chars:
                if self.ptr == 0 and char == SYNC1:
                    self.buf[0] = char
                    self.ptr += 1
                elif self.ptr == 1 and char == SYNC2:
                    self.buf[1] = char
                    self.ptr += 1
                else:
                    self.buf[self.ptr] = char
                    self.ptr += 1
                    if self.ptr == 4:
                        self.frame_length = (self.buf[2] << 8) | self.buf[3]
                    elif self.ptr == self.frame_length + 4:
                        if self.frame_length == 28:
                            new_measurement = self._parse_measurement()
                        self.ptr = 0
        return new_measurement

    def _checksum_correct(self):
        checksum = 0
        for i in range(30):
            checksum += self.buf[i]
        given_checksum = (self.buf[30] << 8) | self.buf[31]

        return checksum == given_checksum

    def _parse_measurement(self):
        if not self._checksum_correct():
            return False
        data = struct.unpack('>16H', self.buf)
        self.measurements['PM1.0'] = data[2]
        self.measurements['PM2.5'] = data[3]
        self.measurements['PM10'] = data[4]
        self.measurements['PM1.0_ATM'] = data[5]
        self.measurements['PM2.5_ATM'] = data[6]
        self.measurements['PM10_ATM'] = data[7]
        self.measurements['PM0.3_COUNT'] = data[8]
        self.measurements['PM0.5_COUNT'] = data[9]
        self.measurements['PM1.0_COUNT'] = data[10]
        self.measurements['PM2.5_COUNT'] = data[11]
        self.measurements['PM5.0_COUNT'] = data[12]
        self.measurements['PM10_COUNT'] = data[13]
        return True

    def get_measurements(self):
        return self.measurements

    def set_active_mode(self):
        self.uart.write(CMD_ACTIVE)

    def set_passive_mode(self):
        self.uart.write(CMD_PASSIVE)

    def sleep(self):
        self.uart.write(CMD_SLEEP)

    def wake(self):
        self.uart.write(CMD_WAKE)

    def read(self, timeout=1000):
        self.uart.write(CMD_READ)
        timeout += time.ticks_ms()
        while time.ticks_ms() < timeout:
            if self.update():
                return self.measurements
        return None