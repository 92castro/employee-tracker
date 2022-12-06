# Employee-Tracker

## Description

My task was to built a database that allows a business owner to keep their business organize. This database allows the business owner to neatly manage their employees and which departments their employees are associate with. This database also helps maintain all the departments of the business, the roles associated with the departments and the salary for each role.

## Usage

In order to run this app, the user must have Node.js installed and user must have the following packages:
Inquirer 8.2.4, Console.table, Mysql2

## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Review

My Github repo page

-https://github.com/92castro/employee-tracker

Walk-through video link

- https://drive.google.com/file/d/1SlBg9soP6JJlCb7pI3iRfCQC0Cg4FvHT/view

![screenshot of my project](assets/emptrack.PNG)
