from machine import Pin
import time

p2 = Pin(2, Pin.OUT)

while True:
  p2.on()
  time.sleep(1)
  p2.off()
  time.sleep(1)
