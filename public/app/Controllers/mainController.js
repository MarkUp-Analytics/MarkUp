'use strict';

peercentileApp.controller('mainController', ['$scope', '$rootScope', '$state', '$location', '$anchorScroll', 'authentication', function ($scope, $rootScope, $state, $location, $anchorScroll, authentication) {

    window.$scope = $scope;
    $scope.$state = $state;

    $scope.userInfo = authentication.getUserInfo();

    $scope.invalidLogin = false;
    $scope.userNameExists = false;
    $scope.errorCreatingUser = false;

    $scope.scrollTo = function(id){
        $location.hash(id);
        $anchorScroll();
    };

    $scope.createUser = function(){ // method to create a new user
        authentication.createUser($scope.newUser).then(function(data){
            $scope.userNameExists = false;
            $scope.errorCreatingUser = false;
            if(data.status == 200){
                $state.go(data.data.role);
            }

            else if(data.status == 400){
                if(data.data.msg == "user exists"){
                    $scope.userNameExists = true;  //Flag to show error
                }

                else if(data.data.msg == "error creating user"){
                    $scope.errorCreatingUser = true; //Flag to show error
                }
            }
            
        });
    };

    $scope.checkAuthentication = function(){ //Method to login
        if($scope.signin.$valid){ //Call will be made to server only if the form is valid
            authentication.login($scope.profile).then(function (data) {
                $scope.invalidLogin = false;
                if(data.status == 200){
                    var stateName = data.data.role + ".index";    
                    $state.go(stateName);
                }

                else{
                    $scope.invalidLogin = true; //Flag to show error
                }

            });
        }

    };

    $scope.logout = function(){
        authentication.removeUserInfo();
        $scope.userInfo = null;
        $location.url('/');
    };

}])

