#!/bin/env python3

import binascii
import hashlib

def gen_hash(filename):
    f = open(filename, 'rb')
    d = f.read()
    h = hashlib.sha256(d)
    return binascii.hexlify(h.digest()).decode()

def main():
    commands = []
    with open('_ioty_updates', 'r') as f:
        for line in f.readlines():
            commands.append(line.split())

    for command in commands:
        if command[0] == 'mkdir':
            continue
        elif command[0] =='mv':
            hash = gen_hash(command[2])
            if len(command) > 3:
                command[3] = hash
            else:
                command.append(hash)
    
    with open('_ioty_updates', 'w') as f:
        for command in commands:
            line = ' '.join(command) + '\n'
            f.write(line)

if __name__ == "__main__":
    main()