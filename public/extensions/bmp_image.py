import struct
import math

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
            if compression != 0:
                raise RuntimeError('Compression not supported')

    def _read_palette(self):
        self.file.seek(14 + self.dib_size, 0)
        colors = 2 ** self.depth
        for _ in range(colors):
            b, g, r, _ = struct.unpack('BBBB', self.file.read(4))
            self.palette.append((r, g, b))

    def _open_file(self):
        self.file = open(self.filename, 'br')
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

    def _555_to_24(self, w):
        b = w[0] & 31
        g = ((w[1] & 3) << 3) | (w[0] >> 5)
        r = (w[1] >> 2) & 31
        r = 255 * r // 31
        g = 255 * g // 31
        b = 255 * b // 31
        return (r, g, b)

    def close(self):
        self.file.close()
        self.file = None

    def get_pixel_raw(self):
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

    def get_pixel(self):
        p = self.get_pixel_raw()

        if self.depth <= 8:
            return self.palette[p]
        elif self.depth == 16:
            return self._555_to_24(p)
        else:
            return p

    def render(self, cb, x_offset, y_offset):
        for y in range(self.height - 1, -1, -1):
            for x in range(self.width):
                cb(x + x_offset, y + y_offset, self.get_pixel())

    def render_raw(self, cb, x_offset, y_offset):
        for y in range(self.height - 1, -1, -1):
            for x in range(self.width):
                cb(x + x_offset, y + y_offset, self.get_pixel_raw())
