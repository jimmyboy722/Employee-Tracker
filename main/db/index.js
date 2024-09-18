// IMPORTING THE CONNECTION TO THE DATABASE
const pool = require("./connection");

// CREATING A CLASS CALLED DATABASE TO INTERACT WITH THE DB USING A CONNECTION POOL
class DATABASE {
  constructor() {}
  // QUERY METHOD TO EXECUTE SQL QUERY ASYNCHRONOUSLY AND HANDLE CONNECTION MANAGEMENT
  async query(sql, args = []) {
    const USER = await pool.connect();
    try {
      const result = await user.query(sql, args);
      return result;
    } finally {
      user.release();
    }
  }
}
