//Dependencies
const mysql = require("mysql12");

//MySQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: "",
    user: "root",
    password: "",
    database: ""
});

// // Connect to database 
// const db = new sqlite3.Database('./db/election.db', err => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to the election database.');
//   });

//   module.exports = db;