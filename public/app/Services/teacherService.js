/* This file contains services that will be used by user with student roles. This gets the individual logged in student details. */
'use strict';

peercentileApp.service('teacherService', ['$http', 
function($http){
    
    this.getTeacherInfo = function(teacherDetails){ //Method to create a new user. 
        return $http.post('/api/getTeacherInfo', teacherDetails).then(function(data){
            return data.data;
        })
        .catch(function(err){
            return err;
        });
        
    }

    this.getAllTeachers = function(schoolID){
        return $http.post('/api/getAllTeachers', schoolID).then(function(data){
            return data.data;
        })
        .catch(function(err){
            return err;
        });
    }



}]);