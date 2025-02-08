from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from .model import User
from .api import db

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
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
    return jsonify({"message": "Login successful", "user": {"email": user.email, "username": user.username}}), 200

@auth.route('/reqister', methods=['POST'])
def reqistrate():
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
        password=generate_password_hash(password, method='sha256')
    )

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200
