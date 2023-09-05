import math

LINEAR = 1
IN_QUAD = 2
OUT_QUAD = 3
IN_OUT_QUAD = 4
IN_CUBIC = 5
OUT_CUBIC = 6
IN_OUT_CUBIC = 7
OUT_ELASTIC = 8
OUT_BOUNCE = 9

tweens = {}

def start(id, type, y0, y1, x0, duration=0, speed=1):
    if duration > 0:
        x1 = x0 + duration
    elif speed > 0:
        x1 = x0 + abs(y1 - y0) / speed
    else:
        x1 = x0 + abs(y1 - y0)
    tweens[id] = [type, x0, x1, y0, y1]

def remove(id):
    try:
        tweens.pop(id)
    except:
        pass

def is_ended(id, x):
    return x >= tweens[id][2]

def get(id, x):
    if x <= tweens[id][1]:
        return tweens[id][3]
    elif x >= tweens[id][2]:
        return tweens[id][4]

    tween = tweens[id]
    nx = (x - tween[1]) / (tween[2] - tween[1])

    if tween[0] == LINEAR:
        ny = nx
    elif tween[0] == IN_QUAD:
        ny = in_quad(nx)
    elif tween[0] == OUT_QUAD:
        ny = out_quad(nx)
    elif tween[0] == IN_OUT_QUAD:
        ny = in_out_quad(nx)
    elif tween[0] == IN_CUBIC:
        ny = in_cubic(nx)
    elif tween[0] == OUT_CUBIC:
        ny = out_cubic(nx)
    elif tween[0] == IN_OUT_CUBIC:
        ny = in_out_cubic(nx)
    elif tween[0] == OUT_ELASTIC:
        ny = out_elastic(nx)
    elif tween[0] == OUT_BOUNCE:
        ny = out_bounce(nx)
    else:
        ny = 1

    return ny * (tween[4] - tween[3]) + tween[3]

def in_quad(x):
    return x ** 2

def out_quad(x):
    return 1 - (1 - x) ** 2

def in_out_quad(x):
    if x < 0.5:
        return 2 * x ** 2
    else:
        return 1 - (-2 * x + 2) ** 2 / 2

def in_cubic(x):
    return x ** 3

def out_cubic(x):
    return 1 - (1 - x) ** 3

def in_out_cubic(x):
    if x < 0.5:
        return 4 * x ** 3
    else:
        return 1 - (-2 * x + 2) ** 3 / 2

def out_elastic(x):
    c4 = (2 * math.pi) / 3
    return 2 ** (-10 * x) * math.sin((x * 10 - 0.75) * c4) + 1

def out_bounce(x):
    n1 = 7.5625
    d1 = 2.75

    if x < 1 / d1:
        return n1 * x ** 2
    elif x < 2 / d1:
        x -= 1.5 / d1
        return n1 * x ** 2 + 0.75
    elif x < 2.5 / d1:
        x -= 2.25 / d1
        return n1 * x ** 2 + 0.9375
    else:
        x -= 2.625 / d1
        return n1 * x ** 2 + 0.984375