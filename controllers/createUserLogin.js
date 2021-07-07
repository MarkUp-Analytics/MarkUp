var csv = require('fast-csv');
var _ = require('underscore');
var classCtrl = require('./classController');
var createRecord = require('../service/createRecord');

var createLogin = {};

var createTeacherLogin = function(userArr, schoolID, callback){
    var userItemsProcessed = 0;
    var userAccCreatedSuccessfully = 0;
    var userAccFailedToCreate = 0;
    var teacherAccCreatedSuccessfully = 0;
    var teacherAccFailedToCreate = 0;
    var teacherItemsProcessed = 0;
    var userErrorMsg = "";
    var teacherErrorMsg = "";
    var teacherSuccessMsg = "";

    userArr.forEach(function(item, index){
        var newUser = {}; //This is to create record in user collection which will be used for login.
        var newTeacher = {}; //This is to create record in student collection.
        
        newUser.firstName = item.firstName;
        newUser.lastName = item.lastName;
        newUser.username = item.teacherID; //Setting teacherID as username for teachers.
        newUser.pwd  = item.DOB; //Setting DOB as password for teachers.
        newUser.schoolID = schoolID;
        newUser.role = "teacher";

        newTeacher.firstName = item.firstName;
        newTeacher.lastName = item.lastName;
        newTeacher.DOB = item.DOB;
        newTeacher.schoolID = schoolID;
                
        createRecord.createUser(newUser).then(function(userFromDB){

            newTeacher.userID = userFromDB.id;
            userAccCreatedSuccessfully++;
            createRecord.createTeacher(newTeacher).then(function(result){
                teacherAccCreatedSuccessfully++;
                teacherSuccessMsg = "Successfully created " + teacherAccCreatedSuccessfully + " teacher(s).";

            }, function(err){ //error function if creating student record fails
                teacherAccFailedToCreate++;
                var msg = (err.msg ? err.msg : "unable to create teacher record.") + "\n";
                teacherErrorMsg += newTeacher.firstName.toString() + " " + newTeacher.lastName.toString() + " " + msg;

            }).finally(function(){

                teacherItemsProcessed++;

                if((userAccCreatedSuccessfully + userAccFailedToCreate) === userArr.length && teacherItemsProcessed == userAccCreatedSuccessfully){ //Function will return on satisfying 2 conditions, 1. when all user accounts promises are either resolved or rejected. 2. Teacher record promise will be called only when user record is created and it should match the number of user accounts created successfully.
                    if(userErrorMsg || teacherErrorMsg){
                        callback({status:"failure", msg: userErrorMsg + teacherErrorMsg + teacherSuccessMsg});
                    }
                    else{
                        callback(null, {status:"success", msg:"Successfully created " + userArr.length + " teacher(s)."});
                    }
                }

            });

        },function(err){ //error function if creating user login fails
            userAccFailedToCreate++;
            var msg = (err.msg ? err.msg : "unable to create user account.") + "\n";
            userErrorMsg += newTeacher.firstName.toString() + " " + newTeacher.lastName.toString() + " " + msg;
        }).finally(function(){
            userItemsProcessed++;
            if(userItemsProcessed === userArr.length && userAccFailedToCreate === userArr.length){ //This code will run only when all the user accounts are failed to create. 
                callback({status:"failure", msg: userErrorMsg});
            }
        });


        });
};

var createStudentLogin = function(userArr, classArr, schoolID, callback){
    
    var userItemsProcessed = 0;
    var userAccCreatedSuccessfully = 0;
    var userAccFailedToCreate = 0;
    var studentAccCreatedSuccessfully = 0;
    var studentAccFailedToCreate = 0;
    var studentItemsProcessed = 0;
    var userErrorMsg = "";
    var studentErrorMsg = "";
    var studentSuccessMsg = "";

    userArr.forEach(function(item, index){
        var newUser = {}; //This is to create record in user collection which will be used for login.
        var newStudent = {}; //This is to create record in student collection.
        
        newUser.firstName = item.firstName;
        newUser.lastName = item.lastName;
        newUser.username = item.rollNo; //Setting roll number as username for students.
        newUser.pwd  = item.DOB; //Setting DOB as password for students.
        newUser.schoolID = schoolID;
        newUser.role = "student";

        newStudent.firstName = item.firstName;
        newStudent.lastName = item.lastName;
        newStudent.DOB = item.DOB;
        newStudent.schoolID = schoolID;
        var obj = _.find(classArr, function (classObj) { return classObj.class === item.class && classObj.section === item.section; });// Get the class ID from classArr by comparing student class and section.
        if(obj){
            newStudent.classID = obj.classID;
        }
        
        createRecord.createUser(newUser).then(function(userFromDB){

            newStudent.userID = userFromDB.id;
            userAccCreatedSuccessfully++;
            createRecord.createStudent(newStudent).then(function(result){
                studentAccCreatedSuccessfully++;
                studentSuccessMsg = "Successfully created " + studentAccCreatedSuccessfully + " student(s).";

            }, function(err){ //error function if creating student record fails
                studentAccFailedToCreate++;
                var msg = (err.msg ? err.msg : "unable to create student record.") + "\n";
                studentErrorMsg += newStudent.firstName.toString() + " " + newStudent.lastName.toString() + " " + msg;

            }).finally(function(){

                studentItemsProcessed++;

                if((userAccCreatedSuccessfully + userAccFailedToCreate) === userArr.length && studentItemsProcessed == userAccCreatedSuccessfully){ //Function will return on 2 conditions, 1. when all user accounts promises are either resolved or rejected. 2. Student record promise will be called only when user record is created and it should match the number of user accounts created successfully.
                    if(userErrorMsg || studentErrorMsg){
                        callback({status:"failure", msg: userErrorMsg + studentErrorMsg + studentSuccessMsg});
                    }
                    else{
                        callback(null, {status:"success", msg:"Successfully created " + userArr.length + " student(s)."});
                    }
                }

            });

        },function(err){ //error function if creating user login fails
            userAccFailedToCreate++;
            var msg = (err.msg ? err.msg : "unable to create user account.") + "\n";
            userErrorMsg += newStudent.firstName.toString() + " " + newStudent.lastName.toString() + " " + msg;
        }).finally(function(){
            userItemsProcessed++;
            if(userItemsProcessed === userArr.length && userAccFailedToCreate === userArr.length){ //This code will run only when all the user accounts are failed to create. 
                callback({status:"failure", msg: userErrorMsg});
            }
        });


        });
    
}

createLogin.student = function(filePath, loggedinUserInfo, batchYear, callback){
    var classArr = [];
    var userArr = [];

    csv.fromPath(filePath, 
        {   headers:true, 
            ignoreEmpty:true,
        })
            .on("data", function(data){
                var classObj = {};
                classObj.class = data.class;
                classObj.section = data.section;
                classArr.push(classObj);
                userArr.push(data);
            })
            .on("end", function(){
                classArr = classArr.filter((classObj, index, self) => self.findIndex(t => t.class === classObj.class && t.section === classObj.section) === index); //To remove duplicate class objects from classArr

                var itemsProcessed = 0;
                var classCreatedSuccessfully = 0;
                var failureCreatingClass = 0;
                var errorMsg = "";

                classArr.forEach(function(item, index){
                    classCtrl.getClassID(item, loggedinUserInfo.schoolID, batchYear).then(function(classID){
                        classCreatedSuccessfully++;
                        item.classID = classID;

                    }, function(err){
                        failureCreatingClass++;
                        errorMsg += "Error creating class: " + item.class + " Section: " + item.section + "\n";

                    }).finally(function(){
                        itemsProcessed++;

                        if(itemsProcessed === classArr.length) {
                            if(failureCreatingClass == 0){
                                createStudentLogin(userArr, classArr, loggedinUserInfo.schoolID, function(err, result){
                                    if(err){
                                        callback(err);
                                    }
                                    else{
                                        callback(null, result);
                                    }
                                });
                            }
                            else{
                                callback({status:"failure", msg:errorMsg});
                            }
                            
                          }

                    });
                });

            });

};

createLogin.teacher = function(filePath, loggedinUserInfo, callback){
    var userArr = [];

    csv.fromPath(filePath, 
        {   headers:true, 
            ignoreEmpty:true,
        })
            .on("data", function(data){
                userArr.push(data);
            })
            .on("end", function(){
                
                createTeacherLogin(userArr, loggedinUserInfo.schoolID, function(err, result){
                    if(err){
                        callback(err);
                    }
                    else{
                        callback(null, result);
                    }
                });

            });

};

module.exports = createLogin;