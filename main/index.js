const { prompts } = require("inquirer");
const db = require("./db");
const { default: Choices } = require("inquirer/lib/objects/choices");

// PROMPTS FOR USER INPUT
function init() {
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
          name: "View all roles",
          value: "View_Roles",
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
          name: "Add a department",
          value: "Add_Department",
        },
        {
          name: "Add a role",
          value: "Add_Role",
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
          name: "Delete a department",
          value: "Delete_Department",
        },
        {
          name: "Delete a role",
          value: "Delete_Role",
        },
        {
          name: "Exit",
          value: "Exit",
        },
      ],
    },
  ]);
}
