import math

def steering(steer, speed):
    if steer > 100:
        steer = 100
    elif steer < -100:
        steer = -100

    left_speed = speed
    right_speed = speed

    if steer >= 0:
        right_speed = round(right_speed * (50 - steer) / 50)
    else:
        left_speed = round(left_speed * (50 + steer) / 50)

    return left_speed, right_speed

def joystick(x, y, max_speed=None):
    steer = 100 * (1 - 2 * abs(math.atan2(y, x) / math.pi))
    speed = math.sqrt(x**2 + y**2)
    if max_speed:
            speed = min(speed, max_speed)
    if y < 0:
        speed = -speed
        steer = -steer

    return steering(steer, speed)

def mecanum(direction, speed, turn, max_speed=1023):
    direction = math.radians(direction)
    vx = speed * math.cos(direction)
    vy = speed * math.sin(direction)
    s1 = vx + vy + turn
    s2 = vx - vy + turn
    s3 = vy - vx + turn
    s4 = -vx -vy + turn

    motor_speed = (s1, s2, s3, s4)

    highest = max(map(abs, motor_speed))

    if highest > max_speed:
        scale = max_speed / highest
        motor_speed = [i * scale for i in motor_speed]

    return motor_speed

def delta(mode, direction, speed, turn, max_speed=1023):
    if mode == 'V':
        v1 = [0.5, 0.8660254037844386]
        v2 = [0.5, -0.8660254037844386]
        v3 = [-1.0, 0.0]
    else:
        v1 = [1.0, 0.0]
        v2 = [-0.5, -0.8660254037844386]
        v3 = [-0.5, 0.8660254037844386]

    direction = math.radians(direction)
    vf = [math.cos(direction) * speed, math.sin(direction) * speed]

    m = (v2[0] - v1[0]) / (v2[1] - v1[1])
    m3 = (vf[0] - turn * v1[0] - (vf[1] - turn * v1[1]) * m) / (v3[0] - v1[0] - (se.v3[1] - v1[1]) * m)
    m2 = (vf[1] - turn * v1[1] - m3 * (v3[1] - v1[1])) / (v2[1] - v1[1])
    m1 = turn - m2 - m3

    motor_speed = (m1, m2, m3)

    highest = max(map(abs, motor_speed))

    if highest > max_speed:
        scale = max_speed / highest
        motor_speed = [i * scale for i in motor_speed]

    return motor_speed