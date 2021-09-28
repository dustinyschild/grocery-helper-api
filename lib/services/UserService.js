const pool = require("../db/pg");

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
      WHERE username = $1
    `,
    [username]
  );
};

module.exports = { getUserById, getUserByUsername };
