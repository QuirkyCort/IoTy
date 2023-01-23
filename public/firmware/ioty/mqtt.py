import network
import json
import os
from umqtt.robust import MQTTClient
from machine import unique_id
from ubinascii import hexlify
from time import sleep_ms

import ioty.constants as constants

_COMMAND_TOPIC = b'_IOTY_COMMAND'
_RESPONSE_TOPIC = b'_IOTY_RESPONSE'

class MQTT_Service:
    def __init__(self):
        with open('_ioty_name', 'r') as f:
            self.name = f.readline()

    def read_config(self):
        try:
            with open('_ioty_network', 'r') as f:
                self.ssid = f.readline().rstrip('\n')
                self.wifi_password = f.readline().rstrip('\n')
                self.host = f.readline().rstrip('\n')
                self.port = int(f.readline())
                self.username = f.readline().rstrip('\n')
                self.mqtt_password = f.readline().rstrip('\n')
            return True
        except:
            return False

    def connect_wifi(self):
        self.wifi = network.WLAN(network.STA_IF)
        self.wifi.active(True)
        while True:
            try:
                self.wifi.connect(self.ssid, self.wifi_password)
                break
            except:
                sleep_ms(1000)
        return self.wifi

    def wifi_isconnected(self):
        return self.wifi.isconnected()

    def connect_mqtt(self):
        self.mqtt = MQTTClient(hexlify(unique_id()), self.host, port=self.port, user=self.username, password=self.mqtt_password, keepalive=60)
        self.mqtt.set_callback(self.mqtt_cb)
        self.mqtt.connect()
        self.mqtt.subscribe(bytes(self.username, 'utf8') + b'/' + _COMMAND_TOPIC)

    def check_msg(self):
        return self.mqtt.check_msg()

    def mqtt_cb(self, topic, msg):
        try:
            cmd = json.loads(msg)
            if cmd['mode'] == constants._MODE_GET_VERSION:
                self.get_version(cmd)
            elif cmd['mode'] == constants._MODE_WRITE_FILES:
                self.write_files(cmd)
            elif cmd['mode'] == constants._MODE_DELETE_ALL:
                self.delete_all(cmd)
        except:
            self.send_response(constants._STATUS_ERROR, cmd['nonce'])

    def send_response(self, status, nonce, content={}):
        msg = json.dumps({
            'status': status,
            'nonce': nonce,
            'content': content
        })

        self.mqtt.publish(bytes(self.username, 'utf8') + b'/' + _RESPONSE_TOPIC, bytes(msg, 'utf-8'))

    def delete_all(self, cmd):
        for f in os.listdir():
            if not(f in constants._PRESERVE_FILES):
                os.remove(f)
        self.send_response(constants._STATUS_SUCCESS, cmd['nonce'])

    def write_files(self, cmd):
        try:
            for filename in cmd['content']:
                with open(filename, 'wb') as file:
                    file.write(cmd['content'][filename])
            self.send_response(constants._STATUS_SUCCESS, cmd['nonce'])
        except:
            self.send_response(constants._STATUS_ERROR, cmd['nonce'])

    def get_version(self, cmd):
        content = {
            'version': constants._VERSION,
            'name': self.name
        }
        self.send_response(constants._STATUS_SUCCESS, cmd['nonce'], content)
