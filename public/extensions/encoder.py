# encoder_portable.py

# Based on https://github.com/peterhinch/micropython-samples/blob/master/encoders/encoder_portable.py

# Encoder Support: this version should be portable between MicroPython platforms
# Thanks to Evan Widloski for the adaptation to use the machine module

# Copyright (c) 2017-2022 Peter Hinch
# Released under the MIT License (MIT) - see LICENSE file

from machine import Pin
from time import ticks_us, ticks_diff

class Encoder:
    def __init__(self, pin_x, pin_y, scale=1, min_speed=5):
        self.scale = scale
        self.forward = True
        self.pin_x = Pin(pin_x, Pin.IN)
        self.pin_y = Pin(pin_y, Pin.IN)
        self._x = self.pin_x()
        self._y = self.pin_y()
        self._last_us = ticks_us()
        self._min_speed = min_speed
        self._period = [0, 0]
        self._period_ptr = 0
        self._pos = 0
        try:
            self.x_interrupt = self.pin_x.irq(trigger=Pin.IRQ_RISING | Pin.IRQ_FALLING, handler=self.x_callback, hard=True)
            self.y_interrupt = self.pin_y.irq(trigger=Pin.IRQ_RISING | Pin.IRQ_FALLING, handler=self.y_callback, hard=True)
        except TypeError:
            self.x_interrupt = self.pin_x.irq(trigger=Pin.IRQ_RISING | Pin.IRQ_FALLING, handler=self.x_callback)
            self.y_interrupt = self.pin_y.irq(trigger=Pin.IRQ_RISING | Pin.IRQ_FALLING, handler=self.y_callback)

    def x_callback(self, pin_x):
        x = pin_x()
        if x != self._x:  # Reject short pulses
            self._x = x
            self.forward = x ^ self.pin_y()
            self._pos += 1 if self.forward else -1
            self._update_speed()

    def y_callback(self, pin_y):
        y = pin_y()
        if y != self._y:
            self._y = y
            self.forward = y ^ self.pin_x() ^ 1
            self._pos += 1 if self.forward else -1
            self._update_speed()

    def _update_speed(self):
        now = ticks_us()
        if self.forward:
            self._period[self._period_ptr] = ticks_diff(now, self._last_us)
        else:
            self._period[self._period_ptr] = ticks_diff(self._last_us, now)
        self._last_us = now
        self._period_ptr ^= 1

    def position(self, value=None):
        if value is not None:
            self._pos = round(value / self.scale)  # Improvement provided by @IhorNehrutsa
        return self._pos * self.scale

    def value(self, value=None):
        if value is not None:
            self._pos = value
        return self._pos

    def speed(self):
        avg_speed = 0
        count = 0
        for i in range(2):
            if self._period[i] != 0:
                avg_speed += 1000000 / self._period[i]
                count += 1

        if count:
            avg_speed /= count

        now = ticks_us()
        if self.forward:
            speed = 1000000 / ticks_diff(now, self._last_us)
        else:
            speed = 1000000 / ticks_diff(self._last_us, now)

        if abs(speed) < self._min_speed or abs(avg_speed) < self._min_speed:
            return 0
        elif abs(speed) < abs(avg_speed):
            return speed

        return avg_speed