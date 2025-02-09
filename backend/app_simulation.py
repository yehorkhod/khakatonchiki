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

cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'users';")
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
    "password": "securepassword"
}
register_response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
assert register_response.status_code == 200 or register_response.status_code == 409
print("Register Response:", register_response.content)

# Test Login
login_data = {
    "email": "test@example.com",
    "password": "securepassword"
}
session = requests.Session()
login_response = session.post(f"{BASE_URL}/auth/login", json=login_data)
assert login_response.status_code == 200
print("Login Response:", login_response.json())

# Test Accessing User Profile (Requires Authentication)
profile_response = session.get(f"{BASE_URL}/users/me")
assert profile_response.status_code == 200
print("Profile Response:", profile_response.json())

# Test Logout
logout_response = session.post(f"{BASE_URL}/auth/logout")
assert logout_response.status_code == 200
print("Logout Response:", logout_response.json())

# Test Accessing User Profile (After Logout)
profile_response = session.get(f"{BASE_URL}/users/me")
assert profile_response.status_code == 401
print("Profile Response:", profile_response.content)

# Test Accessing User Profile
profile_response = requests.post(f"{BASE_URL}/users/user", json={"id": "f5d4baa0-3f7f-4e0b-8f46-c0ea57db97d1"})
assert logout_response.status_code == 200
print("Profile Response:", profile_response.json())
