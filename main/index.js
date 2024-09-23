// IMPORTING DEPENDENCIES
const { prompt } = require("inquirer");
const db = require("./db");
//const { default: Choices } = require("inquirer/lib/objects/choices");

// INVOKING PRESENT QUESTIONS FUNCTION
presentQuestions();

// PROMPTS FOR USER INPUT
function presentQuestions() {
  prompt([
    {
      type: "list",
      name: "question",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all departments",
          value: "View all departments",
        },
        {
          name: "Add a department",
          value: "Add a department",
        },
        {
          name: "Delete a department",
          value: "Delete a department",
        },
        {
          name: "View all roles",
          value: "View all Roles",
        },
        {
          name: "Add a role",
          value: "Add a role",
        },
        {
          name: "Delete a role",
          value: "Delete a role",
        },
        {
          name: "View all employees",
          value: "View all employees",
        },
        {
          name: "View all employees by manager",
          value: "View all employees by manager",
        },
        {
          name: "View all employees by department",
          value: "View all employees by department",
        },
        {
          name: "Add an employee",
          value: "Add an employee",
        },
        {
          name: "Update an employee role",
          value: "Update an employee role",
        },
        {
          name: "Update an employee manager",
          value: "Update an employee manager",
        },
        {
          name: "Delete an employee",
          value: "Delete an employee",
        },
        {
          name: "View Total Salary by Department",
          value: "View Total Salary by Department",
        },
        {
          name: "Exit",
          value: "Exit",
        },
      ],
    },
  ])
    // CALLING FUNCTIONS BASED ON CHOICES
    .then((res) => {
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
        case "View Total Salary by Department":
          viewTotalSalaryByDepartment();
          break;
        default:
          end();
      }
    });

  // FUNCTIONS TO VIEW ALL DEPARTMENTS, ROLES, AND EMPLOYEES ETC...
  // VIEW ALL DEPARTMENTS
  function viewAllDepartments() {
    db.viewAllDepartments().then(({ rows }) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    });
  }
  // EACH OF THESE FUNCTIONS ESSENTIALLY FETCH DATA FROM THE DATABASE AND PRINTS IT TO THE CONSOLE IN A READABLE TABLE FORMAT
  // ADD DEPARTMENT
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
  // DELETE DEPARTMENT
  function deleteDepartment() {
    db.viewAllDepartments().then(({ rows }) => {
      let departments = rows;
      const deptChoices = departments.map((id, name) => ({
        name: name,
        value: id,
      }));
    });

    prompt({
      type: "list",
      name: "deptId",
      message:
        "What department would you like to delete? (Note: This will delete all roles and employees in that department)",
      choices: deptChoices,
    }).then((res) => {
      let dept = res;
      db.deleteDepartment(dept)
        .then(() => console.log(`${dept.name} has been deleted`))
        .then(() => loadMainPrompts());
    });
  }
  // VIEW ALL ROLES
  function viewAllRoles() {
    db.viewAllRoles().then(({ rows }) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    });
  }
  // ADD ROLE
  function addRole() {
    db.viewAllDepartments().then(({ rows }) => {
      let departments = rows;
      const deptChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      prompt([
        {
          name: "title",
          message: "What is the title of the role?",
        },
        {
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department is the role for?",
          choices: deptChoices,
        },
      ]).then((role) => {
        db.createRole(role)
          .then(() =>
            console.log(`${role.title} has been added to the database`)
          )
          .then(() => loadMainPrompts());
      });
    });
  }
  // DELETE ROLE
  function deleteRole() {
    db.viewAllRoles().then(({ rows }) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));
      prompt({
        type: "list",
        name: "role_id",
        message:
          "Which role would you like to delete?(Note: This will delete all employees in that role)",
        choices: roleChoices,
      }).then((res) => {
        db.deleteRole(res.role_id)
          .then(() => console.log(`The role has been deleted`))
          .then(() => loadMainPrompts());
      });
    });
  }
  // VIEW ALL EMPLOYEES
  function viewAllEmployees() {
    db.viewAllEmployees()
      .then(({ rows }) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => loadMainPrompts());
  }
  // VIEW ALL EMPLOYEES BY MANAGER
  function viewAllEmployeesByManager() {
    db.viewAllEmployees().then(({ rows }) => {
      let managers = rows;
      // CREATES AN ARRAY OF MANAGERS WITH THEIR ID, FIRST NAME, AND LAST NAME
      const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      }));
      // PROMPTS USER TO CHOOSE WHICH MANAGER'S EMPLOYEES THEY WANT TO VIEW. THE ANSWER IS STORED IN MANAGER_ID
      prompt([
        {
          type: "list",
          name: "manager_id",
          message: "Which employee's manager would you like to see?",
          choices: managerChoices,
        },
      ])
        //HANDLES THE EMPLOYEES RETURNED BY THE PREVIOUS DB CALL
        .then((res) => db.viewAllEmployeesByManager(res.managerID))
        .then(({ rows }) => {
          let employees = rows;
          console.log("\n");
          // IF NO EMPLOYEES ARE FOUND WITH THAT MANAGER ID, THE FOLLOWING MESSAGE IS DISPLAYED
          if (employees.length === 0) {
            console.log("No employees found with that manager ID");
          } else {
            console.table(employees);
          }
        })
        .then(() => loadMainPrompts());
    });
  }
  // VIEW ALL EMPLOYEES BY DEPARTMENT
  function viewAllEmployeesByDepartment() {
    db.viewAllDepartments().then(({ rows }) => {
      let departments = rows;
      const deptChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id,
      }));

      prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department's employees would you like to see?",
          choices: deptChoices,
        },
      ])
        .then((res) => db.viewAllEmployeesByDepartment(res.departmentID))
        .then(({ rows }) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => loadMainPrompts());
    });
  }
  // ADD AN EMPLOYEE
  function addEmployee() {
    prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
      },
      // USER RESPONSE HANDLING
    ]).then((res) => {
      let first_name = res.first_name;
      let last_name = res.last_name;
      // FETCH ALL ROLES FROM DATABASE TO ASSIGN TO THE EMPLOYEE
      db.viewAllRoles().then(({ rows }) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        prompt({
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices,
        }).then((res) => {
          let roleId = res.roleId;
          // FETCH ALL MANAGERS FROM DATABASE TO ASSIGN TO THE EMPLOYEE
          db.viewAllEmployees().then(({ rows }) => {
            let employees = rows;
            const managerChoices = employees.map(
              ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
              })
            );
            // ADDS "NONE" AS A MANAGER CHOICE FOR THE EMPLOYEE CREATED
            managerChoices.unshift({ name: "None", value: null });
            prompt({
              type: "list",
              name: "managerId",
              message: "Who is the employee's manager?",
              choices: managerChoices,
            }).then((res) => {
              // CONSTRUCTS EMPLOYEE OBJECT FROM USER INPUT
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: first_name,
                last_name: last_name,
              };
              // ADDS EMPLOYEE TO DATABASE
              db.createEmployee(employee)
                .then(() =>
                  console.log(
                    `${first_name} ${last_name} has been added to the database`
                  )
                )
                // RETURNS TO MAIN PROMPT FOR THE USER FOR FURTHER OPERATIONS
                .then(() => loadMainPrompts());
            });
          });
        });
      });
    });
  }
  // DELETE AN EMPLOYEE
  function deleteEmployee() {
    db.viewAllEmployees().then(({ rows }) => {
      let employees = rows;
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to delete?",
          choices: employeeChoices,
        },
      ])
        .then((res) => db.deleteEmployee(res.employeeId))
        .then(() => console.log("Employee has been deleted"))
        .then(() => loadMainPrompts());
    });
  }
  // UPDATE AN EMPLOYEE ROLE
  function updateEmployeeRole() {
    db.viewAllEmployees().then(({ rows }) => {
      let employees = rows;
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee role do you want to update?",
          choices: employeeChoices,
        },
      ]).then((res) => {
        let employeeId = res.employeeId;
        db.viewAllRoles().then(({ rows }) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          prompt([
            {
              type: "list",
              name: "roleId",
              message: "What is the employee's new role?",
              choices: roleChoices,
            },
          ]).then((res) => {
            db.updateEmployeeRole(employeeId, res.roleId)
              .then(() => console.log("Employee role has been updated"))
              .then(() => loadMainPrompts());
          });
        });
      });
    });
  }
  // UPDATE AN EMPLOYEE MANAGER
  function updateEmployeeManager() {
    db.viewAllEmployees().then(({ rows }) => {
      let employees = rows;
      const employeeChoices = employees.map(
        ({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        })
      );
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee manager do you want to update?",
          choices: employeeChoices,
        },
      ]).then((res) => {
        let employeeId = res.employeeId;
        db.viewAllManagers(employeeId).then(({ rows }) => {
          let managers = rows;
          const managerChoices = managers.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );
          prompt([
            {
              type: "list",
              name: "managerId",
              message: "Who is the employee's new manager?",
              choices: managerChoices,
            },
          ]).then((res) => {
            db.updateEmployeeManager(employeeId, res.managerId)
              .then(() => console.log("Employee manager has been updated"))
              .then(() => loadMainPrompts());
          });
        });
      });
    });
  }

  function viewTotalSalaryByDepartment() {
    db.viewTotalSalaryByDepartment()
      .then(({ rows }) => {
        console.log("\n");
        console.table(rows);
      })
      .then(() => loadMainPrompts());
  }
  // EXIT THE PROGRAM
  function end() {
    console.log("See you next time!");
    process.exit();
  }
}
