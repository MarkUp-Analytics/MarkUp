'use strict';

peercentileApp.controller('managerController', ['$scope', 'managerService', 'applicationMessages', 'customDialog', function ($scope, managerService, applicationMessages, customDialog) {

    $scope.applicationMessages = applicationMessages;
    $scope.schoolExists = false;
    $scope.errorCreatingSchool = false;

    $scope.createSchool = function(){ // method to create a new school
        
        if($scope.newSchoolForm && $scope.newSchoolForm.$valid){//Call will be made to server only if the newSchool form is valid
            var loadingDialog = customDialog.loadingDialog(); //To show loading icon until the school is created

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
                
            }, function(error){
                customDialog.errorDialog(error);
            }).finally(function(){
                loadingDialog.close();
            });
        }
    };

}])

