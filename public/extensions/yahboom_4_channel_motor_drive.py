class UARTDriver:
    def __init__(self, uart):
        self.uart = uart
        self.uart_buf = bytearray(100)
        self.buf = bytearray(60)
        self.ptr = 0
        self.target_speed = [b'0',b'0',b'0',b'0']
        self.pwm = [b'0',b'0',b'0',b'0']
        self.steps = [0,0,0,0]
        self.pulses_per_10ms = [0,0,0,0]
        self.speed = [0,0,0,0]
        self.settings = {
            'motor_model': 0,
            'deadzone': 0,
            'pulse_per_revolution': 0,
            'gear_ratio': 0,
            'wheel_diameter': 0,
            'pid': [0, 0, 0],
        }
        self.settings_received = False

    def update(self):
        buf = self.buf
        ptr = self.ptr
        uart_buf = self.uart_buf
        while self.uart.any():
            count = self.uart.readinto(uart_buf)
            for i in range(count):
                char = uart_buf[i]
                if char == 35 or char == 10: # ASCII for '#' or '\n'
                    if ptr > 6:
                        self._parse_line(ptr)
                    ptr = 0
                else:
                    buf[ptr] = char
                    ptr += 1
                    if ptr >= len(buf):
                        ptr = 0
        self.ptr = ptr

    def _parse_line(self, ptr):
        if self.buf[1:5] == b'MAll':
            self._parse_encoder(ptr)
        elif self.buf[1:5] == b'MTEP':
            self._parse_pulses_per_10ms(ptr)
        elif self.buf[1:5] == b'MSPD':
            self._parse_speed(ptr)
        elif self.buf[0:10] == b'Motor_type':
            self.settings['motor_model'] = int(self.buf[11:ptr])
        elif self.buf[0:9] == b'Dead_Zone':
            self.settings['deadzone'] = int(self.buf[10:ptr])
        elif self.buf[0:10] == b'Pulse_Line':
            self.settings['pulse_per_revolution'] = int(self.buf[11:ptr])
        elif self.buf[0:11] == b'Pulse_Phase':
            self.settings['gear_ratio'] = int(self.buf[12:ptr])
        elif self.buf[0:14] == b'wheel_diameter':
            self.settings['wheel_diameter'] = float(self.buf[15:ptr])
        elif self.buf[0:2] == b'P:':
            parts = self.buf[0:ptr].split(b' ')
            for part in parts:
                value = part.split(b':')
                if len(value) == 2:
                    try:
                        if value[0] == b'P':
                            self.settings['pid'][0] = float(value[1])
                        elif value[0] == b'I':
                            self.settings['pid'][1] = float(value[1])
                        elif value[0] == b'D':
                            self.settings['pid'][2] = float(value[1])
                    except:
                        pass
            self.settings_received = True

    def _parse_encoder(self, ptr):
        parts = self.buf[6:ptr].split(b',')
        if len(parts) < 4:
            return
        try:
            self.steps = [int(parts[0]), int(parts[1]), int(parts[2]), int(parts[3])]
        except:
            pass

    def _parse_pulses_per_10ms(self, ptr):
        parts = self.buf[6:ptr].split(b',')
        if len(parts) < 4:
            return
        try:
            self.pulses_per_10ms = [int(parts[0]), int(parts[1]), int(parts[2]), int(parts[3])]
        except:
            pass

    def _parse_speed(self, ptr):
        parts = self.buf[6:ptr].split(b',')
        if len(parts) < 4:
            return
        try:
            self.speed = [float(parts[0]), float(parts[1]), float(parts[2]), float(parts[3])]
        except:
            pass

    def get_settings(self):
        self.settings_received = False
        self.uart.write(b'$read_flash#')
        while not self.settings_received:
            self.update()
        return self.settings

    def set_motor_model(self, model):
        if model < 1 or model > 4:
            raise ValueError('Model must be between 1 and 4')
        self.uart.write(b'$mtype:' + bytes(str(model), 'utf-8') + b'#')

    def set_deadzone(self, deadzone):
        if deadzone < 0 or deadzone > 3600:
            raise ValueError('Deadzone must be between 0 and 3600')
        self.uart.write(b'$deadzone:' + bytes(str(deadzone), 'utf-8') + b'#')

    def set_pulse_per_revolution(self, pulse):
        if pulse < 1 or pulse > 65535:
            raise ValueError('Pulse per revolution must be between 1 and 65535')
        self.uart.write(b'$mline:' + bytes(str(pulse), 'utf-8') + b'#')

    def set_gear_ratio(self, ratio):
        if ratio < 1 or ratio > 65535:
            raise ValueError('Gear ratio must be between 1 and 65535')
        self.uart.write(b'$mphase:' + bytes(str(ratio), 'utf-8') + b'#')

    def set_wheel_diameter(self, diameter):
        self.uart.write(b'$wdiameter:' + bytes(str(diameter), 'utf-8') + b'#')

    def set_pid(self, p, i, d):
        self.uart.write(b'$MPID:' + bytes(str(p), 'utf-8') + b',' + bytes(str(i), 'utf-8') + b',' + bytes(str(d), 'utf-8') + b'#')

    def reset_to_default(self):
        self.uart.write(b'$flash_reset#')

    def _set_speed(self):
        self.uart.write(b'$spd:' + self.target_speed[0] + b',' + self.target_speed[1] + b',' + self.target_speed[2] + b',' + self.target_speed[3] + b'#')

    def set_all_speed(self, motor1, motor2, motor3, motor4):
        self.target_speed = [bytes(str(motor1), 'utf-8'), bytes(str(motor2), 'utf-8'), bytes(str(motor3), 'utf-8'), bytes(str(motor4), 'utf-8')]
        self._set_speed()

    def set_speed(self, motor, speed):
        if motor < 1 or motor > 4:
            raise ValueError('Motor must be between 1 and 4')
        self.target_speed[motor - 1] = bytes(str(speed), 'utf-8')
        self._set_speed()

    def _set_pwm(self):
        self.uart.write(b'$pwm:' + self.pwm[0] + b',' + self.pwm[1] + b',' + self.pwm[2] + b',' + self.pwm[3] + b'#')

    def set_all_pwm(self, motor1, motor2, motor3, motor4):
        self.pwm = [bytes(str(motor1), 'utf-8'), bytes(str(motor2), 'utf-8'), bytes(str(motor3), 'utf-8'), bytes(str(motor4), 'utf-8')]
        self._set_pwm()

    def set_pwm(self, motor, pwm):
        if motor < 1 or motor > 4:
            raise ValueError('Motor must be between 1 and 4')
        self.pwm[motor - 1] = bytes(str(pwm), 'utf-8')
        self._set_pwm()

    def set_receive_mode(self, encoder, pulses_per_10ms, speed):
        if encoder:
            encoder = b'1'
        else:
            encoder = b'0'
        if pulses_per_10ms:
            pulses_per_10ms = b'1'
        else:
            pulses_per_10ms = b'0'
        if speed:
            speed = b'1'
        else:
            speed = b'0'
        self.uart.write(b'$upload:' + encoder + b',' + pulses_per_10ms + b',' + speed + b'#')

    def get_steps(self):
        return self.steps

    def get_pulses_per_10ms(self):
        return self.pulses_per_10ms

    def get_speed(self):
        return self.speed
