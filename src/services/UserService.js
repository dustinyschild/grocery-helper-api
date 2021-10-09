const pool = require("../db/pg");
const { readFile } = require("fs").promises;
const { getQuery } = require("../utils/file");

const addUser = async ({ username, email, password_hash }) => {
  const sqlQuery = await getQuery("/sql/add_user.pgsql");

  return pool.query(sqlQuery, [username, email, password_hash]);
};

const getUserById = async userId => {
  const sqlQuery = await getQuery("/sql/get_user_by_id.pgsql");

  const result = await pool.query(sqlQuery, [userId]);

  return result.rows[0];
};

const getUserByUsername = async username => {
  const sqlQuery = readFile(__dirname + "/sql/get_user_by_username.sql").then(
    buffer => buffer.toString()
  );

  const result = await pool.query(sqlQuery, [username]);

  return result.rows[0];
};

module.exports = { addUser, getUserById, getUserByUsername };
