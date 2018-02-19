var peercentileApp = angular.module('peercentileApp', [
    'ngRoute'
    ,'ui.router'
    , 'ngStorage'

]);


peercentileApp.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('home',{
                    url:"/home",
                    templateUrl: "./app/Views/home.html"
                })

                .state('login',{
                    url:"/login",
                    templateUrl: "./app/Views/login.html"
                })

                .state('createUser', {
                    url:"/createNewUser",
                    templateUrl:"./app/Views/newUser.html"
                })

                .state('admin',{
                    url:"/admin",
                    controller:"adminController",
                    templateUrl:"./app/Views/admin.html"
                })
}]);