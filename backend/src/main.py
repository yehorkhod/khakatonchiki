from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from backend.src.api import app, db, sock

main = Blueprint('main', __name__)

# Route
@main.route('/api/home')
def home():
    return jsonify({"message": "Welcome to the API!"})

@main.route('/api/user')
@login_required
def profile():
    return jsonify({
        "username": current_user.username,
        "email": current_user.email,
        "rating": str(current_user.rating)
    })