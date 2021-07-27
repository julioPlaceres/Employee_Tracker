// Dependencies
const inquirer = require("inquirer");
const db = require("./db/queries");

// variables
roleArray = [];
managerArray = [];

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
        }
    })
}

// See All Employees
async function showEmployees() {
    let employees = await db.displayEmployees();
    // Add spaces before and after
    console.table(employees);
    startPrompt();
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
        console.log(managerArray);
        console.log(
            "Fname: ", response.firstname,
            " LName: ", response.lastname,
            " roleID: ", roleId,
            " ManagerID: ", managerId
        );
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