const { getQuery } = require("../../src/utils/file");
require("dotenv").config({
  path: [__dirname, "../.env.test"].join("/")
});

const debug = require("debug")("test:login");
const pool = require("../../src/db/pg");

describe("User login", async function () {
  before(async function () {
    console.log("Setting up environment...");
    debug("test debug");

    const sqlSetup = await getQuery("sql/setup_db.pgsql");

    return pool.query(sqlSetup);
  });

  it("should return token", async function () {
    console.log("Running test");

    const users = await pool.query("select * from users");
    console.log(users);
  });

  after(function () {
    console.log("Testing concluded.");
  });
});
