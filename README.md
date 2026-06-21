# Learning Management System (LMS)

A full-stack Learning Management System (LMS) developed using React, Spring Boot, and MySQL. The application supports role-based access for Students, Instructors, and Admins, allowing course management and enrollment functionality.

## Features

### Authentication

* User Registration
* User Login
* Role-based Access Control

  * Student
  * Instructor
  * Admin

### Student Module

* View available courses
* Search courses
* Enroll in courses
* View enrolled courses
* Course details page

### Instructor Module

* View created courses
* Add new courses
* Edit existing courses
* Delete courses

### Admin Module

* View all users
* View all courses
* View all enrollments
* Dashboard statistics
* Delete users

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS

### Backend

* Spring Boot
* Spring Data JPA
* REST APIs

### Database

* MySQL

### Tools

* Git
* GitHub
* VS Code
* IntelliJ IDEA
* Postman

## Database Entities

### User

* id
* name
* email
* password
* role

### Course

* id
* title
* description
* instructor
* category
* duration
* price

### Enrollment

* id
* userId
* courseId
* enrollmentDate
* status


## Author

Nandhini S

Intern ID: CITS3908

Full Stack Development Learning Project
