import struct
import time
from micropython import const
import binascii

CMD_ENTER_AT = const(b'+++')
CMD_EXIT_AT = const(b'AT+EXIT')
CMD_ROLE = const(b'AT+ROLE')
CMD_CH = const(b'AT+CH')
CMD_BAUD = const(b'AT+BAUD')
CMD_POWER = const(b'AT+POWER')
CMD_SLEEP = const(b'AT+SLEEP')
CMD_RESPONDER_NUM = const(b'AT+RESPONDER_NUM')
CMD_SRCADDR = const(b'AT+SRCADDR')
CMD_DSTADDR = const(b'AT+DSTADDR')
CMD_INTV = const(b'AT+INTV')
CMD_RESTORE = const(b'AT+RESTORE')
CMD_RESET = const(b'AT+RESET')
CMD_VERSION = const(b'AT+VERSION')


class EWM550:
    def __init__(self, uart):
        self.uart = uart
        self.uart_buf = bytearray(25)
        self.buf = bytearray(25)
        self.ptr = 0
        self.cmd_buffer = []
        self.distances = {}
        
    def _enter_at_mode(self):
        self.uart.write(CMD_ENTER_AT)
        time.sleep_ms(100)
        _ = self.uart.read()

    def _get_setting(self, cmd):
        self._enter_at_mode()
        self.uart.write(cmd + b'=?')
        time.sleep_ms(100)
        response = self.uart.read()
        self.uart.write(CMD_EXIT_AT)
        time.sleep_ms(250)
        _ = self.uart.read()
        if response is None:
            raise RuntimeError(f'No response received for {cmd.decode()} command')
        try:
            return response.decode()
        except:
            raise RuntimeError(f'Invalid response for {cmd.decode()} command')

    def set_role(self, role):
        if role not in [0, 1, 2]:
            raise ValueError('Role must be 0 (Tag), 1 (Base Station), or 2 (Transmode)')
        self.cmd_buffer.append(CMD_ROLE + b'=' + str(role).encode())

    def get_role(self):
        try:
            response = self._get_setting(CMD_ROLE).split(':')[1]
            return int(response)
        except ValueError:
            raise RuntimeError('Invalid response for get_role command')

    def set_channel(self, channel):
        if channel not in [5, 9]:
            raise ValueError('Channel must be 5 or 9')
        self.cmd_buffer.append(CMD_CH + b'=' + str(channel).encode())
    
    def get_channel(self):
        try:
            response = self._get_setting(CMD_CH).split(':')[1]
            return int(response)
        except ValueError:
            raise RuntimeError('Invalid response for get_channel command')

    def set_baudrate(self, baudrate):
        if baudrate not in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]:
            raise ValueError('Invalid baudrate. Must be between 0 and 9.')
        self.cmd_buffer.append(CMD_BAUD + b'=' + str(baudrate).encode())

    def get_baudrate(self):
        try:
            response = self._get_setting(CMD_BAUD).split(':')[1]
            return int(response)
        except ValueError:
            raise RuntimeError('Invalid response for get_baudrate command')

    def set_power(self, power):
        if power not in [0, 1, 2, 3]:
            raise ValueError('Power must be between 0 and 3')
        self.cmd_buffer.append(CMD_POWER + b'=' + str(power).encode())

    def get_power(self):
        try:
            response = self._get_setting(CMD_POWER).split(':')[1]
            return int(response)
        except ValueError:
            raise RuntimeError('Invalid response for get_power command')

    def set_sleep(self, sleep):
        if sleep not in [0, 1]:
            raise ValueError('Sleep must be 0 (power-down) or 1 (periodic sleep)')
        self.cmd_buffer.append(CMD_SLEEP + b'=' + str(sleep).encode())

    def set_responder_num(self, num):
        if num not in [1, 2, 3, 4, 5]:
            raise ValueError('Responder number must be between 1 and 5')
        self.cmd_buffer.append(CMD_RESPONDER_NUM + b'=' + str(num).encode())

    def get_responder_num(self):
        try:
            response = self._get_setting(CMD_RESPONDER_NUM).split(':')[1]
            return int(response)
        except ValueError:
            raise RuntimeError('Invalid response for get_responder_num command')

    def set_srcaddr(self, addr):
        if not isinstance(addr, str):
            raise ValueError('Source address must be a string')
        if len(addr) != 4:
            raise ValueError('Source address must be 4 bytes')
        for byte in addr:
            try:
                int(byte, 16)
            except:
                raise ValueError('Each byte of source address must be a valid hexadecimal value')
        self.cmd_buffer.append(CMD_SRCADDR + b'=' + addr.encode())

    def get_srcaddr(self):
        try:
            response = self._get_setting(CMD_SRCADDR).split(':')[1].strip()
        except:
            raise RuntimeError('Invalid response for get_srcaddr command')
        if len(response) != 4:
            raise RuntimeError('Invalid response for get_srcaddr command')
        return response

    def set_dstaddr(self, addr):
        if not isinstance(addr, str):
            raise ValueError('Destination address must be a string')
        if len(addr) != 20:
            raise ValueError('Destination address must be 20 bytes')
        for byte in addr:
            try:
                int(byte, 16)
            except:
                raise ValueError('Each byte of destination address must be a valid hexadecimal value')
        self.cmd_buffer.append(CMD_DSTADDR + b'=' + addr.encode())

    def get_dstaddr(self):
        response = self._get_setting(CMD_DSTADDR)
        rows = response.split()
        if len(rows) != 5:
            raise RuntimeError('Invalid response for get_dstaddr command')
        dstaddr = ''
        try:
            for row in rows:
                dstaddr += row.split(':')[1].strip()
        except:
            raise RuntimeError('Invalid response for get_dstaddr command')
        return dstaddr

    def set_interval(self, interval):
        if not isinstance(interval, int):
            raise ValueError('Interval must be an integer')
        if interval < 30 or interval > 2000:
            raise ValueError('Interval must be between 30 and 2000 milliseconds')
        self.cmd_buffer.append(CMD_INTV + b'=' + str(interval).encode())

    def get_interval(self):
        try:
            response = self._get_setting(CMD_INTV).split(':')[1]
            return int(response)
        except ValueError:
            raise RuntimeError('Invalid response for get_interval command')

    def get_version(self):
        response = self._get_setting(CMD_VERSION)
        return response

    def write_settings(self):
        self._enter_at_mode()
        for cmd in self.cmd_buffer:
            self.uart.write(cmd)
            time.sleep_ms(100)
            _ = self.uart.read()
        self.uart.write(CMD_RESET)
        time.sleep_ms(500)
        _ = self.uart.read()
        self.cmd_buffer = []

    def restore_factory_settings(self):
        self.uart.write(CMD_ENTER_AT)
        time.sleep_ms(100)
        _ = self.uart.read()
        self.uart.write(CMD_RESTORE)
        time.sleep_ms(100)
        _ = self.uart.read()
        self.uart.write(CMD_RESET)
        time.sleep_ms(100)
        _ = self.uart.read()

    def update(self):
        new_data = False
        while self.uart.any():
            count = self.uart.readinto(self.uart_buf)
            if count is None:
                break
            for i in range(count):
                char = self.uart_buf[i]
                if self.ptr < len(self.buf):
                    self.buf[self.ptr] = char
                    self.ptr += 1
                else:
                    self.ptr = 0 # Buffer overflow, reset pointer
                if char == 0x0A:  # Newline character
                    line = self.buf[:self.ptr].decode().split(',')
                    self.ptr = 0
                    if len(line) >= 3:
                        addr = line[1]
                        try:
                            distance = int(line[2].split('c')[0])
                        except ValueError:
                            continue
                        snr = 0
                        if len(line) == 4:
                            try:
                                snr = int(line[3].split('d')[0])
                            except ValueError:
                                continue
                        timestamp = time.ticks_ms()
                        self.distances[addr] = [distance, snr, timestamp]
                        new_data = True

        return new_data

    def get_distances(self):
        return self.distances

    def reset_distances(self):
        self.distances = {}
