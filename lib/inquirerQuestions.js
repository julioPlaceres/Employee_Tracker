const inquierer = ("inquirer");

function mainMenu() {
    return inquierer.prompt()([
        {
            name: "optionsList",
            type: "list",
            message: "What would you like to do?",
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
    ]).then(response =>{
        switch(response.optionList){
            case "View All Employees":
                console.log("Display all employees");
                break;
        }
    }).catch(err =>{
        console.log(err);
    });
}

module.export = mainMenu;
