class GPS:
    def __init__(self, uart):
        self.uart = uart
        self.buf = b''

        self.date = None
        self.time = None
        self.lat = None
        self.lng = None
        self.alt = None
        self.sog = None
        self.cog = None

    def update(self):
        while self.uart.any():
            self.buf += self.uart.read(1)

        end = self.buf.find(b'\n')
        if end > -1:
            msg = self.buf[:end-1]
            self.buf = self.buf[end+1:]
            self.parse_msg(msg)
            return True

        return False

    def crc(self, msg):
        crc = 0
        for c in msg:
            crc ^= c
        return crc

    def convert2m(self, v, u):
        if u == b'M':
            return v
        elif u == b'N':
            return v * .5144444444
        elif u == b'K':
            return v * .2777777777

    def parse_hhmmss(self, msg):
        try:
            self.time = (int(msg[:2]), int(msg[2:4]), float(msg[4:]))
        except:
            pass

    def parse_ddmmyy(self, msg):
        try:
            self.date = (int(msg[:2]), int(msg[2:4]), 2000 + int(msg[4:6]))
        except:
            pass

    def parse_lat(self, msg1, msg2):
        try:
            self.lat = [int(msg1[:2]), float(msg1[2:]), msg2]
        except:
            pass

    def parse_lng(self, msg1, msg2):
        try:
            self.lng = [int(msg1[:3]), float(msg1[3:]), msg2]
        except:
            pass

    def parse_alt(self, msg1, msg2):
        try:
            self.alt = self.convert2m(float(msg1), msg2)
        except:
            pass

    def parse_GGA(self, msg):
        msg = msg.split(b',')
        if len(msg) < 11:
            return
        self.parse_hhmmss(msg[1])
        self.parse_lat(msg[2], msg[3])
        self.parse_lng(msg[4], msg[5])
        self.parse_alt(msg[9], msg[10])

    def parse_GLL(self, msg):
        msg = msg.split(b',')
        if len(msg) < 6:
            return
        if msg[6] == b'V':
            return
        self.parse_lat(msg[1], msg[2])
        self.parse_lng(msg[3], msg[4])
        self.parse_hhmmss(msg[5])

    def parse_RMC(self, msg):
        msg = msg.split(b',')
        if len(msg) < 10:
            return
        if msg[2] == b'V':
            return
        self.parse_hhmmss(msg[1])
        self.parse_lat(msg[3], msg[4])
        self.parse_lng(msg[5], msg[6])
        try:
            self.sog = self.convert2m(float(msg[7]), b'N')
        except:
            pass
        try:
            self.cog = float(msg[8])
        except:
            pass
        self.parse_ddmmyy(msg[9])

    def parse_msg(self, msg):
        if msg[0] != ord(b'$'):
            return

        crc_pos = msg.find(b'*')
        if crc_pos > -1:
            try:
                crc = int(msg[crc_pos+1:], 16)
            except:
                return
            msg = msg[1:crc_pos]
            if self.crc(msg) != crc:
                return

        if len(msg) < 10:
            return
        if msg[2:5] == b'GGA':
            self.parse_GGA(msg)
        elif msg[2:5] == b'GLL':
            self.parse_GLL(msg)
        elif msg[2:5] == b'RMC':
            self.parse_RMC(msg)

    def get_lat_ddm(self):
        return self.lat

    def get_lng_ddm(self):
        return self.lng

    def get_lat(self):
        if self.lat is None:
            return None
        deg = self.lat[0] + self.lat[1] / 60
        if self.lat[2] == b'S':
            return -deg
        return deg

    def get_lng(self):
        if self.lng is None:
            return None
        deg = self.lng[0] + self.lng[1] / 60
        if self.lng[2] == b'W':
            return -deg
        return deg

    def get_alt(self):
        return self.alt

    def get_time(self):
        return self.time

    def get_date(self):
        return self.date

    def get_datetime(self):
        if self.date is None or self.time is None:
            return None
        return (self.date[2], self.date[1], self.date[0], 0, self.time[0], self.time[1], self.time[2], 0)

    def get_sog(self):
        return self.sog

    def get_cog(self):
        return self.cog