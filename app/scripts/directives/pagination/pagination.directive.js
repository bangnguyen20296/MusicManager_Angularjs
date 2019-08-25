(function () {
    'use strict';

    angular.module('pagiModule', ['jm.i18next', 'ngSanitize', 'ngRoute'])
        .directive('myPagination', function () {
            return {
                restrict: 'EA',
                templateUrl: './app/scripts/directives/pagination/pagination.html',
                scope: {                    
                    config: '=',
                    list: '=',
                    itemList: '='
                },
                controller: 'myPaginationCtrl',
                controllerAs: 'vmPagi'
            }
        })

        .controller('myPaginationCtrl', function ($scope, PaginationService) {
            var vmPagi = this;
            
            vmPagi.config = $scope.config;          
            vmPagi.list = $scope.list;
            vmPagi.itemList = $scope.itemList;

            initialize();

            function initController() {
                vmPagi.setPage(1);
            };

            function setPage(page) {
                if (page < 1 || page > vmPagi.pager.totalPages) {
                    return;
                }
                vmPagi.page = page;
                getData(vmPagi.list);
            };

            function getData(list) {
                // get pager object from service
                vmPagi.pager = PaginationService.GetPager(list.length, vmPagi.page);
                // get current page of items
                vmPagi.items = list.slice(vmPagi.pager.startIndex, vmPagi.pager.endIndex + 1);
                vmPagi.config.itemList = vmPagi.items;
                return vmPagi.items;
            };

            ///////////////////////////////
            function initialize() {
                vmPagi.pager = {};
                vmPagi.setPage = setPage;
                initController();
            };

            $scope.$watch('list.length', function (newVal, oldVal) {
                if(newVal !== oldVal) {
                    getData(vmPagi.list);
                }
            });
            
        })
})();