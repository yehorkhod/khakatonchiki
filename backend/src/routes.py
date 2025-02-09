from flask import Blueprint, jsonify, request
from flask_login import (
    login_required,
    current_user,
)
from .models import User

main_blueprint: Blueprint = Blueprint('main', __name__, url_prefix='/api')

@main_blueprint.route('/home', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the API!"})

@main_blueprint.route('/users/me', methods=['GET'])
@login_required
def profile():
    return jsonify({
        "username": current_user.username,
        "email": current_user.email,
        "rating": str(current_user.rating),
        "user_image": current_user.user_image,
    })

@main_blueprint.route('/users/user', methods=['POST'])
def user():
    data = request.json
    id = data.get('id')

    if not id:
        return jsonify({"error": "User ID is required"}), 400

    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "username": user.username,
        "email": user.email,
        "rating": str(user.rating),
        "user_image": user.user_image,
    }), 200
