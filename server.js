const mysql = require ("mysql");
const inquirer = require ("inquirer");
const figlet = require ("figlet");


const connection = mysql.createConnection({
host:"localhost",
port: 3306,
user: "root",
password: "Sasha10!",
database: "company_employees"
});

connection.connect(function (err) {
if (err) throw err;
init();
});

function init(){
    figlet("\nEMPLOYEE\nMANAGER", function(err, data){
        console.log(data);
        runSearch();
    });
}
function runSearch() {
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees ordered by manager",
                "Add a new item (employee, role, or department)",
                "Remove Employee",
                "Update Employee Role"
            ]
        }
    ).then(function (answer) {
        switch (answer.action) {
            case "View all employees":
                allEmployees();
                break;

            case "View all employees by department":
                emplByDept();
                break;

            case "View all employees ordered by manager":
                emplByMgr();
                break;

            case "Add a new item (employee, role, or department)":
                addSomething();
                break;

            case "Remove Employee":
                rmEmployee();
                break;

            case "Update Employee Role":
                updateRole();
                break;
        }
    });
}

function allEmployees() {
    let query = "SELECT id, first_name AS 'First Name', last_name AS 'Last Name', role_id AS 'Role Id', manager_id AS 'Manager Id' FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

function emplByDept(){
    inquirer.prompt({
            name: "department",
            type: "list",
            message: "Which department would you like to view?",
            choices: [
                "Legal",
                "Finance",
                "Engineering",
                "Sales"
            ]
        }).then(function (answer) {
            let query = "SELECT employee.id AS ID, employee.first_name AS 'First Name', employee.last_name AS 'Last Name', roles.title AS 'Role', department.dpt_name AS 'Department'";
            query += " FROM department"; 
            query += " LEFT JOIN roles ON roles.department_id = department.id"; 
            query += " LEFT JOIN employee ON (roles.id = employee.role_id)";
            query += " WHERE department.dpt_name = ?";
        connection.query(query, answer.department, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
});
}

function emplByMgr() {
    let query = "SELECT employee.first_name AS 'First Name', employee.last_name AS 'Last Name', manager_id AS 'ReportingManagerId'";
    query += " FROM employee WHERE manager_id IS NOT NULL";
    query += " ORDER BY employee.manager_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}
    function addSomething() {
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to add?",
            choices: [
                "add a new employee",
                "add a new department",
                "add a new role"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "add a new employee":
                    addEmployee();
                    break;

                case "add a new department":
                    addDepartment();
                    break;

                case "add a new role":
                    addRole();
                    break;
            }
        });
    }
    function addEmployee(){
        inquirer.prompt(
            [
                {
                    name: "employee_firstname",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "employee_lastname",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "employee_role",
                    type: "number",
                    message: "What is the employee's role ID?"
                },
                {
                    name: "employee_manager",
                    type: "number",
                    message: "What Manager ID# does the employee report to?"
                }
            ]
        ).then(function(answer){
            connection.query(
                "INSERT INTO employee SET?",
                {
                    first_name: answer.employee_firstname,
                    last_name: answer.employee_lastname,
                    role_id: answer.employee_role,
                    manager_id: answer.employee_manager
                });
                console.log("\nNew employee sucessfully added to database\n");
                runSearch();
            
        });
    }
    
    function addRole(){
        inquirer.prompt(
            [
                {
                    name: "role_name",
                    type: "input",
                    message: "what would you like to name this role as?"
                },
                {
                    name: "role_id",
                    type: "input",
                    message: "what ID would you like to assign to this role?"
                },
                {
                    name: "salary",
                    type: "number",
                    message: "what is the starting amount for the salary of this role?"
                },
                {
                    name: "department_id",
                    type: "number",
                    message: "which department ID should be assigned to the role?"
                }
            ]
        ).then(function(answer){
            connection.query(
                "INSERT INTO roles SET?",
                {
                    id: answer.role_id,
                    title: answer.role_name,
                    salary: answer.salary,
                    department_id: answer.department_id
                }
            );
            console.log("\nNew role successfully added to database\n");
            runSearch();
        });
    }

    function addDepartment(){
        inquirer.prompt(
            [
                {
                    name: "dpt_name",
                    type: "input",
                    message: "what is the name of the new department"
                },
                {
                    name: "dpt_id",
                    type: "number",
                    message: "what is the ID # of the new department?"
                }
            ]).then(function(answer){
                connection.query(
                    "INSERT INTO department SET?",
                    {
                        id: answer.dpt_id,
                        dpt_name: answer.dpt_name
                    }
                );
            console.log("\nNew department has been successfully added to database\n");
            runSearch();
            });
        }

    function rmEmployee(){
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "what is the first name of the employee you wish to remove?"
            },
            {
                name: "last_name",
                type: "input",
                message: "what is the last name of the employee you wish to remove?"
            }
        ]).then(function(answer){
            connection.query(
                "DELETE FROM employee WHERE ? and ?",
                [{
                    first_name: answer.first_name
                },
                {
                    last_name: answer.last_name
                }]
            );
            console.log("\nDeletetion complete! Check database to ensure deletion was a success\n");
            runSearch();
            });
        }

    function updateRole() {
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "first name of the employee you are currently updating?"
            },
            {
                name: "last_name",
                type: "input",
                message: "last name of the employee you are currently updating?"
            },
            {
                name: "role_id",
                type: "number",
                message: "what is the employee's updated role ID #?"
            }
        ]).then(function(answer){
            connection.query (
                "UPDATE employee SET ? AND ?",
                [{
                    role_id: answer.role_id
                },
                {
                    first_name: answer.first_name
                },
                {
                    last_name: answer.last_name
                }]
            );
            console.log("\nEmployee role has successfully been updated\n");
            runSearch();
        });
    }
