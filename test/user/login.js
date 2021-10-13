// const { getQuery } = require("../../src/utils/file");
require("dotenv").config({
  path: [".env.test"].join("/")
});

// describe("User login", async function () {
//   before(async function () {
//     console.log("Setting up environment...");
//     debug("test debug");

//     const sqlSetup = await getQuery("sql/setup_db.pgsql");

//     return pool.query(sqlSetup);
//   });

//   xit("should return token", async function () {
//     console.log("Running test");

//     const users = await pool.query("select * from users");
//     console.log(users);
//   });

//   after(function () {
//     console.log("Testing concluded.");
//   });
// });
