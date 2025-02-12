CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS quests CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- TODO: add description
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rating NUMERIC(5,2),
    user_image TEXT
);

CREATE TABLE IF NOT EXISTS quests (
    id BIGSERIAL PRIMARY KEY,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    number_of_tasks INTEGER NOT NULL,
    duration INTEGER,
    duration INTEGER,
    rating NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quest_id BIGINT NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    id BIGSERIAL PRIMARY KEY,
    quest_id BIGINT NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    task_data JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quest_id BIGINT NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    rating NUMERIC(5,2) CHECK (rating >= 0 AND rating <= 5)
);

-- Function to update author rating
CREATE OR REPLACE FUNCTION update_author_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET rating = COALESCE(
        (SELECT AVG(rating) FROM quests WHERE author_id = NEW.author_id), 0)
    WHERE id = NEW.author_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update author rating when a quest's rating changes
CREATE TRIGGER trigger_update_author_rating
AFTER UPDATE OF rating ON quests
FOR EACH ROW EXECUTE FUNCTION update_author_rating();

-- Function to update quest rating
CREATE OR REPLACE FUNCTION update_quest_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE quests
    SET rating = COALESCE(
        (SELECT AVG(rating) FROM sessions WHERE quest_id = NEW.quest_id), 0)
    WHERE id = NEW.quest_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update quest rating when a session is inserted, updated, or deleted
CREATE TRIGGER trigger_update_quest_rating
AFTER INSERT OR UPDATE OR DELETE ON sessions
FOR EACH ROW EXECUTE FUNCTION update_quest_rating();
