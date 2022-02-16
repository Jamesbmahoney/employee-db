INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Mailroom'),
  ('Marketing'),
  ('Accounting'),
  ('Human Resources');

  INSERT INTO role (title, salary, department_id)
  VALUES
    ('Executive', '150000.00', '111'),
    ('Engineer', '85000.00', '222'),
    ('Manager', '950000.00', '333'),
    ('Entry Level', '650000.00', '444'),
    ('Intern', '50000.00', '555');

    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUE 
      ('John', 'Smith', '1234', '66'),
      ('Ralphie', 'Perez', '14343', '66'),
      ('Cherie', 'Billings', '6766', '66'),
      ('Robert', 'Ellis', '133', '34'),
      ('Diana', 'Troy', '756', '34');