/*
This file contains all the error messages and custom messages that has to be displayed.
*/

'use strict';
peercentileApp.service('applicationMessages',  
function(){
    
    var customMessages = {};

    customMessages.noFileFound = "Please select a file to upload!";
    customMessages.wrongFileExtension = "Please select xlsx/csv file!";
    customMessages.schoolExists = "School name already exists!";
    customMessages.userNameExists = "User name already exists!";
    customMessages.errorCreatingSchool = "Error creating new School! Contact development team to fix the issue!";
    customMessages.errorCreatingUser = "Error creating new User!";
    customMessages.schoolListErr = "Failed to get school list from server!";
    customMessages.schoolCreated = "A new school is successfully created!";
    customMessages.invalidPincode = "Pincode is invalid!";
    customMessages.invalidPassword = "Password is not valid!";
    customMessages.passwordMismatch = "Password didnot match!";
    customMessages.fileUploaded = "File successfully uploaded!";
    customMessages.subjectNameExists = "Subject name already exists!";
    customMessages.subjectCreated = "A subject is successfully created!";
    customMessages.noClassesFound = "No classes found for the selected year!";
    customMessages.subjectTeacherLinkSuccess = "Successfully linked subjects and teachers.";
    customMessages.teacherArrayEmpty = "Select at least one teacher for the selected subjects.";
    customMessages.selectgraduationYear = "Select the anticipated graduation year to fetch the class details.";
    customMessages.selectClass = "Select a class to link teachers and subjects.";
    
    
    this.getMessage = function(property){ //Method to get custom message
        if(customMessages.hasOwnProperty(property)){
            return customMessages[property];
        }
        else{
            return "Issue displaying the right message";
        }
    }
});