const { Router } = require("express");
const basicAuth = require("../middleware/basic-auth");
const UserService = require("../services/UserService");
const debug = require("debug")("app:user");
const { register, getToken } = require("../controllers/user");

const userRouter = Router();

userRouter.post("/", register);

userRouter.get("/token", basicAuth, getToken);

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
