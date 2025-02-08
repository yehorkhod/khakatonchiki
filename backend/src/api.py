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
        f"{os.getenv('POSTGRES_USER')}"
        ":"
        f"{os.getenv('POSTGRES_PASSWORD')}"
        "@localhost/"
        f"{os.getenv('POSTGRES_DB')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# API setup
app: Flask = Flask(__name__)
app.config.from_object(Config)

sock: Sock = Sock(app)
db: SQLAlchemy = SQLAlchemy(app)

db.init_app(app)

# blueprint for auth routes in our app
from .auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

# blueprint for non-auth parts of app
from .main import main as main_blueprint
app.register_blueprint(main_blueprint)