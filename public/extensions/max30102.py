import struct
from time import sleep_ms, ticks_diff, ticks_ms

# Heartbeat detector
# From: https://github.com/kandizzy/esp32-micropython/blob/master/PPG/ppg/heartbeat.py
class HeartBeat:
    def __init__(self):
        self.AC_Max = 20
        self.AC_Min = -20

        self.AC_Signal_Current = 0
        self.AC_Signal_Previous = 0
        self.AC_Signal_min = 0
        self.AC_Signal_max = 0
        self.Average_Estimated = 0

        self.positiveEdge = 0
        self.negativeEdge = 0
        self.avg_reg = 0

        self.cbuf = [0] * 32
        self.offset = 0

        self.FIRCoeffs = [172, 321, 579, 927, 1360, 1858, 2390, 2916, 3391, 3768, 4012, 4096];

    def averageDCEstimator(self, wp, x):
        wp += ( ( ( x << 15) - wp) >> 4)
        self.avg_reg = wp
        return (wp >> 15)

    def mul16(self, x, y):
        return (x * y)

    def lowPassFIRFilter(self, din):
        self.cbuf[self.offset] = din

        z = self.mul16(self.FIRCoeffs[11], self.cbuf[(self.offset - 11) & 0x1F])

        for i in range(11):
            z += self.mul16(self.FIRCoeffs[i], self.cbuf[(self.offset - i) & 0x1F] + self.cbuf[(self.offset - 22 + i) & 0x1F])

        self.offset += 1
        self.offset %= 32 #Wrap condition

        return (int(z >> 15))

    def checkForBeat(self, sample):
        beatDetected = False

        #  Save current state
        self.AC_Signal_Previous = self.AC_Signal_Current

        #  Process next data sample
        self.Average_Estimated = self.averageDCEstimator(self.avg_reg, sample)
        self.AC_Signal_Current = self.lowPassFIRFilter(sample - self.Average_Estimated)

        #  Detect positive zero crossing (rising edge)
        if ((self.AC_Signal_Previous < 0) and (self.AC_Signal_Current >= 0)):
            self.AC_Max = self.AC_Signal_max
            self.AC_Min = self.AC_Signal_min

            self.positiveEdge = 1
            self.negativeEdge = 0
            self.AC_Signal_max = 0

            if ((self.AC_Max - self.AC_Min) > 20 and (self.AC_Max - self.AC_Min) < 1000):
              beatDetected = True

        #  Detect negative zero crossing (falling edge)
        if ((self.AC_Signal_Previous > 0) and (self.AC_Signal_Current <= 0)):
            self.positiveEdge = 0
            self.negativeEdge = 1
            self.AC_Signal_min = 0

        #  Find Maximum value in positive cycle
        if (self.positiveEdge and (self.AC_Signal_Current > self.AC_Signal_Previous)):
            self.AC_Signal_max = self.AC_Signal_Current

        #  Find Minimum value in negative cycle
        if (self.negativeEdge and (self.AC_Signal_Current < self.AC_Signal_Previous)):
            self.AC_Signal_min = self.AC_Signal_Current

        return beatDetected

    def get_AC_RMS(self):
        total = 0
        for i in range(32):
            total += self.cbuf[i] ** 2
        return (total / 32) ** 0.5

    def get_DC(self):
        return self.Average_Estimated

# Sensor class
class MAX30102:
    def __init__(self, i2c, addr=87, red_led=0x7F, ir_led=0x7F, buf_len=100):
        self.i2c = i2c
        self.addr = addr

        self.read_succeeded = False

        self.red_beat = HeartBeat()
        self.ir_beat = HeartBeat()
        self.last_beat = 0
        self.bpm = 0

        self.reset()

        fifo_cfg = 0b011 << 5 # 8 samples avg
        fifo_cfg |= 0b1 << 4 # enable rollover
        self.i2c.writeto_mem(self.addr, 0x08, struct.pack('B', fifo_cfg))

        mode_cfg = 0b011 # Red & IR
        self.i2c.writeto_mem(self.addr, 0x09, struct.pack('B', mode_cfg))

        spo2_cfg = 0b11 << 5 # 16384 adc range
        spo2_cfg |= 0b011 << 2 # 400Hz
        spo2_cfg |= 0b11 # 411us pulse width
        self.i2c.writeto_mem(self.addr, 0x0A, struct.pack('B', spo2_cfg))

        self.i2c.writeto_mem(self.addr, 0x0C, struct.pack('B', ir_led))
        self.i2c.writeto_mem(self.addr, 0x0D, struct.pack('B', red_led))

        self.clear_fifo()

    def reset(self):
        self.i2c.writeto_mem(self.addr, 0x09, b'\x40')
        while True:
            sleep_ms(10)
            if (ord(self.i2c.readfrom_mem(self.addr, 0x09, 1)) & 0x40) == 0:
                break

    def clear_fifo(self):
        self.i2c.writeto_mem(self.addr, 0x04, b'\x00')
        self.i2c.writeto_mem(self.addr, 0x05, b'\x00')
        self.i2c.writeto_mem(self.addr, 0x06, b'\x00')

    def read_temperature(self):
        self.i2c.writeto_mem(self.addr, 0x21, b'\x01')

        sleep_ms(100)
        while True:
            sleep_ms(10)
            if (ord(self.i2c.readfrom_mem(self.addr, 0x21, 1)) & 0x01) == 0:
                break

        tempInt = ord(self.i2c.readfrom_mem(self.addr, 0x1F, 1))
        tempFrac = ord(self.i2c.readfrom_mem(self.addr, 0x20, 1))

        self.temperature = float(tempInt) + (float(tempFrac) * 0.0625)
        return self.temperature

    def fifo_to_int(self, fifo):
        return fifo[0] << 16 | fifo[1] << 8 | fifo [2]

    def read(self):
        write_ptr = ord(self.i2c.readfrom_mem(self.addr, 0x04, 1))
        read_ptr = ord(self.i2c.readfrom_mem(self.addr, 0x06, 1))

        if ticks_diff(ticks_ms(), self.last_beat) > 3000:
            self.bpm = 0

        if read_ptr != write_ptr:
            n = write_ptr - read_ptr

            if n < 0:
                n += 32

            for _ in range(n):
                fifo = self.i2c.readfrom_mem(self.addr, 0x07, 6)
                self.red = self.fifo_to_int(fifo[0:3])
                self.ir = self.fifo_to_int(fifo[3:6])

            self.update_beat()
            self.read_succeeded = True
        else:
            self.read_succeeded = False

        return self.read_succeeded

    def update_beat(self):
        self.ir_beat.checkForBeat(self.ir)
        self.beat = self.red_beat.checkForBeat(self.red)
        if self.beat:
            self.update_bpm()

    def update_bpm(self):
        if self.last_beat == 0:
            self.last_beat = ticks_ms()
            return
        now = ticks_ms()
        delta = ticks_diff(now, self.last_beat)
        self.last_beat = now
        bpm = 60 / (delta / 1000)
        if self.bpm == 0:
            self.bpm = bpm
        else:
            self.bpm = self.bpm * 0.8 + bpm * 0.2

    def get_red(self):
        return self.red

    def get_ir(self):
        return self.ir

    def get_beat(self):
        return self.beat

    def get_bpm(self):
        return self.bpm

    def get_spo2(self):
        z = (self.red_beat.get_AC_RMS() / self.red_beat.get_DC()) / (self.ir_beat.get_AC_RMS() / self.ir_beat.get_DC())
        return  (-45.06 * z + 30.354) * z + 94.845
