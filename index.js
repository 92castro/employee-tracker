const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

//connection of database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_tracker_db",
  },
  console.log("---Connected to the employee_tracker_db database....---")
);

//function to start database
startPrompt();

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What will you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        name: "action",
      },
    ])
    .then((data) => {
      console.log(data);

      if (data.action === "View All Employees") {
        viewEmployees();
      }
      if (data.action === "Add Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the employees first name?",
              name: "firstName",
            },
            {
              type: "input",
              message: "What is the employees last name?",
              name: "lastName",
            },
            {
              type: "list",
              message: "What is the employees role?",
              choices: [
                { name: "Sales Lead", value: 1 },
                { name: "Salesperson", value: 2 },
                { name: "Lead Engineer", value: 3 },
                { name: "Software Engineer", value: 4 },
                { name: "Account Manager", value: 5 },
                { name: "Accountant", value: 6 },
                { name: "Legal Team", value: 7 },
                { name: "Lawyer", value: 8 },
              ],
              name: "role",
            },
            {
              type: "list",
              message: "Who is the employees manager?",
              choices: [
                { name: "Nina Williams", value: 1 },
                { name: "Marshall Law", value: 3 },
                { name: "Jin Kazama", value: 5 },
                { name: "Kazuya Mishima", value: 7 },
              ],
              name: "manager",
            },
          ])
          .then((data) => {
            db.query(
              `INSERT INTO employee_tracker_db.employee (employee_tracker_db.employee.first_name,employee_tracker_db.employee.last_name,employee_tracker_db.employee.role_id,employee_tracker_db.employee.manager_id)VALUES("${data.firstName}", "${data.lastName}", "${data.role}", "${data.manager}");`,
              function (err, res) {
                console.log(res);
                if (err) {
                  console.log(err);
                } else {
                  console.log("submitted");
                  addEmployees();
                }
              }
            );
          });
      }
      if (data.action === "Update Employee Role") {
        //init prompt if this is selected
        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employees role will you like to update?",
              choices: [
                { name: "Nina Williams", value: 1 },
                { name: "Bryan Fury", value: 2 },
                { name: "Marshall Law", value: 3 },
                { name: "Eddy Gordo", value: 4 },
                { name: "Jin Kazama", value: 5 },
                { name: "Ling Xiaoyu", value: 6 },
                { name: "Kazuya Mishima", value: 7 },
                { name: "Christie Monteiro", value: 8 },
              ],
              name: "eUpdate",
            },
            {
              type: "list",
              message: "Which new role will you like to assign to employee?",
              choices: [
                { name: "Sales Lead", value: 1 },
                { name: "Salesperson", value: 2 },
                { name: "Lead Engineer", value: 3 },
                { name: "Software Engineer", value: 4 },
                { name: "Account Manager", value: 5 },
                { name: "Accountant", value: 6 },
                { name: "Legal Team", value: 7 },
                { name: "Lawyer", value: 8 },
              ],
              name: "rUpdate",
            },
          ])
          .then((data) => {
            db.query(
              `UPDATE employee SET role_id="${data.rUpdate}" WHERE id="${data.eUpdate}"`,
              function (err, res) {
                console.log(res);
                if (err) {
                  console.log(err);
                } else {
                  console.log("success!");
                  updateEmployees();
                }
              }
            );
          });
      }
      if (data.action === "View All Roles") {
        viewRole(); //run this function
      }
      if (data.action === "Add Role") {
        //init prompt if this is selected
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the new role?",
              name: "newRole",
            },
            {
              type: "input",
              message: "What is the salary of the new role?",
              name: "rSalary",
            },
            {
              type: "list",
              message: "What department will the new role belong to?",
              choices: [
                { name: "Sales", value: 1 },
                { name: "Engineering", value: 2 },
                { name: "Finance", value: 3 },
                { name: "Legal", value: 4 },
              ],
              name: "rDept",
            },
          ])
          .then((data) => {
            db.query(
              `INSERT INTO role (title, salary, department_id) VALUES ("${data.newRole}", ${data.rSalary}, ${data.rDept})`,
              function (err, res) {
                console.log(res);
                if (err) {
                  console.log(err);
                } else {
                  console.log("success!");
                  addRole();
                }
              }
            );
          });
      }
      if (data.action === "View All Departments") {
        viewDept();
      }

      if (data.action === "Add Department") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the new department?",
              name: "newDept",
            },
          ])
          .then((data) => {
            db.query(
              `INSERT INTO department (name) VALUES ("${data.newDept}")`,
              function (err, res) {
                console.log(res);
                if (err) {
                  console.log(err);
                } else {
                  console.log("success!");
                  addDept();
                }
              }
            );
          });
      }
      if (data.action === "Quit") {
        quit();
      } else {
      }
      //list of functions
      function viewEmployees() {
        db.query(
          `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, department.name AS department, concat(manager.first_name, " ", manager.last_name) AS manager 
FROM role JOIN employee ON role.id = employee.role_id 
LEFT JOIN employee manager ON employee.manager_id = manager.id 
JOIN department ON department.id = role.department_id;`, //display chart when this is selected
          function (err, results) {
            console.table(results);
            startPrompt();
          }
        );
      }
      function addEmployees() {
        db.query("SELECT * FROM employee", function (err, results) {
          console.table(results);
          startPrompt();
        });
      }
      function addRole() {
        db.query(
          `SELECT role.title, role.id, role.salary, department.name FROM role
JOIN department ON role.department_id = department.id`,
          function (err, results) {
            console.table(results);
            startPrompt();
          }
        );
      }
      function updateEmployees() {
        db.query(
          `SELECT role.title, role.id, department.name as department, employee.first_name, employee.last_nameFROM role JOIN department ON role.department_id = department.idLEFT JOIN employee ON employee.id=role.id`,
          function (err, results) {
            console.table(results);
            startPrompt();
          }
        );
      }
      function viewRole() {
        db.query(
          `SELECT role.title, role.id, role.salary, department.name FROM role
JOIN department ON role.department_id = department.id`,
          function (err, results) {
            console.table(results);
            startPrompt();
          }
        );
      }
      function viewDept() {
        db.query("SELECT * FROM department", function (err, results) {
          console.table(results);
          startPrompt();
        });
      }
      function addDept() {
        db.query("SELECT * FROM department", function (err, results) {
          console.table(results);
          startPrompt();
        });
      }
      function quit() {
        console.table("---..Left database..---");
        //exit database
      }
    });
}
