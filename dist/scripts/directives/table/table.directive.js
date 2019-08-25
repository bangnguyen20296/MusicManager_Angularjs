(function () {
    'use strict';

    angular.module('tableModule', ['jm.i18next', 'ngAnimate', 'ngSanitize', 'ngRoute', 'oitozero.ngSweetAlert'])
        .directive('myTable', function () {
            return {
                restrict: 'EA',
                templateUrl: './app/scripts/directives/table/table.html',
                scope: {
                    config: '=',
                    list: '=',
                    link: '='
                },
                controller: 'myTableCtrl',
                controllerAs: 'vmTable'
            }
        })
        .controller('myTableCtrl', function ($scope, $route, $location) {
            var vmTable = this;
            vmTable.config = $scope.config;
            vmTable.link = $scope.link;
            vmTable.list = $scope.list;

            vmTable.arrCheckedBox = [];
            vmTable.path = $location.path();

            vmTable.toggleModal = toggleModal;
            vmTable.openAddForm = openAddForm;
            vmTable.openEditForm = openEditForm;
            vmTable.selectAllCheckbox = selectAllCheckbox;
            vmTable.removeItem = removeItem;
            vmTable.removeItems = removeItems;

            // OPEN MODAL
            function toggleModal(item) {
                vmTable.link.name = item.name;
                vmTable.link.isOpenModal = true;
                (vmTable.config.toggleModalCb(item) || angular.noop)();
            };

            // OPEN FORM
            var changeStatus = function () {
                vmTable.link.showPanel = false;
                vmTable.link.showTable = false;
                vmTable.link.isOpenForm = true;
                turnOffCheckbox();
            };
            function openAddForm() {
                changeStatus();
                vmTable.link.isAddForm = true;
                (vmTable.config.openAddFormCb || angular.noop)();
            };
            function openEditForm(item) {
                changeStatus();
                vmTable.link.isEditForm = true;
                (vmTable.config.openEditFormCb(item) || angular.noop)();
            };

            // SELECT ALL ITEM
            function selectAllCheckbox() {
                (vmTable.config.selectAllCheckboxCb || angular.noop)();
            };

            // TURN OFF CHECKBOX
            function turnOffCheckbox() {
                vmTable.config.isCheckedAll = false;
                angular.forEach(vmTable.list, function (x) {
                    x.checked = false;
                });
            };
            // DELETE ACTION
            function removeItem(item) {
                var index = vmTable.config.list.indexOf(item);
                swal({
                    title: `"${item.name}"`,
                    text: "You won't see it anymore when you press Delete :)",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        vmTable.config.list.splice(index, 1);
                        $scope.$apply();
                        $route.reload();
                    }
                });
                (vmTable.config.removeItemCb || angular.noop)();
            };

            // DELETE MULTIPLE ACTION
            function removeItems() {
                var checkedList = [];
                var notCheckedList = [];
                var indexChecked;
                angular.forEach(vmTable.config.list, function (item) {
                    if (!item.checked) {
                        notCheckedList.push(item);
                    } else {
                        checkedList.push(item);
                        indexChecked = checkedList.length;
                    }
                });
                (vmTable.config.removeItemsCb(indexChecked, notCheckedList) || angular.noop)();
            };

            // CHECK Select Checkbox
            vmTable.toggleCheckboxSelection = function ($event, index) {
                vmTable.arrTemp = [];
                var checkedBox = $event.currentTarget.checked;
                var index = index;
                var obj = {
                    checked: checkedBox,
                    id: index
                };
                console.log($event.currentTarget.checked);

                if (!(Array.isArray(vmTable.arrCheckedBox) && vmTable.arrCheckedBox.length)) {
                    vmTable.arrCheckedBox.push(obj);
                    vmTable.config.checked = true;
                } else {
                    for (let i = 0; i < vmTable.arrCheckedBox.length; i++) {
                        if (vmTable.arrCheckedBox[i].id !== obj.id) {
                            vmTable.arrCheckedBox.push(obj);
                        } else vmTable.arrCheckedBox[i] = obj;
                    }

                }
                vmTable.arrCheckedBox = vmTable.removeDuplicate(vmTable.arrCheckedBox, "checked", "id");

                for (let i = 0; i < vmTable.arrCheckedBox.length; i++) {
                    vmTable.arrTemp.push(vmTable.arrCheckedBox[i].checked);
                }
                if (vmTable.arrTemp.indexOf(true) >= 0) {
                    vmTable.config.checked = true;
                } else vmTable.config.checked = false;
            };

            vmTable.removeDuplicate = function (arr, prop1, prop2) {
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


            $(document).ready(function () {
                $("body").tooltip({ selector: '[data-toggle=tooltip]' });
            });

        })
})();