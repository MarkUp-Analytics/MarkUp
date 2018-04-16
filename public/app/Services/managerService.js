/* This file contains services that will be used by user with Manager roles. Manager roles are assigned only to Markup employees who will take care of creating new schools. */
'use strict';

peercentileApp.service('managerService', ['$http', 'authentication', 
function($http, authentication){
    var userInfo = {};

    userInfo = authentication.getUserInfo();

    this.createSchool = function(newSchool){ //Method to create a new user. 
        return $http.post('/api/createSchool', newSchool).then(function(data){
            return data;
        })
        .catch(function(err){
            return err;
        });
        
    }

    this.createSubject = function(newSubject){
        return $http.post('/api/createSubject', newSubject).then(function(data){
            return data;
        })
        .catch(function(err){
            return err;
        });
    }


}]);