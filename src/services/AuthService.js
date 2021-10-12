const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const debug = require("debug")("app:auth");

const hashPassword = async password => {
  debug("hashing password");

  if (!password) {
    return reject(createError(400, "password required"));
  }

  await bcrypt.hash(password, 10).then((err, result) => {
    if (err) throw new Error(err);

    return result;
  });
};

const comparePasswords = async (password, password_hash) => {
  debug("verify password");
  await bcrypt.compare(password, password_hash).then((err, result) => {
    if (err) throw new Error(err);

    return result;
  });
};

const sign = payload => {
  debug("generating token");
  // setting 2 hour expiration, this should be lowered when refresh tokens are implemented
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "2h" });
};

module.exports = { hashPassword, comparePasswords, sign };
