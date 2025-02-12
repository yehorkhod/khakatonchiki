# Launch The Server

To launch server run:

~~~bash
gunicorn src.api:app
~~~

# API Documentation

## Authentication Endpoints

### 1. User Login

Endpoint: POST /api/auth/login

Request Body:

~~~json
{
  "email": "user@example.com",
  "password": "securepassword",
  "remember": true,
}
~~~

Response:

~~~json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user123",
    "user_image": "<svg>...</svg>",
  },
}
~~~

### 2. User Registration

Endpoint: POST /api/auth/register

Request Body:

~~~json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "securepassword",
}
~~~

Response:

~~~json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user123",
    "user_image": "<svg>...</svg>",
  },
}
~~~

### 3. User Logout

Endpoint: POST /api/auth/logout

Headers: Requires authentication

Response:

~~~json
{
  "message": "Logout successful",
}
~~~

## Main API Endpoints

### 4. Home

Endpoint: GET /api/home

Response:

~~~json
{
  "message": "Welcome to the API!",
}
~~~

### 5. Get User Profile

Endpoint: GET /api/users/me

Headers: Requires authentication

Response:

~~~json
{
  "username": "user123",
  "email": "user@example.com",
  "rating": "4.5",
  "user_image": "<svg>...</svg>",
  "created_quests": [
    {
      "id": "12",
      "title": "lksdj",
      "description": "slkdj",
      "number_of_tasks": "3",
      "duration": "45",
      "rating": "4.5",
    }
  ],
  "completed_quests": [
    {
      "id": "12",
      "title": "lksdj",
      "description": "slkdj",
      "number_of_tasks": "3",
      "duration": "45",
      "rating": "4.5",
    }
  ]
}
~~~

### 6. Get User Information By Id

Endpoint: POST /api/users/user

Request Body:

~~~json
{
  "id": "uuid",
}
~~~

Response:

~~~json
{
  "username": "user123",
  "email": "user@example.com",
  "rating": "4.5",
  "user_image": "<svg>...</svg>",
  "created_quests": [
    {
      "id": "12",
      "title": "lksdj",
      "description": "slkdj",
      "number_of_tasks": "3",
      "duration": "45",
      "rating": "4.5",
    }
  ],
  "completed_quests": [
    {
      "id": "12",
      "title": "lksdj",
      "description": "slkdj",
      "number_of_tasks": "3",
      "duration": "30",
      "rating": "4.5",
    }
  ]
}
~~~

### 7. Create Quest

Endpoint: POST /api/create_quest

Headers: Requires authentication

Request Body:

~~~json
{
  "title": "title",
  "description": "description",
  "duration": "30",
  "tasks": [
    { "stuff_1": "stuff_1", ... },
    ...,
    { "stuff_n": "stuff_n", ... },
  ],
}
~~~

Response:

~~~json
{
  "message": "The quest and tasks have been created",
  "quest_id": "1"
}
~~~

### 8. Get Quest Info

Endpoint: POST /api/get_quest_info

Request Body:

~~~json
{
  "quest_id": "1",
}
~~~

Response:

~~~json
{
  "id": "1",
  "title": "title",
  "description": "slkdjf",
  "author_id": "432-",
  "author": "sldkf",
  "rating": "3",
  "duration": "32",
  "number_of_tasks": "4",
  "comments": [
    {"id": "3", "text": "lskdfj", "user_id": "324", "username": "milkymommy"},
    ...
  ]
}
~~~

### 9. Get Tasks

Endpoint: POST /api/get_tasks

Request Body:

~~~json
{
  "quest_id": "1",
}
~~~

Response:

~~~json
{
  "quest_id": "1",
  "tasks": [
    { "id": "32", "content": {...} },
    ...,
    { "id": "14", "content": {...} },
  ],
}
~~~

### 10. Get Top 10 Quests

Endpoint: GET /api/quests/top

Response:

~~~json
[
  {
    "id": "32",
    "author_id": "432-4",
    "author": "michaeljordan",
    "title": "joslkdf",
    "description": "slkdjf",
    "number_of_tasks": "3",
    "duration": "30",
    "rating": "3"
  },
  ...
]
~~~

### 11. Get Tasks

Endpoint: POST /api/finish_quest

Headers: Requires authentication

Request Body:

~~~json
{
  "quest_id": "1",
}
~~~

Response:

~~~json
{
  "message": "Session created successfully"
}
~~~

### 12. Get Tasks

Endpoint: POST /api/leave_review

Headers: Requires authentication

Request Body:

~~~json
{
  "quest_id": "1",
  "rating": "3",
  "comment": "..."
}
~~~

Response:

~~~json
{
  "message": "Session updated successfully"
}
~~~

# Notes

All authentication-related endpoints require JSON requests.

Protected routes require the user to be logged in.

The API follows RESTful principles with clear naming conventions.
