require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// connect to database
require("./lib/db/pg");

const { baseRouter } = require("./routes/index");
app.use(cors());
app.use(express.json());
app.use("/api", baseRouter);

app.listen(process.env.PORT, function () {
  console.log("Listening on port " + process.env.PORT);
});
