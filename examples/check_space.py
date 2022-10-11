import _ioty_monitor
import gc
import os

fs_stats = os.statvfs('/')

print('Free Memory: ' + str(gc.mem_free()))
print('File System ')
print('  block size: ' + str(fs_stats[0]))
print('  fragment size: ' + str(fs_stats[1]))
print('  fs size in fragments: ' + str(fs_stats[2]))
print('  free blocks: ' + str(fs_stats[3]))
print('  number of inodes: ' + str(fs_stats[5]))
print('  free inodes: ' + str(fs_stats[6]))
print('  max filename length: ' + str(fs_stats[9]))
