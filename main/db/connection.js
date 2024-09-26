// IMPORTING THE PG MODULE AND EXTRACTING THE POOL CLASS FOR INTERACTING WITH THE POSTGRESQL DATABASE//
const { Pool } = require("pg");
const dotenv = require("dotenv").config();

// CREATING NEW POOL CLASS/OBJECT //
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: "company",
  port: 5432,
});
// EXPORTING THE POOL INSTANCE
module.exports = pool;
