// IMPORTING THE CONNECTION TO THE DATABASE
const pool = require("./connection");

// CREATING A CLASS CALLED DATABASE TO INTERACT WITH THE DB USING A CONNECTION POOL
class DATABASE {
  constructor() {}
  // QUERY METHOD TO EXECUTE SQL QUERY ASYNCHRONOUSLY AND HANDLE CONNECTION MANAGEMENT
  async query(sql, args = []) {
    const user = await pool.connect(); // AWAIT USED TO PAUSE EXECUTION UNTIL THE PROMISE RETURNED BY POOL.CONNECT RESOLVES SO CONNECTION IS MADE BEFORE PROCEEDING
    try {
      // TRY BLOCK EXECUTES THE SQL QUERY USING THE CONNECTED USER THEN RETURNING RESPONSE FROM QUERY
      return await user.query(sql, args);
    } finally {
      user.release();
    } // FINALLY BLOCK USING RELEASE METHOD TO RELEASE THE USER BACK INTO THE POOL TO ENSURE CONNECTION IS CLOSED
  }
  // FUNCTION TO VIEW ALL DEPARTMENTS PER ACCEPTANCE CRITERIA
  viewAllDepartments() {
    return this.query(
      // CALLS THE QUERY METHOD FROM THE DATABASE CLASS AND RETURNS RESULT
      "SELECT department.id, department.name FROM department"
    );
  }
  // FUNCITON TO VIEW ALL EMPLOYEES PER ACCEPTANCE CRITERIA
  viewAllEmployees() {
    return this.query(
      //SQL STATEMENT
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id;"
    );
  }
  // FUNCTION TO VIEW ALL ROLES PER ACCEPTANCE CRITERIA
  viewAllRoles() {
    return this.query(
      "SELECT role.id, role.job_title, role.salary FROM role LEFT JOIN department on role.department_id = department.id, department.name AS department; "
    );
  }
}
