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
  "remember": true
}
~~~

Response:

~~~json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user123"
  }
}
~~~

### 2. User Registration

Endpoint: POST /api/auth/register

Request Body:

~~~json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "securepassword"
}
~~~

Response:

~~~json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "user123"
  }
}
~~~

### 3. User Logout

Endpoint: POST /api/auth/logout

Headers: Requires authentication

Response:

~~~json
{
  "message": "Logout successful"
}
~~~

## Main API Endpoints

### 4. Home

Endpoint: GET /api/home

Response:

~~~json
{
  "message": "Welcome to the API!"
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
  "rating": "4.5"
}
~~~

# Notes

All authentication-related endpoints require JSON requests.

Protected routes require the user to be logged in.

The API follows RESTful principles with clear naming conventions.
