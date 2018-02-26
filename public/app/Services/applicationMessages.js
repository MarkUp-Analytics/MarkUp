/*
This file contains all the error messages and custom messages that has to be displayed.
*/

'use strict';
peercentileApp.service('applicationMessages',  
function(){
    
    var customMessages = {};

    customMessages.noFileFound = "Please select a file to upload!";
    customMessages.wrongFileExtension = "Please select xlsx/csv file!";
    
    this.getMessage = function(property){ //Method to get custom message
        if(customMessages.hasOwnProperty(property)){
            return customMessages[property];
        }
        else{
            return "Issue displaying the right message";
        }
    }
});