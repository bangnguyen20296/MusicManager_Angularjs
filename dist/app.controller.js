(function () {
    'use strict';

    angular.module('appModule', ['jm.i18next', 'ngAnimate', 'ngSanitize'])
        .controller('myAppCtrl', ['$scope', '$i18next', 'DataService', '$timeout', '$rootScope', function ($scope, $i18next, DataService, $timeout, $rootScope) {
            $scope.data = DataService.data;
            $scope.mySelect = 'en';
            $scope.data.changeLng = 'en';
            $rootScope.hideSpinner = hideSpinner;
            $rootScope.showSpinner = showSpinner;
            $rootScope.isHideLoading2 = true;
            $scope.changeLng = function (language) {
                $timeout(function () {
                    $rootScope.isHideLoading2 = false;
                    $(".loader-spinner").fadeIn("slow");
                    $timeout(function() {
                        $rootScope.isHideLoading2 = true;
                        $i18next.changeLanguage(language);
                        $scope.data.changeLng = language;
                    }, 500);
                }, 100)
            };
            hideSpinner();
            
            function hideSpinner() {
                $timeout(function() {
                    $(".loader-cat").fadeOut("slow");
                    $timeout(function() {
                        $rootScope.isHideLoading = true;
                    }, 400);
                }, 1500);
            }

            function showSpinner() {
                $rootScope.isHideLoading = false;
                $(".loader-cat").fadeIn("slow");
            }
        }]);
})();