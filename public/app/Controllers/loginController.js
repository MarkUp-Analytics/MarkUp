'use strict';

peercentileApp.controller('loginController', ['$scope','$state', 'schoolList', 'authentication', function ($scope, $state, schoolList, authentication) {
    
    $scope.schoolList = schoolList;

    $scope.checkAuthentication = function () { //Method to login
        if ($scope.signin.$valid) { //Call will be made to server only if the signin form is valid
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

            });
        }
        else {
            if ($scope.signin.schoolName.$invalid || $scope.signin.userName.$invalid || $scope.signin.password.$invalid) {
                $scope.missingRequiredFields = true;
            }
        }

    };
}]);