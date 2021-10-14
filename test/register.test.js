const app = require("../src/index");
const request = require("supertest")(app);

describe("User registration", async function () {
  it("should create a new user", async function () {
    // arrange
    // db connection already established
    // act
    request
      .post("/api/user")
      .send({
        username: "xkcd",
        email: "xkcd@example.com",
        password: "correct horse battery staple"
      })
      .expect(200);
    // assert
  });
});
