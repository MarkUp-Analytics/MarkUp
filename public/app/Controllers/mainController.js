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

    $scope.getSchoolList = function () {
        schoolService.getSchoolList().then(function (list) {
            $scope.$apply(function () {
                $scope.schoolList = list;
                Console.log($scope.schoolList);
            });

        }, function (err) {
            console.log(applicationMessages.getMessages("schoolListErr"));
        });
    };

    $scope.gotoLoginPage = function () {
        $state.go('main.login', { reload: false });
    };


    $scope.scrollTo = function (id) {
        $location.hash(id);
        $anchorScroll();
    };

    $scope.createUser = function () { // method to create a new user
        authentication.createUser($scope.newUser).then(function (data) {
            $scope.userNameExists = false;
            $scope.errorCreatingUser = false;
            if (data.status == 200) {
                $state.go(data.data.role + '.index');
            }

            else if (data.status == 400) {
                if (data.data.msg == "user exists") {
                    $scope.userNameExists = true;  //Flag to show error
                }

                else if (data.data.msg == "error creating user") {
                    $scope.errorCreatingUser = true; //Flag to show error
                }
            }

        });
    };

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

    $scope.logout = function () {
        authentication.removeUserInfo();
        $scope.userInfo = null;
        $location.url('/');
    };

}])

