(function () {
    'use strict';

    angular.module('doubleTableModule', ['jm.i18next', 'ngAnimate', 'ngSanitize', 'ngRoute', 'oitozero.ngSweetAlert'])
        .directive('doubleTable', function () {
            return {
                restrict: 'EA',
                templateUrl: './app/scripts/directives/double-table/double-table.html',
                scope: {
                    config: '=',
                    link: '=',
                    leftData: '=',
                    rightData: '='
                },
                controller: 'myDoubleTableCtrl',
                controllerAs: 'vmDoubleTable',
            }
        })
        .controller('myDoubleTableCtrl', function ($scope, $route, $location) {
            var vmDoubleTable = this;
            vmDoubleTable.config = $scope.config;
            vmDoubleTable.link = $scope.link;
            vmDoubleTable.leftData = $scope.leftData;
            vmDoubleTable.rightData = $scope.rightData;

            vmDoubleTable.arrCheckedBox = [];
            vmDoubleTable.path = $location.path();
            vmDoubleTable.configPagiLeft = {
                itemList: []
            };
            vmDoubleTable.configPagiRight = {
                itemList: []
            };

            vmDoubleTable.addSongToNewList = addSongToNewList;
            vmDoubleTable.dropSongFromAddedSongs = dropSongFromAddedSongs;

            // ADD SONG TO NEWLIST
            function addSongToNewList() {
                var listTemp = {};
                if (!(Array.isArray(vmDoubleTable.leftData) && vmDoubleTable.leftData.length) || (Array.isArray(vmDoubleTable.leftData) && vmDoubleTable.leftData.length)) {
                    for (let item of vmDoubleTable.rightData) {
                        if (item.checked) {
                            listTemp = angular.copy(item);
                            var temp = vmDoubleTable.leftData.find(value => value.name === item.name);
                            if (typeof temp === 'undefined') {
                                listTemp.checked = false;
                                vmDoubleTable.leftData.push(listTemp);
                                item.checked = false;
                            } else {
                                listTemp.checked = false;
                                item.checked = false;
                            }
                        }
                    }

                    // vmDoubleTable.configPagiLeft.itemList = vmDoubleTable.configPagiLeft.itemList.concat(vmDoubleTable.leftData);

                    // var test = angular.copy(vmDoubleTable.configPagiLeft.itemList);
                    // var sampleList = test.concat(vmDoubleTable.leftData);
                    // vmDoubleTable.leftData = _.uniqBy(sampleList, function (e) {
                    //     return e.name;
                    // });
                }; 
                vmDoubleTable.config.tableRight.isCheckedAll = false;
                (vmDoubleTable.config.addSongToNewListCb || angular.noop)();
            };

            // DROP Song
            function dropSongFromAddedSongs() {
                for (var i = 0; i < vmDoubleTable.leftData.length; i++) {
                    if (vmDoubleTable.leftData[i].checked === true) {
                        vmDoubleTable.leftData.splice(i, 1);
                        i--;
                    }
                }
                vmDoubleTable.config.tableLeft.isCheckedAll = false;
            };
        })
})();