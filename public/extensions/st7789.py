# Based on https://github.com/devbis/st7789py_mpy
# With some added code from https://github.com/rdagger/micropython-ili9341
# With edits by Cort

import time
from micropython import const
import ustruct as struct
from framebuf import FrameBuffer, RGB565

# commands
ST77XX_NOP = const(0x00)
ST77XX_SWRESET = const(0x01)
ST77XX_RDDID = const(0x04)
ST77XX_RDDST = const(0x09)

ST77XX_SLPIN = const(0x10)
ST77XX_SLPOUT = const(0x11)
ST77XX_PTLON = const(0x12)
ST77XX_NORON = const(0x13)

ST77XX_INVOFF = const(0x20)
ST77XX_INVON = const(0x21)
ST77XX_DISPOFF = const(0x28)
ST77XX_DISPON = const(0x29)
ST77XX_CASET = const(0x2A)
ST77XX_RASET = const(0x2B)
ST77XX_RAMWR = const(0x2C)
ST77XX_RAMRD = const(0x2E)

ST77XX_PTLAR = const(0x30)
ST77XX_COLMOD = const(0x3A)
ST7789_MADCTL = const(0x36)

ST7789_MADCTL_MY = const(0x80)
ST7789_MADCTL_MX = const(0x40)
ST7789_MADCTL_MV = const(0x20)
ST7789_MADCTL_ML = const(0x10)
ST7789_MADCTL_BGR = const(0x08)
ST7789_MADCTL_MH = const(0x04)
ST7789_MADCTL_RGB = const(0x00)

ST7789_RDID1 = const(0xDA)
ST7789_RDID2 = const(0xDB)
ST7789_RDID3 = const(0xDC)
ST7789_RDID4 = const(0xDD)

ColorMode_65K = const(0x50)
ColorMode_262K = const(0x60)
ColorMode_12bit = const(0x03)
ColorMode_16bit = const(0x05)
ColorMode_18bit = const(0x06)
ColorMode_16M = const(0x07)

_ENCODE_PIXEL = ">H"
_ENCODE_POS = ">HH"
_DECODE_PIXEL = ">BBB"

_BUFFER_SIZE = const(256)


def delay_ms(ms):
    time.sleep_ms(ms)


def color565(r, g=0, b=0):
    """Convert red, green and blue values (0-255) into a 16-bit 565 encoding.  As
    a convenience this is also available in the parent adafruit_rgb_display
    package namespace."""
    try:
        r, g, b = r  # see if the first var is a tuple/list
    except TypeError:
        pass
    return (r & 0xf8) << 8 | (g & 0xfc) << 3 | b >> 3

def hsv565(h, s, v):
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
        return color565(v, t, p)
    if i == 1:
        return color565(q, v, p)
    if i == 2:
        return color565(p, v, t)
    if i == 3:
        return color565(p, q, v)
    if i == 4:
        return color565(t, p, v)
    if i == 5:
        return color565(v, p, q)

class ST77xx:
    def __init__(self, spi, width, height, reset, dc, cs=None,
                 xstart=-1, ystart=-1):
        """
        display = st7789.ST7789(
            SPI(1, baudrate=40000000, phase=0, polarity=1),
            240, 240,
            reset=machine.Pin(5, machine.Pin.OUT),
            dc=machine.Pin(2, machine.Pin.OUT),
        )

        """
        self.width = width
        self.height = height
        self.spi = spi
        if spi is None:
            import machine
            self.spi = machine.SPI(1, baudrate=40000000, phase=0, polarity=1)
        self.reset = reset
        self.dc = dc
        self.cs = cs
        if xstart >= 0 and ystart >= 0:
            self.xstart = xstart
            self.ystart = ystart
        elif (self.width, self.height) == (240, 240):
            self.xstart = 0
            self.ystart = 0
        elif (self.width, self.height) == (135, 240):
            self.xstart = 52
            self.ystart = 40
        else:
            raise ValueError(
                "Unsupported display. Only 240x240 and 135x240 are supported "
                "without xstart and ystart provided"
            )

    def dc_low(self):
        self.dc.off()

    def dc_high(self):
        self.dc.on()

    def reset_low(self):
        if self.reset:
            self.reset.off()

    def reset_high(self):
        if self.reset:
            self.reset.on()

    def cs_low(self):
        if self.cs:
            self.cs.off()

    def cs_high(self):
        if self.cs:
            self.cs.on()

    def write(self, command=None, data=None):
        """SPI write to the device: commands and data"""
        self.cs_low()
        if command is not None:
            self.dc_low()
            self.spi.write(bytes([command]))
        if data is not None:
            self.dc_high()
            self.spi.write(data)
        self.cs_high()

    def hard_reset(self):
        self.cs_low()
        self.reset_high()
        delay_ms(50)
        self.reset_low()
        delay_ms(50)
        self.reset_high()
        delay_ms(150)
        self.cs_high()

    def soft_reset(self):
        self.write(ST77XX_SWRESET)
        delay_ms(150)

    def sleep_mode(self, value):
        if value:
            self.write(ST77XX_SLPIN)
        else:
            self.write(ST77XX_SLPOUT)

    def inversion_mode(self, value):
        if value:
            self.write(ST77XX_INVON)
        else:
            self.write(ST77XX_INVOFF)

    def _set_color_mode(self, mode):
        self.write(ST77XX_COLMOD, bytes([mode & 0x77]))

    def init(self, *args, **kwargs):
        self.hard_reset()
        self.soft_reset()
        self.sleep_mode(False)

    def _set_mem_access_mode(self, rotation, vert_mirror, horz_mirror, is_bgr):
        rotation &= 7
        value = {
            0: 0,
            1: ST7789_MADCTL_MX,
            2: ST7789_MADCTL_MY,
            3: ST7789_MADCTL_MX | ST7789_MADCTL_MY,
            4: ST7789_MADCTL_MV,
            5: ST7789_MADCTL_MV | ST7789_MADCTL_MX,
            6: ST7789_MADCTL_MV | ST7789_MADCTL_MY,
            7: ST7789_MADCTL_MV | ST7789_MADCTL_MX | ST7789_MADCTL_MY,
        }[rotation]

        if vert_mirror:
            value = ST7789_MADCTL_ML
        elif horz_mirror:
            value = ST7789_MADCTL_MH

        if is_bgr:
            value |= ST7789_MADCTL_BGR
        self.write(ST7789_MADCTL, bytes([value]))

    def _encode_pos(self, x, y):
        """Encode a postion into bytes."""
        return struct.pack(_ENCODE_POS, x, y)

    def _encode_pixel(self, color):
        """Encode a pixel color into bytes."""
        return struct.pack(_ENCODE_PIXEL, color)

    def _set_columns(self, start, end):
        if start > end or end >= self.width:
            return
        start += self.xstart
        end += self.xstart
        self.write(ST77XX_CASET, self._encode_pos(start, end))

    def _set_rows(self, start, end):
        if start > end or end >= self.height:
            return
        start += self.ystart
        end += self.ystart
        self.write(ST77XX_RASET, self._encode_pos(start, end))

    def set_window(self, x0, y0, x1, y1):
        self._set_columns(x0, x1)
        self._set_rows(y0, y1)
        self.write(ST77XX_RAMWR)

    def is_off_grid(self, xmin, ymin, xmax, ymax):
        if xmin < 0:
            return True
        if ymin < 0:
            return True
        if xmax >= self.width:
            return True
        if ymax >= self.height:
            return True
        return False

    def vline(self, x, y, length, color):
        self.fill_rect(x, y, 1, length, color)

    def hline(self, x, y, length, color):
        self.fill_rect(x, y, length, 1, color)

    def pixel(self, x, y, color):
        self.set_window(x, y, x, y)
        self.write(None, self._encode_pixel(color))

    def blit_buffer(self, buffer, x, y, width, height):
        self.set_window(x, y, x + width - 1, y + height - 1)
        self.write(None, buffer)

    def rect(self, x, y, w, h, color):
        self.hline(x, y, w, color)
        self.vline(x, y, h, color)
        self.vline(x + w - 1, y, h, color)
        self.hline(x, y + h - 1, w, color)

    def fill_rect(self, x, y, width, height, color):
        self.set_window(x, y, x + width - 1, y + height - 1)
        chunks, rest = divmod(width * height, _BUFFER_SIZE)
        pixel = self._encode_pixel(color)
        self.dc_high()
        if chunks:
            data = pixel * _BUFFER_SIZE
            for _ in range(chunks):
                self.write(None, data)
        if rest:
            self.write(None, pixel * rest)

    def circle(self, x0, y0, r, color):
        f = 1 - r
        dx = 1
        dy = -r - r
        x = 0
        y = r
        self.pixel(x0, y0 + r, color)
        self.pixel(x0, y0 - r, color)
        self.pixel(x0 + r, y0, color)
        self.pixel(x0 - r, y0, color)
        while x < y:
            if f >= 0:
                y -= 1
                dy += 2
                f += dy
            x += 1
            dx += 2
            f += dx
            self.pixel(x0 + x, y0 + y, color)
            self.pixel(x0 - x, y0 + y, color)
            self.pixel(x0 + x, y0 - y, color)
            self.pixel(x0 - x, y0 - y, color)
            self.pixel(x0 + y, y0 + x, color)
            self.pixel(x0 - y, y0 + x, color)
            self.pixel(x0 + y, y0 - x, color)
            self.pixel(x0 - y, y0 - x, color)

    def ellipse(self, x0, y0, a, b, color):
        a2 = a * a
        b2 = b * b
        twoa2 = a2 + a2
        twob2 = b2 + b2
        x = 0
        y = b
        px = 0
        py = twoa2 * y
        # Plot initial points
        self.pixel(x0 + x, y0 + y, color)
        self.pixel(x0 - x, y0 + y, color)
        self.pixel(x0 + x, y0 - y, color)
        self.pixel(x0 - x, y0 - y, color)
        # Region 1
        p = round(b2 - (a2 * b) + (0.25 * a2))
        while px < py:
            x += 1
            px += twob2
            if p < 0:
                p += b2 + px
            else:
                y -= 1
                py -= twoa2
                p += b2 + px - py
            self.pixel(x0 + x, y0 + y, color)
            self.pixel(x0 - x, y0 + y, color)
            self.pixel(x0 + x, y0 - y, color)
            self.pixel(x0 - x, y0 - y, color)
        # Region 2
        p = round(b2 * (x + 0.5) * (x + 0.5) +
                  a2 * (y - 1) * (y - 1) - a2 * b2)
        while y > 0:
            y -= 1
            py -= twoa2
            if p > 0:
                p += a2 - py
            else:
                x += 1
                px += twob2
                p += a2 - py + px
            self.pixel(x0 + x, y0 + y, color)
            self.pixel(x0 - x, y0 + y, color)
            self.pixel(x0 + x, y0 - y, color)
            self.pixel(x0 - x, y0 - y, color)

    def fill_circle(self, x0, y0, r, color):
        """Draw a filled circle.

        Args:
            x0 (int): X coordinate of center point.
            y0 (int): Y coordinate of center point.
            r (int): Radius.
            color (int): RGB565 color value.
        """
        f = 1 - r
        dx = 1
        dy = -r - r
        x = 0
        y = r
        self.vline(x0, y0 - r, 2 * r + 1, color)
        while x < y:
            if f >= 0:
                y -= 1
                dy += 2
                f += dy
            x += 1
            dx += 2
            f += dx
            self.vline(x0 + x, y0 - y, 2 * y + 1, color)
            self.vline(x0 - x, y0 - y, 2 * y + 1, color)
            self.vline(x0 - y, y0 - x, 2 * x + 1, color)
            self.vline(x0 + y, y0 - x, 2 * x + 1, color)

    def fill_ellipse(self, x0, y0, a, b, color):
        """Draw a filled ellipse.

        Args:
            x0, y0 (int): Coordinates of center point.
            a (int): Semi axis horizontal.
            b (int): Semi axis vertical.
            color (int): RGB565 color value.
        Note:
            The center point is the center of the x0,y0 pixel.
            Since pixels are not divisible, the axes are integer rounded
            up to complete on a full pixel.  Therefore the major and
            minor axes are increased by 1.
        """
        a2 = a * a
        b2 = b * b
        twoa2 = a2 + a2
        twob2 = b2 + b2
        x = 0
        y = b
        px = 0
        py = twoa2 * y
        # Plot initial points
        self.line(x0, y0 - y, x0, y0 + y, color)
        # Region 1
        p = round(b2 - (a2 * b) + (0.25 * a2))
        while px < py:
            x += 1
            px += twob2
            if p < 0:
                p += b2 + px
            else:
                y -= 1
                py -= twoa2
                p += b2 + px - py
            self.line(x0 + x, y0 - y, x0 + x, y0 + y, color)
            self.line(x0 - x, y0 - y, x0 - x, y0 + y, color)
        # Region 2
        p = round(b2 * (x + 0.5) * (x + 0.5) +
                  a2 * (y - 1) * (y - 1) - a2 * b2)
        while y > 0:
            y -= 1
            py -= twoa2
            if p > 0:
                p += a2 - py
            else:
                x += 1
                px += twob2
                p += a2 - py + px
            self.line(x0 + x, y0 - y, x0 + x, y0 + y, color)
            self.line(x0 - x, y0 - y, x0 - x, y0 + y, color)

    def text8x8(self, x, y, text, color,  background=0,
                     rotate=0):
        w = len(text) * 8
        h = 8
        # Confirm coordinates in boundary
        if self.is_off_grid(x, y, x + 7, y + 7):
            return
        buf = bytearray(w * 16)
        fbuf = FrameBuffer(buf, w, h, RGB565)
        if background != 0:
            # Swap background color bytes to correct for framebuf endianness
            b_color = ((background & 0xFF) << 8) | ((background & 0xFF00) >> 8)
            fbuf.fill(b_color)
        # Swap text color bytes to correct for framebuf endianness
        t_color = ((color & 0xFF) << 8) | ((color & 0xFF00) >> 8)
        fbuf.text(text, 0, 0, t_color)
        if rotate == 0:
            # self.block(x, y, x + w - 1, y + (h - 1), buf)
            self.blit_buffer(buf, x, y, w, h)
        elif rotate == 90:
            buf2 = bytearray(w * 16)
            fbuf2 = FrameBuffer(buf2, h, w, RGB565)
            for y1 in range(h):
                for x1 in range(w):
                    fbuf2.pixel(y1, x1,
                                fbuf.pixel(x1, (h - 1) - y1))
            # self.block(x, y, x + (h - 1), y + w - 1, buf2)
            self.blit_buffer(buf2, x, y, h, w)
        elif rotate == 180:
            buf2 = bytearray(w * 16)
            fbuf2 = FrameBuffer(buf2, w, h, RGB565)
            for y1 in range(h):
                for x1 in range(w):
                    fbuf2.pixel(x1, y1,
                                fbuf.pixel((w - 1) - x1, (h - 1) - y1))
            # self.block(x, y, x + w - 1, y + (h - 1), buf2)
            self.blit_buffer(buf2, x, y, w, h)
        elif rotate == 270:
            buf2 = bytearray(w * 16)
            fbuf2 = FrameBuffer(buf2, h, w, RGB565)
            for y1 in range(h):
                for x1 in range(w):
                    fbuf2.pixel(y1, x1,
                                fbuf.pixel((w - 1) - x1, y1))
            # self.block(x, y, x + (h - 1), y + w - 1, buf2)
            self.blit_buffer(buf2, x, y, h, w)

    def letter(self, x, y, letter, font, color, background=0,
                    landscape=False, rotate_180=False):
        buf, w, h = font.get_letter(letter, color, background, landscape)
        if rotate_180:
            # Manually rotate the buffer by 180 degrees
            # ensure bytes pairs for each pixel retain color565
            new_buf = bytearray(len(buf))
            num_pixels = len(buf) // 2
            for i in range(num_pixels):
                # The index for the new buffer's byte pair
                new_idx = (num_pixels - 1 - i) * 2
                # The index for the original buffer's byte pair
                old_idx = i * 2
                # Swap the pixels
                new_buf[new_idx], new_buf[new_idx + 1] = buf[old_idx], buf[old_idx + 1]
            buf = new_buf

        # Check for errors (Font could be missing specified letter)
        if w == 0:
            return w, h

        if landscape:
            y -= w
            if self.is_off_grid(x, y, x + h - 1, y + w - 1):
                return 0, 0
            # self.block(x, y,
            #            x + h - 1, y + w - 1,
            #            buf)
            self.blit_buffer(buf, x, y, h, w)
        else:
            if self.is_off_grid(x, y, x + w - 1, y + h - 1):
                return 0, 0
            # self.block(x, y,
            #            x + w - 1, y + h - 1,
            #            buf)
            self.blit_buffer(buf, x, y, w, h)
        return w, h

    def text(self, x, y, text, font, color,  background=0,
                  landscape=False, rotate_180=False, spacing=1):
        iterable_text = reversed(text) if rotate_180 else text
        for letter in iterable_text:
            # Get letter array and letter dimensions
            w, h = self.letter(x, y, letter, font, color, background,
                                    landscape, rotate_180)
            # Stop on error
            if w == 0 or h == 0:
                return

            if landscape:
                # Fill in spacing
                if spacing:
                    self.fill_rect(x, y - w - spacing, h, spacing, background)
                # Position y for next letter
                y -= (w + spacing)
            else:
                # Fill in spacing
                if spacing:
                    self.fill_rect(x + w, y, spacing, h, background)
                # Position x for next letter
                x += (w + spacing)

    def image(self, path, x=0, y=0, w=320, h=240):
        x2 = x + w - 1
        y2 = y + h - 1
        if self.is_off_grid(x, y, x2, y2):
            return
        with open(path, "rb") as f:
            chunk_height = 1024 // w
            chunk_count, remainder = divmod(h, chunk_height)
            chunk_size = chunk_height * w * 2
            chunk_y = y
            if chunk_count:
                for c in range(0, chunk_count):
                    buf = f.read(chunk_size)
                    # self.block(x, chunk_y,
                    #            x2, chunk_y + chunk_height - 1,
                    #            buf)
                    self.blit_buffer(buf, x, chunk_y, w, chunk_height)
                    chunk_y += chunk_height
            if remainder:
                buf = f.read(remainder * w * 2)
                # self.block(x, chunk_y,
                #            x2, chunk_y + remainder - 1,
                #            buf)
                self.blit_buffer(buf, x, chunk_y, w, remainder)

    def sprite(self, buf, x, y, w, h):
        x2 = x + w - 1
        y2 = y + h - 1
        if self.is_off_grid(x, y, x2, y2):
            return
        # self.block(x, y, x2, y2, buf)
        self.blit_buffer(buf, x, y, w, h)

    def fill(self, color):
        self.fill_rect(0, 0, self.width, self.height, color)

    def line(self, x0, y0, x1, y1, color):
        # Line drawing function.  Will draw a single pixel wide line starting at
        # x0, y0 and ending at x1, y1.
        steep = abs(y1 - y0) > abs(x1 - x0)
        if steep:
            x0, y0 = y0, x0
            x1, y1 = y1, x1
        if x0 > x1:
            x0, x1 = x1, x0
            y0, y1 = y1, y0
        dx = x1 - x0
        dy = abs(y1 - y0)
        err = dx // 2
        if y0 < y1:
            ystep = 1
        else:
            ystep = -1
        while x0 <= x1:
            if steep:
                self.pixel(y0, x0, color)
            else:
                self.pixel(x0, y0, color)
            err -= dy
            if err < 0:
                y0 += ystep
                err += dx
            x0 += 1


class ST7789(ST77xx):
    def init(self, *, color_mode=ColorMode_65K | ColorMode_16bit):
        super().init()
        self._set_color_mode(color_mode)
        delay_ms(50)
        self._set_mem_access_mode(4, True, True, False)
        self.inversion_mode(True)
        delay_ms(10)
        self.write(ST77XX_NORON)
        delay_ms(10)
        self.fill(0)
        self.write(ST77XX_DISPON)
        delay_ms(500)