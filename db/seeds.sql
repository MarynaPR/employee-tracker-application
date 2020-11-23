-- You may also want to include a `seeds.sql` file to pre-populate your database. This will make the development of individual features much easier.
USE employees;

INSERT INTO department
(name)
VALUES
    ('Management'),
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

INSERT INTO role
(title, salary, department_id)
VALUES
    ("CEO", 150000, 1),
    ("SalesLead", 100000, 1),
    ("Product Manager", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Social Media Manager", 100000, 5),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, 1),
    ('Mike', 'Chan', 2, 2),
    ('Ashley', 'Rodriguez', 3, 3),
    ('Kevin', 'Tupik', 4, 4),
    ('Sara', 'Green', 5, 5),
    ('Bob', 'Smith', 6, 5),
    ('Elen', 'Brown', 7, 4),
    ('Brent', 'Lourd', 8, 7);
    
   