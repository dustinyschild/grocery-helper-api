const { Router } = require("express");
const { userRouter } = require("./user");

const baseRouter = Router();

baseRouter.get("/status", (req, res) => {
  console.log("status is good");

  res.sendStatus(200);
});

baseRouter.use("/user", userRouter);

module.exports = { baseRouter };
