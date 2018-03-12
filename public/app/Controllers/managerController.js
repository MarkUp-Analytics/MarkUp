'use strict';

peercentileApp.controller('managerController', ['$scope', 'managerService', 'applicationMessages', 'customDialog', function ($scope, managerService, applicationMessages, customDialog) {

    $scope.applicationMessages = applicationMessages;
    $scope.schoolExists = false;
    $scope.errorCreatingSchool = false;

    $scope.createSchool = function(){ // method to create a new school
        
        if($scope.newSchoolForm && $scope.newSchoolForm.$valid){//Call will be made to server only if the newSchool form is valid
            managerService.createSchool($scope.newSchool).then(function(data){
                $scope.schoolExists = false;
                $scope.errorCreatingSchool = false;
                if(data.status == 200){
                    customDialog.successDialog(applicationMessages.getMessage("schoolCreated"));
                }
    
                else if(data.status == 400){
                    if(data.data.msg == "school name exists"){
                        $scope.schoolExists = true;  //Flag to show error
                    }
    
                    else if(data.data.msg == "error creating school"){
                        $scope.errorCreatingSchool = true; //Flag to show error
                    }
                }
                
            });
        }
    };

}])

