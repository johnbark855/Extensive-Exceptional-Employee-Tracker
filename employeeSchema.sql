DROP DATABASE IF EXISTS company_employees;
CREATE DATABASE company_employees;
USE company_employees;

-- create 3 different tables --
CREATE TABLE department(
    id INTEGER (4) NOT NULL,
    dpt_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INTEGER (4) NOT NULL,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (9,2) NOT NULL,
    department_id INTEGER (4) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER (4) NOT NULL,
    manager_id INTEGER (6),
    PRIMARY KEY (id)
);

-- SELECT * FROM employee; --
-- SELECT * FROM roles; --
-- SELECT * FROM department; --

SELECT COUNT(id) FROM employee;