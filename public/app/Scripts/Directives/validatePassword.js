/*
Directive to validate password when creating new user login. (ONLY FOR ADMIN AND MANAGER)
Password length must be >= 6.
Password must have at least one number.
Password must contain at least one symbol in this list !@#$%^&*()=+_- or a space.
*/

'use strict';

peercentileApp.directive('validatePassword', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue === '') return viewValue;

                var hasGoodLength = viewValue.length >= 6;
                var hasSpecialCharacter = viewValue.search(/[!@#$%^&*() =+_-]/) != -1;
                var hasAtleastOneNumber = viewValue.search(/[0-9]/) != -1; 
                
                ctrl.$setValidity('inCorrectLength', hasGoodLength); //Password length must be >= 6.
                ctrl.$setValidity('noSpecialCharacter', hasSpecialCharacter); //Password must contain at least one symbol in this list !@#$%^&*()=+_- or a space.
                ctrl.$setValidity('noNumber', hasAtleastOneNumber); //Password must have at least one number.

                if (hasGoodLength && hasSpecialCharacter && hasAtleastOneNumber) {
                    return viewValue;
                }

                else {
                    return undefined;
                }

            });
        }
    }
});

/*
Directive to compare password and confirm password field when creating new user login. (ONLY FOR ADMIN AND MANAGER)
*/

peercentileApp.directive('passwordVerify', function(){
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, elem, attrs, ngModel) {
          if (!ngModel) return; // do nothing if no ng-model
  
          // watch confirm password value and re-validate on change
          scope.$watch(attrs.ngModel, function(newVal, oldVal) {
            validate();
          });
  
          // observe the original password value and re-validate on change
          attrs.$observe('passwordVerify', function(val) {
            validate();
          });
  
          var validate = function() {
            // values
            var val1 = ngModel.$viewValue;
            var val2 = attrs.passwordVerify;

            if(!val1 || !val2){ //Original password will be null until it meets password validation
                ngModel.$setValidity('passwordMismatch', true);
            }
            else{
                ngModel.$setValidity('passwordMismatch', val1 === val2);
            }
  
          };
        }
    }
});