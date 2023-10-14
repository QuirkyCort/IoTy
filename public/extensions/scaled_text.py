import framebuf

class ScaledText:
    def __init__(self, fb):
        self.buffer = bytearray(8)
        self.char_fb = framebuf.FrameBuffer(self.buffer, 8, 8, framebuf.MONO_HMSB)
        self.fb = fb
        self.last_char = ''

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
                        self.fb.fill_rect(x + start * scale, y, scale * (i - start), scale, c)
                        start = -1
            if start != -1:
                self.fb.fill_rect(x + start * scale, y, scale * (i - start), scale, c)
            y += scale

    def text(self, s, x, y, c=1, scale=2):
        for char in s:
            self._draw_char(char, x, y, c, int(scale))
            x += 8 * scale

