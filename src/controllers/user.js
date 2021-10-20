const User = require("../models/user");
const debug = require("debug")("app:user");

const register = async (req, res, next) => {
  debug("register new user");
  const { username, email, password } = req.body;

  User.createUser({ username, email, password })
    .then(user => user.generateToken())
    .then(token => res.status(201).send(token))
    .catch(next);
};

const getUser = async (req, res, next) => {
  debug("get user data");

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error("User not found");
  }

  res.send({ id: user.id, username: user.username, email: user.email });
};

const getToken = async (req, res) => {
  debug("GET /api/user/token");

  const { username, password } = res.locals.auth;

  debug("validating user");

  const user = await User.findOne({ username }).catch(err => new Error(err));

  if (!user) {
    throw new Error("user not found");
  }

  const isValidPassword = user.verifyPassword(password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials.");
  }

  const token = user.generateToken();

  res.send(token);
};

module.exports = { register, getToken, getUser };
