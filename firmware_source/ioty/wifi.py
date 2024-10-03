import network
import time

wifi = None
ap = None

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
        raise Exception("No WiFi configured")
    return connect(ssid, password, timeout)

def is_present(ssid):
    _activate_station()

    ssids = wifi.scan()
    for found in ssids:
        if ssid == found[0].decode():
            return True
    return False

def get_ip():
    return wifi.ifconfig()[0]

def start_ap(ssid, password='', max_clients=10, channel=1, hidden=False):
    _activate_ap()

    ap.config(essid=ssid, password=password, max_clients=max_clients, channel=channel, hidden=hidden)
    if password:
        ap.config(authmode=4)
    else:
        ap.config(authmode=0)
    ap.active(True)
