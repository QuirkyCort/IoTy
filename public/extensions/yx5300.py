import struct

CMD_HEADER = b'\x7E\xFF\x06'

CMD_NEXT = b'\x01'
CMD_PREV = b'\x02'
CMD_PLAY_INDEX = b'\x03'
CMD_VOLUME_UP = b'\x04'
CMD_VOLUME_DOWN = b'\x05'
CMD_SET_VOLUME = b'\x06'
CMD_SET_EQUALIZER = b'\x07'
CMD_LOOP_INDEX = b'\x08'
CMD_SEL_DEV = b'\x09'
CMD_SLEEP = b'\x0a'
CMD_WAKE = b'\x0b'
CMD_RESET = b'\x0c'
CMD_PLAY = b'\x0d'
CMD_PAUSE = b'\x0e'
CMD_PLAY_FOLDER_FILE = b'\x0f'
CMD_STOP = b'\x16'
CMD_LOOP_FOLDER = b'\x17'
CMD_SHUFFLE = b'\x18'
CMD_LOOP_CURRENT = b'\x19'
CMD_SET_DAC = b'\x1a'
CMD_PLAY_WITH_VOL = b'\x22'
CMD_SHUFFLE_FOLDER = b'\x28'

FEEDBACK = b'\x00' # Off
#FEEDBACK = b'\x01' # On

CMD_END = b'\xEF'

class YX5300:
    def __init__(self, uart):
        self.uart = uart

    def _send_cmd(self, cmd, data1=0, data2=0):
        data1 = int(min(max(0, data1), 255))
        data2 = int(min(max(0, data2), 255))
        cmd = CMD_HEADER + cmd + FEEDBACK + struct.pack('BB', data1, data2) + CMD_END
        self.uart.write(cmd)

    def play_next(self):
        self._send_cmd(CMD_NEXT)

    def play_prev(self):
        self._send_cmd(CMD_PREV)

    def play_index(self, index):
        self._send_cmd(CMD_PLAY_INDEX, data2=index)

    def volume_up(self):
        self._send_cmd(CMD_VOLUME_UP)

    def volume_down(self):
        self._send_cmd(CMD_VOLUME_DOWN)

    def set_volume(self, volume):
        self._send_cmd(CMD_SET_VOLUME, data2=volume)

    def play(self):
        self._send_cmd(CMD_PLAY)

    def pause(self):
        self._send_cmd(CMD_PAUSE)

    def play_folder_index(self, folder, file):
        self._send_cmd(CMD_PLAY_FOLDER_FILE, folder, file)

    def stop(self):
        self._send_cmd(CMD_STOP)
