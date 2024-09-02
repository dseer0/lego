from gpiozero import Button
from signal import pause
import requests
from time import sleep

block = False

def sendMoney():
    requests.get('http://localhost:8999/gotMoney')
    # sleep(1)

def sendFinger():
    requests.get('http://localhost:8999/sendFinger')

def unlock():
    global block
    block = False
    
button = Button(2)

fingerButton = Button(3)
# button.when_pressed = sendMoney
button.when_released = sendMoney
fingerButton.when_released = sendFinger

pause()