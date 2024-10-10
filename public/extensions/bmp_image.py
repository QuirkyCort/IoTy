import struct
import math
from micropython import const

NO_CONVERSION = const(0)
RGB565BE = const(1)
RGB565LE = const(2)
RGB24 = const(3)
BW = const(4)
WB = const(5)
LIST = const(99)

class BMP:
    def __init__(self, filename):
        self.filename = filename
        self.file = None
        self.pixel_offset = 0
        self.dib_size = -1
        self.width = -1
        self.height = -1
        self.depth = -1
        self.row_size = -1
        self.palette = []

        self.byte = None
        self.x = 0
        self.y = 0

        self._open_file()

    def _read_file_header(self):
        self.file.seek(10, 0)
        self.pixel_offset = struct.unpack('<I', self.file.read(4))[0]
        self.dib_size = struct.unpack('<I', self.file.read(4))[0]
        if self.dib_size == 12:
            self.width = struct.unpack('<H', self.file.read(2))[0]
            self.height = abs(struct.unpack('<H', self.file.read(2))[0])
        else:
            self.width = struct.unpack('<i', self.file.read(4))[0]
            self.height = abs(struct.unpack('<i', self.file.read(4))[0])
        self.file.seek(2, 1)
        self.depth = struct.unpack('<H', self.file.read(2))[0]
        self.row_size = math.ceil(self.depth * self.width / 32) * 4
        if self.dib_size != 12:
            compression = struct.unpack('<I', self.file.read(4))[0]
            if compression != 0 and compression != 3:
                raise RuntimeError('Compression not supported')

    def _read_palette(self):
        self.file.seek(14 + self.dib_size, 0)
        colors = 2 ** self.depth
        for _ in range(colors):
            b, g, r, _ = struct.unpack('BBBB', self.file.read(4))
            self.palette.append((r, g, b))

    def _open_file(self):
        try:
            self.file = open(self.filename, 'br')
        except:
            raise OSError('Unable to open BMP file')
        self._read_file_header()
        if self.depth <= 8:
            self._read_palette()
        self.file.seek(self.pixel_offset, 0)
        self.x = 0
        self.y = 0

    def _get_pixel_1(self):
        i = self.x % 8
        if i == 0:
            self.byte = self.file.read(1)
        return (self.byte[0] >> (7 - i)) & 1

    def _get_pixel_4(self):
        i = self.x % 2
        if i == 0:
            self.byte = self.file.read(1)
            return self.byte[0] >> 4 & 0x0f
        else:
            return self.byte[0] & 0x0f

    def _get_pixel_8(self):
        return self.file.read(1)[0]

    def _get_pixel_16(self):
        return self.file.read(2)

    def _get_pixel_24(self):
        p = self.file.read(3)
        return (p[2], p[1], p[0])

    def _get_pixel_32(self):
        p = self.file.read(4)
        return (p[2], p[1], p[0])

    def close(self):
        self.file.close()
        self.file = None

    def _get_pixel_raw(self):
        if self.depth == 1:
            p = self._get_pixel_1()
        elif self.depth == 4:
            p = self._get_pixel_4()
        elif self.depth == 8:
            p = self._get_pixel_8()
        elif self.depth == 16:
            p = self._get_pixel_16()
        elif self.depth == 24:
            p = self._get_pixel_24()
        elif self.depth == 32:
            p = self._get_pixel_32()

        self.x += 1
        if self.x == self.width:
            self.x = 0
            self.y += 1
            self.file.seek(self.pixel_offset + self.y * self.row_size, 0)

        return p

    def _to_rgb24(self, p):
        if self.depth <= 8:
            p = self.palette[p]
            return p[0] << 16 | p[1] << 8 | p[2]
        elif self.depth == 16:
            b = p[0] & 31
            g = ((p[1] & 3) << 3) | (p[0] >> 5)
            r = (p[1] >> 3) & 31
            r = 255 * r // 31
            g = 255 * g // 31
            b = 255 * b // 31
            return r << 16 | g << 8 | b
        elif self.depth == 24:
            return p[0] << 16 | p[1] << 8 | p[2]

    def _to_565BE(self, p):
        if self.depth <= 8:
            p = self.palette[p]
            return (p[0] & 248) << 8 | (p[1] & 252) << 3 | (p[2] & 248) >> 3
        elif self.depth == 16:
            return p[1] << 8 | p[0]
        elif self.depth == 24:
            return (p[0] & 248) << 8 | (p[1] & 252) << 3 | (p[2] & 248) >> 3

    def _to_565LE(self, p):
        if self.depth <= 8:
            p = self.palette[p]
            return (p[1] & 28) << 11 | (p[2] & 248) << 5 | (p[0] & 248) | (p[1] & 224) >> 5
        elif self.depth == 16:
            return p[0] << 8 | p[1]
        elif self.depth == 24:
            return (p[1] & 28) << 11 | (p[2] & 248) << 5 | (p[0] & 248) | (p[1] & 224) >> 5

    def _to_BW(self, p):
        if self.depth <= 8:
            p = self.palette[p]
            if max(p[0], p[1], p[2]) > 127:
                return 1
            return 0
        elif self.depth == 16:
            b = p[0] & 31
            g = ((p[1] & 3) << 3) | (p[0] >> 5)
            r = (p[1] >> 3) & 31
            if max(r, g, b) > 15:
                return 1
            return 0
        elif self.depth == 24:
            if max(p[0], p[1], p[2]) > 127:
                return 1
            return 0

    def _to_WB(self, p):
        p = self._to_BW(p)
        if p:
            return 0
        return 1

    def _to_list(self, p):
        if self.depth <= 8:
            return self.palette[p]
        elif self.depth == 16:
            b = p[0] & 31
            g = ((p[1] & 3) << 3) | (p[0] >> 5)
            r = (p[1] >> 2) & 31
            r = 255 * r // 31
            g = 255 * g // 31
            b = 255 * b // 31
            return (r, g, b)
        elif self.depth == 24:
            return p

    def get_pixel(self, format=RGB24):
        p = self._get_pixel_raw()

        if format == RGB24:
            return self._to_rgb24(p)
        elif format == RGB565BE:
            return self._to_565BE(p)
        elif format == RGB565LE:
            return self._to_565LE(p)
        elif format == BW:
            return self._to_BW(p)
        elif format == WB:
            return self._to_WB(p)
        elif format == LIST:
            return self._to_list(p)

    def render(self, cb, x_offset, y_offset, format=RGB24):
        for y in range(self.height - 1, -1, -1):
            for x in range(self.width):
                cb(x + x_offset, y + y_offset, self.get_pixel(format=format))

