// IMPORTING THE PG MODULE AND EXTRACTING THE POOL CLASS FOR INTERACTING WITH THE POSTGRESQL DATABASE//
const { Pool } = require("pg");

// CREATING NEW POOL CLASS/OBJECT //
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: "company",
});
// EXPORTING THE POOL INSTANCE
module.exports = pool;
