(function () {
    'use strict';

    angular.module('myApp')
        .directive('myNav', function (DataService, $routeParams, $location, FormService, $rootScope, $i18next) {
            return {
                restrict: 'EA',
                templateUrl: './app/scripts/directives/nav/nav.html',
                scope: {},
                link: function (scope, element, attr) {
                    scope.constant = DataService.constant;
                    // element.on('click', function () {

                    // });
                    function checkActive() {
                        if ($location.path() === scope.constant.songPath) {
                            scope.songActive = true;
                            scope.playlistActive = false;
                        } else if ($location.path() === scope.constant.playlistPath) {
                            scope.songActive = false;
                            scope.playlistActive = true;
                        }
                    }
                    checkActive();
                    scope.$on('$locationChangeSuccess', function () {
                        checkActive();              
                    });
                    $rootScope.$on('$locationChangeStart', function () { 
                        FormService.closeForm();
                    })
                    // $routeParams = 10;
                    // console.log($routeParams);
                },
                replace: true,
                transclude: true
            }
        });
})();