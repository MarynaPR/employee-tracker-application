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

MySQL2 package is used to connect to MySQL database and perform queries, the Inquirer package to interact with the user via the command-line, and the console.table package to print MySQL rows to the console. All queries are made asynchronous. MySQL2 exposes a `.promise()` function on Connections to "upgrade" an existing non-promise connection to use promises. 

## Resources Used

* [figlet package](https://www.npmjs.com/package/figlet)
* [MySQL2 package](https://www.npmjs.com/package/mysql2) 
* [Inquirer package](https://www.npmjs.com/package/inquirer)
* [console.table package](https://www.npmjs.com/package/console.table) 

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
