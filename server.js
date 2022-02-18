const db = require('./config/connection');
const express = require('express');
const inquirer = require('inquirer');
const { init } = require('express/lib/application');
const { type } = require('express/lib/response');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

function initQuestions() {
    inquirer.prompt({
        message: "Welcome! Please Select An Option:",
        type: "list",
        choices: [
            "View All Employees",
            "View All Departments",
            "Add New Employee",
            "Add New Department",
            "Add New Role",
            "Update Current Employee Role",
            "Quit"
        ],
        name: "branch"
    }).then(answers => {
        console.log(answers.branch);
        switch (answers, branch) {
            case "View All Employees":
                getEmployees()
                break;
            case "View All Departments":
                getDepartments()
                break;
            case "Add New Employee":
                addNewEmployee()
                break;
            case "Add New Department":
                addNewDepartment()
                break;
            case "Add New Role":
                addNewRole()
                break;
            case "Update Current Employee Role":
                updateRole()
                break;
        }
    })
}

function getEmployees() {
    db.query('SELECT * FROM employee', (err, data) => {
        console.table(data);        
    })
    initQuestions();
}

function getDepartments() {
    db.query('SELECT * FROM department', (err, data) => {
        console.table(data);        
    })
    initQuestions();
}

function addNewEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'Please Enter First Name'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Please Enter Last Name'
    },
    {
        type: 'number',
        name: 'roleId',
        message: 'What is the employee role ID'
    },
    {
        type: 'number',
        name: 'managerId',
        message: 'What is the employee manager ID'
    }
    ]).then(function(res) {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], (err, data) => {
            if (err) throw err;
            console.table('Successfully Added Employee!');            
        })
        initQuestions();
    })
}

function addNewDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'Please enter a department to add'
    }
    ]).then(function(res) {
        db.query('INSERT INTO department (name) VALUES (?)', [res.department], (err, data) => {
            if (err) throw err;
            console.table('Successfully Added Department!');            
        })
        initQuestions();
    })
}

function addNewRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter a title'
            
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Please enter a salary'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Please enter a department ID'
        }
    ]).then(function(res) {
        db.query('INSERT INTO roles (title, salary, department_id VALUES (?,?,?)', [res.title, res.salary, res.department_id], (err, data) => {
            if (err) throw err;
            console.table('New Role Added To Database!');
        })
        initQuestions();
    })
}

function updateRole() {
    inquirer.createPromptModule([
        {
            type: 'input',
            name: 'updateFirstName',
            message: 'Provide updated first name'
        },
        // {
        //     type: 'input',
        //     name: 'updatelastName',
        //     message: 'Provide updated last name'
        // },
        {
            type: 'number',
            name: 'updateRoleId',
            message: 'Provide updated role ID'
        }
    ]).then(function(res) {
        db.query('UPDATE employee SET role_id = ? WHERE first_name = ?', [res.updateRoleID, res.updatedFirstName], (err, data) => {
            if (err) throw err;
            console.table('Employee Updated Successfully!');
        })
        initQuestions();
    })
}