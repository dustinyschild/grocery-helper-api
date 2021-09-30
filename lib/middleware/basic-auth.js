const debug = require("debug")("app:middleware:basic-auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Authorization header not provided.");
  }

  const [type, data] = authHeader.split(" ");
  if (type !== "Basic") {
    throw new Error(
      "Incorrect authorization type provided. Basic auth header required."
    );
  }

  const decoded = Buffer.from(data, "base64").toString();

  const [username, password] = decoded.split(":");
  if (!username || !password) {
    throw new Error("Invalid credentials.");
  }

  res.locals.auth = { username, password };

  debug({ username, password });
  next();
};
