from flask import Blueprint, jsonify
from flask_login import (
    login_required,
    current_user,
)

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

