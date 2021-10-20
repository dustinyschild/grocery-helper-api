const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const debug = require("debug")("test:user");

const app = require("../src/index");
const User = require("../src/models/user");
const request = require("supertest")(app);

describe("User", function () {
  const sampleUser = {
    username: "xkcd",
    email: "xkcd@example.com",
    password: "correct horse battery staple"
  };

  describe("registration", async function () {
    it("should create a new user", async function () {
      return request
        .post("/api/user")
        .send(sampleUser)
        .expect(201)
        .expect(res => {
          debug(res);
          expect(
            jwt.verify(res.text, process.env.APP_SECRET).username
          ).to.equal(sampleUser.username);
        });
    });

    after(async function () {
      const user = await User.findOne({ username: sampleUser.username });

      user.remove({});
    });
  });

  describe("login", async function () {
    before(async function () {
      await User.createUser(sampleUser);
    });

    it("should return a token", async function () {
      return request
        .get("/api/user/token")
        .auth(sampleUser.username, sampleUser.password)
        .expect(200)
        .expect(res => {
          expect(
            jwt.verify(res.text, process.env.APP_SECRET).username
          ).to.equal(sampleUser.username);
        });
    });

    after(async function () {
      const user = await User.findOne({ username: sampleUser.username });

      user.remove({});
    });
  });

  describe("GET", async function () {
    let testUser;
    let token;

    before(async function () {
      const { id, username, email, generateToken } = await User.createUser(
        sampleUser
      );

      token = generateToken();
      testUser = { id, username, email };
    });

    it("should return a user object", async function () {
      return request
        .get("/api/user/" + testUser.id)
        .auth(token, { type: "bearer" })
        .expect(200)
        .expect(res => {
          expect(res.body).to.deep.equal(testUser);
        });
    });

    after(async function () {
      const user = await User.findOne({ username: sampleUser.username });

      user.remove({});
    });
  });
});
