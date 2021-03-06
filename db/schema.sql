CREATE TABLE department (
  dept_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  dept_name VARCHAR(30)
);

CREATE TABLE roles (
  roles_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  dept_id INTEGER,
  
);


CREATE TABLE employee (
  emp_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  emp_role_id INTEGER NOT NULL,
  manager_id INTEGER,  
);
