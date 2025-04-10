import os
import machine
import ioty.constants as constants
import hashlib
import binascii

def get_info():
    import gc
    import network

    fs_stats = os.statvfs('/')
    return {
        'network': {
            'mac': binascii.hexlify(network.WLAN().config('mac'))
        },
        'mem': {
            'allocated': gc.mem_alloc(),
            'free': gc.mem_free()
        },
        'fs': {
            'block size': fs_stats[0],
            'free blocks': fs_stats[3]
        }
    }

def list_files(dir):
    listing = []
    for i in os.ilistdir(dir):
        if i[1] == 0x8000:
            listing.append(dir + i[0])
        elif i[1] == 0x4000:
            listing.append(dir + i[0] + '/')
            listing.extend(list_files(dir + i[0] + '/'))
    return listing

def update():
    commands = []
    with open('_ioty_updates', 'r') as f:
        for line in f.readlines():
            commands.append(line.split())

    for command in commands:
        if command[0] == 'mkdir':
            try:
                os.mkdir(command[1])
            except:
                pass
        elif command[0] == 'mv':
            os.rename(command[1], command[2])
        elif command[0] == 'rm':
            try:
                os.remove(command[1])
            except:
                pass

    os.remove('_ioty_updates')

def delete_file(filename):
    if not(filename in constants._PRESERVE_FILES) or filename in constants._ALLOW_DELETE:
        os.remove(filename)
        return True
    else:
        return False

def delete_all_files():
    for f in os.listdir():
        if not(f in constants._PRESERVE_FILES):
            os.remove(f)

def reset():
    machine.reset()

def get_hash(path):
    h = hashlib.sha256()
    try:
        with open(path, 'rb') as f:
            while True:
                buf = f.read(256)
                if not buf:
                    break
                h.update(buf)
        return binascii.hexlify(h.digest())
    except:
        return b'None'