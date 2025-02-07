from flask import Flask
from flask_sock import Sock
from flask_sqlalchemy import SQLAlchemy

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:1a1q2s2w@localhost/your_database"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

app: Flask = Flask(__name__)
sock: Sock = Sock(app)
app.config.from_object(Config)

db = SQLAlchemy(app)

@sock.route('/echo')
def echo(ws):
    while True:
        data = ws.receive()
        ws.send(data)

@app.route('/home')
def home():
    pass

if __name__ == '__main__':
    app.run(debug=True)