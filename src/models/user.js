"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const debug = require("debug")("app:models/user");
const mongoose = require("mongoose");
const { Schema, Error } = mongoose;

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }
});

// ##### DO NOT USE ARROW FUNCTIONS FOR MONGOOSE METHODS #####
// See docs: https://mongoosejs.com/docs/guide.html#methods

userSchema.methods.verifyPassword = function (password) {
  debug("verify password");

  return bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = async function (password) {
  debug("hash password");

  if (!password) {
    throw new Error(400, "password required");
  }

  const hash = await bcrypt.hash(password, 10);
  if (!hash) {
    throw new Error("failed to hash password");
  } else {
    this.password = hash;
  }

  return this;
};

userSchema.methods.generateToken = function () {
  debug("generate token");
  return jwt.sign(
    { sub: this.id, username: this.username },
    process.env.APP_SECRET
  );
};

const User = mongoose.models.user || mongoose.model("user", userSchema);

// does not need to be an instance method
User.createUser = function (body) {
  debug("create user", body);

  const { password, ...user } = body;

  return new User(user).hashPassword(password).then(user => user.save());
};

module.exports = User;
