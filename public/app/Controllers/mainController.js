'use strict';

peercentileApp.controller('mainController', ['$scope', '$rootScope', '$state',  '$location', '$anchorScroll', 'authentication',  function($scope, $rootScope, $state, $location, $anchorScroll, authentication){

    window.$scope = $scope;

    $scope.userInfo = authentication.getUserInfo();
    
    $scope.invalidLogin = false;
    $scope.userNameExists = false;
    $scope.errorCreatingUser = false;

    $scope.scrollTo = function(id){
        $location.hash(id);
        $anchorScroll();
    };

    $scope.createUser = function(){
        authentication.createUser($scope.newUser).then(function(data){
            $scope.userNameExists = false;
            $scope.errorCreatingUser = false;
            if(data.status == 200){
                $state.go(data.data.role);
            }

            else if(data.status == 400){
                if(data.data.msg == "user exists"){
                    $scope.userNameExists = true;
                }

                else if(data.data.msg == "error creating user"){
                    $scope.errorCreatingUser = true;
                }
            }
            
        });
    };

    $scope.checkAuthentication = function(){
        authentication.login($scope.profile).then(function(data){
            $scope.invalidLogin = false;
            if(data.status == 200){
                console.log(data);
                $state.go(data.data.role);
            }

            else{
                $scope.invalidLogin = true;
            }
            
        });

    };

    $scope.logout = function(){
        authentication.removeUserInfo();
        $scope.userInfo = null;
        $location.url('/');
    };

}]);