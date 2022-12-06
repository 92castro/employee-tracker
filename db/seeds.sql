INSERT INTO department(name) VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role(title,salary,department_id) VALUES 
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000,2),
("Software Engineer", 120000,2),
("Account Manager",160000,3),
("Accountant", 120000,3),
("Legal Team Lead",250000,4),
("Lawyer", 185000,4);


INSERT INTO employee(first_name, last_name,role_id,manager_id) VALUES 
("Nina","Williams", 1, null),
("Bryan","Fury",2,1),
("Marshall","Law",3,null),
("Eddy","Gordo",4,3),
("Jin","Kazama",5,null),
("Ling","Xiaoyu",6,5),
("Kazuya","Mishima",7,null),
("Christie","Monteiro",8,7);