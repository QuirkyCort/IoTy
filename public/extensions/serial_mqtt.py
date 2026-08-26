import json
import binascii
import sys, select


class MQTTClient:
    def __init__(self):
        self.subscriptions = {}
        self.poll = select.poll()
        self.poll.register(sys.stdin, select.POLLIN)
        self.buf = ''

    def _fill_buf(self):
        while self.poll.poll(0):
            self.buf += sys.stdin.read(1)

    def subscribe(self, topic, cb):
        self.subscriptions[topic] = cb
        
    def publish(self, topic, msg):
        data = [topic, binascii.b2a_base64(msg, newline=False).decode()]
        j_data = json.dumps(data, separators=(',', ':'))
        print(j_data)

    def readline(self):
        self._fill_buf()
        pos = self.buf.find('\n')
        if pos != -1:
            val = self.buf[:pos+1]
            self.buf = self.buf[pos+1:]
            return val
        return ''
        
    def check_msg(self):
        while True:
            line = self.readline()
            if line == '':
                return
            try:
                data = json.loads(line)
                topic, b64_msg = data
                if topic in self.subscriptions:
                    msg = binascii.a2b_base64(b64_msg)
                    self.subscriptions[topic](msg)
            except:
                continue