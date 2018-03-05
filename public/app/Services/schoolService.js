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


}]);