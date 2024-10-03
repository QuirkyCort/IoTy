import network
import time
from micropython import const

wifi = None
ap = None
ssid_cache =[-1, ()]
CACHE_EXPIRY = const(5)

def _activate_station():
    global wifi, ap

    if ap:
        ap.active(False)
        ap = None
    if wifi == None:
        wifi = network.WLAN(network.STA_IF)
    wifi.active(True)

def _activate_ap():
    global wifi, ap

    if wifi:
        wifi.active(False)
        wifi = None
    if ap == None:
        ap = network.WLAN(network.AP_IF)
    ap.active(True)

def connect(ssid, password, timeout=-1):
    _activate_station()

    wifi.connect(ssid, password)
    if timeout > 0:
        timeout += time.time()
    while True:
        if wifi.isconnected():
            break
        elif timeout > 0 and time.time() > timeout:
            wifi.active(False)
            raise OSError('Timeout waiting for connection')
    return wifi

def connect_configured(timeout=-1):
    try:
        with open('_ioty_network', 'r') as f:
            ssid = f.readline().rstrip('\n')
            password = f.readline().rstrip('\n')
    except:
        raise Exception('No WiFi configured')
    return connect(ssid, password, timeout)

def isconnected():
    if wifi:
        return wifi.isconnected()
    elif ap:
        return ap.isconnected()

def disconnect():
    if wifi:
        return wifi.disconnect()
    elif ap:
        return ap.disconnect()

def deactivate():
    if wifi:
        return wifi.active(False)
    elif ap:
        return ap.active(False)

def status():
    if wifi:
        return wifi.status()
    elif ap:
        return ap.status()

def is_present(ssid):
    if time.time() > ssid_cache[0]:
        _activate_station()
        ssid_cache[1] = tuple(x[0] for x in wifi.scan())
        ssid_cache[0] = time.time() + CACHE_EXPIRY

    return ssid.encode() in ssid_cache[1]

def scan():
    _activate_station()

    return wifi.scan()

def get_ip():
    if wifi:
        return wifi.ifconfig()[0]
    elif ap:
        return ap.ifconfig()[0]
    raise Exception('WiFi not active')

def start_ap(ssid, password='', max_clients=10, channel=1, hidden=False):
    _activate_ap()

    ap.config(essid=ssid, password=password, max_clients=max_clients, channel=channel, hidden=hidden)
    if password:
        ap.config(authmode=4)
    else:
        ap.config(authmode=0)
    ap.active(True)
