//Dependencies
require('dotenv').config();
const mysql = require("mysql2");
//const connection = require("./db/connection");
const db = require("./db");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");
//const { updateEmployeeRole } = require('./db');

figlet('EMPLOYEE TRACKER!!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    promptResponse();
});

// GIVEN a command - line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const promptResponse = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "What would you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role",
                "update employee managers",
                "view employees by manager",
                "view employees by department",
                "delete departments",
                "delete roles",
                "delete employees",
                "view the total utilized budget of a department"
                // "exit"
            ]
        },
    ])
        .then(answers => {
            switch (answers.select) {
                case "view all departments":
                    viewDepts();
                    break;
                case "view all roles":
                    viewRoles();
                    break;
                case "view all employees":
                    viewEmployees();
                    break;
                case "add a department":
                    addDept();
                    break;
                case "add a role":
                    addRole();
                    break;
                case "add an employee":
                    addEmployee();
                    break;
                case "update an employee role":
                    updateRole();
                //BONUS:
                // case "view employees by manager":
                //     viewEmployeesByManager();
                //     break;
                // case "view employees by department":
                //     viewEmployeesByDept();
                //     break;
                // case "delete departments":
                //     deleteDepts();
                //     break
                // case "delete roles":
                //     deleteRoles();
                //     break;
                // case "delete employees":
                //     deleteEmployees();
                //     break;
                // case "view the total utilized budget of a department":
                //     viewDeptBudget();
                //     break;
                // default:
                //  quit();
            }
        });
};

// view all departments(formatted table showing department names and department ids)
const viewDepts = () => {
    db.findDepts()
        .then(([rows]) => {
            let departments = rows;
            console.log("ALL-DEPT");
            console.table(departments);
        })
        .then(() => promptResponse());
};

// view all roles(job title, role id, the department that role belongs to, and the salary for that role)
const viewRoles = () => {
    db.findRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("ALL-ROLES");
            console.table(roles);
        })
        .then(() => promptResponse());
};

// view all employees(employee ids, first names, last names, job titles, departments, salaries, 
//and managers that the employees report to)
const viewEmployees = () => {
    db.findEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("ALL-EMPL");
            console.table(employees);
        })
        .then(() => promptResponse());
};

// add a department(prompt to enter the name of the department 
//and that department is added to the database)
const addDept = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the new department?',
        }
    ])
        .then(answer => {
            let nameDept = answer;
            db.createDept(nameDept)
                .then(() => console.log(`${nameDept.name} department created`))
                .then(() => promptResponse());
        })
}
//add a role
// prompted to enter the name, salary, and department for the role 
//and that role is added to the database
const addRole = () => {
    db.findDepts()
        .then(([rows]) => {
            let depts = rows;
            const deptArr = depts.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    name: 'title',
                    message: 'What is the new role?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary?'
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'What department would you like to assign a new role?',
                    choices: deptArr
                }
            ])
                .then(role => {
                    db.createRole(role)
                        .then(() => console.log(`${role.title} role created`))
                        .then(() => promptResponse())
                })
        })
}
//add an employee
// prompted to enter the employee’s first name, last name, 
//role, and manager 
//and that employee is added to the database
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "first_name",
            message: "What is the employee's first name?",
            validate: addFirst_Name => {
                if (addFirst_Name) {
                    return true;
                } else {
                    console.log("Please enter employee's first name");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
            validate: (addLast_Name) => {
                if (addLast_Name) {
                    return true;
                } else {
                    console.log("Please enter employee's last name");
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const employeeName = [answer.first_name, answer.last_name];

            db.findRoles()
                .then(([rows]) => {
                    let roles = rows;

                    const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
                    inquirer.prompt(
                        {
                            type: "list",
                            name: "role",
                            message: "What is the employee's role?",
                            choices: roleChoices
                        }
                    )
                        .then(answers => {
                            const role = answers.role;
                            //employeeName.push(role);
                            db.findEmployees()
                                .then(([rows]) => {
                                    let data = rows;
                                    const managerChoice = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));


                                    inquirer.prompt(
                                        {
                                            type: "list",
                                            name: "manager",
                                            message: "Who is the employee's manager?",
                                            choices: managerChoice
                                        }
                                    )
                                        .then(managerChoice => {
                                            const manager = managerChoice.manager;
                                            employeeName.push(manager);
                                            db.createEmployee()
                                        })
                                        .then(() => console.log("Employee is added"))
                                        .then(() => promptResponse());
                                })
                        })
                })
        })
}

// update an employee's new role 
//and this information is updated in the database
const updateRole = () => {
    db.findEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoice = employees.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Please choose the employee.",
                    choices: employeeChoice
                }
            ])
                .then(answers => {
                    let employee_id = answers.emplpoyee_id;
                    db.findRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const choices = roles.map(({ id, title }) => ({ name: title, value: id }));
                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "role_id",
                                    message: "What is employee's new role?",
                                    choices: choices
                                }
                            ])
                                .then(answer =>
                                    updateEmployeeRole(employee_id, answer.role_id))
                                .then(() => console.log("Employee role updated"))
                                .then(() => promptResponse())
                        })
                })
        })
};

//BONUS:
//view employees by manager

const viewEmployeesByManager = () => {

};

// view employees by department
// const viewEmployeesByDept = () =>{};

// delete departments
// const deleteDepts = () => {};

// delete roles
// const deleteRoles = () => {};

// delete employees
// const deleteEmployees = () = > {};

// view the total utilized budget of a department
// const viewDeptBudget = () => {};

// default
// quit();
