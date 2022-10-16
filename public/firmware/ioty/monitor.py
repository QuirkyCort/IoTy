from ioty.ble import BLE_Service
import os
import io
from time import sleep_ms

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

def wait_for_connection():
    while not ble_service.is_connected():
        sleep_ms(10)
    sleep_ms(1000)

ble_service = BLE_Service()
ble_io = BLE_IO(ble_service)
os.dupterm(ble_io)
