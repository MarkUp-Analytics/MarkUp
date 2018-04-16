var peercentileApp = angular.module('peercentileApp', [
    'ngRoute'
    , 'ui.router'
    , 'ngStorage'
    , 'ngDialog'
    , 'ui.select'
    , 'ngSanitize'
    ,'mgcrea.ngStrap'
    ,'datatables'
    
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

            .state('main', {
                url: "/main",
                controller: "mainController",
                abstract: true,
                template: '<ui-view/>',
            })

            .state('main.login', {
                url: "/login",
                templateUrl: "./app/Views/login.html",
                resolve:{
                    schoolList: function(schoolService, $q){
                        var deferred = $q.defer();
                        return schoolService.getSchoolList().then(function(schoolList){
                            deferred.resolve(schoolList);
                            return deferred.promise;
                        }, function(err){
                            deferred.reject(err);
                            return deferred.promise;
                        });
                    }
                },
                controller: "loginController"
            })

            .state('main.createUser', {
                url: "/createNewUser",
                templateUrl: "./app/Views/newUser.html",
                data: {// This is the permission array. This state can be accessed by users with manager role and admin role.
                    permission: ["manager", "admin"]
                },
                resolve: {
                    schoolList: (schoolService) => schoolService.getSchoolList()
                },
                controller: function ($scope, schoolList) {
                    $scope.schoolList = schoolList;
                }

            })

            .state('manager', {
                url: "/manager",
                controller: "managerController",
                abstract: true,
                template: '<ui-view/>',
                data: {
                    permission: ["manager"]
                }
            })

            .state('manager.index', {
                url: "/index",
                templateUrl: "./app/Views/manager.html",
                data: {
                    permission: ["manager"]
                }
            })

            .state('main.createSchool', {
                url: "/createNewSchool",
                templateUrl: "./app/Views/newSchool.html",
                data: {// This is the permission array. This state can be accessed by users with manager role only.
                      permission: ["manager"]
                }

            })

            .state('main.createSubject', {
                url: "/createNewSubject",
                templateUrl: "./app/Views/newSubject.html",
                data:{
                    permission: ["manager"]
                },
                
            })

            .state('admin', {
                url: "/admin",
                controller: "adminController",
                abstract: true,
                template: '<ui-view/>',
                data: {
                    permission: ["admin"]
                }
            })

            .state('admin.index', {
                url: "/index",
                templateUrl: "./app/Views/admin.html",
                data: {
                    permission: ["admin"]
                }
            })

            .state('admin.studentLogin', {
                url: "/createStudentLogin",
                templateUrl: "./app/Views/createStudentLogin.html",
                data: {
                    permission: ["admin"]
                }
            })

            .state('admin.teacherLogin', {
                url: "/createTeacherLogin",
                templateUrl: "./app/Views/createTeacherLogin.html",
                data: {
                    permission: ["admin"]
                }
            })

            .state('admin.viewAllStudents', {
                url: "/viewAllStudents/:schoolID",
                templateUrl: "./app/Views/viewAllStudents.html",
                data: {
                    permission: ["admin"]
                },
                params:{
                    schoolID:null
                },
                controller:function($scope, $stateParams, studentService, customDialog){
                    console.log($stateParams.schoolID);
                    var loadingDialog = customDialog.loadingDialog();
                    studentService.getAllStudents({schoolID: $stateParams.schoolID}).then(function(result){
                        $scope.studentArr = result;
                    }, function(){}).finally(function(){
                        loadingDialog.close();
                    });
                }
            })

            .state('admin.viewAllTeachers', {
                url: "/viewAllTeachers/:schoolID",
                templateUrl: "./app/Views/viewAllTeachers.html",
                data: {
                    permission: ["admin"]
                },
                params:{
                    schoolID:null
                },
                controller:function($scope, $stateParams, teacherService, customDialog){
                    console.log($stateParams.schoolID);
                    var loadingDialog = customDialog.loadingDialog();
                    teacherService.getAllTeachers({schoolID: $stateParams.schoolID}).then(function(result){
                        $scope.teachersArr = result;
                    }, function(){}).finally(function(){
                        loadingDialog.close();
                    });
                }
            })

            .state('admin.linkTeachers', {
                url:"/linkTeachers",
                templateUrl:"./app/Views/linkTeachers.html",
                data:{
                    permission: ["admin"]
                },
                controller:"linkTeachersController",
            })

            .state('teacher', {
                url: "/teacher",
                controller: "teacherController",
                abstract: true,
                template: '<ui-view/>',
                data: {
                    permission: ["teacher"]
                }
            })

            .state('teacher.index', {
                url: "/index",
                templateUrl: "./app/Views/teacher.html",
                data: {
                    permission: ["teacher"]
                },
                resolve:{
                    teacherInfo: function(authentication, teacherService){
                        var userInfo = authentication.getUserInfo();
                        var teacherDetails = {};
                        teacherDetails.firstName = userInfo.firstName;
                        teacherDetails.lastName = userInfo.lastName;
                        teacherDetails.userID = userInfo._id;
                        return teacherService.getTeacherInfo(teacherDetails);
                    }
                },
                controller: function ($scope, teacherInfo) {
                    $scope.teacherDetails = teacherInfo;
                }
            })

            .state('student', {
                url: "/student",
                controller: "studentController",
                abstract: true,
                template: '<ui-view/>',
                data: {
                    permission: ["student"]
                }
            })

            .state('student.index', {
                url: "/index",
                templateUrl: "./app/Views/student.html",
                data: {
                    permission: ["student"]
                },
                resolve:{
                    studentInfo: function(authentication, studentService){
                        var userInfo = authentication.getUserInfo();
                        var studentDetails = {};
                        studentDetails.firstName = userInfo.firstName;
                        studentDetails.lastName = userInfo.lastName;
                        studentDetails.userID = userInfo._id;
                        return studentService.getStudentInfo(studentDetails);
                    }
                },
                controller: function ($scope, studentInfo) {
                    $scope.studentDetails = studentInfo;
                }
            })
    }]);

peercentileApp.run(['$rootScope', '$state', '$stateParams', 'authentication',
    function ($rootScope, $state, $stateParams, authentication) {
        /* This part of code is responsible for preventing users from accessing other routes. A student user should not able to see teacher's pages. */

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            var roles = toState.data ? (toState.data.permission ? toState.data.permission : []) : [];

            if (toState.name.indexOf('admin') > -1 || toState.name.indexOf('student') > -1 || toState.name.indexOf('teacher') > -1 || toState.name.indexOf('manager') > -1) {
                //If the state name has the role, then it will check for the permission array in that state to make sure the logged in user has permission or not.

                if (!authentication.isAuthenticated() || roles.indexOf(authentication.getRole()) == -1) {
                    event.preventDefault();
                    $state.go('home');
                }
            }

            //If a user is already logged in, they cannot access login page
            else if ((toState.name == 'main.login' || toState.name == 'home') && authentication.isAuthenticated()) {
                event.preventDefault();
                $state.go(authentication.getRole() + '.index');
            }

        });
    }])



