/*
Directive to validate pincode when creating new school. Indian pincode has only 6 numbers. This directive checks if the entered pincode has only numbers and have 6 numbers.
*/

'use strict';

peercentileApp.directive('validatePincode', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue === '') return viewValue;

                var hasCorrectLength = viewValue.length === 6;
                var hasOnlyNumbers = viewValue.match(/^[0-9]+$/) != null; //If viewValue has any character, this expression will return null.

                ctrl.$setValidity('inCorrectLength', hasCorrectLength); //Indian pincode should contain 6 numbers.
                ctrl.$setValidity('hasCharacters', hasOnlyNumbers); //Pincode should have only numbers.

                if (hasCorrectLength && hasOnlyNumbers) {
                    return viewValue;
                }

                else {
                    return undefined;
                }

            });
        }
    }
});