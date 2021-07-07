'use strict';

peercentileApp.service('classService', ['$http', 
function($http){

    this.getClassList = function(schoolID, batch){ //Method to get all class based on school and batch. 
        return $http.get('/api/getClassList',{params:{schoolID:schoolID, batch:batch}}).then(function(classList){
            return classList.data;
        })
        .catch(function(err){
            return err;
        });
        
    }

    this.saveSubjectLink = function(classID, subjects){ //Method to save subject and teachers inside class
        var params = {classID: classID, subjects:subjects};
        return $http.post('/api/saveSubjectLink', params).then(function(subjectLink){
            return subjectLink.data;
        })
        .catch(function(err){
            return err;
        });
    }


}]);