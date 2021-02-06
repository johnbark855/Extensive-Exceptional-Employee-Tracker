USE company_employees;

-- Creates new rows containing data in all named columns --
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1352);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mike", "Chan", 1354);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ashley", "Rodriguez", 1353);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 1356, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 1353, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 1356, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 1352, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1353, "Software Engineer", 700000.40, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1356, "Sales Lead", 700000.50, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1354, "Legal Team Lead", 700000.01, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (1352, "Accountant", 700000.03, 2);

INSERT INTO department (id, dpt_name)
VALUES (3, "Engineering");

INSERT INTO department (id, dpt_name)
VALUES (2, "Finance");

INSERT INTO department (id, dpt_name)
VALUES (4, "Sales");

INSERT INTO department (id, dpt_name)
VALUES (1, "Legal");