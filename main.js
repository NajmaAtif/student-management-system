#! /usr/bin/env node
import inquirer from "inquirer";
// import chalk from "chalk";
class student {
    id;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(id, name, coursesEnrolled, feesAmount) {
        this.id = id;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let students = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "please select an option:\n",
        choices: ["Enroll a Student", "Show Student Status"]
    });
    if (action.ans === "Enroll a Student") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please Enter Your Name:"
        });
        let trimmedStudentName = (studentName.ans).trim().toLowerCase();
        let studentNameCheck = students.map(obj => obj.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "STID" + baseId;
                console.log("\n\tYour account has been created");
                console.log(`Welcome, ${trimmedStudentName}!`);
                let course = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please Select a Course",
                    choices: ["IT", "English", "Amazon"]
                });
                let courseFees = 0;
                switch (course.ans) {
                    case "IT":
                        courseFees = 5000;
                        break;
                    case "English":
                        courseFees = 500;
                        break;
                    case "Amazon":
                        courseFees = 200;
                        break;
                }
                let courseConfirm = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course?"
                });
                if (courseConfirm.ans === true) {
                    let Student = new student(studentId, trimmedStudentName, [course.ans], courseFees);
                    students.push(Student);
                    console.log("You have enrolled in this course!");
                }
            }
            else {
                console.log("Invalid Name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else if (action.ans === "Show Student Status") {
        if (students.length !== 0) {
            let studentNamesCheck = students.map(e => e.name);
            let selectedStudent = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please Select Name",
                choices: studentNamesCheck
            });
            let foundStudent = students.find(Student => Student.name === selectedStudent.ans);
            console.log("student information");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("Record is Empty");
        }
    }
    let userConfirm = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do You Want to continue?"
    });
    if (userConfirm.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
