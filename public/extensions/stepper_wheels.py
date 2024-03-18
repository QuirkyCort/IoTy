from micropython import const
import struct
import time
import math

DEFAULT_ACCELERATION = const(500)
TIME_STEP_MS = const(100)
WAIT_MS = const(50)

MODE_STOP = const(0)
MODE_RUN_CONTINUOUS = const(1)
MODE_RUN_TO_POS = const(30)
MODE_RUN_TO_POS_W_RAMP = const(31)

VERSION_REG = const(0x00)
RESET_REG = const(0x01)
ENABLE_REG = const(0x02)
STOP_REGISTER = const(0x20)
RUN_CONTINUOUS_REGISTER = const(0x30)
RUN_TO_POS_REGISTER = const(0x40)
RUN_TO_POS_W_RAMP_REGISTER = const(0x50)
POSITION_REGISTER = const(0x60)
SPEED_REGISTER = const(0x70)
ACCELERATION_REGISTER = const(0x80)
RUNNING_REGISTER = const(0x90)


class Motor:
    def __init__(self, controller, index):
        self.controller = controller
        self.index = index
        self._acceleration = 0
        self.reset()

    def reset(self):
        self.stop()
        self.reset_steps(0)
        self.set_acceleration(DEFAULT_ACCELERATION, forced=True)

    def set_acceleration(self, acceleration, forced=False):
        if acceleration != self._acceleration or forced:
            addr = self.index + ACCELERATION_REGISTER
            self.controller.write(addr, struct.pack('<f', acceleration))
            self._acceleration = acceleration

    def acceleration(self):
        return self._acceleration

    def steps(self):
        addr = self.index + POSITION_REGISTER
        return struct.unpack('<l', self.controller.read(addr, 4))[0]

    def speed(self):
        addr = self.index + SPEED_REGISTER
        return struct.unpack('<f', self.controller.read(addr, 4))[0]

    def reset_steps(self, steps=0):
        addr = self.index + POSITION_REGISTER
        self.controller.write(addr, struct.pack('<l', steps))

    def stop(self):
        addr = self.index + STOP_REGISTER
        self.controller.write(addr, struct.pack('B', 1))

    def run(self, speed):
        addr = self.index + RUN_CONTINUOUS_REGISTER
        self.controller.write(addr, struct.pack('<f', speed))

    def is_running(self):
        addr = self.index + RUNNING_REGISTER
        return struct.unpack('B', self.controller.read(addr, 1))[0]

    def wait_till_stop(self):
        while self.is_running():
            time.sleep_ms(WAIT_MS)

    def _run_steps_ramp(self, speed, rel, steps):
        addr = self.index + RUN_TO_POS_W_RAMP_REGISTER
        self.controller.write(addr, struct.pack('<fBl', speed, rel, steps))

    def _run_steps_no_ramp(self, speed, rel, steps):
        addr = self.index + RUN_TO_POS_REGISTER
        self.controller.write(addr, struct.pack('<fBl', speed, rel, steps))

    def run_steps(self, speed, steps, ramp=True, wait=True):
        if steps == 0 or speed == 0:
            return
        if speed * steps < 0:
            steps = -abs(int(steps))
        else:
            steps = abs(int(steps))
        speed = abs(speed)

        if ramp:
            self._run_steps_ramp(speed, 1, steps)
        else:
            self._run_steps_no_ramp(speed, 1, steps)

        if wait:
            self.wait_till_stop()

    def run_target(self, speed, target, ramp=True, wait=True):
        speed = abs(speed)

        if ramp:
            self._run_steps_ramp(speed, 0, target)
        else:
            self._run_steps_no_ramp(speed, 0, target)

        if wait:
            self.wait_till_stop()


class Drive:
    def __init__(self, left_motors, right_motors):
        self._acceleration = 0

        try:
            iter(left_motors)
            self.left_motors = left_motors
        except:
            self.left_motors = (left_motors, )

        try:
            iter(right_motors)
            self.right_motors = right_motors
        except:
            self.right_motors = (right_motors, )

        self.set_acceleration(DEFAULT_ACCELERATION, forced=True)

    def _set_left_acceleration(self, acceleration):
        for motor in self.left_motors:
            motor.set_acceleration(acceleration)

    def _set_right_acceleration(self, acceleration):
        for motor in self.right_motors:
            motor.set_acceleration(acceleration)

    def set_acceleration(self, acceleration, forced=False):
        if acceleration != self._acceleration or forced:
            self._set_left_acceleration(acceleration)
            self._set_right_acceleration(acceleration)
            self._acceleration = acceleration

    def acceleration(self):
        return self._acceleration

    def move_tank(self, left_speed, right_speed):
        for motor in self.left_motors:
            motor.run(left_speed)

        for motor in self.right_motors:
            motor.run(right_speed)

    def move_tank_steps(self, left_speed, right_speed, steps, ramp=True, wait=True):
        if steps < 0:
            left_speed = -left_speed
            right_speed = -right_speed
            steps = -steps

        left_speed_abs = abs(left_speed)
        right_speed_abs = abs(right_speed)
        if left_speed_abs > right_speed_abs:
            ratio = right_speed_abs / left_speed_abs
            left_acceleration = self._acceleration
            right_acceleration = self._acceleration * ratio
            left_steps = steps
            right_steps = steps * ratio
        else:
            ratio = left_speed_abs / right_speed_abs
            left_acceleration = self._acceleration * ratio
            right_acceleration = self._acceleration
            left_steps = steps * ratio
            right_steps = steps

        self._set_left_acceleration(left_acceleration)
        self._set_right_acceleration(right_acceleration)

        for motor in self.left_motors:
            motor.run_steps(left_speed, left_steps, ramp=ramp, wait=False)

        for motor in self.right_motors:
            motor.run_steps(right_speed, right_steps, ramp=ramp, wait=False)

        if wait:
            for motor in self.left_motors:
                motor.wait_till_stop()
            for motor in self.right_motors:
                motor.wait_till_stop()

    def calc_steering(self, steer, speed):
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

    def calc_joystick(self, x, y, limit):
        steer = 1 - 2 * abs(math.atan2(y, x) / math.pi)
        speed = min(math.sqrt(x**2 + y**2), limit)
        if y < 0:
            speed = -speed
            steer = -steer

        return steer, speed

    def move_steering(self, steer, speed):
        left_speed, right_speed = self.calc_steering(steer, speed)
        self.move_tank(left_speed, right_speed)

    def move_steering_steps(self, steer, speed, steps, wait=True):
        left_speed, right_speed = self.calc_steering(steer, speed)
        self.move_tank_steps(left_speed, right_speed, steps, wait)

    def move_joystick(self, x, y, limit):
        steer, speed = self.calc_joystick(x, y, limit)
        self.move_steering(steer, speed)

    def move_joystick_steps(self, x, y, limit, steps, wait=True):
        steer, speed = self.calc_joystick(x, y, limit)
        self.move_steering(steer, speed, steps, wait)

    def stop(self):
        for motor in self.left_motors:
            motor.stop()
        for motor in self.right_motors:
            motor.stop()

    def reset_steps(self, steps=0):
        self.right_motors[0].reset_steps(steps)
        self.left_motors[0].reset_steps(steps)

    def left_steps(self):
        return self.left_motors[0].steps()

    def right_steps(self):
        return self.right_motors[0].steps()

    def avg_steps(self):
        return (self.left_steps() + self.right_steps()) / 2

class Controller:
    def __init__(self, i2c, addr=0x55):
        self.i2c = i2c
        self.addr = addr
        self.reset()

    def read(self, reg, size):
        return self.i2c.readfrom_mem(self.addr, reg, size)

    def write(self, reg, data):
        self.i2c.writeto_mem(self.addr, reg, data)

    def get_version(self):
        return struct.unpack('BBB', self.read(VERSION_REG, 3))

    def reset(self):
        self.write(RESET_REG, b'\x01')

    def enable(self):
        self.write(ENABLE_REG, b'\x01')

    def disable(self):
        self.write(ENABLE_REG, b'\x00')

    def get_motor(self, index):
        return Motor(self, index)

    def get_drive(self, left_motor_indexes, right_motor_indexes):
        left_motors = []
        right_motors = []
        try:
            for index in left_motor_indexes:
                left_motors.append(self.get_motor(index))
        except:
            left_motors.append(self.get_motor(left_motor_indexes))

        try:
            for index in right_motor_indexes:
                right_motors.append(self.get_motor(index))
        except:
            right_motors.append(self.get_motor(right_motor_indexes))

        return Drive(left_motors, right_motors)