import uuid
from .extensions import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    rating = db.Column(db.Numeric(5, 2))
    user_image = db.Column(db.Text)

    quests = db.relationship('Quest', backref='author', lazy=True, cascade="all, delete")
    comments = db.relationship('Comment', backref='user', lazy=True, cascade="all, delete")
    sessions = db.relationship('Session', backref='user', lazy=True, cascade="all, delete")


class Quest(db.Model):
    __tablename__ = 'quests'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    author_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500))
    number_of_tasks = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Interval())
    rating = db.Column(db.Numeric(5, 2), default=0)

    tasks = db.relationship('Task', backref='quest', lazy=True, cascade="all, delete")
    comments = db.relationship('Comment', backref='quest', lazy=True, cascade="all, delete")
    sessions = db.relationship('Session', backref='quest', lazy=True, cascade="all, delete")


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    quest_id = db.Column(db.BigInteger, db.ForeignKey('quests.id', ondelete='CASCADE'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    quest_id = db.Column(db.BigInteger, db.ForeignKey('quests.id', ondelete='CASCADE'), nullable=False)
    task_data = db.Column(db.JSON, nullable=False)  # Renamed to `task_data` for clarity
    position = db.Column(db.Integer, nullable=False)  # Position of the task (1st, 2nd, ...)

    __table_args__ = (db.CheckConstraint('position > 0', name='check_position_positive'),)


class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    quest_id = db.Column(db.BigInteger, db.ForeignKey('quests.id', ondelete='CASCADE'), nullable=False)
    tasks_finished = db.Column(db.Integer, default=0)
    finished = db.Column(db.Boolean, default=False)
    rating = db.Column(db.Numeric(5, 2), db.CheckConstraint('rating >= 0 AND rating <= 5'))

    __table_args__ = (db.CheckConstraint('tasks_finished >= 0', name='check_tasks_finished_positive'),)
