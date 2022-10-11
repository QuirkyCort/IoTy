import _ioty_monitor
import time

for i in range(10):
    print(i)
    time.sleep(1)

print('ready')

while True:
    a = input('Enter some text :')
    print('I received :', a)
