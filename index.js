// Dependencies
const inquirer = require("inquirer");
const db = require("./db/queries");

// variables
roleArray = [];
managerArray = [];
employeeArray = [];

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

            case "View All departments":
                viewAllDepartments();
                break;

            case "Add departments":
                addDepartments();
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
        var roleId = roleArray.indexOf(response.role) + 1;
        var managerId = managerArray.indexOf(response.manager) + 1;
        db.addEmployee(response.firstname, response.lastname, roleId, managerId);
        db.displayEmployees();
    })
}

// Returns an Array of Roles that are used by the inquirer as choices
function getRoles(){
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
function getManager(){
    selectManager();
    return managerArray;
}

// Query the db to get the managers names and add them to an array
async function selectManager() {
    let managerRole = await db.chooseManager();
    for (var i = 0; i < managerRole.length; i++) {
        managerArray.push(managerRole[i].first_name);
    }
}

// NOT WORKING
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
    })
}

function getEmployeeList(){
    selectEmployees();
    return employeeArray;
}

async function selectEmployees(){
    let employeeData = await db.chooseEmployee();
    for (var i = 0; i < employeeData.length; i++){
        employeeArray.push(employeeData[i].first_name);
    }
}

// See All Roles 
async function viewAllRoles() {
    let roles = await db.chooseRole();
    // Add spaces before and after
    console.table(roles);
    mainMenu();
}

async function viewAllDepartments(){
    let dept = await db.displaydepartments();
    console.table(dept);
    mainMenu();
}

function addDepartments(){
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
    })
}