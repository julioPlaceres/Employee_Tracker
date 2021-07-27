const conn = require("./connection");

class DatabaseQueries {
    constructor(conn) {
        this.conn = conn;
    }

    displayEmployees() {
        return this.conn.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;");
    }

    addEmployee(firstName, lastName, managerId, roleId){
        return this.conn.query("INSERT INTO employee SET ?",
        {
            first_name: firstName,
            last_name: lastName,
            manager_id: managerId,
            role_id: roleId
        });
    }

    chooseRole(){
        return this.conn.query("SELECT * FROM role");
    }

    chooseManager(){
        return this.conn.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL");
    }
}

module.exports = new DatabaseQueries(conn);