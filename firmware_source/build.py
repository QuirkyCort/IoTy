#!/bin/env python3

import os
import shutil

SKIP = 'build.py'
DONT_COMPILE = 'boot.py'

def list_files(dir):
    listing = []
    for i in os.scandir(os.path.join(*dir)):
        if i.is_dir():
            listing.append(dir + [i.name])
            listing.extend(list_files(dir + [i.name]))
        elif i.name != SKIP:
            listing.append(dir + [i.name])
    return listing

def mkdir(path):
    if not os.path.exists(path):
        print('mkdir', path)
        os.mkdir(path)
    else:
        print('mkdir', path, '(Already exists)')


#### Main ####

# mkdir first
for p in list_files(['.']):
    source_path = os.path.join(*p[1:])
    dest_path = os.path.join('..', 'public', 'firmware', *p[1:])

    if os.path.isdir(source_path):
        mkdir(dest_path)

# files next
for p in list_files(['.']):
    source_path = os.path.join(*p[1:])
    dest_path = os.path.join('..', 'public', 'firmware', *p[1:])

    if os.path.isdir(source_path):
        pass
    elif p[-1][-3:] == '.py' and p[-1] != DONT_COMPILE:
        cmd = '../tools/mpy-cross ' + source_path + ' -o ' + dest_path[:-2] + 'mpy'
        print('cmd: ', cmd)
        os.system(cmd)
    else:
        print('cp', source_path, dest_path)
        shutil.copyfile(source_path, dest_path)