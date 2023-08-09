from time import ticks_ms, ticks_diff

class Timer:
    def __init__(self):
        self.time_ms = 0
        self.prev_ms = ticks_ms()
        self.timers = []

    def set_interval(self, cb, interval, offset=0, count=-1):
        interval_ms = round(interval * 1000)
        offset_ms = round(offset * 1000)
        initial_ms = interval_ms + offset_ms
        self.timers.append([interval_ms, cb, initial_ms, count])

    def set_timeout(self, cb, interval):
        current_ms = ticks_diff(ticks_ms(), self.prev_ms)
        self.set_interval(cb, interval, offset=current_ms/1000, count=1)

    def update(self):
        now = ticks_ms()
        self.time_ms += ticks_diff(now, self.prev_ms)
        self.prev_ms = now

        remove = []
        for timer in self.timers:
            if self.time_ms >= timer[2]:
                timer[2] += timer[0]
                timer[1]()
                if timer[3] > 0:
                    timer[3] -= 1
                    if timer[3] == 0:
                        remove.append(timer)

        if len(remove) > 0:
            for r in remove:
                self.timers.remove(r)