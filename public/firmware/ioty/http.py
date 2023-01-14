import network
import socket
import json

from micropython import const
import constants

class HTTP_Service:
    def __init__(self):
        with open('_ioty_name', 'r') as f:
            name = f.readline()
        self.ap = network.WLAN(network.AP_IF)
        self.ap.config(ssid=name)
        self.ap.config(max_clients=1)
        self.ap.active(True)

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(('192.168.4.1', '8000'))
        self.socket.listen(0)
        print('listening')

    def process_headers(self, headers_b):
        header_lines = headers_b.split(b'\r\n')
        headers = {}
        for header_line in header_lines:
            if b' ' in header_line:
                type, value = header_line.split(b' ', maxsplit=1)
                headers[type.decode()] = value
        return headers

    def wait_for_connection(self):    
        client_connection, _ = self.socket.accept()
        print('accepted')

        buf = bytearray()
        content_length = None
        response_data = {
            'status': constants._STATUS_ERROR
        }

        while True:
            data = client_connection.recv(1024)
            if len(data) == 0:
                print('connection closed')
                break

            buf.extend(data)
            if content_length == None:
                if b'\r\n\r\n' in buf:
                    print('header delimited')
                    headers_b, buf = buf.split(b'\r\n\r\n', maxsplit=1)
                    headers = self.process_headers(headers_b)
                    if 'Content-Length:' in headers:
                        content_length = int(headers['Content-Length:'])
                    else:
                        content_length = 0
                    print('content_length', content_length)

            if len(buf) >= content_length:
                try:
                    req = json.loads(buf)
                    if req['mode'] == constants._MODE_GET_VERSION:
                        response_data = self.get_version(req)
                except:
                    pass

                break

        response = 'HTTP/1.0 200 OK\r\n\r\n' + json.dumps(response_data)
        client_connection.sendall(response.encode())
        client_connection.close()
    
    def get_version(self, req):
        return {
            'status': constants._STATUS_SUCCESS,
            'content': constants._VERSION
        }
