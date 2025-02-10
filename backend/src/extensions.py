from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_sock import Sock

db: SQLAlchemy = SQLAlchemy()
sock: Sock = Sock()
login_manager: LoginManager = LoginManager()
