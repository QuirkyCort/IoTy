class BytesBuffer:
    def __init__(self, size):
        self.size = size
        self.buf = bytearray(size)
        self.in_ptr = 0
        self.out_ptr = 0

    def _wrap_ptr(self):
        if self.in_ptr >= self.size and self.out_ptr >= self.size:
            self.in_ptr -= self.size
            self.out_ptr -= self.size

    def can_write(self, size):
        return self.size - (self.in_ptr - self.out_ptr) >= size

    def can_read(self, size):
        return self.in_ptr - self.out_ptr >= size

    def free_space(self):
        return self.size - (self.in_ptr - self.out_ptr)

    def write(self, data):
        if data:
            length = len(data)
            ptr = self.in_ptr % self.size
            ptr_end = ptr + length
            if ptr_end > self.size:
                self.buf[ptr:self.size] = data[0:self.size - ptr]
                self.buf[0:ptr_end - self.size] = data[self.size - ptr:length]
            else:
                self.buf[ptr:ptr_end] = data
            self.in_ptr += length

    def read(self, size):
        ptr = self.out_ptr % self.size
        ptr_end = ptr + size
        self.out_ptr += size
        self._wrap_ptr()
        if ptr_end > self.size:
            buf = bytearray(size)
            buf[0:self.size - ptr] = self.buf[ptr:self.size]
            buf[self.size - ptr: size] = self.buf[0:ptr_end - self.size]
            return buf
        else:
            return self.buf[ptr:ptr_end]

