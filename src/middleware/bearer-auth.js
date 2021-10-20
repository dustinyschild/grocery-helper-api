const jwt = require("jsonwebtoken");
const debug = require("debug")("app:middleware:basic-auth");

module.exports = async (req, res, next) => {
  debug("validating token");

  const authHeader = req.header("Authorization");
  const [type, token] = authHeader.split(" ");

  if (type?.toLowerCase() !== "bearer") {
    throw new Error(
      "Incorrect auth type provided, expected Bearer token authorization"
    );
  }

  const decoded = jwt.verify(token, process.env.APP_SECRET);
  debug(decoded);

  if (!decoded) {
    throw new Error("Invalid credentials provided");
  }

  next();
};
