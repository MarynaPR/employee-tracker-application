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
        const sqlData = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
        return this.connection.promise().query(sqlData, role);
    }
    // employee’s first name, last name, 
    //role, and manager 
    createEmployee(employee) {
        const sqlData = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?);`;
        return this.connection.promise().query(sqlData, employee);
    }
    // update and employee's new role 
    //and this information is updated in the database
    updateEmployeeRole(employee_id, role_id) {
        const sqlData = `UPDATE employee SET role_id = ? WHERE id = ?`;
        return this.connection.promise().query(sqlData, [role_id, employee_id]);
    }
    //BONUS
    //update employee managers
    updateEmployeeManagers(employee_id, manager_id) {
        const sqlData = `UPDATE employee SET role_id = ? WHERE id = ?`;
        return this.connection.promise().query(sqlData, [manager_id, employee_id]);
    }
    //
    findEmplByManager(manager_id) {
        const sqlData = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, 
        CONCAT(manager.first_name, " ", manager.last_name) AS manager
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN employee AS manager ON employee.manager_id = manager.id
        INNER JOIN department ON department.id = role.department_id
        WHERE CONCAT(manager.first_name, " ", manager.last_name);`;
        //`SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE id = ?`;
        return this.connection.promise().query(sqlData, manager_id);
    }
    // view employees by department
    findEmplByDept(department_id) {
        const sqlData = `SELECT employee.first_name,
        employee.last_name, department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id=role.id 
        LEFT JOIN department ON role.department_id=department.id;`;
        return this.connection.promise().query(sqlData, department_id);
    }

    removeDept(department_id) {
        const sqlData = `DELETE FROM department WHERE id = ?;`;
        return this.connection.promise().query(sqlData, department_id);
    }

    removeRole(role_id) {
        const sqlData = `DELETE FROM role WHERE id = ?;`;
        return this.connection.promise().query(sqlData, role_id);
    }

    removeEmployee(employee_id) {
        const sqlData = `DELETE FROM employee WHERE id = ?;`;
        return this.connection.promise().query(sqlData, employee_id);
    }

    viewUtilizedBudgets() {
        const sqlData = `SELECT department.id, department.name,
        SUM(role.salary) AS budget
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        GROUP BY department.id, department.name;`;
        return this.connection.promise().query(sqlData);
    }
}

module.exports = new Database(connection);
