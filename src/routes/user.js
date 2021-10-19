const { Router } = require("express");
const basicAuth = require("../middleware/basic-auth");
const { register, getToken, getUser } = require("../controllers/user");

const userRouter = Router();

userRouter.post("/", register);

userRouter.get("/token", basicAuth, getToken);

userRouter.get("/:id", /* bearerAuthMiddleware here */ getUser);

module.exports = { userRouter };
