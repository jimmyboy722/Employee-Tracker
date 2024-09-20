const { prompts } = require("inquirer");
const db = require("./db");
const { default: Choices } = require("inquirer/lib/objects/choices");

// PROMPTS FOR USER INPUT
function presentQuestions() {
  prompts([
    {
      type: "list",
      name: "question",
      message: "What would you like to do?",
      Choices: [
        {
          name: "View all departments",
          value: "View Departments",
        },
        {
          name: "Add a department",
          value: "Add_Department",
        },
        {
          name: "Delete a department",
          value: "Delete_Department",
        },
        {
          name: "View all roles",
          value: "View_Roles",
        },
        {
          name: "Add a role",
          value: "Add_Role",
        },
        {
          name: "Delete a role",
          value: "Delete_Role",
        },
        {
          name: "View all employees",
          value: "View_Employees",
        },
        {
          name: "View all employees by manager",
          value: "View_Employees_By_Manager",
        },
        {
          name: "View all employees by department",
          value: "View_Employees_By_Department",
        },
        {
          name: "Add an employee",
          value: "Add_Employee",
        },
        {
          name: "Update an employee role",
          value: "Update_Employee_Role",
        },
        {
          name: "Update an employee manager",
          value: "Update_Employee_Manager",
        },
        {
          name: "Delete an employee",
          value: "Delete_Employee",
        },
        {
          name: "Exit",
          value: "Exit",
        },
      ],
    },
  ]);
}
// CALLING FUNCTIONS BASED ON CHOICES
presentQuestions().then((res) => {
  let choice = res.question;
  switch (choice) {
    case "View all departments":
      viewAllDepartments();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Delete a department":
      deleteDepartment();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "Add a role":
      addRole();
      break;
    case "Delete a role":
      deleteRole();
      break;
    case "View all employees":
      viewAllEmployees();
      break;
    case "View all employees by manager":
      viewAllEmployeesByManager();
      break;
    case "View all employees by department":
      viewAllEmployeesByDepartment();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee role":
      updateEmployeeRole();
      break;
    case "Update an employee manager":
      updateEmployeeManager();
      break;
    case "Delete an employee":
      deleteEmployee();
      break;
    default:
      exit();
  }
});

// FUNCTIONS TO VIEW ALL DEPARTMENTS, ROLES, AND EMPLOYEES ETC...
function viewAllDepartments() {
  db.viewAllDepartments().then(({ rows }) => {
    let departments = rows;
    console.log("\n");
    console.table(departments);
  });
}
// EACH OF THESE FUNCTIONS ESSENTIALLY FETCH DATA FROM THE DATABASE AND PRINTS IT TO THE CONSOLE IN A READABLE TABLE FORMAT
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the title of the department?",
    },
  ]).then((res) => {
    let dept = res;
    db.createDepartment(dept)
      .then(() => console.log(`${dept.name} has been added to the database`))
      .then(() => loadMainPrompts());
  });
}
function viewAllEmployees() {
  db.viewAllEmployees().then((res) => {
    console.table(res);
  });
}
