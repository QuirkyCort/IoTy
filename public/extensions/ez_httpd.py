import select
import socket

class HTTPD:
    def __init__(self, address='192.168.4.1', port=80):
        self.mjpeg_client_connection = None

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.socket.bind(socket.getaddrinfo(address, port)[0][-1])
        self.socket.listen(0)

        self.poll = select.poll()
        self.poll.register(self.socket, select.POLLIN)

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
            result = pair.split(b'=', 1)
            if len(result) > 1:
                key, value = pair.split(b'=', 1)
                params[key.decode('utf-8')] = self.percent_decode(value).decode('utf-8')
        return params

    def available(self):
        available = self.poll.poll(0)
        for a in available:
            if a[1] == select.POLLIN:
                return True
        return False

    def wait_for_connection(self):
        self.client_connection, _ = self.socket.accept()

        buf = b''
        content_length = None
        index = None

        while True:
            data = self.client_connection.recv(1024)
            if len(data) == 0:
                return (None, None, None)

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
                return (url.decode('utf-8'), self.get_query_dict(query), buf.decode('utf-8'))

    def send_response(self, response_data, status='200 OK'):
        self.send_bytes(response_data.encode(), status)

    def send_bytes(self, response_data, status='200 OK'):
        header = b'HTTP/1.0 ' + status.encode() + b'\r\n\r\n'
        try:
            self.client_connection.sendall(header)
            self.client_connection.sendall(response_data)
        except:
            pass
        self.client_connection.close()

    def start_mjpeg_response(self):
        header = b'HTTP/1.0 200 OK\r\n'
        header += b'Content-Type: multipart/x-mixed-replace; boundary=ioty_ez_httpd_mjpeg\r\n\r\n'
        try:
            self.client_connection.sendall(header)
        except:
            pass
        self.mjpeg_client_connection = self.client_connection

    def send_mjpeg_frame(self, frame_data):
        boundary = b'--ioty_ez_httpd_mjpeg\r\n'
        boundary += b'Content-Type: image/jpeg\r\n'
        boundary += b'Content-Length: ' + str(len(frame_data)).encode() + b'\r\n\r\n'
        try:
            self.mjpeg_client_connection.sendall(boundary)
            self.mjpeg_client_connection.sendall(frame_data)
            self.mjpeg_client_connection.sendall(b'\r\n')
        except OSError as e:
            self.mjpeg_client_connection.close()
            self.mjpeg_client_connection = None

    def mjpeg_connection_open(self):
        if self.mjpeg_client_connection == None:
            return False
        return True

    def send_file(self, filename):
        try:
            self.client_connection.sendall(b'HTTP/1.0 200 OK\r\n\r\n')
            with open(filename, 'rb') as f:
                while True:
                    d = f.read(1024)
                    if d == b'':
                        break
                    self.client_connection.sendall(d)
        except:
            pass
        self.client_connection.close()
