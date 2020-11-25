const connection = require("./connection");
class Database {
    constructor(connection) {
        this.connection = connection;
    }
    findDepts() {
        const sqlData = `SELECT department.id,
        department.name
        FROM department;`;
        return this.connection.promise().query(sqlData);
    }
    findRoles() {
        const sqlData = `SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id=department.id;`;
        return this.connection.promise().query(sqlData);
    }
    findEmployees() {
        const sqlData = `SELECT employee.role_id,
        employee.id,
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
    createDept(department) {
        const sqlData = `INSERT INTO department (name) VALUES (?);`;
        return this.connection.promise().query(sqlData, department.name);
    }
    createRole(role) {
        const sqlData = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`;
        return this.connection.promise().query(sqlData, [role.title, role.salary, role.department_id]);
    }
    createEmployee(employee) {
        const sqlData = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
        return this.connection.promise().query(sqlData, [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
    }
    updateEmployeeRole(employee_id, role_id) {
        const sqlData = `UPDATE employee SET role_id = ? WHERE id = ?`;
        return this.connection.promise().query(sqlData, [role_id, employee_id]);
    }
    //BONUS
    updateEmployeeManagers(employee_id, manager_id) {
        const sqlData = `UPDATE employee SET role_id = ? WHERE id = ?`;
        return this.connection.promise().query(sqlData, [manager_id, employee_id]);
    }
    findEmplByManager(manager_id) {
        const sqlData = `SELECT employee.first_name, employee.last_name FROM employee WHERE manager_id=${manager_id};`;
        return this.connection.promise().query(sqlData, [manager_id]);
    }
    findEmplByDept(department_id) {
        const sqlData = `SELECT employee.first_name,
        employee.last_name,role.title, department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id=role.id 
        LEFT JOIN department ON role.department_id=${department_id}
        WHERE department.id=${department_id};`;
        return this.connection.promise().query(sqlData);
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
