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
    password VARCHAR(256),
    oauth_id VARCHAR(50)  UNIQUE,
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
    duration INTERVAL,
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

-- Function for recalculating the quest rating
CREATE OR REPLACE FUNCTION update_quest_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the quest rating if a non-NULL rating was passed to the quest
    IF NEW.rating IS NOT NULL THEN
        UPDATE quests
        SET rating = (
            SELECT ROUND(COALESCE(AVG(sessions.rating), 0), 2)
            FROM sessions
            WHERE sessions.quest_id = NEW.quest_id
        )
        WHERE id = NEW.quest_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for recalculating quest rating when changing/adding a session
CREATE TRIGGER trigger_update_quest_rating
AFTER INSERT OR UPDATE ON sessions
FOR EACH ROW EXECUTE FUNCTION update_quest_rating();

-- Function for recalculating quest author rating
CREATE OR REPLACE FUNCTION update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the author's rating if the quest rating has changed
    IF NEW.rating IS NOT NULL THEN
        UPDATE users
        SET rating = (
            SELECT ROUND(COALESCE(AVG(quests.rating), 0), 2)
            FROM quests
            WHERE quests.author_id = (
                SELECT author_id FROM quests WHERE id = NEW.quest_id
            )
        )
        WHERE id = (SELECT author_id FROM quests WHERE id = NEW.quest_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for recalculation of author's rating when changing quest rating
CREATE TRIGGER trigger_update_user_rating
AFTER UPDATE ON quests
FOR EACH ROW EXECUTE FUNCTION update_user_rating();