const pool = require("../db/pg");

const addUser = ({ username, email, password_hash }) => {
  return pool.query(
    `
      INSERT INTO users (
        username
        , email
        , password_hash
      )
      VALUES (
        $1, $2, $3
      )
      RETURNING *
    `,
    [username, email, password_hash]
  );
};

const getUserById = async (userId) => {
  return pool.query(
    `
      SELECT
        user_id
        , username
        , email
        , email_confirmed
        , password_hash
        , last_login_date
        , created_date
      FROM users
      WHERE user_id = $1
    `,
    [userId]
  );
};

const getUserByUsername = async (username) => {
  const result = await pool.query(
    `
      SELECT
        user_id
        , username
        , email
        , email_confirmed
        , password_hash
        , last_login_date
        , created_date
      FROM users
      WHERE username = $1
    `,
    [username]
  );

  return result.rows[0];
};

module.exports = { addUser, getUserById, getUserByUsername };