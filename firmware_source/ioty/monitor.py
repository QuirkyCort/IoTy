import io

try:
    from ioty.ble import BLE_Service
    import os
    from time import sleep_ms
    import machine

    _timer = machine.Timer(-1)
except:
    pass

def schedule_in(handler, delay_ms):
    def _wrap(_arg):
        handler()

    _timer.init(mode=machine.Timer.ONE_SHOT, period=delay_ms, callback=_wrap)

class BLE_IO(io.IOBase):
    def __init__(self, ble_console):
        self.ble_console = ble_console
        self.ble_console.on_serial_write = self.on_ble_serial_write
        self._rx_buf = bytearray()
        self._tx_buf = bytearray()

    def on_ble_serial_write(self, value):
        self._rx_buf[:] = value[:]
        if hasattr(os, 'dupterm_notify'):
            os.dupterm_notify(None)

    def _flush(self):
        data = self._tx_buf[0:20]
        self._tx_buf = self._tx_buf[20:]
        self.ble_console.serial_send(data)
        if self._tx_buf:
            schedule_in(self._flush, 50)

    def write(self, data):
        empty = not self._tx_buf
        self._tx_buf += data
        if empty:
            schedule_in(self._flush, 50)

    def readinto(self, data):
        if not self._rx_buf:
            return None
        b = min(len(data), len(self._rx_buf))
        data[:b] = self._rx_buf[:b]
        self._rx_buf = self._rx_buf[b:]
        return b

def wait_for_connection():
    while not ble_service.is_connected():
        sleep_ms(10)
    sleep_ms(1000)

try:
    ble_service = BLE_Service()
    ble_io = BLE_IO(ble_service)
    os.dupterm(ble_io)
except:
    pass
