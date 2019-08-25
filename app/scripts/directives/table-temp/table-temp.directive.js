(function () {
    'use strict';

    angular.module('myApp')
        .directive('myTableTemp', function () {
            return {
                restrict: 'EA',
                templateUrl: './app/scripts/directives/table-temp/table-temp.html',
                scope: {
                    config: '=',
                    link: '='
                },
                controller: 'myTableTempCtrl',
                controllerAs: 'vmTableTemp'
            }
        })

        .controller('myTableTempCtrl', function ($scope, $location, SongService, PlaylistService, DataService, $i18next) {
            var vmTableTemp = this;
            vmTableTemp.config = $scope.config;
            vmTableTemp.link = $scope.link;

            vmTableTemp.songList = SongService.songList;
            vmTableTemp.playList = PlaylistService.playList;
            vmTableTemp.data = DataService.data;
            vmTableTemp.constant = DataService.constant;
            vmTableTemp.arrCheckedBox = [];
            vmTableTemp.arrTemp = [];
            vmTableTemp.configPagi = {};

            // Config i18next
            var clearChangeLngWatch = $scope.$watch('vmTableTemp.data.changeLng', function (newVal, oldVal) {
                $i18next.changeLanguage(newVal);
            });
            $scope.$on('i18nextLanguageChange', function () {
                console.log('Language has changed!');
                vmTableTemp.config.numberOfColumns = $i18next.t('table_temp.numberOfColumns', { returnObjects: true });
            });

            // CHECK Select Checkbox
            vmTableTemp.toggleCheckboxSelection = function ($event, index) {
                vmTableTemp.config.toggleFlag = !vmTableTemp.config.toggleFlag;
                var checkedBox = $event.currentTarget.checked;
                var index = index;
                var obj = {
                    checked: checkedBox,
                    id: index
                };
                console.log($event.currentTarget.checked);

                if (!(Array.isArray(vmTableTemp.arrCheckedBox) && vmTableTemp.arrCheckedBox.length)) {
                    vmTableTemp.arrCheckedBox.push(obj);
                    vmTableTemp.config.checked = true;
                    console.log(vmTableTemp.arrCheckedBox);
                } else {
                    for (let i = 0; i < vmTableTemp.arrCheckedBox.length; i++) {
                        if (vmTableTemp.arrCheckedBox[i].id !== obj.id) {
                            vmTableTemp.arrCheckedBox.push(obj);
                        } else vmTableTemp.arrCheckedBox[i] = obj;
                    }

                }
                vmTableTemp.arrCheckedBox = vmTableTemp.removeDuplicate(vmTableTemp.arrCheckedBox, "checked", "id");

                for (let i = 0; i < vmTableTemp.arrCheckedBox.length; i++) {
                    vmTableTemp.arrTemp.push(vmTableTemp.arrCheckedBox[i].checked);
                }
                if (vmTableTemp.arrTemp.indexOf(true) >= 0) {
                    vmTableTemp.config.checked = true;
                } else vmTableTemp.config.checked = false;
            };

            vmTableTemp.removeDuplicate = function (arr, prop1, prop2) {
                const keys = [prop1, prop2];
                const filtered = arr.filter(
                    (s => o =>
                        (k => !s.has(k) && s.add(k))
                            (keys.map(k => o[k]).join('|'))
                    )
                        (new Set)
                );
                return filtered;
            };

            // SELECT ALL ITEM
            var selectAllAction = function (list) {
                if (vmTableTemp.data.isCheckedAll2 === false) {
                    angular.forEach(list, function (x) {
                        x.checked = true;
                    });
                    vmTableTemp.data.isCheckedAll2 = true;
                } else {
                    angular.forEach(list, function (x) {
                        x.checked = false;
                    });
                    vmTableTemp.data.isCheckedAll2 = false;
                };
            }
            vmTableTemp.selectAllItem = function () {
                vmTableTemp.data.isCheckedAll2 = !!vmTableTemp.data.isCheckedAll2;
                if ($location.path() === vmTableTemp.constant.playlistPath) {
                    selectAllAction(vmTableTemp.config.list);
                }
            };

            $scope.$on("$destroy", function () {
                clearChangeLngWatch();
            })
        })
})();