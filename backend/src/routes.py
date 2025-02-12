from flask import Blueprint, jsonify, request
from flask_login import (
    login_required,
    current_user,
)
from .models import User, Quest, Task, Comment, Session
from .extensions import db

main_blueprint: Blueprint = Blueprint("main", __name__, url_prefix="/api")


@main_blueprint.route("/home", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the API!"})


@main_blueprint.route("/users/me", methods=["GET"])
@login_required
def profile():
    created_quests = Quest.query.filter_by(author_id=current_user.id).all()

    completed_sessions = Session.query.filter_by(user_id=current_user.id).all()
    completed_quest_id = [session.quest_id for session in completed_sessions]
    completed_quests = Quest.query.filter(Quest.id.in_(completed_quest_id)).all()

    return jsonify(
        {
            "username": current_user.username,
            "email": current_user.email,
            "rating": str(current_user.rating),
            "user_image": current_user.user_image,
            "created_quests": [
                {
                    "id": quest.id,
                    "title": quest.title,
                    "description": quest.description,
                    "number_of_tasks": quest.number_of_tasks,
                    "duration": str(quest.duration) if quest.duration else None,
                    "rating": str(quest.rating),
                }
                for quest in created_quests
            ],
            "completed_quests": [
                {
                    "id": quest.id,
                    "title": quest.title,
                    "description": quest.description,
                    "number_of_tasks": quest.number_of_tasks,
                    "duration": str(quest.duration) if quest.duration else None,
                    "rating": str(quest.rating),
                }
                for quest in completed_quests
            ],
        }
    )


@main_blueprint.route("/users/user", methods=["POST"])
def user():
    data = request.json
    id = data.get("id")

    if not id:
        return jsonify({"error": "User ID is required"}), 400

    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    created_quests = Quest.query.filter_by(author_id=id).all()

    completed_sessions = Session.query.filter_by(user_id=id).all()
    completed_quest_id = [session.quest_id for session in completed_sessions]
    completed_quests = Quest.query.filter(Quest.id.in_(completed_quest_id)).all()

    return (
        jsonify(
            {
                "username": user.username,
                "email": user.email,
                "rating": str(user.rating),
                "user_image": user.user_image,
                "created_quests": [
                    {
                        "id": quest.id,
                        "title": quest.title,
                        "description": quest.description,
                        "number_of_tasks": quest.number_of_tasks,
                        "duration": str(quest.duration) if quest.duration else None,
                        "rating": str(quest.rating),
                    }
                    for quest in created_quests
                ],
                "completed_quests": [
                    {
                        "id": quest.id,
                        "title": quest.title,
                        "description": quest.description,
                        "number_of_tasks": quest.number_of_tasks,
                        "duration": str(quest.duration) if quest.duration else None,
                        "rating": str(quest.rating),
                    }
                    for quest in completed_quests
                ],
            }
        ),
        200,
    )


@main_blueprint.route("/create_quest", methods=["POST"])
@login_required
def create_quest():
    data = request.json
    if not data.get("title"):
        return jsonify({"error": "Quest's title are required!"}), 400

    new_quest = Quest(
        title=data["title"],
        author_id=current_user.id,
        number_of_tasks=(data.get("tasks") and len(data["tasks"])) or 0,
    )
    db.session.add(new_quest)

    # duration
    if data.get("duration"):
        new_quest.duration = data["duration"]
        db.session.commit()

    # description
    if data.get("description"):
        new_quest.description = data["description"]
        db.session.commit()

    # tasks
    if "tasks" in data:
        for task_data in data["tasks"]:
            new_task = Task(
                quest_id=new_quest.id,
                task_data=task_data,  # JSONB
            )
            db.session.add(new_task)
    db.session.commit()
    return jsonify(
        {"message": "The quest and tasks have been created", "quest_id": new_quest.id}
    )


@main_blueprint.route("/get_quest_info", methods=["POST"])
def get_quest():
    data = request.json
    quest_id = data.get("quest_id")

    if not quest_id:
        return jsonify({"error": "Quest ID is required"}), 400

    quest = Quest.query.get(quest_id)

    return jsonify(
        {
            # todo: add more fields
            "id": quest.id,
            "title": quest.title,
            "description": quest.description,
            "author_id": quest.author_id,
            "author": User.query.get(quest.author_id).username,
            "rating": quest.rating,
            "duration": quest.duration,
            "number_of_tasks": quest.number_of_tasks,
            "comments": [
                {"id": comment.id, "text": comment.text, "user_id": comment.user_id, "username": User.query.get(comment.user_id).username}
                for comment in Comment.query.filter_by(quest_id=quest_id).all()
            ],
        }
    )


@main_blueprint.route("/get_tasks", methods=["POST"])
def get_tasks():
    data = request.json
    quest_id = data.get("quest_id")

    if not quest_id:
        return jsonify({"error": "Quest ID is required"}), 400

    tasks = Task.query.filter_by(quest_id=quest_id).all()
    tasks_data = [{"id": task.id, "content": task.task_data} for task in tasks]

    return jsonify({"quest_id": quest_id, "tasks": tasks_data})


@main_blueprint.route("/quests/top", methods=["GET"])
def get_quests():
    top_quests = Quest.query.order_by(Quest.rating.desc()).limit(10).all()
    quests_data = [
        {
            "id": q.id,
            "author_id": q.author_id,
            "author": User.query.get(q.author_id).username,
            "title": q.title,
            "description": q.description,
            "number_of_tasks": q.number_of_tasks,
            "duration": q.duration,
            "rating": q.rating
        } for q in top_quests
    ]

    return jsonify({"top_quests": quests_data})


@main_blueprint.route("/finish_quest", methods=["POST"])
@login_required
def finish_quest():
    data = request.json
    quest_id = data.get("quest_id")

    if not quest_id:
        return jsonify({"error": "Missing quest_id"}), 400

    new_session = Session(user_id=current_user.id, quest_id=quest_id)
    db.session.add(new_session)
    db.session.commit()

    return jsonify({"message": "Session created successfully"}), 201


@main_blueprint.route("/leave_review", methods=["POST"])
@login_required
def leave_review():
    data = request.json
    quest_id = data.get("quest_id")
    rating = data.get("rating")
    comment_text = data.get("comment")

    if not quest_id:
        return jsonify({"error": "Missing quest_id"}), 400

    session = Session.query.filter_by(
        user_id=current_user.id, quest_id=quest_id
    ).first()

    if not session:
        return jsonify({"error": "Session not found"}), 404

    quest = Quest.query.get(quest_id)
    if not quest:
        return jsonify({"error": "Quest not found"}), 404

    author = User.query.get(quest.author_id)
    if not author:
        return jsonify({"error": "Author not found"}), 404

    # TODO: Implement rating
    # if rating:
    #     session.rating = int(rating)
    #     db.session.commit()

    #     quest.recalculate_rating()
    #     author.recalculate_rating()

    if comment_text:
        new_comment = Comment(
            user_id=current_user.id, quest_id=quest_id, text=comment_text
        )
        db.session.add(new_comment)
        db.session.commit()

    return jsonify({"message": "Session updated successfully"}), 200
