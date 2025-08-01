# From https://github.com/rdagger/micropython-ili9341
# with edits by Cort

"""XPT2046 Touch module."""
from time import sleep

def in_rect(pos, x, y, w, h):
    if pos == None:
        return False
    if pos[0] < x or pos[0] > x + w or pos[1] < y or pos[1] > y + h:
        return False
    return True

def in_circle(pos, x, y, r):
    if pos == None:
        return False
    d_sqr = (pos[0] - x) ** 2 + (pos[1] - y) ** 2
    if d_sqr < r ** 2:
        return True
    return False

class Touch(object):
    """Serial interface for XPT2046 Touch Screen Controller."""

    # Command constants from ILI9341 datasheet
    GET_X = const(0b11010000)  # X position
    GET_Y = const(0b10010000)  # Y position
    GET_Z1 = const(0b10110000)  # Z1 position
    GET_Z2 = const(0b11000000)  # Z2 position
    GET_TEMP0 = const(0b10000000)  # Temperature 0
    GET_TEMP1 = const(0b11110000)  # Temperature 1
    GET_BATTERY = const(0b10100000)  # Battery monitor
    GET_AUX = const(0b11100000)  # Auxiliary input to ADC

    def __init__(self, spi, cs, int_pin=None, int_handler=None,
                 width=240, height=320,
                 x_min=100, x_max=1962, y_min=100, y_max=1900, rotation=0):
        """Initialize touch screen controller.

        Args:
            spi (Class Spi):  SPI interface for OLED
            cs (Class Pin):  Chip select pin
            int_pin (Class Pin):  Touch controller interrupt pin
            int_handler (function): Handler for screen interrupt
            width (int): Width of LCD screen
            height (int): Height of LCD screen
            x_min (int): Minimum x coordinate
            x_max (int): Maximum x coordinate
            y_min (int): Minimum Y coordinate
            y_max (int): Maximum Y coordinate
        """
        self.spi = spi
        self.cs = cs
        self.cs.init(self.cs.OUT, value=1)
        self.rx_buf = bytearray(3)  # Receive buffer
        self.tx_buf = bytearray(3)  # Transmit buffer
        # Rotated to match screen on CYD
        self.width = height
        self.height = width
        self.rotation = rotation
        # Set calibration
        self.x_min = x_min
        self.x_max = x_max
        self.y_min = y_min
        self.y_max = y_max
        self.x_multiplier = self.width / (x_max - x_min)
        self.x_add = x_min * -self.x_multiplier
        self.y_multiplier = self.height / (y_max - y_min)
        self.y_add = y_min * -self.y_multiplier
        self.pos = None

        if int_pin is not None:
            self.int_pin = int_pin
            self.int_pin.init(int_pin.IN)
            self.int_handler = int_handler
            self.int_locked = False
            int_pin.irq(trigger=int_pin.IRQ_FALLING | int_pin.IRQ_RISING,
                        handler=self.int_press)

    def get_touch(self, timeout=0.1, confidence=3):
        """Take multiple samples to get accurate touch reading."""
        buff = [[0, 0] for x in range(confidence)]
        buf_length = confidence  # Require a confidence of 5 good samples
        buffptr = 0  # Track current buffer position
        nsamples = 0  # Count samples
        while timeout > 0:
            if nsamples == buf_length:
                meanx = sum([c[0] for c in buff]) // buf_length
                meany = sum([c[1] for c in buff]) // buf_length
                dev = sum([(c[0] - meanx)**2 +
                          (c[1] - meany)**2 for c in buff]) / buf_length
                if dev <= 50:  # Deviation should be under margin of 50
                    self.pos = self.normalize(meanx, meany)
                    return None
            # get a new value
            sample = self.raw_touch()  # get a touch
            if sample is None:
                nsamples = 0    # Invalidate buff
            else:
                buff[buffptr] = sample  # put in buff
                buffptr = (buffptr + 1) % buf_length  # Incr, until rollover
                nsamples = min(nsamples + 1, buf_length)  # Incr. until max

            sleep(.01)
            timeout -= .01
        self.pos = None
        return None

    def int_press(self, pin):
        if not pin.value():
            buff = self.raw_touch()
            if buff is not None:
                self.pos = self.normalize(*buff)
        elif pin.value():
            self.pos = None

    def get_pos(self):
        return self.pos

    def normalize(self, x, y):
        """Normalize mean X,Y values to match LCD screen."""
        x = int(self.x_multiplier * x + self.x_add)
        y = int(self.y_multiplier * y + self.y_add)
        if self.rotation == 0:
            return y, x
        elif self.rotation == 90:
            return self.width - x, y
        elif self.rotation == 180:
            return self.height - y, self.width - x
        elif self.rotation == 270:
            return x, self.height - y

    def raw_touch(self):
        """Read raw X,Y touch values.

        Returns:
            tuple(int, int): X, Y
        """
        x = self.send_command(self.GET_X)
        y = self.send_command(self.GET_Y)
        if self.x_min <= x <= self.x_max and self.y_min <= y <= self.y_max:
            return (x, y)
        else:
            return None

    def send_command(self, command):
        """Write command to XT2046 (MicroPython).

        Args:
            command (byte): XT2046 command code.
        Returns:
            int: 12 bit response
        """
        self.tx_buf[0] = command
        self.cs(0)
        self.spi.write_readinto(self.tx_buf, self.rx_buf)
        self.cs(1)

        return (self.rx_buf[1] << 4) | (self.rx_buf[2] >> 4)
