DROP TABLE IF EXISTS users;

CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR(256) UNIQUE NOT NULL,
	email VARCHAR(256) UNIQUE NOT NULL,
	email_confirmed bool DEFAULT false,
	password_hash VARCHAR NOT NULL,
	last_login_date TIMESTAMP DEFAULT NOW(),
	created_date TIMESTAMP DEFAULT NOW()
);
