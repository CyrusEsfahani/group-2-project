-- Drop the tables if they already exist
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Songs Table
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    songId VARCHAR(100) NOT NULL, -- External ID (from Spotify/Genius)
    trackName VARCHAR(255) NOT NULL,
    artistName VARCHAR(255) NOT NULL,
    albumName VARCHAR(255),
    imageUrl VARCHAR(255),
    playerUri VARCHAR(255)
);

-- Posts Table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    songId INT NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments Table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Optional: Add indexes for better performance on frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_songs_trackName ON songs(trackName);
CREATE INDEX idx_posts_rating ON posts(rating);