import time
from machine import Pin, ADC, PWM, TouchPad, time_pulse_us
from micropython import const

OUT = Pin.OUT
IN = Pin.IN
PULL_UP = Pin.PULL_UP

_IN = const(1)
_OUT = const(2)
_ADC = const(3)
_PWM = const(4)
_SERVO = const(5)
_TOUCH = const(6)

_pins = {}

def _init_pin(pin):
    if pin not in _pins:
        _pins[pin] = [0, 0]

def _deinit_pwm(pin):
    if _pins[pin][1] == _PWM:
        _pins[pin][0].deinit()

def set_pin_mode(pin, mode):
    if mode == OUT:
        state = _OUT
    elif mode == IN or mode == PULL_UP:
        state = _IN
    else:
        raise ValueError('Invalid pin mode')

    _init_pin(pin)
    _deinit_pwm(pin)
    if mode == PULL_UP:
        _pins[pin][0] = Pin(pin, IN, PULL_UP)
    else:
        _pins[pin][0] = Pin(pin, mode)
    _pins[pin][1] = state

def digital_read(pin):
    _init_pin(pin)
    if _pins[pin][1] != _IN:
        _deinit_pwm(pin)
        _pins[pin][0] = Pin(pin, IN)
        _pins[pin][1] = _IN

    return _pins[pin][0].value()

def digital_write(pin, value):
    _init_pin(pin)
    if _pins[pin][1] != _OUT:
        _deinit_pwm(pin)
        _pins[pin][0] = Pin(pin, OUT)
        _pins[pin][1] = _OUT

    _pins[pin][0].value(value)

def analog_read(pin):
    _init_pin(pin)
    if _pins[pin][1] != _ADC:
        _deinit_pwm(pin)
        _pins[pin][0] = ADC(Pin(pin), atten=ADC.ATTN_11DB)
        _pins[pin][1] = _ADC

    return _pins[pin][0].read_u16()

def touch_read(pin):
    _init_pin(pin)
    if _pins[pin][1] != _TOUCH:
        _deinit_pwm(pin)
        _pins[pin][0] = TouchPad(Pin(pin))
        _pins[pin][1] = _TOUCH

    return _pins[pin][0].read()

def set_analog_write_freq(pin, freq):
    _init_pin(pin)
    _pins[pin][0] = PWM(Pin(pin), freq=freq, duty=0)
    _pins[pin][1] = _PWM

def analog_write(pin, value):
    _init_pin(pin)
    if _pins[pin][1] != _PWM:
        _pins[pin][0] = PWM(Pin(pin), freq=1000, duty=0)
        _pins[pin][1] = _PWM

    _pins[pin][0].duty(value)

def servo_write_deg(pin, deg):
    _init_pin(pin)
    if _pins[pin][1] != _SERVO:
        _pins[pin][0] = PWM(Pin(pin), freq=50, duty=deg)
        _pins[pin][1] = _SERVO

    _pins[pin][0].duty_ns(500000 + int(deg * 2000000 / 180))

def servo_write_us(pin, us):
    _init_pin(pin)
    if _pins[pin][1] != _SERVO:
        _pins[pin][0] = PWM(Pin(pin), freq=50, duty=us)
        _pins[pin][1] = _SERVO

    _pins[pin][0].duty_ns(int(us) * 1000)

def hc_sr04_ping_us(trig, echo, timeout=4000*2*3):
    _init_pin(trig)
    _init_pin(echo)
    _pins[trig][0] = Pin(trig, OUT)
    _pins[trig][1] = _OUT
    _pins[trig][0].value(0)

    _pins[echo][0] = Pin(echo, IN)
    _pins[echo][1] = _IN

    time.sleep_us(5)

    _pins[trig][0].value(1)
    time.sleep_us(10)
    _pins[trig][0].value(0)

    return time_pulse_us(_pins[echo][0], 1, timeout)

def hc_sr04_ping_cm(trig, echo, timeout=4000*2*3):
    us = hc_sr04_ping_us(trig, echo, timeout=timeout)
    if us < 0:
        return us
    else:
        return us / 2 / 29.1