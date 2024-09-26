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
  createDepartment(department) {
    return this.query("INSERT INTO department (name) VALUES ($1)", [
      // THE $1 IS A PLACEHOLDER FOR A PARAMETERIZED QUERY
      department.name,
    ]);
  }
  deleteDepartment(departmentId) {
    return this.query("DELETE FROM department WHERE id = $1", [departmentId]);
  }
  // FUNCITON TO VIEW ALL EMPLOYEES PER ACCEPTANCE CRITERIA AND JOIN WITH ROLE TABLE AND DEPARTMENT TABLE
  viewAllEmployees() {
    return this.query(
      //SQL STATEMENT
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
    );
  }
  // VIEW ALL EMPLOYEES BY MANAGERS
  viewAllEmployeesByManager(managerId) {
    return this.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = $1;",
      [managerId]
    );
  }
  // VIEW ALL EMPLOYEES BY DEPARTMENT
  viewAllEmployeesByDepartment(departmentId) {
    return this.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = $1;",
      [departmentId]
    );
  }
  // ADDING EMPLOYEES
  addEmployee(employee) {
    const { first_name, last_name, role_id, manager_id } = employee;
    return this.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, role_id, manager_id]
    );
  }
  // REMOVING EMPLOYEES WITH ID'S
  deleteEmployee(employeeId) {
    return this.query("DELETE FROM employee WHERE id = $1", [employeeId]);
  }
  // UPDATING EMPLOYEE ROLE
  updateEmployeeRole(employeeId, roleId) {
    return this.query("UPDATE employee SET role_id = $1 WHERE id = $2", [
      roleId,
      employeeId,
    ]);
  }
  // UPDATING EMPLOYEE MANAGERS
  updateEmployeeManager(employeeId, managerId) {
    return this.query("UPDATE employee SET manager_id = $1 WHERE id = $2", [
      managerId,
      employeeId,
    ]);
  }
  // FIND ALL MANAGERS
  viewAllManagers(employeeId) {
    return this.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != $1",
      [employeeId]
    );
  }
  // FUNCTION TO VIEW ALL ROLES PER ACCEPTANCE CRITERIA
  viewAllRoles() {
    return this.query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  // ADDING ROLES
  createRole(role) {
    const { title, salary, department_id } = role;
    return this.query(
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
      [title, salary, department_id]
    );
  }
  // DELETING ROLES
  deleteRole(roleId) {
    return this.query("DELETE FROM role WHERE id = $1", [roleId]);
  }
  // FINDING DEPARTMENTS SALARIES
  viewTotalSalaryByDepartment() {
    return this.query(
      // SELECTING DEPT ID, NAME AND THEN CALCULATE THE TOTAL SALARY FOR EACH ROLE, THEN JOINS ROLE TABLE WITH EMPLOYEE TABLE BASED ON ROLE ID
      "SELECT department.id, department.name, SUM(role.salary) AS total_salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }
}

module.exports = new DATABASE();
