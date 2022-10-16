from machine import Pin, ADC, PWM

from micropython import const



OUT = Pin.OUT
IN = Pin.IN
PULL_UP = Pin.PULL_UP

_IN = const(1)
_OUT = const(2)
_ADC = const(3)
_PWM = const(4)

_pins = []
for _ in range(39):
    _pins.append([None, 0])

def set_pin_mode(pin, mode):
    if mode == OUT:
        state = _OUT
    elif mode == IN or mode == PULL_UP:
        state = _IN
    else:
        raise ValueError('Invalid pin mode')

    if mode == PULL_UP:
        _pins[pin][0] = Pin(pin, IN, PULL_UP)
    else:
        _pins[pin][0] = Pin(pin, mode)
    _pins[pin][1] = state

def digital_read(pin):
    if _pins[pin][1] != _IN:
        _pins[pin][0] = Pin(pin, IN)
        _pins[pin][1] = _IN

    return _pins[pin][0].value()

def digital_write(pin, value):
    if _pins[pin][1] != _OUT:
        _pins[pin][0] = Pin(pin, OUT)
        _pins[pin][1] = _OUT

    _pins[pin][0].value(value)

def analog_read(pin):
    if _pins[pin][1] != _ADC:
        _pins[pin][0] = ADC(Pin(pin))
        _pins[pin][1] = _ADC

    return _pins[pin][0].read_u16()

def set_analog_write_freq(pin, freq):
    _pins[pin][0] = PWM(Pin(pin), freq=freq, duty=0)
    _pins[pin][1] = _PWM

def analog_write(pin, value):
    if _pins[pin][1] != _PWM:
        _pins[pin][0] = PWM(Pin(pin), freq=1000, duty=0)
        _pins[pin][1] = _PWM

    _pins[pin][0].duty(value)
