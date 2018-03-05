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
    customMessages.errorCreatingSchool = "Error creating new School! Contact development team to fix the issue!";
    customMessages.schoolListErr = "Failed to get school list from server!";
    customMessages.schoolCreated = "A new school is successfully created!";
    
    
    this.getMessage = function(property){ //Method to get custom message
        if(customMessages.hasOwnProperty(property)){
            return customMessages[property];
        }
        else{
            return "Issue displaying the right message";
        }
    }
});