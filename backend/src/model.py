from . import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.UUID, primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)

    quests = db.relationship('Quest', backref='author', lazy=True, cascade="all, delete")

class Quest(db.Model):
    __tablename__ = 'quests'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    author_uuid = db.Column(db.UUID, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500))
    number_of_task = db.Column(db.Integer)
    duration = db.Column(db.Interval)
    tasks = db.Column(db.JSON)
    comments = db.Column(db.JSON)