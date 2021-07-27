-- Department values
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Art");
INSERT INTO department (name)
VALUE ("Design");
INSERT INTO department (name)
VALUE ("QA Testing");

-- Role Values
INSERT INTO role (title, salary, department_id)
VALUE ("Programmer Lead", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Game Programmer", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Art Supervisor", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Character Artist", 65000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Senior Game Designer Manager", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Game developer", 75000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Level Creator", 60000, 3);

INSERT INTO role (title, salary, department_id)
VALUE ("Tester", 55000, 4);

-- Employee Values
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Squall", "Leonheart", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Zell", "Dintch", 1, 2);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Selphie", "Tilmitt", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Rinoa","heartilly", 3, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Laguna", "Loire", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Quistis", "Trepe", 5, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Irvine", "Kinneas", 5, 7);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Seifer", "Almasy", null, 8);