from micropython import const

ADDR = const(54)

POWER_MODE_NORMAL = const(0)
POWER_MODE_LOW1 = const(1)
POWER_MODE_LOW2 = const(2)
POWER_MODE_LOW3 = const(3)

HYSTERESIS_OFF = const(0)
HYSTERESIS_1LSB = const(1)
HYSTERESIS_2LSB = const(2)
HYSTERESIS_4LSB = const(3)

OUTPUT_ANALOG_FULL = const(0)
OUTPUT_ANALOG_REDUCED = const(1)
OUTPUT_PWM = const(2)

PWM_FREQ_115HZ = const(0)
PWM_FREQ_230HZ = const(1)
PWM_FREQ_460HZ = const(2)
PWM_FREQ_920HZ = const(3)

SLOW_FILTER_16X = const(0)
SLOW_FILTER_8X = const(1)
SLOW_FILTER_4X = const(2)
SLOW_FILTER_2X = const(3)

FAST_FILTER_THRESHOLD_SLOW_ONLY = const(0)
FAST_FILTER_THRESHOLD_6LSB = const(1)
FAST_FILTER_THRESHOLD_7LSB = const(2)
FAST_FILTER_THRESHOLD_9LSB = const(3)
FAST_FILTER_THRESHOLD_18LSB = const(4)
FAST_FILTER_THRESHOLD_21LSB = const(5)
FAST_FILTER_THRESHOLD_24LSB = const(6)
FAST_FILTER_THRESHOLD_10LSB = const(7)

WATCHDOG_OFF = const(0)
WATCHDOG_ON = const(1)

class AS5600:
    def __init__(self, i2c):
        self.i2c = i2c
        self.config()

    def config(self, power_mode=POWER_MODE_NORMAL, hysteresis=HYSTERESIS_OFF, output=OUTPUT_ANALOG_FULL, pwm_freq=PWM_FREQ_115HZ, slow_filter=SLOW_FILTER_16X, fast_filter_threshold=FAST_FILTER_THRESHOLD_SLOW_ONLY, watchdog=WATCHDOG_OFF):
        config_byte = watchdog << 5 | fast_filter_threshold << 2 | slow_filter
        config_byte2 = pwm_freq << 6 | output << 4 | hysteresis << 2 | power_mode
        self.i2c.writeto_mem(ADDR, 0x07, bytes([config_byte, config_byte2]))

    def raw_angle(self):
        data = self.i2c.readfrom_mem(ADDR, 0x0C, 2)
        return (data[0] << 8) | data[1]

    def angle(self):
        data = self.i2c.readfrom_mem(ADDR, 0x0E, 2)
        return (data[0] << 8) | data[1]

    def status(self):
        return self.i2c.readfrom_mem(ADDR, 0x0B, 1)[0] >> 3

    def agc(self):
        return self.i2c.readfrom_mem(ADDR, 0x1A, 1)[0]

    def magnitude(self):
        data = self.i2c.readfrom_mem(ADDR, 0x1B, 2)
        return (data[0] << 8) | data[1]