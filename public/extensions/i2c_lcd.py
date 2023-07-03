import time

CLR = 0x01
HOME = 0x02

ENTRY_MODE = 0x04
ENTRY_INC = 0x02
ENTRY_SHIFT = 0x01

ON_CTRL = 0x08
ON_DISPLAY = 0x04
ON_CURSOR = 0x02
ON_BLINK = 0x01

MOVE = 0x10
MOVE_DISP = 0x08
MOVE_RIGHT = 0x04

FUNCTION = 0x20
FUNCTION_8BIT = 0x10
FUNCTION_2LINES = 0x08
FUNCTION_10DOTS = 0x04
FUNCTION_RESET = 0x30

CGRAM = 0x40
DDRAM = 0x80

RS_CMD = 0
RS_DATA = 1

RW_WRITE = 0
RW_READ = 1

MASK_RS = 0x01
MASK_RW = 0x02
MASK_E = 0x04

SHIFT_BACKLIGHT = 3
SHIFT_DATA = 4

class LCD:
    def __init__(self, i2c, i2c_addr=39, num_lines=2, num_columns=16):
        self.i2c = i2c
        self.i2c_addr = i2c_addr
        self.i2c.writeto(self.i2c_addr, bytes([0]))

        time.sleep_ms(20)
        self.write_nibble(FUNCTION_RESET)
        time.sleep_ms(5)
        self.write_nibble(FUNCTION_RESET)
        time.sleep_ms(1)
        self.write_nibble(FUNCTION_RESET)
        time.sleep_ms(1)

        self.write_nibble(FUNCTION)
        time.sleep_ms(1)

        self.num_lines = num_lines
        self.num_columns = num_columns

        self.cursor_x = 0
        self.cursor_y = 0

        self.implied_newline = False
        self.backlight = True
        self.display_off()
        self.backlight_on()
        self.clear()
        self.write_command(ENTRY_MODE | ENTRY_INC)
        self.hide_cursor()
        self.display_on()

        cmd = FUNCTION
        if num_lines > 1:
            cmd |= FUNCTION_2LINES
        self.write_command(cmd)

    def clear(self):
        self.write_command(CLR)
        self.write_command(HOME)
        self.cursor_x = 0
        self.cursor_y = 0

    def show_cursor(self):
        self.write_command(ON_CTRL | ON_DISPLAY | ON_CURSOR)

    def hide_cursor(self):
        self.write_command(ON_CTRL | ON_DISPLAY)

    def blink_cursor_on(self):
        self.write_command(ON_CTRL | ON_DISPLAY | ON_CURSOR | ON_BLINK)

    def blink_cursor_off(self):
        self.write_command(ON_CTRL | ON_DISPLAY | ON_CURSOR)

    def display_on(self):
        self.write_command(ON_CTRL | ON_DISPLAY)

    def display_off(self):
        self.write_command(ON_CTRL)

    def backlight_on(self):
        self.backlight = True
        self.i2c.writeto(self.i2c_addr, bytes([1 << SHIFT_BACKLIGHT]))

    def backlight_off(self):
        self.backlight = False
        self.i2c.writeto(self.i2c_addr, bytes([0]))

    def move_to(self, cursor_x, cursor_y):
        self.cursor_x = cursor_x
        self.cursor_y = cursor_y
        addr = cursor_x & 0x3f
        if cursor_y & 1:
            addr += 0x40
        if cursor_y & 2:
            addr += self.num_columns
        self.write_command(DDRAM | addr)

    def putchar(self, char):
        if char == '\n':
            if self.implied_newline:
                pass
            else:
                self.cursor_x = self.num_columns
        else:
            self.write_data(ord(char))
            self.cursor_x += 1
        if self.cursor_x >= self.num_columns:
            self.cursor_x = 0
            self.cursor_y += 1
            self.implied_newline = (char != '\n')
        if self.cursor_y >= self.num_lines:
            self.cursor_y = 0
        self.move_to(self.cursor_x, self.cursor_y)

    def putstr(self, string):
        for char in string:
            self.putchar(char)

    def custom_char(self, location, charmap):
        location &= 0x7
        self.write_command(self.CGRAM | (location << 3))
        time.sleep_us(40)
        for i in range(8):
            self.write_data(charmap[i])
            time.sleep_us(40)
        self.move_to(self.cursor_x, self.cursor_y)

    def write_command(self, cmd):
        byte = ((self.backlight << SHIFT_BACKLIGHT) | (((cmd >> 4) & 0x0f) << SHIFT_DATA))
        self.i2c.writeto(self.i2c_addr, bytes([byte | MASK_E]))
        self.i2c.writeto(self.i2c_addr, bytes([byte]))
        byte = ((self.backlight << SHIFT_BACKLIGHT) | ((cmd & 0x0f) << SHIFT_DATA))
        self.i2c.writeto(self.i2c_addr, bytes([byte | MASK_E]))
        self.i2c.writeto(self.i2c_addr, bytes([byte]))
        if cmd <= 3:
            time.sleep_ms(5)

    def write_nibble(self, nibble):
        byte = ((nibble >> 4) & 0x0f) << SHIFT_DATA
        self.i2c.writeto(self.i2c_addr, bytes([byte | MASK_E]))
        self.i2c.writeto(self.i2c_addr, bytes([byte]))

    def write_data(self, data):
        byte = (MASK_RS | (self.backlight << SHIFT_BACKLIGHT) | (((data >> 4) & 0x0f) << SHIFT_DATA))
        self.i2c.writeto(self.i2c_addr, bytes([byte | MASK_E]))
        self.i2c.writeto(self.i2c_addr, bytes([byte]))
        byte = (MASK_RS | (self.backlight << SHIFT_BACKLIGHT) | ((data & 0x0f) << SHIFT_DATA))
        self.i2c.writeto(self.i2c_addr, bytes([byte | MASK_E]))
        self.i2c.writeto(self.i2c_addr, bytes([byte]))
