"use strict";

const mongoose = require("mongoose");
const debug = require("debug")("app:mongodb");

mongoose.Promise = Promise;
mongoose.connection.db || mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
  debug("mongo connected");
});
mongoose.connection.on("error", err => {
  debug(err);
});
