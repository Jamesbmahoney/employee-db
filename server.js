const db = require('./config/connection');
const express = require('express');
const inquirer = require('inquirer');

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        initQuestions();        
    });    
});



function initQuestions() {
    inquirer.prompt({
        message: 'Welcome! Please Select An Option:',
        type: 'list',
        choices: [
            'View All Employees',
            'View All Departments',
            'View All Roles',
            'Add New Employee',
            'Add New Department',
            'Add New Role',
            'Update Current Employee Role',
            'Quit'
        ],
        name: 'branch'
    }).then(answers => {
        console.log(answers.branch);
        switch (answers.branch) {
            case 'View All Employees':
                getEmployees()
                break;
            case 'View All Departments':
                getDepartments()
                break;
            case 'View All Roles':
                getRoles()
                break;    
            case 'Add New Employee':
                addNewEmployee()
                break;
            case 'Add New Department':
                addNewDepartment()
                break;
            case 'Add New Role':
                addNewRole()
                break;
            case 'Update Current Employee Role':
                updateRole()
                break;
            case 'Quit':
                console.log('Thank you for using Employee Tracker!')                  
                process.exit()                                                                      
        }
    })
}

function getEmployees() {
    db.query('SELECT employee.emp_id, employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name FROM employee JOIN roles ON roles.roles_id = employee.emp_role_id JOIN department ON roles.dept_id = department.dept_id', (err, data) => {
        if (err) throw err;
        console.table(data);
        initQuestions();
    })
    
}

function getDepartments() {
    db.query('SELECT * FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        initQuestions();
    })
    
}

function getRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) throw err;
        console.table(data);
        initQuestions();
    })
    
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
    ]).then(function (res) {
        db.query('INSERT INTO employee (first_name, last_name, emp_role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], (err, data) => {
            if (err) throw err;
            console.table(data);
            initQuestions();
        })        
    })
}

function addNewDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'Please enter a department to add'
    }
    ]).then(function (res) {
        db.query('INSERT INTO department (dept_name) VALUES (?)', [res.department], (err, data) => {
            if (err) throw err;
            console.table(data);
            initQuestions();
        })       
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
    ]).then(function (res) {
        db.query('INSERT INTO roles (title, salary, dept_id VALUES (?, ?, ?)', [res.title, res.salary, res.department_id], (err, data) => {
            if (err) throw err;
            console.table(data);
            initQuestions();
        })
    })
}

function updateRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'LastName',
            message: 'Which employee would you like to update? (Please provide last name)'
        },       
        {
            type: 'number',
            name: 'updateRoleId',
            message: 'Enter a new Role ID'
        }
    ]).then(function (res) {
        db.query('UPDATE employee SET emp_role_id = ? WHERE last_name = ?', [res.updateRoleId, res.LastName], (err, data) => {
            if (err) throw err;
            console.table(data);
            initQuestions();
        })
    })
}


