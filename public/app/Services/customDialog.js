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
    }]);
