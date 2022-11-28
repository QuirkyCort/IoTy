from machine import Pin
from neopixel import NeoPixel

_pins = [None] * 39

def init(pin, pixels, format=3):
    _pins[pin] = NeoPixel(Pin(pin, Pin.OUT), pixels, bpp=format)

def set(pin, pixel, color):
    _pins[pin][pixel] = color

def fill(pin, color):
    _pins[pin].fill(color)

def hsv2rgb(h, s, v):
    if s == 0.0:
        return v*255, v*255, v*255
    h /= 360
    i = int(h*6.0)
    f = (h*6.0) - i
    p = v*(1.0 - s)
    q = v*(1.0 - s*f)
    t = v*(1.0 - s*(1.0-f))
    i = i%6
    v = int(v * 255)
    t = int(t * 255)
    p = int(p * 255)
    q = int(q * 255)
    if i == 0:
        return v, t, p
    if i == 1:
        return q, v, p
    if i == 2:
        return p, v, t
    if i == 3:
        return p, q, v
    if i == 4:
        return t, p, v
    if i == 5:
        return v, p, q

def write(pin):
    _pins[pin].write()
