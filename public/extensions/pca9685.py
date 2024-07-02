from time import sleep_us
from micropython import const

_MODE1 = const(0x00)
_LED0_ON_L = const(0x06)
_PRE_SCALE = const(0xFE)
_MODE1_SLEEP_BIT = const(4)
_MODE1_AI_BIT = const(5)
_MODE1_RESTART_BIT = const(7)
_OSC_FREQ = const(25000000)
_SERVO_FREQ = const(50)

class PCA9685:
    def __init__(self, i2c, addr=64):
        self.i2c = i2c
        self.addr = addr
        self.auto_increment(True)
        self.set_frequency(_SERVO_FREQ)

    def auto_increment(self, mode):
        data = self.i2c.readfrom_mem(self.addr, _MODE1, 1)[0]
        if mode:
            data |= 1 << _MODE1_AI_BIT
        else:
            data &= ~(1 << _MODE1_AI_BIT)
        self.i2c.writeto_mem(self.addr, _MODE1, bytes([data]))

    def sleep(self):
        data = self.i2c.readfrom_mem(self.addr, _MODE1, 1)[0]
        data |= 1 << _MODE1_SLEEP_BIT
        self.i2c.writeto_mem(self.addr, _MODE1, bytes([data]))

    def wake(self):
        data = self.i2c.readfrom_mem(self.addr, _MODE1, 1)[0]
        data &= ~(1 << _MODE1_SLEEP_BIT)
        data &= ~(1 << _MODE1_RESTART_BIT)
        self.i2c.writeto_mem(self.addr, _MODE1, bytes([data]))

        if data & ~(1 << _MODE1_RESTART_BIT):
            sleep_us(500)
            data |= 1 << _MODE1_RESTART_BIT
            self.i2c.writeto_mem(self.addr, _MODE1, bytes([data]))

    def set_frequency(self, freq):
        if freq < 24 or freq > 1526:
            raise ValueError('Frequency must be between 24Hz to 1526Hz')

        self.pre_scale = round(_OSC_FREQ / (4096 * freq)) - 1
        self.sleep()
        self.i2c.writeto_mem(self.addr, _PRE_SCALE, bytes([self.pre_scale]))
        self.wake()

    def output(self, channel, on_time, off_time):
        if type(on_time) != int or type(off_time) != int:
            raise ValueError('on_time and off_time must be int')
        if on_time < 0 or on_time > 4095:
            raise ValueError('on_time must be between 0 to 4095')
        if off_time < 0 or off_time > 4095:
            raise ValueError('off_time must be between 0 to 4095')

        channel = _LED0_ON_L + channel * 4
        buf = bytes((on_time & 0xFF, on_time >> 8, off_time & 0xFF, off_time >> 8))
        self.i2c.writeto_mem(self.addr, channel, buf)

    def pwm(self, channel, duty):
        self.output(channel, 0, round(duty))

    def servo_us(self, channel, us):
        pulse_length = (self.pre_scale + 1) * 1000000 / _OSC_FREQ
        duty = us / pulse_length
        self.pwm(channel, duty)

    def servo_deg(self, channel, deg):
        us = 1000 + deg * 1000 / 180
        self.servo_us(channel, us)
