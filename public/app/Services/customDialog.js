/*
This file contains different types of dialog boxes for different messages.
*/

'use strict';
peercentileApp.service('customDialog', ['ngDialog', '$sce',
    function (ngDialog, $sce) {

        this.errorDialog = function (msg) { //Method to get custom message
            ngDialog.open({
                templateUrl: './app/Views/templates/errorDialog-tpl.html',
                data: {
                    msg: $sce.trustAsHtml(msg)
                }
            });
        }

        this.successDialog = function (msg) { //Method to get custom message
            ngDialog.open({
                templateUrl: './app/Views/templates/successDialog-tpl.html',
                data: {
                    msg: $sce.trustAsHtml(msg)
                }
            });
        }

        this.loadingDialog = function(){
            return ngDialog.open({
                template: '<div style="margin:auto;" class="loader"></div><div class="text-lg-center">Loading....</div>',
                showClose: false,
                plain: true
            });

        }
    }]);
