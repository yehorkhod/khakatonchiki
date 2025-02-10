from flask import Blueprint, jsonify, request
from flask_login import (
    login_required,
    current_user,
)
from .models import User, Quest, Task
from .extensions import db

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

@main_blueprint.route('/create_quest', methods=['POST'])
@login_required
def create_quest():
    data = request.json
    if not data.get('title'):
        return jsonify({"error": "Quest's title are required!"}), 400

    new_quest = Quest(title=data['title'], author_id=current_user.id)
    db.session.add(new_quest)

    if 'tasks' in data:
        for task_data in data['tasks']:
            new_task = Task(quest_id=new_quest.id, type=task_data['type'], content=task_data['content'])
            db.session.add(new_task)
            new_quest.task_count += 1

    db.session.commit()
    return jsonify({"message": "Квест и задания созданы", "quest_id": new_quest.id})

@main_blueprint.route('/quest/<int:quest_id>', methods=['GET'])
@login_required
def get_quest(quest_id):
    quest = Quest.query.get_or_404(quest_id)
    return jsonify({
        "id": quest.id,
        "name": quest.name,
        "author_id": quest.author_id,
        "task_count": quest.task_count,
    })

@main_blueprint.route('/quest/<int:quest_id>/tasks', methods=['GET'])
@login_required
def get_tasks(quest_id):
    tasks = Task.query.filter_by(quest_id=quest_id).all()
    tasks_data = [{"id": task.id, "type": task.type, "content": task.content} for task in tasks]

    return jsonify({
        "quest_id": quest_id,
        "tasks": tasks_data
    })


@main_blueprint.route('/quests/top', methods=['GET'])
@login_required
def get_top_quests():
    top_quests = Quest.query.order_by(Quest.rating.desc()).limit(10).all()
    quests_data = [{"id": q.id, "name": q.name, "rating": q.rating} for q in top_quests]

    return jsonify({"top_quests": quests_data})