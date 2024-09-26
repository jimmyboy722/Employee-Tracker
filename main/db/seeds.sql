-- SEEDING THE TABLES WITH THE DATA BASED ON VALUES SET UP IN THE SCHEMA --

-- DEPARTMENT TABLE DATA --
INSERT INTO department(name)
VALUES 
('Sales'),
('Engineering'),
('Financing'),
('Legal');

-- ROLE TABLE DATA (gave software engineers the most :) ) --
INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 100000000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 190000, 4),
('Lawyer', 100000, 4);

-- EMPLOYEE TABLE DATA --
INSERT INTO employee(role_id, first_name, last_name, manager_id)
VALUES
(1, 'James', 'Eckman',1),
(2, 'Christopher', 'Stonaker',2),
(3, 'Lisa', 'Rodenbaugh', 3),
(4, 'Ollie', 'Garlinghouse', 4),
(5, 'Nick', 'Boulanger', 5),
(6, 'Jorge', 'Ocana', 6),
(7, 'Frank', 'Sinatra', 7);