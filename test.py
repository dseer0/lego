from gpiozero import Button
from signal import pause
import requests
from time import sleep

block = False

def sendMoney():
    requests.get('http://localhost:8999/gotMoney')
    # sleep(1)
    
def unlock():
    global block
    block = False
    
button = Button(2)
# button.when_pressed = sendMoney
button.when_released = sendMoney

pause()