INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Mailroom'),
  ('Marketing'),
  ('Accounting'),
  ('Human Resources');

  INSERT INTO roles (title, salary, department_id)
  VALUES
    ('Executive', '150000.00', '1'),
    ('Engineer', '85000.00', '1'),
    ('Manager', '950000.00', '2'),
    ('Entry Level', '650000.00', '2'),
    ('Intern', '50000.00', '3');

    INSERT INTO employee (first_name, last_name, role_id)
    VALUE 
      ('John', 'Smith', '1234', '1'),
      ('Ralphie', 'Perez', '14343', '2'),
      ('Cherie', 'Billings', '6766', '3'),
      ('Robert', 'Ellis', '133', '4'),
      ('Diana', 'Troy', '756', '5');