var Promise = require('bluebird');
var user = require('../models/users');
var student = require('../models/students');
var teacher = require('../models/teachers');
var crypto = require('crypto');

var createRecord = {};

createRecord.createUser = function(userDetails){ //Method to create user record used for login.
    return new Promise(function(resolve, reject){
        user.findOne({
            $and: [
                { username: userDetails.username },
                { schoolID: userDetails.schoolID },
                { recordStatusFlag: 'Active'}
            ]
        }).exec(function (err, userFromDB) {
            if (err) { reject(err); }
    
            else if (userFromDB) {
                reject({status:"failure", msg: "user exists"});
            }
    
            else {           // If there are no users found in DB then create an account
                                  
                var newUser = {};
                newUser.username = userDetails.username;
                newUser.firstName = userDetails.firstName;
                newUser.lastName = userDetails.lastName;
                newUser.schoolID = userDetails.schoolID;
                newUser.role = userDetails.role;
                newUser.salt = crypto.randomBytes(16).toString('hex');
                newUser.hash = crypto.pbkdf2Sync(userDetails.pwd, newUser.salt, 1000, 64, 'sha512').toString('hex');
                newUser.recordStatusFlag = "Active";
                newUser.recordCreatedDate = new Date();
                newUser.recordLastModified = new Date();
    
                user.create(newUser, function (err, result) {
                    if (err) {
                        reject({status:"failure", msg: "error creating user\n" + err.message});
                    }
                    resolve(result);
                });
            }
        });
    })


};


createRecord.createStudent = function(studentDetails){
    return new Promise(function(resolve, reject){
        student.findOne({
            $and: [
                { firstName: studentDetails.firstName },
                { lastName: studentDetails.lastName },
                { classID: studentDetails.classID },
                { recordStatusFlag: "Active" }
            ]
        }).exec(function (err, studentFromDB) {
            if (err) { throw err; }
    
            else if (studentFromDB) {
                reject({status:"failure", msg: "Student already exists"});
            }
    
            else {           // If there are no student found in DB then create an account
                var newStudent = {};
                newStudent.DOB = studentDetails.DOB;
                newStudent.firstName = studentDetails.firstName;
                newStudent.lastName = studentDetails.lastName;
                newStudent.classID = studentDetails.classID;
                newStudent.userID = studentDetails.userID;
                newStudent.schoolID = studentDetails.schoolID;
                newStudent.recordStatusFlag = "Active";
                newStudent.recordCreatedDate = new Date();
                newStudent.recordLastModified = new Date();

                student.create(newStudent, function (err, result) {
                    if (err) {
                        reject({status:"failure", msg: "error creating Student.\n" + err.message});
                    }
                    resolve(result);
                    
                });

            }
        });
    });
    

};

createRecord.createTeacher = function(teacherDetails){
    return new Promise(function(resolve, reject){
        teacher.findOne({
            $and: [
                { firstName: teacherDetails.firstName },
                { lastName: teacherDetails.lastName },
                { DOB: teacherDetails.DOB },
                { recordStatusFlag: "Active" }
            ]
        }).exec(function (err, teacherFromDB) {
            if (err) { throw err; }
    
            else if (teacherFromDB) {
                reject({status:"failure", msg: "Teacher already exists"});
            }
    
            else {           // If there are no teacher found in DB then create an account
                var newTeacher = {};
                newTeacher.DOB = teacherDetails.DOB;
                newTeacher.firstName = teacherDetails.firstName;
                newTeacher.lastName = teacherDetails.lastName;
                newTeacher.userID = teacherDetails.userID;
                newTeacher.schoolID = teacherDetails.schoolID;
                newTeacher.recordStatusFlag = "Active";
                newTeacher.recordCreatedDate = new Date();
                newTeacher.recordLastModified = new Date();

                teacher.create(newTeacher, function (err, result) {
                    if (err) {
                        reject({status:"failure", msg: "error creating Teacher.\n" + err.message});
                    }
                    resolve(result);
                    
                });

            }
        });
    });
    

};

module.exports = createRecord;