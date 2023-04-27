#!/bin/env python3

import os
import json

variables = {}
blocks_json = []

def read_variables_file(filename):
  with open(filename, 'r') as f:
    variables[filename[2:-5]] = f.read()

def read_blocks_file(filename):
  with open(filename, 'r') as f:
    json_str = f.read()

  for key in variables:
    json_str = json_str.replace('$' + key, variables[key])

  try:
    block = json.loads(json_str)
    blocks_json.append(block)
  except:
    print('Error loading:', filename)

def write_blocks_json():
  with open('../customBlocks.json', 'w') as f:
    try:
      f.write(json.dumps(blocks_json))
    except:
      print('Error writing json')

blocks_filenames = []
def scanDir(path):
  for entry in os.scandir(path):
    if entry.is_dir():
      scanDir(entry.path)
    elif entry.name[-5:] == '.json':
      if entry.name[0] == '_':
        read_variables_file(entry.path)
      else:
        blocks_filenames.append(entry.path)

scanDir('.')

for filename in blocks_filenames:
  read_blocks_file(filename)


write_blocks_json()