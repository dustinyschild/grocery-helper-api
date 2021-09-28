const { Router } = require("express");
const basicAuth = require("../lib/middleware/basic-auth");
const UserService = require("../lib/services/UserService");

const userRouter = Router();

userRouter.get("/token", basicAuth, (req, res) => {});

userRouter.get("/:id", async (req, res) => {
  await UserService.getUserById(req.params.id)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.sendStatus(404);
      }

      return res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error(err.message);
      res.json(err);
    });
});

module.exports = { userRouter };
