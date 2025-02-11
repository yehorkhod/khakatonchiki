from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db: SQLAlchemy = SQLAlchemy()
login_manager: LoginManager = LoginManager()
