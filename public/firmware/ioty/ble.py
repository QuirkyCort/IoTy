import bluetooth
import struct
import os
import json
import hashlib

from micropython import const
import ioty.constants as constants

_SERIAL_BUFFER_SIZE = 20
_DATA_BUFFER_SIZE = 512

_ADV_TYPE_FLAGS = const(0x01)
_ADV_TYPE_NAME = const(0x09)
_ADV_TYPE_UUID128_COMPLETE = const(0x7)
_ADV_TYPE_APPEARANCE = const(0x19)

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)

_FLAG_READ = const(0x0002)
_FLAG_WRITE_NO_RESPONSE = const(0x0004)
_FLAG_WRITE = const(0x0008)
_FLAG_NOTIFY = const(0x0010)

_SERVICE_UUID = bluetooth.UUID('ba48d887-db79-4cac-8d72-a4d9ecdfcde2')
_CMD_CHAR = (
    bluetooth.UUID('4423f470-dad0-437a-8c18-9a378981cca9'),
    _FLAG_WRITE | _FLAG_READ,
)
_DATA_CHAR = (
    bluetooth.UUID('e4494fc7-fae6-42cf-81c0-8f835a0ace7f'),
    _FLAG_WRITE_NO_RESPONSE | _FLAG_WRITE | _FLAG_READ | _FLAG_NOTIFY,
)
_SERIAL_CHAR = (
    bluetooth.UUID('c12fee47-2a93-4138-9505-2a97da04b413'),
    _FLAG_WRITE | _FLAG_NOTIFY,
)
_SERVICE = (
    _SERVICE_UUID,
    (_CMD_CHAR, _DATA_CHAR, _SERIAL_CHAR),
)

def advertising_payload(limited_disc=False, br_edr=False, name=None, services=None, appearance=0):
    payload = bytearray()

    def _append(adv_type, value):
        nonlocal payload
        payload += struct.pack("BB", len(value) + 1, adv_type) + value

    _append(
        _ADV_TYPE_FLAGS,
        struct.pack("B", (0x01 if limited_disc else 0x02) + (0x18 if br_edr else 0x04)),
    )

    if name:
        _append(_ADV_TYPE_NAME, name)

    if services:
        for uuid in services:
            b = bytes(uuid)
            _append(_ADV_TYPE_UUID128_COMPLETE, b)

    if appearance:
        _append(_ADV_TYPE_APPEARANCE, struct.pack("<h", appearance))

    return payload

class BLE_Service:
    def __init__(self, data_buf_size=_DATA_BUFFER_SIZE, serial_buf_size=_SERIAL_BUFFER_SIZE):
        with open('_ioty_name', 'r') as f:
            name = f.readline()
        self._ble = bluetooth.BLE()
        self._file_name = ''
        self._file_data = bytearray()
        self._file_hash = bytearray()
        self._mode = 0
        self.on_serial_write = None
        self._ble.active(True)
        self._ble.irq(self._irq)
        ((self._handle_cmd, self._handle_data, self._handle_serial),) = self._ble.gatts_register_services((_SERVICE,))
        self._ble.gatts_set_buffer(self._handle_data, data_buf_size)
        self._ble.gatts_set_buffer(self._handle_serial, serial_buf_size)
        self._data_buf_size = data_buf_size
        self._serial_buf_size = serial_buf_size
        self._connections = set()
        self._payload = advertising_payload(name=name, services=[_SERVICE_UUID])
        self._advertise()

    def _irq(self, event, data):
        if event == _IRQ_CENTRAL_CONNECT:
            conn_handle, _, _ = data
            self._connections.add(conn_handle)
        elif event == _IRQ_CENTRAL_DISCONNECT:
            conn_handle, _, _ = data
            self._connections.remove(conn_handle)
            self._advertise()
        elif event == _IRQ_GATTS_WRITE:
            conn_handle, value_handle = data
            value = self._ble.gatts_read(value_handle)
            if value_handle == self._handle_cmd:
                self.on_cmd_write(value)
            elif value_handle == self._handle_data:
                self.on_data_write(value)
            elif value_handle == self._handle_serial:
                if self.on_serial_write:
                    self.on_serial_write(value)

    def on_cmd_write(self, value):
        cmd = int.from_bytes(value, 'big')
        self._mode = cmd
        if cmd == constants._MODE_OPEN:
            self._open_file()
        elif cmd == constants._MODE_CLOSE:
            self._close_file()
        elif cmd == constants._MODE_DELETE_ALL:
            self._erase_files()
        elif cmd == constants._MODE_GET_VERSION:
            value = constants._VERSION.to_bytes(2, 'big')
            self._ble.gatts_write(self._handle_cmd, value)
        elif cmd == constants._MODE_GET_INFO:
            self._get_info()
        elif cmd == constants._MODE_UPDATE:
            self._update()

    def set_status(self, status):
        value = status.to_bytes(2, 'big')
        self._ble.gatts_write(self._handle_cmd, value)

    def _update(self):
        self.set_status(constants._STATUS_PENDING)

        commands = []
        try:
            with open('_ioty_updates', 'r') as f:
                for line in f.readlines():
                    commands.append(line.split())

            for command in commands:
                if command[0] == 'mkdir':
                    try:
                        os.mkdir(command[1])
                    except:
                        pass
                elif command[0] == 'mv':
                    os.rename(command[1], command[2])

            os.remove('_ioty_updates')

            self.set_status(constants._STATUS_SUCCESS)
        except:
            pass

    def _open_file(self):
        self._file_name = ''
        self._file_hash = bytearray()
        self._file_data = bytearray()
        self.set_status(constants._STATUS_PENDING)

    def _close_file(self):
        if self._check_hash():
            file = open(self._file_name, 'wb')
            file.write(self._file_data)
            file.close()
            self.set_status(constants._STATUS_SUCCESS)
        else:
            self.set_status(constants._STATUS_CHECKSUM_ERROR)

    def _check_hash(self):
        h = hashlib.sha256(self._file_data)
        local_hash = h.digest()
        return local_hash == self._file_hash

    def _erase_files(self):
        for f in os.listdir():
            if not(f in constants._PRESERVE_FILES):
                os.remove(f)

    def _get_info(self):
        self.set_status(constants._STATUS_PENDING)

        import gc
        import network
        import binascii

        fs_stats = os.statvfs('/')
        info = {
            'network': {
                'mac': binascii.hexlify(network.WLAN().config('mac'))
            },
            'mem': {
                'allocated': gc.mem_alloc(),
                'free': gc.mem_free()
            },
            'fs': {
                'block size': fs_stats[0],
                'free blocks': fs_stats[3]
            }
        }
        self.data_send(bytes(json.dumps(info), 'utf-8'))
        self.set_status(constants._STATUS_SUCCESS)

    def on_data_write(self, value):
        if self._mode == constants._MODE_OPEN:
            text = value.decode("utf-8")
            self._file_name += text
        elif self._mode == constants._MODE_APPEND:
            self._file_data.extend(value)
        elif self._mode == constants._MODE_FILE_HASH:
            self._file_hash.extend(value)

    def serial_send(self, data):
        for conn_handle in self._connections:
            for i in range(0, len(data), self._serial_buf_size):
                self._ble.gatts_notify(conn_handle, self._handle_serial, data[i : i + self._serial_buf_size])

    def data_send(self, data):
        for conn_handle in self._connections:
            for i in range(0, len(data), self._data_buf_size):
                self._ble.gatts_notify(conn_handle, self._handle_data, data[i : i + self._data_buf_size])

    def is_connected(self):
        return len(self._connections) > 0

    def _advertise(self, interval_us=500000):
        self._ble.gap_advertise(interval_us, adv_data=self._payload)
