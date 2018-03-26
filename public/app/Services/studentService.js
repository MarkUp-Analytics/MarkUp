/* This file contains services that will be used by user with student roles. This gets the individual logged in student details. */
'use strict';

peercentileApp.service('studentService', ['$http', 
function($http){
    
    this.getStudentInfo = function(studentDetails){ //Method to create a new user. 
        return $http.post('/api/getStudentInfo', studentDetails).then(function(data){
            return data.data;
        })
        .catch(function(err){
            return err;
        });
        
    }

    this.getAllStudents = function(schoolID){
        return $http.post('/api/getAllStudents', schoolID).then(function(data){
            return data.data;
        })
        .catch(function(err){
            return err;
        });
    }


}]);