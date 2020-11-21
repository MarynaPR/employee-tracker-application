//You may want to use a separate file containing functions for performing specific SQL queries you'll need to use.
//A constructor function or Class could be helpful for organizing these
const connection = require("./connection");

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    //all departments 
    findDepts() {
        const sqlData = `SELECT department.id,
        department.name
        FROM department;`;
        return this.connection.promise().query(sqlData);
    }
    //all roles
    //(job title, role id, the department that role belongs to, and the salary for that role)
    findRoles() {
        const sqlData = `SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id=department.id;`;
        return this.connection.promise().query(sqlData);
    }
    // view all employees(employee ids,
    // first names, last names, 
    //job titles, departments, salaries, 
    //and managers that the employees report to)
    findEmployees() {
        const sqlData = `SELECT employee.role_id,
        employee.first_name,
        employee.last_name,
        role.title,
        role.salary,
        department.name AS 'department',
        CONCAT(manager.first_name,' ', manager.last_name) AS manager
        FROM employee INNER JOIN role ON employee.role_id=role.id
        INNER JOIN department ON role.department_id=department.id
        INNER JOIN employee manager ON manager.id=employee.manager_id;`;
        return this.connection.promise().query(sqlData);
    }
    // add a department(prompt to enter the name of the department 
    //and that department is added to the database)
    createDept(department) {
        const sqlData = `INSERT INTO department (name) VALUES (?);`;
        return this.connection.promise().query(sqlData, department.name);
    }
    //add a role
    // prompted to enter the name, salary, and department for the role 
    createRole(role) {
        const sqlData = `INSERT INTO role (title, salary, department_id) VALUES (?);`;
        return this.connection.promise().query(sqlData, role);
    }
    //add an employee
    // prompted to enter the employee’s first name, last name, 
    //role, and manager 
    createEmployee(employee) {
        const sqlData = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?);`;
        return this.connection.promise().query(sqlData, employee);
    }

}

module.exports = new Database(connection);

// INSERT INTO department
// (name)
// VALUES
//     ('Management'),
//     ('Engineering'),
//     ('Sales'),
//     ('Finance'),
//     ('Legal');

// INSERT INTO role
// (title, salary, department_id)
// VALUES
//     ("CEO", 150000, 1),
//     ("Sales Lead", 100000, 1),
//     ("Product Manager", 100000, 1,)
//     ("Salesperson", 80000, 1),
//     ("Lead Engineer", 150000, 2),
//     ("Social Media Manager", 100000, 5),
//     ("Accountant", 125000, 3),
//     ("Legal Team Lead", 250000, 4),
//     ("Lawyer", 190000, 4);

// INSERT INTO employee
// (first_name, last_name, role_id, manager_id)
// VALUES
//     ('John', 'Doe', 1, 1),
//     ('Mike', 'Chan', 2, 2),
//     ('Ashley', 'Rodriguez', 3, 3),
//     ('Kevin', 'Tupik', 4, 4),