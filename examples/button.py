import _ioty_monitor
import machine
import time

# create output pin on Pin 2. Pin 2 is connected to the LED.
p2 = machine.Pin(2, machine.Pin.OUT)

# Pin 0 is connected to the boot button.
p0 = machine.Pin(0, machine.Pin.IN, machine.Pin.PULL_UP)

while True:
    time.sleep_ms(100)
    if (p0.value() == 0):
        p2.on()
    else:
        p2.off()
