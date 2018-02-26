/*
This file contains different types of dialog boxes for different messages.
*/

'use strict';
peercentileApp.service('customDialog', ['ngDialog',
    function (ngDialog) {

        this.errorDialog = function (msg) { //Method to get custom message
            ngDialog.open({
                templateUrl: './app/Views/templates/errorDialog-tpl.html',
                data: {
                    msg: msg
                }
            });
        }
    }]);
