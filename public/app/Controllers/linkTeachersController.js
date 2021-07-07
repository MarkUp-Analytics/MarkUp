'use strict';

peercentileApp.controller('linkTeachersController', ['$scope', '$location', 'authentication', 'fileUpload', 'applicationMessages', 'customDialog', 'classService', 'schoolService', 'teacherService',
    function ($scope, $location, authentication, fileUpload, applicationMessages, customDialog, classService, schoolService, teacherService) {

        $scope.userInfo = authentication.getUserInfo();
        $scope.applicationMessages = applicationMessages;
        $scope.session = {};
        //   $scope.selectedObj = {};
        $scope.teacherArrayEmpty = false;
        $scope.today = new Date();
        $scope.yearArr = [];
        for (var i = 0; i < 5; i++) {
            $scope.yearArr.push(($scope.today.getFullYear() + i).toString());
        }

        schoolService.getSchoolDetails($scope.userInfo.schoolID).then(function (result) {
            $scope.schoolDetails = result;
            schoolService.getSubjectList(result.board).then(function (subjectList) {//Get subjects based on school board name.
                $scope.subjectList = subjectList;
            })
        });

        teacherService.getAllTeachers({ schoolID: $scope.userInfo.schoolID }).then(function (result) { //Get all active teachers who belongs to that school.
            $scope.teacherList = result;
            if ($scope.teacherList.length > 0) { //create an extra property to display class and section together.
                $scope.teacherList.forEach(function (item) {
                    item.displayText = item.firstName + " " + item.lastName;
                });
            }
        });


        $scope.getClassList = function (batch) {
            var loadingDialog = customDialog.loadingDialog();
            classService.getClassList($scope.userInfo.schoolID, batch).then(function (result) {
                $scope.classList = result;
                if ($scope.classList.length === 0) {
                    customDialog.errorDialog(applicationMessages.getMessage('noClassesFound'));
                }

                else { //create an extra property to display class and section together.
                    $scope.classList.forEach(function (item) {
                        item.displayText = item.class + " - " + item.section;
                    });
                }
            }, function () { }).finally(function () {
                loadingDialog.close();
            });
        };

        $scope.saveSubjectLink = function () {
            $scope.teacherArrayEmpty = false;
            if ($scope.session.selectedObj.subjects) {
                for (var key in $scope.session.selectedObj.subjects) {// To make sure teacher array is not empty. If a subject is selected, it must have atleast one teacher.
                    if ($scope.session.selectedObj.subjects[key].subjectID && (!$scope.session.selectedObj.subjects[key].teacherArray || $scope.session.selectedObj.subjects[key].teacherArray.length === 0)) {
                        $scope.teacherArrayEmpty = true;
                    }
                }

                if (!$scope.teacherArrayEmpty) {
                    var loadingDialog = customDialog.loadingDialog(); //To show loading icon until the subject teacher link is created

                    classService.saveSubjectLink($scope.session.selectedObj._id, $scope.session.selectedObj.subjects).then(function () {
                        customDialog.successDialog(applicationMessages.getMessage('subjectTeacherLinkSuccess'));
                    }, function (error) {
                        customDialog.errorDialog(error);
                    }).finally(function () {
                        loadingDialog.close();
                    });
                }
            }

        };

        $scope.updateSessionObj = function (subjectName, modelVal) {
            if (!modelVal) {
                $scope.session.selectedObj.subjects[subjectName] = {};
            }

        };

    }])
