//Dependencies
require('dotenv').config();
const mysql = require("mysql2");
const db = require("./db");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");

figlet('EMPLOYEE TRACKER!!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    promptResponse();
});
//start
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
                "view the total utilized budget of a department",
                "exit"
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
                    break;
                case "update employee managers":
                    updateManagers();
                    break;
                //BONUS:
                case "view employees by manager":
                    viewEmployeesByManager();
                    break;
                case "view employees by department":
                    viewEmployeesByDept();
                    break;
                case "delete departments":
                    deleteDepts();
                    break;
                case "delete roles":
                    deleteRoles();
                    break;
                case "delete employees":
                    deleteEmployees();
                    break;
                case "view the total utilized budget of a department":
                    viewDeptBudget();
                    break;
                default:
                    quit();
            }
        });
};
//view all departments
const viewDepts = () => {
    db.findDepts()
        .then(([data]) => {
            let departments = data;
            console.log("ALL-DEPT");
            console.table(departments);
        })
        .then(() => promptResponse());
};
// view all roles
const viewRoles = () => {
    db.findRoles()
        .then(([data]) => {
            let roles = data;
            console.log("ALL-ROLES");
            console.table(roles);
        })
        .then(() => promptResponse());
};
// view all employees
const viewEmployees = () => {
    db.findEmployees()
        .then(([data]) => {
            let employees = data;
            console.log("ALL-EMPL");
            console.table(employees);
        })
        .then(() => promptResponse());
};
// add a department
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
};
//add a role
const addRole = () => {
    db.findDepts()
        .then(([data]) => {
            let results = data;
            const chosenDept = results.map(({ name, id }) => ({
                name: `${name}`,
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
                    choices: chosenDept
                }
            ])
                .then(department => {
                    db.createDept(department)
                        .then((role) => {
                            db.createRole(role)
                                .then(() => console.log(`Role created`))
                        })
                        .then(() => promptResponse())
                })
        })
};
//add an employee
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
                .then(([data]) => {
                    let roles = data;

                    const roleChoices = roles.map(({ title, id }) => ({ name: title, value: id }));
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
                            db.findEmployees()
                                .then(([rows]) => {
                                    let data = rows;
                                    const managerChoice = data.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));
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
};
// update an employee's new role 
const updateRole = () => {
    db.findEmployees()
        .then(([data]) => {
            let employees = data;
            const choiceEmployee = employees.map(({ first_name, last_name, id }) => ({ name: first_name + ' ' + last_name, value: id }));
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Please choose the employee.",
                    choices: choiceEmployee
                }
            ])
                .then(answers => {
                    let employee_id = answers.emplpoyee_id;
                    db.findRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const choiceRoles = roles.map(({ id, title }) => ({ name: title, value: id }));
                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "role_id",
                                    message: "What is employee's new role?",
                                    choices: choiceRoles
                                }
                            ])
                                .then(answer => db.updateEmployeeRole(employee_id, answer.role_id))
                                .then(() => console.log("Employee role updated"))
                                .then(() => promptResponse())
                        });
                });
        })
}
//BONUS:
//update employee managers
const updateManagers = () => {
    db.findEmployees()
        .then(data => {
            const results = data[0];
            const employeeNameArr = results.map(result => {
                return `${result.first_name} ${result.last_name}`
            })
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_choice",
                    message: "Which employee would you like to assign a new manager?",
                    choices: employeeNameArr
                },
                {
                    type: "list",
                    name: "new_manager",
                    message: "Who is the new manager?",
                    choices: employeeNameArr
                }
            ])
                .then(answer =>
                    db.updateEmployeeManagers(answer.employee_id, answer.manager_id)
                        .then(() => console.log("Employee Manager updated"))
                        .then(() => promptResponse())
                )
        })
};
//view employees by manager
const viewEmployeesByManager = () => {
    db.findEmployees()
        .then(data => {
            const manager = data[0];
            const managerArr = manager.map(({ first_name, last_name, id }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            inquirer.prompt([
                {
                    type: "list",
                    name: 'manager_id',
                    message: "Which manager would you like to see the reports for?",
                    choices: managerArr
                }
            ])
                .then(answer =>
                    db.findEmplByManager(answer.manager_id))
                .then(([data]) => {
                    let employees = data;
                    //console.log("\n");
                    console.log(`Employees managed by MANAGER: ${manager}`);
                    console.table(employees);
                })
                .then(() => promptResponse());
        })//***error object object */
};
// view employees by department
const viewEmployeesByDept = () => {
    db.findEmplByDept()
        .then(data => {
            //const results = data[0];
            console.log("RESULT", data[0]);
            const deptArr = results.map(result => {
                return `${result.department.id} ${result.department.name}`
            })
            inquirer.prompt([
                {
                    type: "list",
                    name: "department_id",
                    message: "Select department to see employees",
                    choices: deptArr
                }
            ])
                .then(answer => db.findEmplByDept(answer.department_id))

                .then(() => console.log("EMPLs by DEPT"))
                .then(() => console.table(employees))
                .then(() => promptResponse());
        })
};/// return ***'undefined, undefined
//  delete departments
const deleteDepts = () => {
    db.findDepts()
        .then(data => {
            const results = data[0];
            const chosenDept = results.map(({ name, id }) => ({
                name: `${name}`,
                value: id
            }));
            inquirer.prompt(
                {
                    type: "list",
                    name: "department_id",
                    message: "Select department you'd like to delete.",
                    choices: chosenDept
                }
            )
                .then(answer => db.removeDept(answer.department_id))
                .then(() => console.log(`Department DELETED`))
                .then(() => promptResponse());
        })//**error undefined */
};
// delete roles
const deleteRoles = () => {
    db.findRoles()
        .then(data => {
            const results = data[0];
            // console.log("RESULT", data[0]);
            const chosenRole = results.map(({ title, id }) => ({
                name: `${title}`,
                value: id
            }));
            inquirer.prompt(
                {
                    type: "list",
                    name: "role_id",
                    message: "Select role you'd like to delete.",
                    choices: chosenRole
                }
            )
                .then(answer => db.removeRole(answer.role_id))
                .then(() => console.log(`Role DELETED`))
                .then(() => promptResponse());
        })
};
// delete employees
const deleteEmployees = () => {
    db.findEmployees()
        .then(data => {
            const results = data[0];
            //console.log("RESULT", data[0]);
            const chosenEmpl = results.map(({ first_name, last_name, id }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
            inquirer.prompt(
                {
                    type: "list",
                    name: "employee_id",
                    message: "Select employee you'd like to delete.",
                    choices: chosenEmpl
                }
            )
                .then(answer => db.removeEmployee(answer.employee_id))
                .then(() => console.log(`Employee DELETED`))
                .then(() => promptResponse());
        })
};
// view the total utilized budget of a department
const viewDeptBudget = () => {
    db.viewUtilizedBudgets()
        .then(([data]) => {
            const results = data;
            console.log("\n");
            console.table(results);
        })
        .then(() => promptResponse());

};
// default
const quit = () => {
    console.log("Exit");
    process.exit();
};
