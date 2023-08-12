import json
import time

logs = {}

def init(topic, size):
    logs[topic] = [size, []]

def handle_request(ioty_mqtt, topic, msg):
    if topic not in logs:
        return
    req = json.loads(msg)
    if req['type'] == 'request_all':
        send_all(ioty_mqtt, topic)

def send_all(ioty_mqtt, topic):
    data = {
        'type': 'data_all',
        'data': tuple(logs[topic][1])
    }
    data = json.dumps(data)
    data = bytes(data, 'utf-8')
    ioty_mqtt.publish(bytes(topic + '_app', 'utf-8'), data)

def log(ioty_mqtt, topic, data):
    if topic not in logs:
        return
    logs[topic][1].append(data)
    if len(logs[topic][1]) > logs[topic][0]:
        logs[topic][1] = logs[topic][1][1:]
    data = {
        'type': 'data_some',
        'data': [data]
    }
    data = json.dumps(data)
    data = bytes(data, 'utf-8')
    ioty_mqtt.publish(bytes(topic + '_app', 'utf-8'), data)

def log_with_time(ioty_mqtt, topic, data):
    log(ioty_mqtt, topic, (time.time(), data))
