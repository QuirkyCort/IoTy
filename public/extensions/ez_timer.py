from time import ticks_ms, ticks_diff

class Timer:
    def __init__(self):
        self.time_s = 0
        self.time_ms = 0
        self.prev_ms = ticks_ms()
        self.timers = []

    def set_interval(self, cb, interval, offset=0):
        interval_ms = round(interval * 1000)
        offset_ms = round(offset * 1000)
        initial_ms = interval_ms + offset_ms
        s = initial_ms // 1000
        ms = initial_ms % 1000
        self.timers.append([interval_ms, cb, s, ms])

    def update(self):
        now = ticks_ms()
        self.time_ms += ticks_diff(now, self.prev_ms)
        self.prev_ms = now
        self.time_s += self.time_ms // 1000
        self.time_ms %= 1000

        for timer in self.timers:
            if self.time_s >= timer[2] and self.time_ms >= timer[3]:
                timer[3] += timer[0]
                timer[2] += timer[3] // 1000
                timer[3] %= 1000
                timer[1]()