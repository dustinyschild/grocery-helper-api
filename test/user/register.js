// look up supertest for http testing

describe("User registration", async function () {
  before(async function () {
    console.log("Setting up environment...");
    debug("test debug");

    const sqlSetup = await getQuery("sql/setup_db.pgsql");

    return pool.query(sqlSetup);
  });

  it("should create a new user", async function () {
    console.log("Running test");

    const users = await pool.query("select * from users");
    console.log(users);
  });

  after(function () {
    console.log("Testing concluded.");
  });
});
