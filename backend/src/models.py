import uuid
from .extensions import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.UUID, primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    rating = db.Column(db.Numeric(5,2))
    user_image = db.Column(db.Text)
    quests = db.relationship('Quest', backref='author', lazy=True, cascade="all, delete")

class Quest(db.Model):
    __tablename__ = 'quests'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    author_uuid = db.Column(db.UUID, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500))
    number_of_tasks = db.Column(db.Integer)
    duration = db.Column(db.Interval)
    tasks = db.Column(db.JSON)
    comments = db.Column(db.JSON)
    rating = db.Column(db.Numeric(5,2))
