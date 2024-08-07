import framebuf
from micropython import const

SSD1306 = const(0x00)
ILI9341 = const(0x01)
ST7789 = const(0x02)

class ScaledText:
    def __init__(self, fb, fb_type=SSD1306):
        self.buffer = bytearray(8)
        self.char_fb = framebuf.FrameBuffer(self.buffer, 8, 8, framebuf.MONO_HMSB)
        self.fb = fb
        self.fb_type = fb_type
        self.last_char = ''

    def _fill_rect(self, x, y, w, h, c=1):
        if self.fb_type == SSD1306:
            self.fb.fill_rect(x, y, w, h, c)
        elif self.fb_type == ILI9341:
            self.fb.fill_rectangle(x, y, w, h, c)
        elif self.fb_type == ST7789:
            self.fb.fill_rect(x, y, w, h, c)

    def _draw_char(self, char, x, y, c, scale):
        if char != self.last_char:
            self.char_fb.fill(0)
            self.char_fb.text(char, 0, 0)
            self.last_char = char

        for b in self.buffer:
            start = -1
            for i in range(8):
                if b & 1 << i:
                    if start == -1:
                        start = i
                else:
                    if start != -1:
                        self._fill_rect(x + start * scale, y, scale * (i - start), scale, c)
                        start = -1
            if start != -1:
                self._fill_rect(x + start * scale, y, scale * (i - start), scale, c)
            y += scale

    def text(self, s, x, y, c=1, scale=2, background=None):
        if background != None:
            self._fill_rect(x, y, len(s) * 8 * scale, 8 * scale, c=background)
        for char in s:
            self._draw_char(char, x, y, c, int(scale))
            x += 8 * scale

