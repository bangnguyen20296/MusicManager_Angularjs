(function () {
    'use strict';

    angular.module('formModule', ['jm.i18next', 'ngAnimate', 'ngSanitize', 'ngRoute', 'oitozero.ngSweetAlert'])
        .directive('myForm', function () {
            return {
                restrict: 'EA',
                templateUrl: './app/scripts/directives/form/form.html',
                scope: {
                    config: '=',
                    link: '=',
                    list: '='
                },
                controller: 'myFormCtrl',
                controllerAs: 'vmForm'
            }
        })
        .controller('myFormCtrl', function ($scope, $location) {
            var vmForm = this;

            // vmForm.config = angular.extend(FormService.state, $scope.config);
            vmForm.config = $scope.config;
            vmForm.link = $scope.link;

            vmForm.path = $location.path();
            if ($location.path() === vmForm.config.playlistPath) {
                angular.element('small').css({ 'margin-left': '113px' });
            };

            vmForm.closeForm = closeForm;
            vmForm.submitForm = submitForm;

            // CLOSE Form
            function closeForm() {
                (vmForm.config.closeFormCb || angular.noop)();
            };

            // SUBMIT Form
            function submitForm() {
                (vmForm.config.submitFormCb || angular.noop)();
            }

            function changePathThenAssignLanguage(opt1, opt2) {
                vmForm.config.title = `${opt1}.form.${opt2}.title`;
                vmForm.config.titleBtn = `form.${opt2}_titleBtn`;
                vmForm.config.labelInput1 = `${opt1}.form.labelInput1`;
                vmForm.config.labelInput2 = `${opt1}.form.labelInput2`;
                vmForm.config.warning1 = `${opt1}.form.warning1`;
                vmForm.config.warning2 = `${opt1}.form.warning2`;
            };
            function changeLanguage(option) {
                if (vmForm.path === vmForm.config.songPath) {
                    changePathThenAssignLanguage('song', option);
                } else if (vmForm.path === vmForm.config.playlistPath) {
                    changePathThenAssignLanguage('playlist', option);
                }
            };

            $scope.$watch('vmForm.link.isAddForm', function (newVal, oldVal) {
                if (newVal) {
                    changeLanguage('create');
                }
            });

            $scope.$watch('vmForm.link.isEditForm', function (newVal, oldVal) {
                if (newVal) {
                    changeLanguage('edit');
                }
            });
        })
})();