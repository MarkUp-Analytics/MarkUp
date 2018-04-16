/* This file contains services that will be used by user with Manager roles. Manager roles are assigned only to Markup employees who will take care of creating new schools. */
'use strict';

peercentileApp.service('schoolService', ['$http', 
function($http){

    this.getSchoolList = function(){ //Method to get schools list for login page. 
        return $http.get('/api/getSchoolList').then(function(schoolList){
            return schoolList.data;
        })
        .catch(function(err){
            return err;
        });
        
    }

    this.getSchoolDetails = function(schoolIDVal){ //Method to get schools list for login page. 
        return $http.get('/api/getSchoolDetails', {params:{schoolID:schoolIDVal}}).then(function(school){
            return school.data;
        })
        .catch(function(err){
            return err;
        });
        
    }

    this.getSubjectList = function(boardNameVal){ //Method to get schools list for login page. 
        return $http.get('/api/getSubjectList', {params:{boardName:boardNameVal}}).then(function(subjectList){
            return subjectList.data;
        })
        .catch(function(err){
            return err;
        });
        
    }



}]);