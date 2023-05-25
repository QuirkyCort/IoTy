from ioty.mqtt import MQTT_Service
import os
import io
from time import sleep_ms
import machine

_timer = machine.Timer(-1)

def schedule_in(handler, delay_ms):
    def _wrap(_arg):
        handler()

    _timer.init(mode=machine.Timer.ONE_SHOT, period=delay_ms, callback=_wrap)

class MQTT_IO(io.IOBase):
    def __init__(self, mqtt_console):
        self.mqtt_console = mqtt_console
        self._tx_buf = bytearray()

    def _flush(self):
        self.mqtt_console.monitor_send(self._tx_buf)
        self._tx_buf = bytearray()

    def write(self, data):
        empty = not self._tx_buf
        self._tx_buf += data
        if empty:
            schedule_in(self._flush, 50)

mqtt = MQTT_Service()
if mqtt.read_config():
    led = machine.Pin(2, machine.Pin.OUT)

    led.off()
    mqtt.connect_wifi()
    while not mqtt.wifi_isconnected():
        for _ in range(2):
            led.on()
            sleep_ms(50)
            led.off()
            sleep_ms(50)
        sleep_ms(500)
    led.off()

    mqtt.connect_mqtt()
    led.on()

    if mqtt:
        while not mqtt.connected():
            mqtt.check_msg()
            sleep_ms(10)
    led.off()

    mqtt_io = MQTT_IO(mqtt)
    os.dupterm(mqtt_io)
