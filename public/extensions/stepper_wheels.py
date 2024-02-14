from micropython import const
import struct
import time

DEFAULT_ACCELERATION = const(50)
TIME_STEP_MS = const(100)
WAIT_MS = const(50)

VERSION_REG = const(0x00)
RESET_REG = const(0x01)
ENABLE_REG = const(0x02)
TRIGGER_REG = const(0x41)
DIRECTION_REG = const(0x45)
MODE_REG = const(0x49)
POSITION_REG = const(0x4D)
TARGET_POSITION_REG = const(0x51)
TARGET_TIME_REG = const(0x55)
TARGET_STEPS_WITH_RAMP_REG = const(0x59)
TARGET_TIME_WITH_RAMP_REG = const(0x5D)

MODE_STOP = const(0)
MODE_RUN_CONTINUOUS = const(1)
MODE_RUN_TILL_TIME = const(20)
MODE_RUN_TILL_TIME_WITH_RAMP = const(21)
MODE_RUN_TILL_POSITION = const(30)
MODE_RUN_TILL_POSITION_WITH_RAMP = const(31)


class Motor:
    def __init__(self, controller, index):
        self.controller = controller
        self.index = index
        self.acceleration_up = DEFAULT_ACCELERATION
        self.acceleration_down = DEFAULT_ACCELERATION

    def set_trigger(self, trigger):
        addr = self.index + TRIGGER_REG
        self.controller.write(addr, struct.pack('<H', trigger))

    def get_trigger(self):
        addr = self.index + TRIGGER_REG
        return struct.unpack('<H', self.controller.read(addr, 2))[0]

    def set_direction(self, direction):
        addr = self.index + DIRECTION_REG
        self.controller.write(addr, struct.pack('B', direction))

    def get_direction(self):
        addr = self.index + DIRECTION_REG
        return struct.unpack('B', self.controller.read(addr, 1))[0]

    def set_mode(self, mode):
        addr = self.index + MODE_REG
        self.controller.write(addr, struct.pack('B', mode))

    def get_mode(self):
        addr = self.index + MODE_REG
        return struct.unpack('B', self.controller.read(addr, 1))[0]

    def set_position(self, position):
        addr = self.index + POSITION_REG
        self.controller.write(addr, struct.pack('<i', position))

    def get_position(self):
        addr = self.index + POSITION_REG
        return struct.unpack('<i', self.controller.read(addr, 4))[0]

    def set_target_position(self, position, relative=True):
        addr = self.index + TARGET_POSITION_REG
        if relative:
            pos_type = 1
        else:
            pos_type = 0
        self.controller.write(addr, struct.pack('<Bi', pos_type, position))

    def get_target_position(self):
        addr = self.index + TARGET_POSITION_REG
        return struct.unpack('<i', self.controller.read(addr, 4))[0]

    def set_target_time(self, time_steps):
        addr = self.index + TARGET_TIME_REG
        self.controller.write(addr, struct.pack('<H', time_steps))

    def get_target_time(self):
        addr = self.index + TARGET_TIME_REG
        return struct.unpack('<H', self.controller.read(addr, 2))[0]

    def set_target_steps_with_ramp(self, steps, cruise_end_steps, up_count, up_delta, cruise_speed, down_count, down_delta):
        addr = self.index + TARGET_STEPS_WITH_RAMP_REG
        data = struct.pack(
            '<iiHHHHH',
            int(steps),
            int(cruise_end_steps),
            int(up_count),
            int(up_delta),
            int(cruise_speed),
            int(down_count),
            int(down_delta)
        )
        self.controller.write(addr, data)

    def set_target_time_with_ramp(self, up_count, up_delta, cruise_count, cruise_speed, down_count, down_delta):
        addr = self.index + TARGET_TIME_WITH_RAMP_REG
        data = struct.pack(
            '<HHHHHH',
            int(up_count),
            int(up_delta),
            int(cruise_count),
            int(cruise_speed),
            int(down_count),
            int(down_delta)
        )
        self.controller.write(addr, data)

    # Following methods are derived from above methods

    def wait_till_stop(self):
        while self.get_mode() != MODE_STOP:
            time.sleep_ms(WAIT_MS)

    def set_speed(self, speed):
        if speed == 0:
            self.set_trigger(0)
            return
        elif speed >0:
            direction = 0
        else:
            direction = 1
            speed = -speed

        period = 1000000 / speed
        trigger = round(period / 128 - 1)
        self.set_direction(direction)
        self.set_trigger(trigger)

    def get_speed(self):
        trigger = self.get_trigger()
        if trigger == 0:
            return 0
        direction = self.get_direction()
        period = (trigger + 1) * 128
        speed = round(1000000 / period)

        if direction >= 0:
            return speed
        else:
            return -speed

    def set_target_time_with_accel(self, speed, time):
        abs_speed = abs(speed)
        total_time_steps = round(time * 1000 / TIME_STEP_MS)
        up_count = abs_speed // self.acceleration_up
        down_count = abs_speed // self.acceleration_down
        cruise_count = total_time_steps - up_count - down_count
        if cruise_count < 0:
            up_count = round(up_count + cruise_count * self.acceleration_up / (self.acceleration_up + self.acceleration_down))
            down_count = total_time_steps - up_count
            cruise_count = 0
        self.set_target_time_with_ramp_time(speed, up_count, cruise_count, down_count)

    def set_target_time_with_ramp_time(self, speed, up_count, cruise_count, down_count):
        if speed < 0:
            direction = 1
        else:
            direction = 0
        speed = abs(speed)
        self.set_direction(direction)

        self.set_target_time_with_ramp(up_count, self.acceleration_up, cruise_count, speed, down_count, self.acceleration_down)

    def calc_target_steps_with_accel(self, speed, steps):
        speed = abs(speed)

        up_count = speed // self.acceleration_up
        down_count = speed // self.acceleration_down

        up_delta = self.acceleration_up
        down_delta = self.acceleration_down

        up_ramp_dist = (up_delta + speed) // 2 * up_count * TIME_STEP_MS // 1000
        down_ramp_dist = (down_delta + speed) // 2 * (down_count - 1) * TIME_STEP_MS // 1000

        if up_ramp_dist + down_ramp_dist >= steps:
            a1 = self.acceleration_up
            a2 = self.acceleration_down
            freq = 1000 / TIME_STEP_MS
            up_count = -(a1 ** 2 - (a1 * a2 * (a1 + a2) * (a1 + a2 + 2 * freq * steps)) ** 0.5 + (a1 * a2)) / (a1 * (a1 + a2))
            down_count = (a1 * up_count + a1 - a2) / a2
            up_count = round(up_count) + 1
            down_count = round(down_count)
            return steps, 0, up_count, up_delta, speed, down_count, down_delta
        else:
            cruise_end_steps = steps - down_ramp_dist
            return steps, cruise_end_steps, up_count, up_delta, speed, down_count, down_delta

    def set_target_steps_with_accel(self, speed, steps):
        if speed < 0:
            direction = 1
        else:
            direction = 0
        self.set_direction(direction)
        settings = self.calc_target_steps_with_accel(speed, steps)
        self.set_target_steps_with_ramp(*settings)

    def set_target_steps_with_ramp_time(self, speed, steps, up_count, down_count):
        if speed < 0:
            direction = 1
        else:
            direction = 0
        self.set_direction(direction)
        speed = abs(speed)

        up_delta = speed // up_count
        down_delta = speed // down_count

        down_ramp_dist = (down_delta + speed) // 2 * (down_count - 1) * TIME_STEP_MS // 1000

        if direction == 0:
            cruise_end_steps = steps - down_ramp_dist
        else:
            cruise_end_steps = steps + down_ramp_dist
        self.set_target_steps_with_ramp(steps, cruise_end_steps, up_count, up_delta, speed, down_count, down_delta)

    # User facing methods.
    # While the above methods may be public, the user should avoid using them and use the below methods instead.

    def speed(self):
        return self.get_speed()

    def steps(self):
        return self.get_position()

    def reset_steps(self, steps=0):
        self.set_position(steps)

    def stop(self):
        self.set_trigger(0)
        self.set_mode(MODE_STOP)

    def run(self, speed):
        self.set_speed(speed)
        self.set_mode(MODE_RUN_CONTINUOUS)

    def run_time(self, speed, time, ramp=True, wait=True):
        if time <= 0:
            return
        if ramp:
            self.set_target_time_with_accel(speed, time)
            self.set_mode(MODE_RUN_TILL_TIME_WITH_RAMP)
        else:
            self.set_speed(speed)
            self.set_target_time(round(time * 1000 / TIME_STEP_MS))
            self.set_mode(MODE_RUN_TILL_TIME)

        if wait:
            self.wait_till_stop()

    def run_steps(self, speed, steps, ramp=True, wait=True):
        if steps == 0:
            return
        if speed * steps < 0:
            speed = -abs(speed)
        else:
            speed = abs(speed)
        steps = abs(steps)

        if ramp:
            self.set_target_steps_with_accel(speed, steps)
            self.set_mode(MODE_RUN_TILL_POSITION_WITH_RAMP)
        else:
            self.set_speed(speed)
            self.set_target_position(steps)
            self.set_mode(MODE_RUN_TILL_POSITION)

        if wait:
            self.wait_till_stop()

    def run_target(self, speed, target, ramp=True, wait=True):
        current = self.get_position()
        steps = target - current
        self.run_steps(abs(speed), steps, ramp, wait)


class Drive:
    def __init__(self, left_motors, right_motors):
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

    def move_tank(self, left_speed, right_speed):
        for motor in self.left_motors:
            motor.run(left_speed)

        for motor in self.right_motors:
            motor.run(right_speed)

    def move_tank_steps(self, left_speed, right_speed, steps, wait=True):
        if steps < 0:
            left_speed = -left_speed
            right_speed = -right_speed
            steps = -steps

        left_speed_abs = abs(left_speed)
        right_speed_abs = abs(right_speed)
        if left_speed_abs > right_speed_abs:
            minor_steps = right_speed_abs * steps // left_speed_abs
            minor_speed = right_speed_abs
            major_settings = self.left_motors[0].calc_target_steps_with_accel(left_speed, steps)
        else:
            minor_steps = left_speed_abs * steps // right_speed_abs
            minor_speed = left_speed_abs
            major_settings = self.right_motors[0].calc_target_steps_with_accel(right_speed, steps)

        minor_settings = list(major_settings)
        minor_settings[0] = minor_steps
        minor_settings[4] = minor_speed
        minor_settings[3] = minor_speed // minor_settings[2]
        minor_settings[6] = minor_speed // minor_settings[5]
        minor_settings[1] = minor_steps - (minor_settings[6] + minor_speed) // 2 * (minor_settings[5] - 1) * TIME_STEP_MS // 1000
        if minor_settings[1] != 0:
            down_ramp_dist = (minor_settings[6] + right_speed_abs) // 2 * (minor_settings[5] - 1) * TIME_STEP_MS // 1000
            cruise_end_steps = minor_steps - down_ramp_dist
            minor_settings[1] / cruise_end_steps

        if left_speed < 0:
            left_direction = 1
        else:
            left_direction = 0

        if right_speed < 0:
            right_direction = 1
        else:
            right_direction = 0

        if left_speed_abs > right_speed_abs:
            left_settings = major_settings
            right_settings = minor_settings
        else:
            left_settings = minor_settings
            right_settings = major_settings

        for motor in self.left_motors:
            motor.set_direction(left_direction)
            motor.set_target_steps_with_ramp(*left_settings)
        for motor in self.right_motors:
            motor.set_direction(right_direction)
            motor.set_target_steps_with_ramp(*right_settings)

        for motor in self.left_motors:
            motor.set_mode(MODE_RUN_TILL_POSITION_WITH_RAMP)
        for motor in self.right_motors:
            motor.set_mode(MODE_RUN_TILL_POSITION_WITH_RAMP)

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

    def move_steering(self, steer, speed):
        left_speed, right_speed = self.calc_steering(steer, speed)
        self.move_tank(left_speed, right_speed)

    def move_steering_steps(self, steer, speed, steps, wait=True):
        left_speed, right_speed = self.calc_steering(steer, speed)
        self.move_tank_steps(left_speed, right_speed, steps, wait)

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

    def left_speed(self):
        return self.left_motors[0].speed()

    def right_speed(self):
        return self.right_motors[0].speed()

    def avg_speed(self):
        return (self.left_speed() + self.right_speed()) / 2

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