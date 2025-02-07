import os
from flask import Flask
from flask_sock import Sock
from flask_sqlalchemy import SQLAlchemy
import dotenv

# Load environment variables
dotenv.load_dotenv()

# Define the configuration class
class Config:
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{os.getenv('POSTGRE_USER')}"
        ":"
        f"{os.getenv('POSTGRE_PASSWORD')}"
        "@localhost/"
        f"{os.getenv('POSTGRE_DB')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# API setup
app: Flask = Flask(__name__)
app.config.from_object(Config)

sock: Sock = Sock(app)
db: SQLAlchemy = SQLAlchemy(app)

# Routes
@app.route('/home')
def home():
    return 'Hi mom!'

@sock.route('/echo')
def echo(ws):
    while True:
        data = ws.receive()
        ws.send(data)

if __name__ == '__main__':
    app.run(debug=True)
