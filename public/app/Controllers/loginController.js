'use strict';

peercentileApp.controller('loginController', ['$scope','$state', 'schoolList', 'authentication', 'customDialog', function ($scope, $state, schoolList, authentication, customDialog) {
    
    $scope.schoolList = schoolList;

    $scope.checkAuthentication = function () { //Method to login
        if ($scope.signin.$valid) { //Call will be made to server only if the signin form is valid
            
            var loadingDialog = customDialog.loadingDialog(); //To show loading icon until it login the user

            authentication.login($scope.profile).then(function (data) {
                $scope.invalidLogin = false;
                $scope.missingRequiredFields = false;
                if (data.status == 200) {
                    var stateName = data.data.role + ".index";
                    $state.go(stateName);
                }

                else {
                    $scope.invalidLogin = true; //Flag to show error
                }

            }, function(error){
                customDialog.errorDialog(error);
            }).finally(function(){
                loadingDialog.close(); //Closing the dialog once the promise is resolved.
            });
        }
        else {
            if ($scope.signin.schoolName.$invalid || $scope.signin.userName.$invalid || $scope.signin.password.$invalid) {
                $scope.missingRequiredFields = true;
            }
        }

    };
}]);