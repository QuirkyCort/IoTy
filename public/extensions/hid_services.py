# MicroPython Human Interface Device library
# Copyright (C) 2021 H. Groefsema
# with edits by Cort
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.


from micropython import const
import struct
import bluetooth
import json
import binascii
from bluetooth import UUID
import time

F_READ = bluetooth.FLAG_READ
F_WRITE = bluetooth.FLAG_WRITE
F_READ_WRITE = bluetooth.FLAG_READ | bluetooth.FLAG_WRITE
F_READ_NOTIFY = bluetooth.FLAG_READ | bluetooth.FLAG_NOTIFY

_ADV_TYPE_FLAGS = const(0x01)
_ADV_TYPE_NAME = const(0x09)
_ADV_TYPE_UUID16_COMPLETE = const(0x3)
_ADV_TYPE_UUID32_COMPLETE = const(0x5)
_ADV_TYPE_UUID128_COMPLETE = const(0x7)
_ADV_TYPE_UUID16_MORE = const(0x2)
_ADV_TYPE_UUID32_MORE = const(0x4)
_ADV_TYPE_UUID128_MORE = const(0x6)
_ADV_TYPE_APPEARANCE = const(0x19)

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)
_IRQ_GATTS_READ_REQUEST = const(4)
_IRQ_SCAN_RESULT = const(5)
_IRQ_SCAN_DONE = const(6)
_IRQ_PERIPHERAL_CONNECT = const(7)
_IRQ_PERIPHERAL_DISCONNECT = const(8)
_IRQ_GATTC_SERVICE_RESULT = const(9)
_IRQ_GATTC_SERVICE_DONE = const(10)
_IRQ_GATTC_CHARACTERISTIC_RESULT = const(11)
_IRQ_GATTC_CHARACTERISTIC_DONE = const(12)
_IRQ_GATTC_DESCRIPTOR_RESULT = const(13)
_IRQ_GATTC_DESCRIPTOR_DONE = const(14)
_IRQ_GATTC_READ_RESULT = const(15)
_IRQ_GATTC_READ_DONE = const(16)
_IRQ_GATTC_WRITE_DONE = const(17)
_IRQ_GATTC_NOTIFY = const(18)
_IRQ_GATTC_INDICATE = const(19)
_IRQ_GATTS_INDICATE_DONE = const(20)
_IRQ_MTU_EXCHANGED = const(21)
_IRQ_L2CAP_ACCEPT = const(22)
_IRQ_L2CAP_CONNECT = const(23)
_IRQ_L2CAP_DISCONNECT = const(24)
_IRQ_L2CAP_RECV = const(25)
_IRQ_L2CAP_SEND_READY = const(26)
_IRQ_CONNECTION_UPDATE = const(27)
_IRQ_ENCRYPTION_UPDATE = const(28)
_IRQ_GET_SECRET = const(29)
_IRQ_SET_SECRET = const(30)
_IRQ_PASSKEY_ACTION = const(31)

_IO_CAPABILITY_DISPLAY_ONLY = const(0)
_IO_CAPABILITY_DISPLAY_YESNO = const(1)
_IO_CAPABILITY_KEYBOARD_ONLY = const(2)
_IO_CAPABILITY_NO_INPUT_OUTPUT = const(3)
_IO_CAPABILITY_KEYBOARD_DISPLAY = const(4)

_PASSKEY_ACTION_INPUT = const(2)
_PASSKEY_ACTION_DISP = const(3)
_PASSKEY_ACTION_NUMCMP = const(4)

_GATTS_NO_ERROR = const(0x00)
_GATTS_ERROR_READ_NOT_PERMITTED = const(0x02)
_GATTS_ERROR_WRITE_NOT_PERMITTED = const(0x03)
_GATTS_ERROR_INSUFFICIENT_AUTHENTICATION = const(0x05)
_GATTS_ERROR_INSUFFICIENT_AUTHORIZATION = const(0x08)
_GATTS_ERROR_INSUFFICIENT_ENCRYPTION = const(0x0f)

class Advertiser:
    def advertising_payload(self, limited_disc=False, br_edr=False, name=None, services=None, appearance=0):
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
                if len(b) == 2:
                    _append(_ADV_TYPE_UUID16_COMPLETE, b)
                elif len(b) == 4:
                    _append(_ADV_TYPE_UUID32_COMPLETE, b)
                elif len(b) == 16:
                    _append(_ADV_TYPE_UUID128_COMPLETE, b)

        if appearance:
            _append(_ADV_TYPE_APPEARANCE, struct.pack("<h", appearance))

        return payload


    def decode_field(self, payload, adv_type):
        i = 0
        result = []
        while i + 1 < len(payload):
            if payload[i + 1] == adv_type:
                result.append(payload[i + 2 : i + payload[i] + 1])
            i += 1 + payload[i]
        return result


    def decode_name(self, payload):
        n = self.decode_field(payload, _ADV_TYPE_NAME)
        return str(n[0], "utf-8") if n else ""


    def decode_services(self, payload):
        services = []
        for u in self.decode_field(payload, _ADV_TYPE_UUID16_COMPLETE):
            services.append(bluetooth.UUID(struct.unpack("<h", u)[0]))
        for u in self.decode_field(payload, _ADV_TYPE_UUID32_COMPLETE):
            services.append(bluetooth.UUID(struct.unpack("<d", u)[0]))
        for u in self.decode_field(payload, _ADV_TYPE_UUID128_COMPLETE):
            services.append(bluetooth.UUID(u))
        return services

    def __init__(self, ble, services=[UUID(0x1812)], appearance=const(960), name="Generic HID Device"):
        self._ble = ble
        self._payload = self.advertising_payload(name=name, services=services, appearance=appearance)

        self.advertising = False

    def start_advertising(self):
        if not self.advertising:
            self._ble.gap_advertise(100000, adv_data=self._payload)

    def stop_advertising(self):
        if self.advertising:
            self._ble.gap_advertise(0, adv_data=self._payload)


class HumanInterfaceDevice(object):
    DEVICE_STOPPED = const(0)
    DEVICE_IDLE = const(1)
    DEVICE_ADVERTISING = const(2)
    DEVICE_CONNECTED = const(3)

    def __init__(self, device_name="Generic HID Device"):
        self._ble = bluetooth.BLE()
        self.adv = None
        self.device_state = HumanInterfaceDevice.DEVICE_STOPPED
        self.conn_handle = None
        self.state_change_callback = None
        self.io_capability = _IO_CAPABILITY_NO_INPUT_OUTPUT
        self.bond = True
        self.le_secure = True

        self.encrypted = False
        self.authenticated = False
        self.bonded = False
        self.key_size = 0

        self.passkey = 1234
        self.keys = {}

        self.load_secrets()

        self.device_name = device_name
        self.service_uuids = [UUID(0x180A), UUID(0x180F), UUID(0x1812)]
        self.device_appearance = 960

        self.model_number = "1"
        self.serial_number = "1"
        self.firmware_revision = "1"
        self.hardware_revision = "1"
        self.software_revision = "2"
        self.manufacture_name = "Homebrew"

        self.pnp_manufacturer_source = 0x01
        self.pnp_manufacturer_uuid = 0xFE61
        self.pnp_product_id = 0x01
        self.pnp_product_version = 0x0123

        self.battery_level = 100

        self.DIS = (
            UUID(0x180A),
            (
                (UUID(0x2A24), F_READ),
                (UUID(0x2A25), F_READ),
                (UUID(0x2A26), F_READ),
                (UUID(0x2A27), F_READ),
                (UUID(0x2A28), F_READ),
                (UUID(0x2A29), F_READ),
                (UUID(0x2A50), F_READ),
            ),
        )

        self.BAS = (
            UUID(0x180F),
            (
                (UUID(0x2A19), F_READ_NOTIFY),
            ),
        )

        self.services = [self.DIS, self.BAS]

        self.HID_INPUT_REPORT = None

    def ble_irq(self, event, data):
        if event == _IRQ_CENTRAL_CONNECT:
            self.conn_handle, _, _ = data
            self.set_state(HumanInterfaceDevice.DEVICE_CONNECTED)
        elif event == _IRQ_CENTRAL_DISCONNECT:
            conn_handle, addr_type, addr = data
            self.conn_handle = None
            self.set_state(HumanInterfaceDevice.DEVICE_IDLE)
            self.encrypted = False
            self.authenticated = False
            self.bonded = False
        elif event == _IRQ_GATTS_READ_REQUEST:
            conn_handle, attr_handle = data
            if conn_handle != self.conn_handle:
                return _GATTS_ERROR_READ_NOT_PERMITTED
            elif self.bond and not self.bonded:
                return _GATTS_ERROR_INSUFFICIENT_AUTHORIZATION
            elif self.io_capability > _IO_CAPABILITY_NO_INPUT_OUTPUT and not self.authenticated:
                return _GATTS_ERROR_INSUFFICIENT_AUTHENTICATION
            elif self.le_secure and (not self.encrypted or self.key_size < 16):
                return _GATTS_ERROR_INSUFFICIENT_ENCRYPTION
            else:
                return _GATTS_NO_ERROR
        elif event == _IRQ_GATTS_INDICATE_DONE:
            conn_handle, value_handle, status = data
        elif event == _IRQ_MTU_EXCHANGED:
            conn_handle, mtu = data
            self._ble.config(mtu=mtu)
        elif event == _IRQ_CONNECTION_UPDATE:
            self.conn_handle, conn_interval, conn_latency, supervision_timeout, status = data
            return None
        elif event == _IRQ_ENCRYPTION_UPDATE:
            conn_handle, self.encrypted, self.authenticated, self.bonded, self.key_size = data
        elif event == _IRQ_PASSKEY_ACTION:
            conn_handle, action, passkey = data
            if action == _PASSKEY_ACTION_NUMCMP:
                accept = False
                if self.passkey_callback is not None:
                    accept = self.passkey_callback()
                self._ble.gap_passkey(conn_handle, action, accept)
            elif action == _PASSKEY_ACTION_DISP:
                self._ble.gap_passkey(conn_handle, action, self.passkey)
            elif action == _PASSKEY_ACTION_INPUT:
                pk = None
                if self.passkey_callback is not None:
                    pk = self.passkey_callback()
                self._ble.gap_passkey(conn_handle, action, pk)
        elif event == _IRQ_SET_SECRET:
            sec_type, key, value = data
            key = sec_type, bytes(key)
            value = bytes(value) if value else None
            if value is None:
                if key in self.keys:
                    del self.keys[key]
                    self.save_secrets()
                    return True
                else:
                    return False
            else:
                self.keys[key] = value
                self.save_secrets()
            return True
        elif event == _IRQ_GET_SECRET:
            sec_type, index, key = data
            if key is None:
                i = 0
                for (t, _key), value in self.keys.items():
                    if t == sec_type:
                        if i == index:
                            return value
                        i += 1
                return None
            else:
                key = sec_type, bytes(key)
                return self.keys.get(key, None)
        else:
            pass

    def start(self):
        if self.device_state is HumanInterfaceDevice.DEVICE_STOPPED:
            self._ble.irq(self.ble_irq)
            self._ble.active(1)

            self._ble.config(gap_name=self.device_name)
            self._ble.config(mtu=23)

            try:
                self._ble.config(bond=self.bond)
                self._ble.config(le_secure=self.le_secure)
                self._ble.config(mitm=self.le_secure)
                self._ble.config(io=self.io_capability)
            except:
                pass

            self.set_state(HumanInterfaceDevice.DEVICE_IDLE)

    def write_service_characteristics(self, handles):
        (h_mod, h_ser, h_fwr, h_hwr, h_swr, h_man, h_pnp) = handles[0]
        (self.h_bat,) = handles[1]

        def string_pack(in_str, nr_bytes):
            return struct.pack(str(nr_bytes)+"s", in_str.encode('UTF-8'))

        self._ble.gatts_write(h_mod, string_pack(self.model_number, 24))
        self._ble.gatts_write(h_ser, string_pack(self.serial_number, 16))
        self._ble.gatts_write(h_fwr, string_pack(self.firmware_revision, 8))
        self._ble.gatts_write(h_hwr, string_pack(self.hardware_revision, 16))
        self._ble.gatts_write(h_swr, string_pack(self.software_revision, 8))
        self._ble.gatts_write(h_man, string_pack(self.manufacture_name, 36))
        self._ble.gatts_write(h_pnp, struct.pack("<BHHH", self.pnp_manufacturer_source, self.pnp_manufacturer_uuid, self.pnp_product_id, self.pnp_product_version))

        self._ble.gatts_write(self.h_bat, struct.pack("<B", self.battery_level))

    def stop(self):
        if self.device_state is not HumanInterfaceDevice.DEVICE_STOPPED:
            if self.device_state is HumanInterfaceDevice.DEVICE_ADVERTISING:
                self.adv.stop_advertising()

            if self.conn_handle is not None:
                self._ble.gap_disconnect(self.conn_handle)
                self.conn_handle = None

            self._ble.active(0)

            self.set_state(HumanInterfaceDevice.DEVICE_STOPPED)

    def load_secrets(self):
        try:
            with open("keys.json", "r") as file:
                entries = json.load(file)
                for sec_type, key, value in entries:
                    self.keys[sec_type, binascii.a2b_base64(key)] = binascii.a2b_base64(value)
        except:
            pass

    def save_secrets(self):
        try:
            with open("keys.json", "w") as file:
                json_secrets = [
                    (sec_type, binascii.b2a_base64(key), binascii.b2a_base64(value))
                    for (sec_type, key), value in self.keys.items()
                ]
                json.dump(json_secrets, file)
        except:
            pass

    def is_running(self):
        return self.device_state is not HumanInterfaceDevice.DEVICE_STOPPED

    def is_connected(self):
        return self.device_state is HumanInterfaceDevice.DEVICE_CONNECTED

    def is_advertising(self):
        return self.device_state is HumanInterfaceDevice.DEVICE_ADVERTISING

    def set_state(self, state):
        self.device_state = state
        if self.state_change_callback is not None:
            self.state_change_callback()

    def get_state(self):
        return self.device_state

    def set_state_change_callback(self, callback):
        self.state_change_callback = callback

    def start_advertising(self):
        if self.device_state is not HumanInterfaceDevice.DEVICE_STOPPED and self.device_state is not HumanInterfaceDevice.DEVICE_ADVERTISING:
            self.adv.start_advertising()
            self.set_state(HumanInterfaceDevice.DEVICE_ADVERTISING)

    def stop_advertising(self):
        if self.device_state is not HumanInterfaceDevice.DEVICE_STOPPED:
            self.adv.stop_advertising()
            if self.device_state is not HumanInterfaceDevice.DEVICE_CONNECTED:
                self.set_state(HumanInterfaceDevice.DEVICE_IDLE)

    def get_device_name(self):
        return self.device_name

    def get_services_uuids(self):
        return self.service_uuids

    def get_appearance(self):
        return self.device_appearance

    def get_battery_level(self):
        return self.battery_level

    def set_battery_level(self, level):
        if level > 100:
            self.battery_level = 100
        elif level < 0:
            self.battery_level = 0
        else:
            self.battery_level = level

    def set_device_information(self, manufacture_name="Homebrew", model_number="1", serial_number="1"):
        self.manufacture_name = manufacture_name
        self.model_number = model_number
        self.serial_number = serial_number

    def set_device_revision(self, firmware_revision="1", hardware_revision="1", software_revision="1"):
        self.firmware_revision = firmware_revision
        self.hardware_revision = hardware_revision
        self.software_revision = software_revision

    def set_device_pnp_information(self, pnp_manufacturer_source=0x01, pnp_manufacturer_uuid=0xFE61, pnp_product_id=0x01, pnp_product_version=0x0123):
        self.pnp_manufacturer_source = pnp_manufacturer_source
        self.pnp_manufacturer_uuid = pnp_manufacturer_uuid
        self.pnp_product_id = pnp_product_id
        self.pnp_product_version = pnp_product_version

    def set_bonding(self, bond):
        self.bond = bond

    def set_le_secure(self, le_secure):
        self.le_secure = le_secure

    def set_io_capability(self, io_capability):
        self.io_capability = io_capability

    def set_passkey_callback(self, passkey_callback):
        self.passkey_callback = passkey_callback

    def set_passkey(self, passkey):
        self.passkey = passkey

    def notify_battery_level(self):
        if self.is_connected():
            self._ble.gatts_notify(self.conn_handle, self.h_bat, struct.pack("<B", self.battery_level))

    def notify_hid_report(self):
        return

# Class that represents the Joystick service
class Joystick(HumanInterfaceDevice):
    def __init__(self, name="Bluetooth Joystick"):
        super(Joystick, self).__init__(name)
        self.device_appearance = 963

        self.HIDS = (
            UUID(0x1812),
            (
                (UUID(0x2A4A), F_READ),
                (UUID(0x2A4B), F_READ),
                (UUID(0x2A4C), F_WRITE),
                (UUID(0x2A4D), F_READ_NOTIFY, ((UUID(0x2908), 0x03),)),
                (UUID(0x2A4E), F_READ_WRITE),
            ),
        )

        self.HID_INPUT_REPORT = bytes([
            0x05, 0x01,
            0x09, 0x04,
            0xa1, 0x01,
            0x85, 0x01,
            0xa1, 0x00,
            0x09, 0x30,
            0x09, 0x31,
            0x15, 0x81,
            0x25, 0x7f,
            0x75, 0x08,
            0x95, 0x02,
            0x81, 0x02,
            0x05, 0x09,
            0x29, 0x08,
            0x19, 0x01,
            0x95, 0x08,
            0x75, 0x01,
            0x25, 0x01,
            0x15, 0x00,
            0x81, 0x02,
            0xc0,
            0xc0
        ])

        self.x = 0
        self.y = 0

        self.button1 = 0
        self.button2 = 0
        self.button3 = 0
        self.button4 = 0
        self.button5 = 0
        self.button6 = 0
        self.button7 = 0
        self.button8 = 0

        self.services = [self.DIS, self.BAS, self.HIDS]

    def start(self):
        super(Joystick, self).start()

        handles = self._ble.gatts_register_services(self.services)
        self.write_service_characteristics(handles)

        self.adv = Advertiser(self._ble, [UUID(0x1812)], self.device_appearance, self.device_name)

    def write_service_characteristics(self, handles):
        super(Joystick, self).write_service_characteristics(handles)

        (h_info, h_hid, _, self.h_rep, h_d1, h_proto,) = handles[2]

        b = self.button1 + self.button2 * 2 + self.button3 * 4 + self.button4 * 8 + self.button5 * 16 + self.button6 * 32 + self.button7 * 64 + self.button8 * 128
        state = struct.pack("bbB", self.x, self.y, b)

        self._ble.gatts_write(h_info, b"\x01\x01\x00\x02")
        self._ble.gatts_write(h_hid, self.HID_INPUT_REPORT)
        self._ble.gatts_write(self.h_rep, state)
        self._ble.gatts_write(h_d1, struct.pack("<BB", 1, 1))
        self._ble.gatts_write(h_proto, b"\x01")

    def notify_hid_report(self):
        if self.is_connected():
            b = self.button1 + self.button2 * 2 + self.button3 * 4 + self.button4 * 8 + self.button5 * 16 + self.button6 * 32 + self.button7 * 64 + self.button8 * 128
            state = struct.pack("bbB", self.x, self.y, b)

            while True:
                try:
                    self._ble.gatts_notify(self.conn_handle, self.h_rep, state)
                    return
                except:
                    time.sleep_ms(10)

    def set_axes(self, x=0, y=0):
        if x > 127:
            x = 127
        elif x < -127:
            x = -127

        if y > 127:
            y = 127
        elif y < -127:
            y = -127

        self.x = x
        self.y = y

    def set_buttons(self, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0, b7=0, b8=0):
        self.button1 = b1
        self.button2 = b2
        self.button3 = b3
        self.button4 = b4
        self.button5 = b5
        self.button6 = b6
        self.button7 = b7
        self.button8 = b8

    def send_axes(self, x=0, y=0):
        self.set_axes(x, y)
        self.notify_hid_report()

    def send_buttons(self, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0, b7=0, b8=0):
        self.set_buttons(b1, b2, b3, b4, b5, b6, b7, b8)
        self.notify_hid_report()


# Class that represents the Mouse service
class Mouse(HumanInterfaceDevice):
    def __init__(self, name="Bluetooth Mouse", type="rel"):
        super(Mouse, self).__init__(name)
        self.device_appearance = 962

        self.HIDS = (
            UUID(0x1812),
            (
                (UUID(0x2A4A), F_READ),
                (UUID(0x2A4B), F_READ),
                (UUID(0x2A4C), F_WRITE),
                (UUID(0x2A4D), F_READ_NOTIFY, ((UUID(0x2908), 0x03),)),
                (UUID(0x2A4E), F_READ_WRITE),
            ),
        )

        self.type = type
        if type == "rel":
            self.HID_INPUT_REPORT = bytes([
                0x05, 0x01,
                0x09, 0x02,
                0xa1, 0x01,
                0x85, 0x01,
                0x09, 0x01,
                0xa1, 0x00,
                0x05, 0x09,
                0x19, 0x01,
                0x29, 0x03,
                0x15, 0x00,
                0x25, 0x01,
                0x95, 0x03,
                0x75, 0x01,
                0x81, 0x02,
                0x95, 0x01,
                0x75, 0x05,
                0x81, 0x03,
                0x05, 0x01,
                0x09, 0x30,
                0x09, 0x31,
                0x09, 0x38,
                0x15, 0x81,
                0x25, 0x7F,
                0x75, 0x08,
                0x95, 0x03,
                0x81, 0x06,
                0xc0,
                0xc0
            ])
        else:
            self.HID_INPUT_REPORT = bytes([
                0x05, 0x01,
                0x09, 0x02,
                0xa1, 0x01,
                0x85, 0x01,
                0x09, 0x01,
                0xa1, 0x00,
                0x05, 0x09,
                0x19, 0x01,
                0x29, 0x03,
                0x15, 0x00,
                0x25, 0x01,
                0x95, 0x03,
                0x75, 0x01,
                0x81, 0x02,
                0x95, 0x01,
                0x75, 0x05,
                0x81, 0x03,
                0x05, 0x01,
                0x09, 0x30,
                0x09, 0x31,
                0x16, 0x00, 0x00,
                0x26, 0xFF, 0x7F,
                0x36, 0x00, 0x00,
                0x46, 0xFF, 0x7F,
                0x75, 0x10,
                0x95, 0x02,
                0x81, 0x02,
                0xc0,
                0xc0
            ])

        self.x = 0
        self.y = 0
        self.w = 0

        self.x_a = 0
        self.y_a = 0

        self.button1 = 0
        self.button2 = 0
        self.button3 = 0

        self.services = [self.DIS, self.BAS, self.HIDS]

    def start(self):
        super(Mouse, self).start()  # Start super

        handles = self._ble.gatts_register_services(self.services)
        self.write_service_characteristics(handles)

        self.adv = Advertiser(self._ble, [UUID(0x1812)], self.device_appearance, self.device_name)

    def write_service_characteristics(self, handles):
        super(Mouse, self).write_service_characteristics(handles)

        (h_info, h_hid, _, self.h_rep, h_d1, h_proto,) = handles[2]

        b = self.button1 + self.button2 * 2 + self.button3 * 4
        state = struct.pack("Bbbb", b, self.x, self.y, self.w)

        self._ble.gatts_write(h_info, b"\x01\x01\x00\x02")
        self._ble.gatts_write(h_hid, self.HID_INPUT_REPORT)
        self._ble.gatts_write(self.h_rep, state)
        self._ble.gatts_write(h_d1, struct.pack("<BB", 1, 1))
        self._ble.gatts_write(h_proto, b"\x01")

    def notify_hid_report(self):
        if self.is_connected():
            if self.type == 'rel':
                b = self.button1 + self.button2 * 2 + self.button3
                state = struct.pack("Bbbb", b, self.x, self.y, self.w)
            else:
                b = self.button1 + self.button2 * 2 + self.button3
                state = struct.pack("<Bhh", b, self.x_a, self.y_a)

            while True:
                try:
                    self._ble.gatts_notify(self.conn_handle, self.h_rep, state)
                    return
                except:
                    time.sleep_ms(10)

    def set_axes(self, x=0, y=0):
        if x > 127:
            x = 127
        elif x < -127:
            x = -127

        if y > 127:
            y = 127
        elif y < -127:
            y = -127

        self.x = x
        self.y = y

    def set_wheel(self, w=0):
        if w > 127:
            w = 127
        elif w < -127:
            w = -127

        self.w = w

    def set_buttons(self, b1=0, b2=0, b3=0):
        self.button1 = b1
        self.button2 = b2
        self.button3 = b3

    def send_rel(self, x=0, y=0, w=0):
        self.set_axes(x, y)
        self.set_wheel(w)
        self.notify_hid_report()

    def send_buttons(self, b1=0, b2=0, b3=0):
        self.set_buttons(b1, b2, b3)
        self.notify_hid_report()

    def send_abs(self, x, y):
        self.x_a = x
        self.y_a = y
        self.notify_hid_report()

# Class that represents the Keyboard service
class Keyboard(HumanInterfaceDevice):
    def __init__(self, name="Bluetooth Keyboard"):
        super(Keyboard, self).__init__(name)
        self.device_appearance = 961

        self.HIDS = (
            UUID(0x1812),
            (
                (UUID(0x2A4A), F_READ),
                (UUID(0x2A4B), F_READ),
                (UUID(0x2A4C), F_WRITE),
                (UUID(0x2A4D), F_READ_NOTIFY, ((UUID(0x2908), 0x03),)),
                (UUID(0x2A4D), F_READ_WRITE, ((UUID(0x2908), 0x03),)),
                (UUID(0x2A4E), F_READ_WRITE),
            ),
        )

        self.HID_INPUT_REPORT = bytes([
            0x05, 0x01,
            0x09, 0x06,
            0xa1, 0x01,
            0x85, 0x01,
            0x75, 0x01,
            0x95, 0x08,
            0x05, 0x07,
            0x19, 0xE0,
            0x29, 0xE7,
            0x15, 0x00,
            0x25, 0x01,
            0x81, 0x02,
            0x95, 0x01,
            0x75, 0x08,
            0x81, 0x01,
            0x95, 0x05,
            0x75, 0x01,
            0x05, 0x08,
            0x19, 0x01,
            0x29, 0x05,
            0x91, 0x02,
            0x95, 0x01,
            0x75, 0x03,
            0x91, 0x01,
            0x95, 0x06,
            0x75, 0x08,
            0x15, 0x00,
            0x25, 0x65,
            0x05, 0x07,
            0x19, 0x00,
            0x29, 0x65,
            0x81, 0x00,
            0xc0
        ])

        self.modifiers = 0
        self.keypresses = [0x00] * 6

        self.kb_callback = None

        self.services = [self.DIS, self.BAS, self.HIDS]

    def ble_irq(self, event, data):
        if event == _IRQ_GATTS_WRITE:
            conn_handle, attr_handle = data
            report = self._ble.gatts_read(attr_handle)
            bytes = struct.unpack("B", report)
            if self.kb_callback is not None:
                self.kb_callback(bytes)
        else:
            super(Keyboard, self).ble_irq(event, data)

    def start(self):
        super(Keyboard, self).start()  # Start super

        handles = self._ble.gatts_register_services(self.services)
        self.write_service_characteristics(handles)

        self.adv = Advertiser(self._ble, [UUID(0x1812)], self.device_appearance, self.device_name)

    def write_service_characteristics(self, handles):
        super(Keyboard, self).write_service_characteristics(handles)

        (h_info, h_hid, _, self.h_rep, h_d1, self.h_repout, h_d2, h_proto,) = handles[2]

        self._ble.gatts_write(h_info, b"\x01\x01\x00\x02")
        self._ble.gatts_write(h_hid, self.HID_INPUT_REPORT)
        self._ble.gatts_write(h_d1, struct.pack("<BB", 1, 1))
        self._ble.gatts_write(h_d2, struct.pack("<BB", 1, 2))
        self._ble.gatts_write(h_proto, b"\x01")

    def notify_hid_report(self):
        if self.is_connected():
            state = struct.pack("8B", self.modifiers, 0, self.keypresses[0], self.keypresses[1], self.keypresses[2], self.keypresses[3], self.keypresses[4], self.keypresses[5])

            while True:
                try:
                    self._ble.gatts_notify(self.conn_handle, self.h_rep, state)
                    return
                except:
                    time.sleep_ms(10)

    def set_modifiers(self, right_gui=0, right_alt=0, right_shift=0, right_control=0, left_gui=0, left_alt=0, left_shift=0, left_control=0):
        self.modifiers = (right_gui << 7) + (right_alt << 6) + (right_shift << 5) + (right_control << 4) + (left_gui << 3) + (left_alt << 2) + (left_shift << 1) + left_control

    def set_keys(self, k0=0x00, k1=0x00, k2=0x00, k3=0x00, k4=0x00, k5=0x00):
        self.keypresses = [k0, k1, k2, k3, k4, k5]

    def set_kb_callback(self, kb_callback):
        self.kb_callback = kb_callback

    def send_key(self, key, right_gui=0, right_alt=0, right_shift=0, right_control=0, left_gui=0, left_alt=0, left_shift=0, left_control=0):
        self.set_keys(key)
        self.set_modifiers(right_gui, right_alt, right_shift, right_control, left_gui, left_alt, left_shift, left_control)
        self.notify_hid_report()
        time.sleep_ms(2)

        self.set_keys()
        self.set_modifiers()
        self.notify_hid_report()
        time.sleep_ms(2)

    def send_char(self, char):
        lookup = {
        ' ':[0,0x2C],
        '0':[0,0x27],
        '\n':[0,0x28],
        '!':[1,0x1e],
        '@':[1,0x1f],
        '$':[1,0x21],
        '%':[1,0x22],
        '^':[1,0x23],
        '&':[1,0x24],
        '*':[1,0x25],
        '(':[1,0x26],
        ')':[1,0x27],
        '-':[0,0x2d], '_':[1,0x2d],
        '=':[0,0x2e], '+':[1,0x2e],
        '[':[0,0x2f], '{':[1,0x2f],
        ']':[0,0x30], '}':[1,0x30],
        '\\':[0,0x31], '|':[1,0x31],
        ';':[0,0x33], ':':[1,0x33],
        '\'':[0,0x34], '"':[1,0x34],
        '`':[0,0x35], '~':[1,0x35],
        ',':[0,0x36], '<':[1,0x36],
        '.':[0,0x37], '>':[1,0x37],
        '/':[0,0x38], '?':[1,0x38]
        }

        if ord('a') <= ord(char) <= ord('z'):
            mod = 0
            code = 0x04 + ord(char) - ord('a')
        elif ord('A') <= ord(char) <= ord('Z'):
            mod = 1
            code = 0x04 + ord(char) - ord("A")
        elif ord('1') <= ord(char) <= ord('9'):
            mod = 0
            code = 0x1E + ord(char) - ord('1')
        elif char in lookup:
            mod, code = lookup[char]
        else:
            raise ValueError('Unrecognized character')

        self.set_keys(code)
        self.set_modifiers(left_shift=mod)
        self.notify_hid_report()
        time.sleep_ms(2)

        self.set_keys()
        self.set_modifiers()
        self.notify_hid_report()
        time.sleep_ms(2)

    def send_string(self, st):
        for c in st:
            self.send_char(c)

# Class that represents the Consumer Control service
class ConsumerControl(HumanInterfaceDevice):
    def __init__(self, name="Bluetooth CCD"):
        super(ConsumerControl, self).__init__(name)
        self.device_appearance = 384

        self.HIDS = (
            UUID(0x1812),
            (
                (UUID(0x2A4A), F_READ),
                (UUID(0x2A4B), F_READ),
                (UUID(0x2A4C), F_WRITE),
                (UUID(0x2A4D), F_READ_NOTIFY, ((UUID(0x2908), 0x03),)),
                (UUID(0x2A4D), F_READ_WRITE, ((UUID(0x2908), 0x03),)),
                (UUID(0x2A4E), F_READ_WRITE),
            ),
        )

        self.HID_INPUT_REPORT = bytes([    # Report Description: describes what we communicate
            0x05, 0x0C,                    # USAGE_PAGE (Consumer)
            0x09, 0x01,                    # USAGE (Consumer Control)
            0xa1, 0x01,                    # COLLECTION (Application)
            0x85, 0x01,                    #     REPORT_ID (1)
            0x75, 0x10,                    #     Report Size (16)
            0x95, 0x01,                    #     Report Count (1)
            0x15, 0x01,                    #     Logical Minimum (0)
            0x26, 0x8c, 0x02,              #     Logical Maximum (652)
            0x19, 0x01,                    #     Usage Minimum (Consumer Control)
            0x2A, 0x8c, 0x02,              #     Usage Maximum (AC Send)
            0x81, 0x00,                    #     Input (Data, Array)
            0xc0                           # END_COLLECTION
        ])

        self.keypress = 0x00

        self.services = [self.DIS, self.BAS, self.HIDS]

    def start(self):
        super(ConsumerControl, self).start()  # Start super

        handles = self._ble.gatts_register_services(self.services)
        self.write_service_characteristics(handles)

        self.adv = Advertiser(self._ble, [UUID(0x1812)], self.device_appearance, self.device_name)

    def write_service_characteristics(self, handles):
        super(ConsumerControl, self).write_service_characteristics(handles)

        (h_info, h_hid, _, self.h_rep, h_d1, self.h_repout, h_d2, h_proto,) = handles[2]

        self._ble.gatts_write(h_info, b"\x01\x01\x00\x02")
        self._ble.gatts_write(h_hid, self.HID_INPUT_REPORT)
        self._ble.gatts_write(h_d1, struct.pack("<BB", 1, 1))
        self._ble.gatts_write(h_d2, struct.pack("<BB", 1, 2))
        self._ble.gatts_write(h_proto, b"\x01")

    def notify_hid_report(self):
        if self.is_connected():
            state = struct.pack("<h", self.keypress)

            while True:
                try:
                    self._ble.gatts_notify(self.conn_handle, self.h_rep, state)
                    return
                except:
                    time.sleep_ms(10)

    def set_key(self, key=0x00):
        self.keypress = key

    def send_key(self, key):
        self.set_key(key)
        self.notify_hid_report()
        time.sleep_ms(2)

        self.set_key()
        self.notify_hid_report()
        time.sleep_ms(2)
