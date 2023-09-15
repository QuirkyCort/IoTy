# Based on https://github.com/HuskyLens/HUSKYLENSPython
# Modified for micropython

import time
import struct

CMD_HEADER = b'\x55\xAA\x11'

OBJECT_TRACKING = b'\x01\x00'
FACE_RECOGNITION = b'\x00\x00'
OBJECT_RECOGNITION = b'\x02\x00'
LINE_TRACKING = b'\x03\x00'
COLOR_RECOGNITION = b'\x04\x00'
TAG_RECOGNITION = b'\x05\x00'
OBJECT_CLASSIFICATION = b'\x06\x00'
QR_CODE_RECOGNTITION = b'\x07\x00'
BARCODE_RECOGNTITION = b'\x08\x00'

class HuskyLens:
    def __init__(self):
        self.results = []
        self.numberOfIDLearned = 0
        self.frameNumberVal = 0

    def _write(self, cmd):
        pass

    def _read(self):
        pass

    def _flush(self):
        pass

    def _calculateChecksum(self, b):
        total = 0
        for i in range(len(b)):
            total += b[i]
        return total % 256

    def _splitCommandToParts(self, b):
        headers = b[0:2]
        address = b[2]
        data_length = b[3]
        command = b[4]
        if data_length > 0:
            data = b[5:5+data_length]
        else:
            data = []
        checkSum = b[-1]

        return [headers, address, data_length, command, data, checkSum]

    def _getBlockOrArrowCommand(self):
        commandSplit = self._splitCommandToParts(self._read())
        isBlock = True if commandSplit[3] == 0x2a else False
        return (commandSplit[4],isBlock)

    def _processBlockOrArrow(self, numberOfBlocksOrArrow):
        ret = []
        for _ in range(numberOfBlocksOrArrow):
            tmpObj, isBlock=self._getBlockOrArrowCommand()
            tmp = []
            for q in range(0, len(tmpObj), 2):
                val = (tmpObj[q+1] << 8) | tmpObj[q]
                tmp.append(val)
            if len(tmp) == 5:
                ret.append(self._convert_to_class_object(tmp, isBlock))
        return ret

    def _processReturnData(self):
        commandSplit = self._splitCommandToParts(self._read())
        if commandSplit[3] == 0:
            return
        elif commandSplit[3] == 0x2e:
            return "Knock Recieved"
        else:
            numberOfBlocksOrArrow = (commandSplit[4][1] << 8) | commandSplit[4][0]
            self.numberOfIDLearned = (commandSplit[4][3] << 8) | commandSplit[4][2]
            self.frameNumberVal = (commandSplit[4][5] << 8) | commandSplit[4][4]

            self.results = self._processBlockOrArrow(numberOfBlocksOrArrow)

            return self.results, self.numberOfIDLearned, self.frameNumberVal

    def _convert_to_class_object(self, data, isBlock):
        if isBlock:
            return {
                'x': data[0],
                'y': data[1],
                'width': data[2],
                'height': data[3],
                'ID': data[4],
                'learned': True if data[4] > 0 else False,
                'type': 'BLOCK'
            }
        else:
            return {
                'xTail': data[0],
                'yTail': data[1],
                'xHead': data[2],
                'yHead': data[3],
                'ID': data[4],
                'learned': True if data[4] > 0 else False,
                'type': 'BLOCK'
            }

    def knock(self):
        self._write(CMD_HEADER + b'\x00\x2c\x3c')
        return self._processReturnData()

    def learn(self, id):
        cmd = CMD_HEADER + b'\x02\x36' + struct.pack('<H', id)
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()

    def forget(self):
        self._write(CMD_HEADER + b'\x00\x37\x47')
        return self._processReturnData()

    def setCustomName(self, name, id):
        nameDataSize = len(name) + 1
        name = name.encode("utf-8") + b'\x00'
        localId = struct.pack('B', id)
        data = localId + bytes([nameDataSize]) + name
        dataLen = len(data)
        cmd = CMD_HEADER + bytes([dataLen]) + b'\x2f' + data
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()

    def customText(self, text, x, y):
        text = text.encode("utf-8")
        textDataSize = len(text)
        if x > 255:
            x = b'\xff' + struct.pack('B', x % 255)
        else:
            x = b'\x00' + struct.pack('B', x)
        y = struct.pack('B', y)

        data = bytes([textDataSize]) + x + y + text
        dataLen = len(data)

        cmd = CMD_HEADER + bytes([dataLen]) + b'\x34' + data
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()

    def clearText(self):
        self._write(CMD_HEADER + b'\x00\x35\x45')
        return self._processReturnData()

    def requestAll(self):
        self._write(CMD_HEADER + b'\x00\x20\x30')
        return self._processReturnData()[0]

    def saveModelToSDCard(self, slot):
        slot = struct.pack('<H', slot)
        cmd = CMD_HEADER + b'\x02\x32' + slot
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()

    def loadModelFromSDCard(self, slot):
        slot = struct.pack('<H', slot)
        cmd = CMD_HEADER + b'\x02\x33' + slot
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()

    def savePictureToSDCard(self):
        self._write(CMD_HEADER + b'\x00\x30\x40')
        return self._processReturnData()

    def saveScreenshotToSDCard(self):
        self._write(CMD_HEADER + b'\x00\x39\x49')
        return self._processReturnData()

    def blocks(self):
        self._write(CMD_HEADER + b'\x00\x21\x31')
        return self._processReturnData()[0]

    def arrows(self):
        self._write(CMD_HEADER + b'\x00\x22\x32')
        return self._processReturnData()[0]

    def learned(self):
        self._write(CMD_HEADER + b'\x00\x23\x33')
        return self._processReturnData()[0]

    def learnedBlocks(self):
        self._write(CMD_HEADER + b'\x00\x24\x34')
        return self._processReturnData()[0]

    def learnedArrows(self):
        self._write(CMD_HEADER + b'\x00\x25\x35')
        return self._processReturnData()[0]

    def getObjectByID(self, idVal):
        cmd = CMD_HEADER + b'\x02\x26' + struct.pack('<H', idVal)
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()[0]

    def getBlockByID(self, idVal):
        cmd = CMD_HEADER + b'\x02\x27' + struct.pack('<H', idVal)
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()[0]

    def getArrowByID(self, idVal):
        cmd = CMD_HEADER + b'\x02\x28' + struct.pack('<H', idVal)
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()[0]

    def algorithm(self, alg):
        cmd = CMD_HEADER + b'\x02\x2d' + alg
        cmd += bytes([self._calculateChecksum(cmd)])
        self._write(cmd)
        return self._processReturnData()

    def count(self):
        self._write(CMD_HEADER + b'\x00\x20\x30')
        return len(self._processReturnData()[0])

    def learnedObjCount(self):
        self._write(CMD_HEADER + b'\x00\x20\x30')
        return self._processReturnData()[1]

    def frameNumber(self):
        self._write(CMD_HEADER + b'\x00\x20\x30')
        return self._processReturnData()[2]

    def idInResults(self, id):
        for result in self.results:
            if result.ID == id:
                return True
        return False

    def closestToCenterInResults(self, type):
        minD2 = 99999
        nearest = None
        for result in self.results:
            if result['type'] == type:
                d2 = (result['x'] - 160) ** 2 + (result['y'] - 120) ** 2
                if d2 < minD2:
                    minD2 = d2
                    nearest = result
        return nearest

    def closestBlockToCenterInResults(self):
        return self.closestToCenterInResults('BLOCK')

    def closestArrowToCenterInResults(self):
        return self.closestToCenterInResults('ARROW')

class HuskyLensUART(HuskyLens):
    def __init__(self, uart):
        super().__init__()
        self.uart = uart

        self.knock()
        time.sleep(.5)
        self.knock()
        time.sleep(.5)
        self.knock()
        self._flush()

    def _write(self, cmd):
        self._flush()
        self.uart.write(cmd)

    def _readWithTimeout(self, c, timeout=1):
        buf = bytearray(c)
        ptr = 0
        timeout += time.time()
        while True:
            if ptr == c:
                return buf
            if time.time() > timeout:
                return None
            b = self.uart.read(1)
            if b != None:
                buf[ptr] = b[0]
                ptr += 1

    def _read(self, timeout=5):
        byteString = self._readWithTimeout(5, timeout)
        byteString += self._readWithTimeout(byteString[3], timeout)
        byteString += self._readWithTimeout(1, timeout)
        return byteString

    def _flush(self):
        self.uart.read(-1)


class HuskyLensI2C(HuskyLens):
    def __init__(self, i2c, addr=0x32):
        super().__init__()
        self.addr = addr
        self.i2c = i2c

    def _write(self, cmd):
        self.i2c.writeto(self.addr, cmd)

    def _read(self):
        byteString = self.i2c.readfrom(self.addr, 5)
        byteString += self.i2c.readfrom(self.addr, byteString[3] + 1)
        return byteString