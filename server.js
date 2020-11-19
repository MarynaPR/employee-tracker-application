//Dependencies
const mysql = require("mysql12");
const express = require('express');
const db = require('./db/database');

//MySQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: "",
    user: "root",
    password: "",
    database: ""
});

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request(Not Found) Catch all other
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});


console.log(
    `
#######                                                    #######                                           
#       #    # #####  #       ####  #   # ###### ######       #    #####    ##    ####  #    # ###### #####         
#####   # ## # # ###  #      #    #   #   #####  #####        #    #    # #    # #      ####   #####  #    #              
#       #    # #      #      #    #   #   #      #            #    #  #   #    # #    # #   #  #      #  #  
####### #    # #      ######  ####    #   ###### ######       #    #    # #    #  ####  #    # ###### #    #`

);


const questions =
    [
        {
            type: "list",
            name: "select",
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view all employees by role",
                "view all employees by department",
                "view employees by manager",
                "add employee",
                "remove employee",
                "update employee role",
                "update employee manager"

            ]
        },
        {
            type: "",
            name: "",
            message: "Which employee's manager would you like to update?"

        },
        {

            type: "list",
            name: "department",
            message: "What's the department of the employee?",
            choices:
                [
                    'software development',
                    'Quality Testing',
                    'sales',
                    'Accounts',
                    'human resource'
                ]
        }


    // Update employee managers

    // View employees by manager

    // View employees by department

    // Delete departments, roles, and employees

    // View the total utilized budget of a department -- ie the combined salaries of all employees in that department