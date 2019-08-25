(function () {
    'use strict';

    angular.module('playListModule', ['tableModule', 'pagiModule', 'formModule', 'modalModule', 'doubleTableModule'])
        .controller('playListCtrl', ['$scope', 'PlaylistService', 'SongService', 'DataService', 'ModalService', '$i18next', '$rootScope', '$timeout', '$route', function ($scope, PlaylistService, SongService, DataService, ModalService, $i18next, $rootScope, $timeout, $route) {
            var vmPlaylistApp = this;

            vmPlaylistApp.playList = PlaylistService.playList;
            vmPlaylistApp.songList = SongService.songList;
            vmPlaylistApp.data = DataService.data;
            vmPlaylistApp.constant = DataService.constant;
            vmPlaylistApp.selectedList = PlaylistService.selectedList;

            vmPlaylistApp.configLinkData = {
                showPanel: true,
                showTable: true,
                showTableForm: false,
                isOpenForm: false,
                isOpenModal: false
            };
            vmPlaylistApp.configTable = {
                numberOfColumns: $i18next.t('playlist.table.numberOfColumns', { returnObjects: true }),
                title: $i18next.t('playlist.table.title'),
                showTool: true,
                checked: false,
                songPath: vmPlaylistApp.constant.songPath,
                playlistPath: vmPlaylistApp.constant.playlistPath,
                isCheckedAll: vmPlaylistApp.data.isCheckedAll,
                selectAllCheckboxCb: function () {
                    selectAllCheckboxAction(vmPlaylistApp.playList, vmPlaylistApp.configTable.isCheckedAll);
                },
                toggleModalCb: function (item) {
                    ModalService.songListModal = item.songs;
                },
                openAddFormCb: function () {
                    vmPlaylistApp.configLinkData.showTableForm = true;
                    vmPlaylistApp.configLinkData.inputName = "";
                    vmPlaylistApp.selectedList = []
                },
                openEditFormCb: function (item) {
                    vmPlaylistApp.configLinkData.showTableForm = true;
                    vmPlaylistApp.configLinkData.inputName = item.name;
                    vmPlaylistApp.configForm.nameListTemp = item.name;
                    vmPlaylistApp.selectedList = item.songs;
                },
                removeItemCb: function (item) {
                },
                removeItemsCb: function (indexChecked, notCheckedList) {
                    removeItemsAction(indexChecked, notCheckedList);
                }
            };
            vmPlaylistApp.configForm = {
                isCheckedAll: vmPlaylistApp.data.isCheckedAll,
                isOpenForm: vmPlaylistApp.configTable.isOpenForm,
                numberOfColumns: $i18next.t('playlist.form.numberOfColumns', { returnObjects: true }),
                labelInput1: $i18next.t('playlist.form.labelInput1'),
                warning1: $i18next.t('playlist.form.warning1'),
                songPath: vmPlaylistApp.constant.songPath,
                playlistPath: vmPlaylistApp.constant.playlistPath,
                closeFormCb: function () {
                    vmPlaylistApp.configLinkData.showPanel = true;
                    vmPlaylistApp.configLinkData.showTable = true;
                    vmPlaylistApp.configLinkData.isOpenForm = false;
                    $route.reload();
                },
                submitFormCb: function () {
                    if (vmPlaylistApp.configForm.titleBtn === 'form.create_titleBtn') {
                        vmPlaylistApp.playList.push({
                            name: vmPlaylistApp.configLinkData.inputName,
                            songs: vmPlaylistApp.selectedList
                        });
                        vmPlaylistApp.configLinkData.inputName = " ";
                        swalAlertSubmit();
                        $timeout(vmPlaylistApp.configForm.closeFormCb, 1000);
                    } else if (vmPlaylistApp.configForm.titleBtn === 'form.edit_titleBtn') {
                        for (let item of vmPlaylistApp.playList) {
                            if (item.name == vmPlaylistApp.configForm.nameListTemp) {
                                item.name = vmPlaylistApp.configLinkData.inputName;
                                item.songs = vmPlaylistApp.selectedList;
                                swalAlertSubmit();
                                $timeout(vmPlaylistApp.configForm.closeFormCb, 1000);
                            }
                        };
                    };
                }
            };
            vmPlaylistApp.configPagi = {
                itemList: []
            };
            vmPlaylistApp.configModal = {
            };
            vmPlaylistApp.configDoubleTable = {
                isCheckedAll: vmPlaylistApp.data.isCheckedAll,
                tableLeft: {
                    isCheckedAll: false,
                    numberOfColumns: $i18next.t('double-table.table-left.numberOfColumns', { returnObjects: true }),
                    selectAllCheckboxCb: function () {
                        selectAllCheckboxAction(vmPlaylistApp.selectedList, vmPlaylistApp.configDoubleTable.tableLeft.isCheckedAll);
                    }
                },
                tableRight: {
                    isCheckedAll: false,
                    numberOfColumns: $i18next.t('double-table.table-right.numberOfColumns', { returnObjects: true }),
                    selectAllCheckboxCb: function () {
                        selectAllCheckboxAction(vmPlaylistApp.songList, vmPlaylistApp.configDoubleTable.tableRight.isCheckedAll);
                    }
                },
                addSongToNewListCb: function () {
                    vmPlaylistApp.configTable.isCheckedAll = false;
                }
            };
            angular.forEach(vmPlaylistApp.playList, function (x) {
                x.checked = false;
            });

            // Config i18next
            $scope.$on('i18nextLanguageChange', function (event, arg) {
                vmPlaylistApp.configTable.title = 'playlist.table.title';
                vmPlaylistApp.configTable.numberOfColumns = $i18next.t('playlist.table.numberOfColumns', { returnObjects: true });
            });

            // DELETE MULTIPLE ACTION
            var removeItemsAction = function (indexChecked, notCheckedList) {
                swal({
                    title: "Delete Playlists",
                    text: `Are you sure to delete ${indexChecked} playlists`,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        PlaylistService.playList = notCheckedList;
                        vmPlaylistApp.configTable.isCheckedAll = false;
                        $scope.$apply();
                        $route.reload();
                    }
                });
            };

            // SELECT ALL CHECKBOX
            function selectAllCheckboxAction(list, isCheckedAll) {
                var flag = isCheckedAll;
                flag = !!flag;
                if (flag === false) {
                    angular.forEach(list, function (x) {
                        x.checked = true;
                    });
                    flag = true;
                } else {
                    angular.forEach(list, function (x) {
                        x.checked = false;
                    });
                    flag = false;
                };
            };

            function swalAlertSubmit() {
                swal({
                    title: "Successed!",
                    type: "success",
                    timer: 1000,
                    showConfirmButton: false
                });
            };

            
            $scope.$watch('$route.reload()', function () {
                vmPlaylistApp.configTable.title = 'playlist.table.title';
            });

            if ($rootScope.isHideLoading === true) {
                vmPlaylistApp.isLoading = true;
                $timeout(function () {
                    $(".loader-cat").fadeOut("slow");
                    $timeout(function () {
                        vmPlaylistApp.isLoading = false;
                    }, 400);;
                }, 800)
            }
        }])
})();