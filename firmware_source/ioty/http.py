import network
import socket
import json
import os

import ioty.constants as constants
import ioty.services

class HTTP_Service:
    def __init__(self):
        with open('_ioty_name', 'r') as f:
            self.name = f.readline()
        self.ap = network.WLAN(network.AP_IF)
        self.ap.config(essid=self.name)
        self.ap.config(max_clients=1)
        self.ap.active(True)

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(('192.168.4.1', '80'))
        self.socket.listen(0)

    def process_headers(self, headers_b):
        header_lines = headers_b.split(b'\r\n')
        headers = {}
        for header_line in header_lines:
            if b' ' in header_line:
                type, value = header_line.split(b' ', 1)
                headers[type.decode()] = value
        return headers

    def get_content_length(self, headers):
        if 'Content-Length:' in headers:
            return int(headers['Content-Length:'].decode('utf-8'))
        return 0

    def get_req_url(self, headers):
        if 'GET' in headers:
            url, _ = headers['GET'].split(b' ', 1)
        elif 'POST' in headers:
            url, _ = headers['POST'].split(b' ', 1)
        result = url.split(b'?', 1)
        if len(result) > 1:
            return result[0], result[1]
        else:
            return result[0], b''

    def percent_decode(self, value):
        parts = value.split(b'%')
        result = [parts[0]]
        for coded in parts[1:]:
            result.append(bytes([int(coded[:2], 16)]))
            result.append(coded[2:].replace(b'+', b' '))
        return b''.join(result)

    def get_query_dict(self, query):
        params = {}
        for pair in query.split(b'&'):
            key, value = pair.split(b'=', 1)
            params[key] = self.percent_decode(value)
        return params

    def wait_for_connection(self):
        client_connection, _ = self.socket.accept()

        buf = b''
        content_length = None
        response_data = '{"status":' + str(constants._STATUS_ERROR) + '}'
        index = None

        while True:
            data = client_connection.recv(1024)
            if len(data) == 0:
                break

            if index == None:
                buf += data
            else:
                for i in range(len(data)):
                    buf[index + i] = data[i]
                index += len(data)

            if content_length == None:
                if b'\r\n\r\n' in buf:
                    headers_b, content = buf.split(b'\r\n\r\n', 1)
                    headers = self.process_headers(headers_b)
                    content_length = self.get_content_length(headers)
                    url, query = self.get_req_url(headers)
                    buf = bytearray(content_length)
                    for i in range(len(content)):
                        buf[i] = content[i]
                    index = len(content)

            if content_length != None and index >= content_length:
                response_data = self.process_req(url, query, buf)
                break

        header = b'HTTP/1.0 200 OK\r\n\r\n'
        response = header + response_data
        client_connection.sendall(response)
        client_connection.close()

    def process_req(self, url, query, buf):
        if url == b'/':
            return self._index_req(query, buf)
        elif url == b'/config':
            return self._config_req(query, buf)
        elif url == b'/upload':
            return self._upload_req(query, buf)
        elif url == b'/firmware':
            return self._firmware_req(query, buf)
        elif url == b'/files':
            return self._files_req(query, buf)
        elif url == b'/download':
            return self._download_req(query, buf)
        elif url == b'/delete':
            return self._delete_req(query, buf)

        return 'Invalid path'

    def _index_req(self, query, buf):
        import gc
        import binascii

        fs_stats = os.statvfs('/')
        free_space = fs_stats[0] * fs_stats[3]

        with open('ioty/html/index.html') as file:
            content = file.read()
            content = content.replace('#version#', str(constants._VERSION))
            content = content.replace('#mac#', binascii.hexlify(network.WLAN().config('mac')).decode('utf-8'))
            content = content.replace('#alloc_mem#', str(gc.mem_alloc()))
            content = content.replace('#free_mem#', str(gc.mem_free()))
            content = content.replace('#free_space#', str(free_space))
            return content.encode()

    def wrap_body(self, content):
        return b'<!DOCTYPE html><html><body>' + content + b'</body></html>'

    def error_html(self, content):
        return self.wrap_body(b'<h1>Error</h1><p>' + content + b'</p>')

    def _files_req(self, query, buf):
        li = ''
        for f in ioty.services.list_files(''):
            li += '<li><a href="download?n=' + f + '" download="' + f + '">' + f + '</a> (<a href="delete?n=' + f +'">Delete</a>)</li>'

        return self.wrap_body(b'<h1>Files</h1><ul>' + li.encode() + b'</ul>')

    def _download_req(self, query, buf):
        params = self.get_query_dict(query)
        if b'n' not in params:
            return self.error_html(b'No file specified')

        try:
            with open(params[b'n'].decode('utf-8'), 'rb') as file:
                return file.read()
        except:
            return self.error_html(b'Unable to read file')

    def _delete_req(self, query, buf):
        params = self.get_query_dict(query)
        if b'n' not in params:
            return self.error_html(b'No file specified')
        filename = params[b'n'].decode('utf-8')

        if not(filename in constants._PRESERVE_FILES):
            try:
                os.remove(filename)
                return self.wrap_body(b'<h1>File deleted</h1>')
            except:
                return self.error_html(b'Unable to delete file')
        return self.error_html(b'Firmware files cannot be deleted')

    def _config_req(self, query, buf):
        params = self.get_query_dict(query)
        if b'ssid' not in params:
            return self.error_html(b'Invalid settings')

        with open(constants._NETWORK_CONFIGURATION_FILE, 'w') as file:
            file.write(params[b'ssid'].decode('utf-8') + '\n')
            file.write(params[b'wifiPassword'].decode('utf-8') + '\n')
            file.write(params[b'host'].decode('utf-8') + '\n')
            file.write(params[b'port'].decode('utf-8') + '\n')
            file.write(params[b'username'].decode('utf-8') + '\n')
            file.write(params[b'mqttPassword'].decode('utf-8') + '\n')

        return self.wrap_body(b'<h1>Configuration Uploaded</h1><p>Restart your device and enter internet mode to start programming.</p>')

    def _upload_req(self, query, buf):
        try:
            files = json.loads(buf)
        except:
            return b'Failed (JSON Error)'

        try:
            for filename in files:
                with open(filename, 'wb') as file:
                    file.write(files[filename])
            return b'Success'
        except:
            return b'Failed'

    def _firmware_req(self, query, buf):
        import ubinascii
        try:
            files = json.loads(buf)
        except:
            return b'Failed (JSON Error)'

        for line in files['_ioty_updates']['content']:
            cmd = line.split()
            if len(cmd) > 1:
                if cmd[0] == 'mkdir':
                    try:
                        os.mkdir(cmd[1])
                    except:
                        pass

        try:
            for filename in files:
                if filename == '_ioty_updates':
                    continue
                with open(filename, 'wb') as file:
                    file.write(ubinascii.a2b_base64(files[filename]['content']))
            return b'Success'
        except:
            return b'Failed'
