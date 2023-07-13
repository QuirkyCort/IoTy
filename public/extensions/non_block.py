import sys, uselect

class Non_Block:
    def __init__(self):
        self.poll = uselect.poll()
        self.poll.register(sys.stdin, uselect.POLLIN)
        self.buf = ''

    def _fill_buf(self):
        while self.poll.poll(0):
            self.buf += sys.stdin.read(1)

    def read(self, count=-1):
        self._fill_buf()
        if count < 0:
            val = self.buf
            self.buf = ''
            return val
        elif len(self.buf) >= count:
            val = self.buf[:count]
            self.buf = self.buf[count:]
            return val
        return ''

    def readline(self):
        self._fill_buf()
        pos = self.buf.find('\n')
        if pos != -1:
            val = self.buf[:pos+1]
            self.buf = self.buf[pos+1:]
            return val
        return ''
