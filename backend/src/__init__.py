from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import dotenv
import os

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

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    sock: Sock = Sock(app)

    return app