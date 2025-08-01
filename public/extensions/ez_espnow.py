import network
import espnow
import json

group = 0
esp_now = None

def init():
    ioty_wifi = network.WLAN(network.STA_IF)
    ioty_wifi.active(True)
    init_espnow()

def init_espnow():
    global esp_now
    esp_now = espnow.ESPNow()
    esp_now.active(True)
    esp_now.add_peer(b'\xff\xff\xff\xff\xff\xff')

def set_group(g):
    global group
    group = g

def send(message):
    esp_now.send(b'\xff\xff\xff\xff\xff\xff', json.dumps([group, message], separators=(',', ':')))

def recv(wait):
    while True:
        try:
            if wait:
                mac, data = esp_now.irecv(-1)
            else:
                mac, data = esp_now.irecv(0)
        except Exception as e:
            esp_now.active(False)
            init_espnow()
            continue

        if mac == None:
            if wait:
                continue
            return None
        try:
            data = json.loads(data)
            if data[0] == group:
                return data[1]
        except:
            if wait:
                continue
            return None
