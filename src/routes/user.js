const { Router } = require("express");
const basicAuth = require("../middleware/basic-auth");
const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const debug = require("debug")("app:user");
const { register } = require("../controllers/user");

const userRouter = Router();

userRouter.post("/add", register);

userRouter.get("/token", basicAuth, async (req, res) => {
  debug("GET /api/user/token");

  const { username, password } = res.locals.auth;

  debug("validating user");
  const user = await UserService.getUserByUsername(username);

  const isValidPassword = await AuthService.comparePasswords(
    password,
    user.password_hash
  ).catch(err => new Error(err));

  if (!isValidPassword) {
    throw new Error("Invalid credentials.");
  }

  const token = AuthService.sign({ sub: user.username });

  res.json({ token });
});

userRouter.get("/:id", async (req, res) => {
  debug("GET /api/user/:id");

  await UserService.getUserById(req.params.id)
    .then(result => {
      if (result.rows.length === 0) {
        return res.sendStatus(404);
      }

      return res.json(result.rows[0]);
    })
    .catch(err => {
      debug(err.message);
      res.status = 500;
      res.json(err);
    });
});

module.exports = { userRouter };
