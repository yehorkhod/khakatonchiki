from flask import Blueprint, jsonify, request, url_for
from flask_login import (
    login_required,
    login_user,
    logout_user
)
from flask_dance.contrib.google import google
import requests
from werkzeug.security import generate_password_hash, check_password_hash
from .api import google_bp
from .extensions import db, login_manager
from .models import User

auth_blueprint: Blueprint = Blueprint('auth', __name__, url_prefix='/api/auth')

@login_manager.user_loader
def load_user(id):
    return User.query.get(id)

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    remember = data.get('remember', False)

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    login_user(user, remember=remember)
    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "user_image": user.user_image,
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

    existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    user_image = requests.get(f"https://api.dicebear.com/9.x/icons/svg?seed={username}").content.decode('utf-8')

    new_user = User(email=email, username=username, password=generate_password_hash(password), user_image=user_image)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username,
            "user_image": new_user.user_image,
        }
    }), 201

@auth_blueprint.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"}), 200

# Login with Google/Facebook

@google_bp.route("/google")
def google_login():
    if not google.authorized:
        return jsonify({"login_url": url_for("google.login", _external=True)})

    resp = google.get("/oauth2/v1/userinfo")
    if not resp.ok:
        return jsonify({"error": "Failed to fetch user info"}), 400

    user_info = resp.json()
    email = user_info["email"]
    google_id = user_info["id"]
    username = user_info["name"]
    user_image = user_info.get("picture")

    # Check if the user is in the database
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(
            username=username,
            email=email,
            oauth_provider="google",
            oauth_id=google_id,
            user_image=user_image
        )
        db.session.add(user)
        db.session.commit()

    login_user(user)
    return jsonify({"message": "Login successful", "user": {"username": user.username, "email": user.email}})