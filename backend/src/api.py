import os
import uuid
import dotenv
from flask import Flask, Blueprint, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_sock import Sock
from flask_login import (
    UserMixin,
    LoginManager,
    login_required,
    current_user,
    login_user,
    logout_user
)
from werkzeug.security import generate_password_hash, check_password_hash


# Load environment variables
dotenv.load_dotenv()


# Define the configuration class
class Config:
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://"
        f"{os.getenv('POSTGRES_USER')}"
        ":"
        f"{os.getenv('POSTGRES_PASSWORD')}"
        "@db/"
        f"{os.getenv('POSTGRES_DB')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')


# API setup
app: Flask = Flask(__name__)
app.config.from_object(Config)
db: SQLAlchemy = SQLAlchemy(app)
sock: Sock = Sock(app)
login_manager: LoginManager = LoginManager(app)


# Models
class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.UUID, primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    rating = db.Column(db.Numeric(5,2))

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
    rating = db.Column(db.Numeric(5,2))


# Login Manager Setup
@login_manager.user_loader
def load_user(user):
    return User.query.get(user)


# Authentification Blueprint
auth_blueprint = Blueprint('auth', __name__)

# Routes
@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json  # waiting JSON-query from frontend
    email = data.get('email')
    password = data.get('password')
    remember = data.get('remember', False)  # default False

    if not email or not password:
        return jsonify({"error": "Password and email are required"}), 400

    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    return jsonify({
        "message": "Login successful", 
        "user": {
            "id": user.id,
            "email": user.email, 
            "username": user.username
        }
    }), 200

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not email or not username or not password:
        return jsonify({"error": "All fields are required"}), 400

    existing_user = User.query.filter((User.email == email) | (User.username == username)).first()  # if this returns a user, then the email/username already exists in database

    if existing_user:
        return jsonify({"error": "User with this email or username already exists"}), 409

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(
        email=email,
        username=username,
        password=generate_password_hash(password)
    )

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully", 
        "user": {
            "id": new_user.id,
            "email": new_user.email, 
            "username": new_user.username
        }
    }), 201

@auth_blueprint.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"}), 200

# Register The Blueprint
app.register_blueprint(auth_blueprint)


# Blueprint For Non-Authentification Parts Of The App
main_blueprint: Blueprint = Blueprint('main', __name__)

# Routes
@main_blueprint.route('/api/home')
def home():
    return jsonify({"message": "Welcome to the API!"})

@main_blueprint.route('/api/user')
@login_required
def profile():
    return jsonify({
        "username": current_user.username,
        "email": current_user.email,
        "rating": str(current_user.rating)
    })

# Register The Blueprint
app.register_blueprint(main_blueprint)
