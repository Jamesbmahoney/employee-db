INSERT INTO department (dept_name)
VALUES
  ('Management'),
  ('Engineering'), 
  ('Marketing');

  INSERT INTO roles (title, salary, dept_id)
  VALUES
    ('Executive', '150000.00', '3'),
    ('Engineer', '85000.00', '1'),
    ('Design', '95000.00', '2'),
    ('Entry Level', '65000.00', '2'),
    ('Intern', '50000.00', '1');

    INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
    VALUE 
      ('John', 'Smith', '1', '1'),
      ('Ralphie', 'Perez', '2', '1'),
      ('Cherie', 'Billings', '3', '3'),
      ('Robert', 'Ellis', '4', '1'),
      ('Diana', 'Troy', '5', '1');