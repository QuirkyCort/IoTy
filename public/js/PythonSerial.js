function bufferToString(buffer) {
  const bytes = new Uint8Array(buffer);
  return bytes.reduce((string, byte) => (string + String.fromCharCode(byte)), '');
}

function concatArray(a, b) {
  let newArray = new Uint8Array(a.length + b.length);
  newArray.set(a, 0);
  newArray.set(b, a.length);

  return newArray;
}

async function awaitTimeout(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

function findSubarray(arr, subarr, from_index=0) {
  var i, found, j;
  for (i = from_index; i < 1 + (arr.length - subarr.length); ++i) {
      found = true;
      for (j = 0; j < subarr.length; ++j) {
          if (arr[i + j] !== subarr[j]) {
              found = false;
              break;
          }
      }
      if (found) return i;
  }
  return -1;
};

function toPythonBytesLiteral(bytes) {
  let s = '';

  for (let b of bytes) {
    let c;

    if (b >= 32 && b <= 126) {
      c = String.fromCharCode(b);
      if (b == 39 || b == 92) {
        c = '\\' + c;
      }
    } else if (b < 16) {
      c = '\\x0' + b.toString(16);
    } else {
      c = '\\x' + b.toString(16);
    }

    s += c;
  }

  return s;
}

class PythonSerial {
  constructor(port, baudRate) {
    this.chunkDelay = 10;
    this.chunkSize = 256;

    this.port = port;
    this.baudRate = baudRate;
    this.readBuf = new Uint8Array();
  }

  async init() {
    await this.openPort();
  }

  async openPort() {
    await this.port.open({ baudRate: this.baudRate });

    this.port.setSignals({
      dataTerminalReady: false,
      requestToSend: false
    });

    this.reader = this.port.readable.getReader();
    this.writer = this.port.writable.getWriter();
    this.clearBuf();
  }

  async closePort() {
    try {
      await this.reader.cancel();
      await this.writer.close();
      await this.port.close();
    } catch (error) {
      console.log(error);
    }
  }

  async cyclePort() {
    await this.closePort();
    await awaitTimeout(100);
    await this.openPort();
  }

  setReadToBuf() {
    this.readToBuf = true;
  }

  setReadToHandler() {
    this.readToBuf = false;
  }

  clearBuf() {
    this.readBuf = new Uint8Array();
    this.readDone = false;
  }

  async readLoop(handler) {
    this.readToBuf = false;
    this.readDone = false;
    let utf8decoder = new TextDecoder();

    try {
      while (true) {
        const { value, done } = await this.reader.read();
        if (done) {
          console.log('read done');
          break;
        }

        if (this.readToBuf) {
          if (value) {
            this.readBuf = concatArray(this.readBuf, value);
          }
          this.readDone = true;
        } else {
          let text = utf8decoder.decode(value);
          handler(text);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readSerialToBuf() {
    while (! this.readDone) {
      await awaitTimeout(10);
    }
    this.readDone = false;
    return true;
  }

  async writeString(string) {
    let e = new TextEncoder();
    let cmd = e.encode(string);
    this.writer.write(cmd);
  }

  async waitForString(s, timeout=2000) {
    let e = new TextEncoder();
    let bytes = e.encode(s);

    let before = await this.waitForBytes(bytes, timeout);
    let d = new TextDecoder();
    if (before == null) {
      return before;
    }
    return d.decode(before);
  }

  async waitForBytes(b, timeout=2000) {
    while (true) {
      let result = await Promise.race([this.readSerialToBuf(), awaitTimeout(timeout)]);
      if (result == undefined) {
        return null;
      }

      let pos = findSubarray(this.readBuf, b);
      if (pos != -1) {
        let before = this.readBuf.slice(0, pos);
        this.readBuf = this.readBuf.slice(pos+b.length);
        return before;
      }
    }
  }

  // Stop current program
  sendCtrlC() {
    let cmd = new Uint8Array([0x0d, 0x03, 0x03]);
    this.writer.write(cmd);
  }

  // Enter raw REPL
  sendCtrlA() {
    let cmd = new Uint8Array([0x0d, 0x01]);
    this.writer.write(cmd);
  }

  // Exit raw REPL
  sendCtrlB() {
    let cmd = new Uint8Array([0x0d, 0x02]);
    this.writer.write(cmd);
  }

  // Soft reset OR Execute command (RAW mode)
  sendCtrlD() {
    let cmd = new Uint8Array([0x04]);
    this.writer.write(cmd);
  }

  async enterRawMode() {
    this.clearBuf();
    this.sendCtrlC();
    let r = await this.waitForString('>>> ', 5000);
    if (r == null) {
      return 'timeout';
    }

    this.sendCtrlA();
    r = await this.waitForString('>');
    if (r == null) {
      return 'timeout';
    }

    return 'success';
  }

  async exitRawMode() {
    this.sendCtrlB();
    let r = await this.waitForString('>>> ');
    if (r == null) {
      return 'timeout';
    }

    return 'success';
  }

  async sendPythonCmd(string) {
    let e = new TextEncoder();
    let cmd = e.encode(string);
    while (cmd.length > 0) {
      let send = cmd.slice(0, this.chunkSize);
      cmd = cmd.slice(this.chunkSize);
      this.writer.write(send);
      await awaitTimeout(this.chunkDelay);
    }
  }

  async sendPythonCmdAndRun(string, terminator='CGLI5wxheI', timeout=2000) {
    string += '\nprint("' + terminator + '")\n';
    await this.sendPythonCmd(string);
    this.sendCtrlD();
    await this.waitForString('OK', timeout);
    let result = await this.waitForString(terminator, timeout);
    if (result == null) {
      return ['timeout', null];
    }
    return ['success', result];
  }

  async copyFileToDevice(filename, content) {
    let cmd =
      'f = open("' + filename + '", "wb")\n' +
      'f.write(b\'' + toPythonBytesLiteral(content) + '\')\n' +
      'f.close()\n';

    return (await this.sendPythonCmdAndRun(cmd))[0];
  }

  async copyFileFromDevice(filename) {
    let cmd =
      'import ubinascii\n' +
      'f = open("' + filename + '", "rb")\n' +
      'print(ubinascii.b2a_base64(f.read()).decode(), end="")\n';

    return (await this.sendPythonCmdAndRun(cmd));
  }

  async deleteFile(filename) {
    let cmd =
      'import os\n' +
      'try:\n' +
      '  os.remove("' + filename + '")\n' +
      '  print("success", end="")\n' +
      'except:\n' +
      '  print("fail", end="")\n'

    let result = await this.sendPythonCmdAndRun(cmd);
    if (result[0] == 'timeout') {
      return 'timeout';
    } else if (result[1] == 'success') {
      return 'success';
    }
    return 'fail';
  }

  async mkdir(dirname) {
    let cmd =
      'import os\n' +
      'try:\n' +
      '  os.mkdir("' + dirname + '")\n' +
      '  print("success", end="")\n' +
      'except:\n' +
      '  print("fail", end="")\n'

    let result = await this.sendPythonCmdAndRun(cmd);
    if (result[0] == 'timeout') {
      return 'timeout';
    } else if (result[1] == 'success') {
      return 'success';
    }
    return 'fail';
  }


}
