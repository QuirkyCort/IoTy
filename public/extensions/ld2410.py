import struct
import time
from micropython import const
import binascii

CMD_HEAD = const(b'\xfd\xfc\xfb\xfa')
CMD_TAIL = const(b'\x04\x03\x02\x01')
REPORT_HEAD = const(b'\xf4\xf3\xf2\xf1')
REPORT_TAIL = const(b'\xf8\xf7\xf6\xf5')
REPORT_DATA_HEAD = const(b'\xaa')
REPORT_DATA_TAIL = const(b'\x55\x00')

ENABLE_CONFIG_CMD = const(0xff)
END_CONFIG_CMD = const(0xfe)
SET_MAX_CMD = const(0x60)
READ_PARAMETER_CMD = const(0x61)
ENABLE_ENGINEERING_CMD = const(0x62)
END_ENGINEERING_CMD = const(0x63)
SET_SENSITIVITY_CMD = const(0x64)
READ_FIRMWARE_VERSION_CMD = const(0xa0)
SET_BAUDRATE_CMD = const(0xa1)
FACTORY_RESET_CMD = const(0xa2)
RESTART_CMD = const(0xa3)

BAUDRATE_9600 = const(1)
BAUDRATE_19200 = const(2)
BAUDRATE_38400 = const(3)
BAUDRATE_57600 = const(4)
BAUDRATE_115200 = const(5)
BAUDRATE_230400 = const(6)
BAUDRATE_256000 = const(7)
BAUDRATE_460800 = const(8)

class LD2410:
    def __init__(self, uart):
        self.uart = uart
        self.buf = b''

        self.target_state = 0
        self.moving_distance = 0
        self.moving_energy = 0
        self.stationary_distance = 0
        self.stationary_energy = 0
        self.detection_distance = 0

        self.max_moving_gate = 0
        self.max_stationary_gate = 0
        self.gate_moving_energy = [0] * 9
        self.gate_stationary_energy = [0] * 9

        self.ack_cmd = 0
        self.ack_data = b''

    def update(self):
        while self.uart.any():
            self.buf += self.uart.read(1)
            if len(self.buf) >= 10 and (self.buf[-4:] == CMD_TAIL or self.buf[-4:] == REPORT_TAIL):
                self._parse_buffer()

    def _parse_buffer(self):
        while True:
            if self.buf[:4] == CMD_HEAD:
                self._parse_ack()
            elif self.buf[:4] == REPORT_HEAD:
                self._parse_report()
            if len(self.buf) < 10:
                break
            self.buf = self.buf[1:]

    def _parse_ack(self):
        data_length = self.buf[4] + (self.buf[5] << 8)
        if len(self.buf) < 10 + data_length:
            return

        self.ack_cmd = self.buf[6] + ((self.buf[7] & 0xfe) << 8 )
        self.ack_data = self.buf[8:8+data_length-2]
        self.buf = self.buf[10+data_length:]

    def _parse_report(self):
        data_length = self.buf[4] + (self.buf[5] << 8)
        if len(self.buf) < 10 + data_length:
            return

        if self.buf[6] == 0x01:
            self._parse_engineering_data(self.buf[7:7+data_length-1])
        elif self.buf[6] == 0x02:
            self._parse_target_data(self.buf[7:7+data_length-1])

        self.buf = self.buf[10+data_length:]

    def _parse_engineering_data(self, data):
        if data[0:1] != REPORT_DATA_HEAD or data[-2:] != REPORT_DATA_TAIL:
            return

        self._parse_target_data(data)
        self.max_moving_gate = data[10]
        self.max_stationary_gate = data[11]
        for i in range(9):
            self.gate_moving_energy[i] = data[12 + i]
        for i in range(9):
            self.gate_stationary_energy[i] = data[21 + i]

    def _parse_target_data(self, data):
        if data[0:1] != REPORT_DATA_HEAD or data[-2:] != REPORT_DATA_TAIL:
            return

        self.target_state = data[1]
        self.moving_distance = data[2] + (data[3] << 8)
        self.moving_energy = data[4]
        self.stationary_distance = data[5] + (data[6] << 8)
        self.stationary_energy = data[7]
        self.detection_distance = data[8] + (data[9] << 8)

    def _send_cmd(self, cmd, data):
        cmd_bytes = struct.pack('<H', cmd)
        data_length = struct.pack('<H', len(cmd_bytes) + len(data))
        self.uart.write(CMD_HEAD + data_length + cmd_bytes + data + CMD_TAIL)
        return self._wait_for_ack(cmd)

    def _wait_for_ack(self, cmd, timeout=100):
        self.ack_cmd = 0
        start_time = time.ticks_ms()
        while time.ticks_diff(time.ticks_ms(), start_time) < timeout:
            self.update()
            if self.ack_cmd == cmd:
                if self.ack_data[:2] == b'\x00\x00':
                    return True
                else:
                    return False
        return False

    def enable_config(self):
        return self._send_cmd(ENABLE_CONFIG_CMD, b'0100')

    def disable_config(self):
        return self._send_cmd(END_CONFIG_CMD, b'')

    def set_max_values(self, moving_gate, stationary_gate, inactivity_time):
        data = struct.pack('<HIHIHI', 0, moving_gate, 1, stationary_gate, 2, inactivity_time)
        return self._send_cmd(SET_MAX_CMD, data)

    def get_parameter(self):
        if self._send_cmd(READ_PARAMETER_CMD, b'') == False:
            return False
        return self.ack_data

    def enable_engineering_mode(self):
        return self._send_cmd(ENABLE_ENGINEERING_CMD, b'')

    def disable_engineering_mode(self):
        return self._send_cmd(END_ENGINEERING_CMD, b'')

    def set_gate_sensitivity(self, gate, moving, stationary):
        data = struct.pack('<HIHIHI', 0, gate, 1, moving, 2, stationary)
        return self._send_cmd(SET_SENSITIVITY_CMD, data)

    def get_firmware_version(self):
        if self._send_cmd(READ_FIRMWARE_VERSION_CMD, b'') == False:
            return False
        return struct.unpack('<HHI', self.ack_data[2:])

    def set_baudrate(self, baudrate):
        data = struct.pack('<H', baudrate)
        return self._send_cmd(SET_BAUDRATE_CMD, data)

    def factory_reset(self):
        return self._send_cmd(FACTORY_RESET_CMD, b'')

    def restart(self):
        return self._send_cmd(RESTART_CMD, b'')

    def get_target_data(self):
        return (self.target_state, self.moving_distance, self.moving_energy, self.stationary_distance, self.stationary_energy, self.detection_distance)

    def get_engineering_data(self):
        return (self.max_moving_gate, self.max_stationary_gate, self.gate_moving_energy, self.gate_stationary_energy)
