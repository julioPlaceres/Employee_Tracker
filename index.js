// Dependencies
const { application } = require("express");
const inquirer = require("inquirer");
const { promise } = require("./db/connection");
const db = require("./db/queries");

// variables
var roleArray = [];
var managerArray = [];
var employeeArray = [];

mainMenu();

// Main menu of the app
function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "optionsList",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add a Role",
                "View All departments",
                "Add departments",
                "Quit"
            ]
        }
    ]).then(function (response) {
        // Switch Case that will trigger user choices
        switch (response.optionsList) {
            case "View All Employees":
                showEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "Add a Role":
                addRole();
                break;

            case "View All departments":
                viewAllDepartments();
                break;

            case "Add departments":
                addDepartments();
                break;

            case "Quit":
                break;
        }
    })
}

// See All Employees 
async function showEmployees() {
    let employees = await db.displayEmployees();
    // Add spaces before and after
    console.table(employees);
    mainMenu();
}

// Adds Employees to the database 
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter employee first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter employee last name "
        },
        {
            name: "role",
            type: "list",
            message: "Which role would you like to assign? ",
            choices: getRoles()
        },
        {
            name: "manager",
            type: "list",
            message: "Whats their managers name?",
            choices: getManager()
        }
    ]).then(function (response) {
        // Increase index by 1 since array is 0 index based
        var roleId = roleArray.indexOf(response.role) + 1;
        var managerId = response.manager;

        db.addEmployee(response.firstname, response.lastname, managerId, roleId);
        mainMenu();
    })
}

// Returns an Array of Roles that are used by the inquirer as choices
function getRoles() {
    selectRole();
    return roleArray;
}

// Query the db to get the role values and add them to an array
async function selectRole() {
    let roles = await db.chooseRole();
    for (var i = 0; i < roles.length; i++) {
        roleArray.push(roles[i].title);
    }
}

// Returns a array of managers names to be used by the inquirer as choices
function getManager() {
    selectManager();
    return managerArray;
}

// Query the db to get the managers names and add them to an array
async function selectManager() {
    let managerRole = await db.chooseManager();

    for (var i = 0; i < managerRole.length; i++) {
        let managerObj = { name: managerRole[i].first_name, value: managerRole[i].id }
        managerArray.push(managerObj);
    }
}

// Will update Employee Role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "employees",
            type: "list",
            message: "Whats their employee name?",
            choices: getEmployeeList()
        }
    ]).then(function (response) {
        db.displayEmployees();
        mainMenu();
    })
}

function getEmployeeList() {
    selectEmployees();
    console.log(employeeArray);
    return employeeArray;
}

async function selectEmployees() {
    let employeeData = await db.chooseEmployee();

    for (var i = 0; i < employeeData.length; i++) {
        let employeeObj = { name: employeeData[i].first_name, value: employeeData[i].id }
        employeeArray.push(employeeObj);
    }
}

// See All Roles 
async function viewAllRoles() {
    let roles = await db.chooseRole();
    // Add spaces before and after
    console.table(roles);
    mainMenu();
}

function addRole(){
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role name?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "deptId",
            type: "input",
            message: "What is the dept Id?"
        }
    ]).then(function (response) {
        db.addRole(response.title, response.salary, response.deptId);
        viewAllRoles();
        mainMenu();
    });
}

async function viewAllDepartments() {
    let dept = await db.displaydepartments();
    console.table(dept);
    mainMenu();
}

function addDepartments() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the department name?"
        }
    ]).then(function (response) {
        db.addDepartment(response.department);
        db.displaydepartments();
        mainMenu();
    });
}