import os
import dotenv
import requests
import psycopg2

dotenv.load_dotenv()
BASE_URL = "http://localhost:8000/api"  # Adjust if needed
SQLALCHEMY_DATABASE_URI = (
    "postgresql://"
    f"{os.getenv('POSTGRES_USER')}"
    ":"
    f"{os.getenv('POSTGRES_PASSWORD')}"
    "@localhost/"
    f"{os.getenv('POSTGRES_DB')}"
)
# get all the columns names from the table users
conn = psycopg2.connect(SQLALCHEMY_DATABASE_URI)
cur = conn.cursor()

cur.execute(
    "SELECT column_name FROM information_schema.columns WHERE table_name = 'users';"
)
columns = cur.fetchall()
columns = [column[0] for column in columns]
print("Columns in the 'users' table:", columns)
cur.close()
conn.close()
# Test Home Route
home_response = requests.get(f"{BASE_URL}/home")
print("Home Response:", home_response.json())
# Test Register
register_data = {
    "email": "test@example.com",
    "username": "testuser",
    "password": "securepassword",
}
register_response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
assert register_response.status_code == 201 or register_response.status_code == 409
print("Register Response:", register_response.content)

# Test Login
login_data = {"email": "test@example.com", "password": "securepassword"}
session = requests.Session()
login_response = session.post(f"{BASE_URL}/auth/login", json=login_data)
assert login_response.status_code == 200
print("Login Response:", login_response.json())
# Test Accessing User Profile (Requires Authentication)
profile_response = session.get(f"{BASE_URL}/users/me")
assert profile_response.status_code == 200
print("Profile Response:", profile_response.json())

# Create quest
for i in range(1, 4):
    create_quest_response = session.post(
        f"{BASE_URL}/create_quest",
        json={
            "title": "Test Quest",
            "description": "This is a test quest",
            "tasks": [
                {"description": "Task 1", "answer": "Answer 1"},
                {"description": "Task 2", "answer": "Answer 2"},
            ],
        },
    )
print("Create Quest Response:", create_quest_response.content)
assert create_quest_response.status_code == 200

# Test Accessing quests
get_quests_response = session.post(f"{BASE_URL}/get_quest_info", json={"quest_id": "1"})
print("Quests Info:", get_quests_response.content)
assert get_quests_response.status_code == 200
# Test Accessing quests tasks
get_tasks_response = session.post(f"{BASE_URL}/get_tasks", json={"quest_id": "1"})
print("Quests tasks:", get_tasks_response.json())
assert get_quests_response.status_code == 200
# Test getting quests
get_quests_response = session.get(f"{BASE_URL}/quests/top")
print("Top Quests:", get_quests_response.json())
assert get_quests_response.status_code == 200
# Test finishing quest
finish_quest_response = session.post(f"{BASE_URL}/finish_quest", json={"quest_id": "1"})
print("Finish Quest:", finish_quest_response.json())
assert finish_quest_response.status_code == 201
# Test leaving a review
leave_review_response = session.post(
    f"{BASE_URL}/leave_review",
    json={"quest_id": "1", "rating": 5, "comment": "Great quest!"},
)
print("Leave Review:", leave_review_response.json())
assert leave_review_response.status_code == 200
# Test Logout
logout_response = session.post(f"{BASE_URL}/auth/logout")
assert logout_response.status_code == 200
print("Logout Response:", logout_response.json())
# Test Accessing User Profile (After Logout)
profile_response = session.get(f"{BASE_URL}/users/me")
assert profile_response.status_code == 401
print("Profile Response:", profile_response.content)

# Test Accessing User Profile
profile_response = requests.post(
    f"{BASE_URL}/users/user", json={"id": "4ad5e546-8bd0-46d5-82d8-88925ddf9331"}
)
assert logout_response.status_code == 200
print("Profile Response:", profile_response.json())
