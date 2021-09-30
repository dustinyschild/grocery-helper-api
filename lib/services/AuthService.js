const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const debug = require("debug")("app:auth");

const comparePasswords = async (password, password_hash) => {
  debug("verifying password");
  await bcrypt.compare(password, password_hash).then((err, result) => {
    if (err) throw new Error(err);

    return result;
  });
};

const sign = (payload) => {
  debug("generating token");
  // setting 2 hour expiration, this should be lowered when refresh tokens are implemented
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "2h" });
};

module.exports = { comparePasswords, sign };
