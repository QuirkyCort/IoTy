# RTTTL code based on https://github.com/dhylands/upy-rtttl

from machine import Pin, PWM
from time import ticks_ms, ticks_diff, ticks_add

NOTE = [
    440.0,	# A
    493.9,	# B or H
    261.6,	# C
    293.7,	# D
    329.6,	# E
    349.2,  # F
    392.0,	# G
    0.0,    # pad

    466.2,	# A#
    0.0,
    277.2,	# C#
    311.1,	# D#
    0.0,
    370.0,	# F#
    415.3,	# G#
    0.0,
]

class Music:
    def __init__(self, pin):
        self.pin = Pin(pin)
        self.pwm = PWM(self.pin, freq=440, duty=0)
        self.d = 4
        self.o = 6
        self.b = 63
        self.queue = []
        self.queue_idx = 0
        self.loops = 0
        self.playing = False
        self.start_ms = 0
        self.stop_ms = 0

    def _next_char(self, i):
        try:
            char = next(i)
            if char == ',':
                char = ' '
            return char
        except:
            return '|'

    def _add(self, freq, ms):
        self.queue.append((int(freq), int(ms)))

    def _start(self):
        self.playing = True
        self.queue_idx = 0
        if len(self.queue) > 0:
            self._play_next()

    def _play_next(self):
        freq, ms = self.queue[self.queue_idx]
        self.queue_idx += 1
        self.start_ms = ticks_ms()
        self.stop_ms = ticks_add(self.start_ms, ms)
        if freq == 0:
            self.pwm.duty(0)
        else:
            self.pwm.freq(freq)
            self.pwm.duty(512)

    def _parse_defaults(self, defaults):
        val = 0
        id = ' '
        for char in defaults:
            char = char.lower()
            if char.isdigit():
                val *= 10
                val += ord(char) - ord('0')
                if id == 'o':
                    self.o = val
                elif id == 'd':
                    self.d = val
                elif id == 'b':
                    self.b = val
            elif char.isalpha():
                id = char
                val = 0

    def _parse_notes(self, notes):
        i = iter(notes)
        while True:
            # Skip blank characters and commas
            char = self._next_char(i)
            while char == ' ':
                char = self._next_char(i)

            # duration
            duration = 0
            while char.isdigit():
                duration *= 10
                duration += ord(char) - ord('0')
                char = self._next_char(i)
            if duration == 0:
                duration = self.d

            if char == '|': # marker for end of tune
                return

            # freq
            note = char.lower()
            if note >= 'a' and note <= 'g':
                note_idx = ord(note) - ord('a')
            elif note == 'h':
                note_idx = 1    # H is equivalent to B
            else:
                note_idx = 7    # pause
            char = self._next_char(i)

            # Check for sharp note
            if char == '#':
                note_idx += 8
                char = self._next_char(i)

            # Check for duration modifier before octave
            # The spec has the dot after the octave, but some places do it
            # the other way around.
            duration_multiplier = 1.0
            if char == '.':
                duration_multiplier = 1.5
                char = self._next_char(i)

            # Check for octave
            if char >= '4' and char <= '7':
                octave = ord(char) - ord('0')
                char = self._next_char(i)
            else:
                octave = self.o

            # Check for duration modifier after octave
            if char == '.':
                duration_multiplier = 1.5
                char = self._next_char(i)

            freq = NOTE[note_idx] * (1 << (octave - 4))
            ms = (240000 * duration_multiplier) / (self.b * duration)
            self._add(freq, ms * 0.9)
            self._add(0, ms * 0.1)

    def play_tone(self, freq, ms, wait=True):
        self._add(freq, ms)
        self._start()
        if wait:
            while self.playing:
                self.update()

    def play_notes(self, notes, wait=True, loops=0):
        self.loops = loops
        self._parse_notes(notes)
        self._start()
        if wait:
            while self.playing:
                self.update()

    def play_rtttl(self, tune, wait=True, loops=0):
        tune_pieces = tune.split(':')
        if len(tune_pieces) != 3:
            raise ValueError('tune should contain exactly 2 colons')
        self._parse_defaults(tune_pieces[1])
        self.play_notes(tune_pieces[2], wait, loops)

    def stop(self):
        self.pwm.duty(0)
        self.playing = False
        self.queue = []
        self.queue_idx = 0
        self.loops = 0

    def update(self):
        if ticks_diff(self.stop_ms, ticks_ms()) <= 0:
            if self.queue_idx < len(self.queue):
                self._play_next()
            elif self.loops != 0:
                self.queue_idx = 0
                self.loops -= 1
                if self.loops < -1:
                    self.loops = -1
                self._play_next()
            else:
                self.stop()

    def is_playing(self):
        return self.playing
