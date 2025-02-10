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
  "id": "uuid",
  "email": "user@example.com",
  "username": "user123",
  "rating": "4.5",
  "user_image": "<svg>...</svg>",
}
~~~

+ completed/created quests
title
description
rating
task_count
time_limit

### 7. ...

Endpoint: /api/create_quest

Headers: Requires authentication

Request Body:

~~~json
{
  quest: {
    title:
    description:
    duration:
  };
  task: [
    { },
    ...
  ];
}
~~~

### 8. ...

Endpoint: /api/finish_quest

Headers: Requires authentication


~~~json
{
  quest_id
}
~~~

### 8. ...

Endpoint: /api/finish_quest

Headers: Requires authentication

~~~json
{
  quest_id
}
~~~


### 8. ...

Endpoint: /api/leave_review

Headers: Requires authentication

~~~json
{
  quest_id
  rating
  comment
}
~~~



# Notes

All authentication-related endpoints require JSON requests.

Protected routes require the user to be logged in.

The API follows RESTful principles with clear naming conventions.
