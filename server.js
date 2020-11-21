//Dependencies
require('dotenv').config();
const mysql = require("mysql2");
//const connection = require("./db/connection");
const db = require("./db");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");
const { response } = require('express');

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
                "pdate employee managers",
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
                case "view employees by manager":
                    viewEmployeesByManager();
                    break;
                case "view employees by department":
                    viewEmployeesByDept();
                    break;
                case "delete departments":
                    deleteDepts();
                    break
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

// view all employees(employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to)

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
    const deptArr = [];
    deptArr.forEach(department.name) = deptArr.push(department.name);
    //deptArr.push('new department');
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
            name: 'departmentName',
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
};

//add an employee
// prompted to enter the employee’s first name, last name, 
//role, and manager 
//and that employee is added to the database
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ])
        .then(() => promptResponse());
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

//         WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
//     ```