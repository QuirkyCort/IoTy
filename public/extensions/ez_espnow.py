import network
import espnow
import json

group = 0
esp_now = None

def init():
    global esp_now

    ioty_wifi = network.WLAN(network.STA_IF)
    ioty_wifi.active(True)

    esp_now = espnow.ESPNow()
    esp_now.active(True)
    esp_now.add_peer(b'\xff\xff\xff\xff\xff\xff')

def set_group(g):
    global group
    group = g

def send(message):
    esp_now.send(b'\xff\xff\xff\xff\xff\xff', json.dumps([group, message]))

def recv(wait):
    while True:
        if wait:
            mac, data = esp_now.irecv(-1)
        else:
            mac, data = esp_now.irecv(0)
        if mac == None:
            if wait:
                continue
            return None
        data = json.loads(data)
        if data[0] == group:
            return data[1]
