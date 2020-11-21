//Dependencies
const mysql = require("mysql2");
require('dotenv').config()

//MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employees"
});

// Connect to database 
connection.connect(function (err) {
    if (err)
        throw err;
    console.log('Connected to the election database.');
});

module.exports = connection;