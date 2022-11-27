import ioty.monitor
import time
import math
import random
from ioty import pin

from pca import PCA9685

# ioty.monitor.wait_for_connection()

servo = PCA9685(0x40, scl=23, sda=22)

pin.set_pin_mode(0, pin.PULL_UP)
pin.set_pin_mode(2, pin.OUT)

pos = 0
on_off = 0

def left1(deg):
    servo.servo_deg(0, deg)

def left2(deg):
    servo.servo_deg(1, 180 - deg)

def right1(deg):
    servo.servo_deg(2, 180 - deg)

def right2(deg):
    servo.servo_deg(3, deg)

def base():
    left1(90)
    left2(90)
    right1(90)
    right2(90)

def move_to(sec, sl1, sl2, sr1, sr2, el1, el2, er1, er2):
    res = 20
    for i in range(res):
        left1(sl1 + i * (el1 - sl1) / res)
        left2(sl2 + i * (el2 - sl2) / res)
        right1(sr1 + i * (er1 - sr1) / res)
        right2(sr2 + i * (er2 - sr2) / res)
        time.sleep(sec / res)

# Patterns

def wiggle_r():
    right2(135)
    time.sleep(0.3)
    right2(45)
    time.sleep(0.3)
    right2(135)
    time.sleep(0.3)
    right2(45)
    time.sleep(0.3)

def wiggle_l():
    left2(135)
    time.sleep(0.3)
    left2(45)
    time.sleep(0.3)
    left2(135)
    time.sleep(0.3)
    left2(45)
    time.sleep(0.3)

def fwd():
    l1 = 90
    l2 = 135
    r1 = 90
    r2 = 135

    left1(l1)
    left2(l2)
    right1(r1)
    right2(r2)
    time.sleep(1)

    for i in range(0, 50, 2):
        left1(l1 + i)
        left2(l2 - i)
        time.sleep(0.02)

    for i in range(50, 0, -2):
        left1(l1 + i)
        left2(l2 - i)
        time.sleep(0.02)

    for i in range(0, 50, 2):
        right1(r1 + i)
        right2(r2 - i)
        time.sleep(0.02)

    for i in range(50, 0, -2):
        right1(r1 + i)
        right2(r2 - i)
        time.sleep(0.02)

def sin(deg):
    return (math.sin(deg/180*math.pi) + 1) / 2

def cycle():
    move_to(0.5, 90, 90, 90, 90, 45, 90, 135, 90)

    for i in range(0, 900, 8):
        left1(sin(i + 270) * 90 + 45)
        left2(sin(i + 180) * 90 + 45)
        right1(sin(i + 90) * 90 + 45)
        right2(sin(i) * 90 + 45)
        time.sleep(0.02)

    move_to(0.5, 135, 90, 45, 90, 90, 90, 90, 90)

def cheer():
    l1 = 45
    l2 = 55
    r1 = 45
    r2 = 55

    move_to(1, 90, 90, 90, 90, l1, l2, r1, r2)

    for i in range(0, 100, 3):
        right1(r1 + i)
        right2(r2 - i)
        time.sleep(0.02)

    for i in range(100, 0, -3):
        right1(r1 + i)
        right2(r2 - i)
        time.sleep(0.02)

    for i in range(0, 100, 3):
        left1(l1 + i)
        left2(l2 - i)
        time.sleep(0.02)

    for i in range(100, 0, -3):
        left1(l1 + i)
        left2(l2 - i)
        time.sleep(0.02)

    move_to(1, l1, l2, r1, r2, 90, 90, 90, 90)


# base()
# time.sleep(2)
# cycle()
base()

while True:
    time.sleep(10)
    choice = random.randrange(0, 5)
    if choice == 0:
        wiggle_r()
    elif choice == 1:
        wiggle_l()
    elif choice == 2:
        cycle()
    elif choice == 3:
        cheer()
    elif choice == 4:
        fwd()
    base()



