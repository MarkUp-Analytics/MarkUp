var peercentileApp = angular.module('peercentileApp', [
    'ngRoute'
    , 'ui.router'
    , 'ngStorage'

]);


peercentileApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                
                templateUrl: "./app/Views/home.html"
                
            })

            .state('about', {
                url: "/about",
                templateUrl: "./app/Views/menuPages/about.html"
            })

            .state('howItWorks', {
                url: "/howItWorks",
                templateUrl: "./app/Views/menuPages/howItWorks.html"
            })

            .state('pricing', {
                url: "/pricing",
                templateUrl: "./app/Views/menuPages/pricing.html"
            })

            .state('terms', {
                url: "/terms",
                templateUrl: "./app/Views/menuPages/terms.html"
            })

            .state('privacy', {
                url: "/privacy",
                templateUrl: "./app/Views/menuPages/privacy.html"
            })

            .state('disclosure', {
                url: "/disclosure",
                templateUrl: "./app/Views/menuPages/disclosure.html"
            })

            .state('team', {
                url: "/team",
                templateUrl: "./app/Views/menuPages/team.html"
            })

            .state('contact', {
                url: "/contact",
                templateUrl: "./app/Views/menuPages/contact.html"
            })

            .state('login', {
                url: "/login",
                templateUrl: "./app/Views/login.html"
            })

            .state('createUser', {
                url: "/createNewUser",
                templateUrl: "./app/Views/newUser.html"
            })

            .state('admin', {
                url: "/admin",
                controller: "adminController",
                templateUrl: "./app/Views/admin.html"
            })
    }]);