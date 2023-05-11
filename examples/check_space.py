import ioty.monitor
ioty.monitor.wait_for_connection()

import gc
import os
import network

fs_stats = os.statvfs('/')

print('Allocated Memory: ' + str(gc.mem_alloc()))
print('Free Memory: ' + str(gc.mem_free()))
print('Mac Address: ' + str(network.WLAN().config('mac')))
print('File System ')
print('  Block size: ' + str(fs_stats[0]))
print('  Free blocks: ' + str(fs_stats[3]))
print('  Available space: ' + str(fs_stats[0] * fs_stats[3]))
