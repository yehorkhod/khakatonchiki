from flask import Flask
from flask_sock import Sock

app: Flask = Flask(__name__)
sock: Sock = Sock(app)


@sock.route('/echo')
def echo(ws):
    while True:
        data = ws.receive()
        ws.send(data)
