-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables to reset the database
DROP TABLE IF EXISTS quests CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rating NUMERIC(5,2)
);

-- Create quests table
CREATE TABLE IF NOT EXISTS quests (
    id BIGSERIAL PRIMARY KEY,
    author_uuid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    number_of_task INTEGER,
    duration INTERVAL,
    tasks JSON,
    comments JSON,
    rating NUMERIC(5,2)
);
