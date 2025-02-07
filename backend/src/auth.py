from flask import Blueprint
from . import db

auth = Blueprint('auth', __name__)

@auth.route('/login', method = ['POST'])
def login():
    dt = request.json
    name = dt.get("name")
    email = dt.get("email")

    if not name or not email:
        return jsonify({"error": "Имя и email обязательны"}), 400

    

@auth.route('/reqistrate', method = ['POST'])
def signup():
    return 'Signup'

@auth.route('/logout')
def logout():
    return 'Logout'