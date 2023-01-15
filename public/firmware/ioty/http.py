import network
import socket
import json
import os

from micropython import const
import ioty.constants as constants

class HTTP_Service:
    def __init__(self):
        with open('_ioty_name', 'r') as f:
            self.name = f.readline()
        self.ap = network.WLAN(network.AP_IF)
        self.ap.config(essid=self.name)
        self.ap.config(max_clients=1)
        self.ap.active(True)

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(('192.168.4.1', '8000'))
        self.socket.listen(0)
        print('listening')

    def _split_bytes(self, bytes, delimiter, max_split=-1):
        bytes_len = len(bytes)
        delimiter_len = len(delimiter)
        for i in range(bytes_len - delimiter_len + 1):
            if bytes[i:i+delimiter_len] == delimiter:
                if max_split == 1 or delimiter not in bytes[i+delimiter_len:]:
                    return bytes[:i], bytes[i+delimiter_len:]
                else:
                    result = [bytes[:i]]
                    result.extend(self._split_bytes(bytes[i+delimiter_len:], delimiter, max_split - 1))
                    return result

    def process_headers(self, headers_b):
        header_lines = self._split_bytes(headers_b, b'\r\n')
        headers = {}
        for header_line in header_lines:
            if b' ' in header_line:
                type, value = self._split_bytes(header_line, b' ', max_split=1)
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
                    headers_b, buf = self._split_bytes(buf, b'\r\n\r\n', max_split=1)
                    headers = self.process_headers(headers_b)
                    if 'Content-Length:' in headers:
                        content_length = int(headers['Content-Length:'].decode('utf-8'))
                    else:
                        content_length = 0
                    print('content_length', content_length)

            if len(buf) >= content_length:
                response_data = self.process_req(buf)
                break

        response = 'HTTP/1.0 200 OK\r\nAccess-Control-Allow-Origin: *\r\n\r\n' + json.dumps(response_data)
        client_connection.sendall(response.encode())
        client_connection.close()

    def process_req(self, buf):
        try:
            req = json.loads(buf)
            if req['mode'] == constants._MODE_GET_VERSION:
                return self.get_version(req)
            elif req['mode'] == constants._MODE_WRITE_FILES:
                return self.write_files(req)
            elif req['mode'] == constants._MODE_DELETE_ALL:
                return self.delete_all(req)
        except:
            pass

        return {
            'status': constants._STATUS_ERROR
        }

    def delete_all(self, req):
        for f in os.listdir():
            if not(f in constants._PRESERVE_FILES):
                os.remove(f)
        return {
            'status': constants._STATUS_SUCCESS
        }

    def write_files(self, req):
        print('write files')
        try:
            for filename in req['content']:
                with open(filename, 'wb') as file:
                    file.write(req['content'][filename])
            return {
                'status': constants._STATUS_SUCCESS
            }
        except:
            return {
                'status': constants._STATUS_ERROR
            }

    def get_version(self, req):
        return {
            'status': constants._STATUS_SUCCESS,
            'content': constants._VERSION,
            'name': self.name
        }
