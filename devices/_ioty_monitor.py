import _ioty_service
import os
import io

class BLE_IO(io.IOBase):
    def __init__(self, ble_console):
        self.ble_console = ble_console
        self.ble_console.on_serial_write = self.on_ble_serial_write
        self._data = bytearray()

    def on_ble_serial_write(self, value):
        self._data[:] = value[:]
        if hasattr(os, 'dupterm_notify'):
            os.dupterm_notify(None)

    def write(self, data):
        self.ble_console.serial_send(data)
        return len(data)

    def readinto(self, data):
        if not self._data:
            return None
        b = min(len(data), len(self._data))
        data[:b] = self._data[:b]
        self._data = self._data[b:]
        return b

def main():
    ble_console = _ioty_service.BLE_Service()
    ble_io = BLE_IO(ble_console)
    os.dupterm(ble_io)

main()
