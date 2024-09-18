// IMPORTING POOL CLASS WITH REQUIRE METHOD //
const { Pool } = require("pg");

// CREATING NEW POOL CLASS/OBJECT //
const pool = new Pool({
  user: "postgres",
  password: "Highvibes516!",
  host: "localhost",
  database: "company",
});

module.exports = pool;
