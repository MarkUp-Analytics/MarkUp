/* This file contains services that will be used by user with teacher roles. This gets the individual logged in teacher details. */
'use strict';

peercentileApp.service('teacherService', ['$http', 
function($http){
    
    this.getTeacherInfo = function(teacherDetails){ //Method to get teacher info. 
        return $http.post('/api/getTeacherInfo', teacherDetails).then(function(data){
            return data.data;
        })
        .catch(function(err){
            return err;
        });
        
    }

    this.getMyClassWithSubjects = function(schoolID, teacherID){ //Method to get classes and subjects the current teacher is associated with. 
        return $http.get('/api/getMyClassWithSubjects',{params:{schoolID:schoolID, teacherID:teacherID}}).then(function(ClassWithSubjects){
            return ClassWithSubjects.data;
        })
        .catch(function(err){
            return err;
        });
        
    }


    this.getAllTeachers = function(schoolID){ //Method to get all teachers of a school.
        return $http.post('/api/getAllTeachers', schoolID).then(function(data){
            return data.data;
        })
        .catch(function(err){
            return err;
        });
    }



}]);