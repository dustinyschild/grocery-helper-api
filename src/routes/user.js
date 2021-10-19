const { Router } = require("express");
const basicAuth = require("../middleware/basic-auth");
const bearerAuth = require("../middleware/bearer-auth");
const { register, getToken, getUser } = require("../controllers/user");

const userRouter = Router();

userRouter.post("/", register);

userRouter.get("/token", basicAuth, getToken);

userRouter.get("/:id", bearerAuth, getUser);

module.exports = { userRouter };
