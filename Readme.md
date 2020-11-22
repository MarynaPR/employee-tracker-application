# Employee-Tracker-Application

## Dependencies

* Inquirer
* MySql

## Technology Used

* Node.js
* Inquirer
* MySQL

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. These interfaces are known as Content Management Systems (CMS). 

This code demonstrates a command-line application to manage a company's database of employees using Node.js, Inquirer, and MySQL.


## Resources Used

* http://www.figlet.org/
* https://www.npmjs.com/package/figlet
* https://www.npmjs.com/package/console.table

## Installation

* npm init
* npm install inquirer
* npm install --save mysql2 
* npm install console-table --save
* npm install figlet

## Usage

Run the following command at the root of your directory to prompt questions: 
 * npm start or node server

## Testing

Because this application is not deployed, here's a  link to a walkthrough video that demonstrates its functionality and all of the acceptance criteria below being met.

## Contribution

Contributions, issues and feature requests are welcome. Feel free to check issues page.(link here?) Give (thums up image, or star) if this project helped you.

## Mock-Up

The following animation shows an example of the application being used from the command line:

![Command Line demo](./Assets/12-sql-homework-demo-01.gif)


## Getting Started

You’ll need to use the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries, the [Inquirer package](https://www.npmjs.com/package/inquirer) to interact with the user via the command-line, and the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

You might also want to make your queries asynchronous. MySQL2 exposes a `.promise()` function on Connections to "upgrade" an existing non-promise connection to use promises. Look into [MySQL2's documentation](https://www.npmjs.com/package/mysql2) in order to make your queries asynchronous.

Design the following database schema containing three tables:

![Database Demo](./Assets/12-sql-homework-demo-02.png)

* **department:**

    * `id` - INT PRIMARY KEY

    * `name` - VARCHAR(30) to hold department name

* **role:**

    * `id` - INT PRIMARY KEY

    * `title` - VARCHAR(30) to hold role title

    * `salary` - DECIMAL to hold role salary

    * `department_id` - INT to hold reference to department role belongs to

* **employee:**

    * `id` - INT PRIMARY KEY

    * `first_name` - VARCHAR(30) to hold employee first name

    * `last_name` - VARCHAR(30) to hold employee last name

    * `role_id` - INT to hold reference to employee role

    * `manager_id` - INT to hold reference to another employee that is manager of the current employee. This field may be null if the employee has no manager


## Bonus

See if you can add some additional functionality to your application, such as the ability to:

* Update employee managers

* View employees by manager

* View employees by department

* Delete departments, roles, and employees

* View the total utilized budget of a department -- ie the combined salaries of all employees in that department


## Review

You are required to submit BOTH of the following for review:

* A walkthrough video demonstrating the functionality of the application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.


## Project Setup

To create the database, run `sqlite3 votes.db < db/schema.sql`.

To seed the database, run `sqlite3 votes.db < db/seeds.sql`.
