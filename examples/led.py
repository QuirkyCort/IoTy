import _ioty_monitor
import machine
import time

# create output pin on Pin 2. Pin 2 is connected to the LED.
p2 = machine.Pin(2, machine.Pin.OUT)

while True:
    print('on')
    p2.on()
    time.sleep(1)
    print('off')
    p2.off()
    time.sleep(1)
