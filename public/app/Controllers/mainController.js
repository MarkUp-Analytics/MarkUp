'use strict';

peercentileApp.controller('mainController', ['$scope', '$rootScope', '$state', '$location', '$anchorScroll', 'authentication', 'managerService', 'applicationMessages', 'schoolService', 'customDialog', function ($scope, $rootScope, $state, $location, $anchorScroll, authentication, managerServices, applicationMessages, schoolService, customDialog) {

    window.$scope = $scope;
    $scope.$state = $state;

    $scope.userInfo = authentication.getUserInfo();
    $scope.applicationMessages = applicationMessages;

    $scope.profile = {};

    $scope.invalidLogin = false;
    $scope.userNameExists = false;
    $scope.errorCreatingUser = false;
    $scope.missingRequiredFields = false;

    $scope.scrollTo = function (id) {
        $location.hash(id);
        $anchorScroll();
    };

    $scope.createUser = function () { // method to create a new user
        if($scope.newUserForm && $scope.newUserForm.$valid){//Call will be made to server only if the newUser form is valid
                authentication.createUser($scope.newUser).then(function (data) {
                    $scope.userNameExists = false;
                    $scope.errorCreatingUser = false;
                    if (data.status == 200) {
                        customDialog.successDialog("Username " + data.data.username + " successfully created!");
                        $state.go(data.data.role + '.index');
                    }
        
                    else if (data.status == 400) {
                        if (data.data.msg == "user exists") {
                            customDialog.errorDialog(applicationMessages.getMessage('userNameExists'));
                        }
        
                        else if (data.data.msg == "error creating user") {
                            customDialog.errorDialog(applicationMessages.getMessage('errorCreatingUser'));
                        }
                    }
        
                });
            }
        
    };

    $scope.logout = function () {
        authentication.removeUserInfo();
        $scope.userInfo = null;
        $location.url('/');
    };

}])

