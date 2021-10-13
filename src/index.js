require("dotenv").config();
const express = require("express");
const cors = require("cors");
const debug = require("debug")("app:server");

const app = express();

// connect to database
require("./db/pg");
require("./db/mongoose");

const { baseRouter } = require("./routes/index");
app.use(cors());
app.use(express.json());
app.use("/api", baseRouter);

app.listen(process.env.PORT, function () {
  debug("Listening on port " + process.env.PORT);
});

module.exports = app;
