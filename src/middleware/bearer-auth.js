const debug = require("debug")("app:middleware:basic-auth");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  debug("validating token");

  const authHeader = req.header("Authorization");
  const [type, token] = authHeader.split(" ");

  if (type?.toLowerCase() !== "bearer") {
    throw new Error(
      "Incorrect auth type provided, expected Bearer token authorization"
    );
  }

  const isValid = jwt.verify(token, process.env.APP_SECRET);

  if (!isValid) {
    throw new Error("Invalid credentials provided");
  }

  next();
};
