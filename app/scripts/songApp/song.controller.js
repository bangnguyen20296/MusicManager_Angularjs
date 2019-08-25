(function () {
    'use strict';

    angular.module('songModule', ['tableModule', 'pagiModule', 'formModule'])
        .controller('songCtrl', ['$scope', 'SongService', 'DataService', 'FormService', '$i18next', '$rootScope', '$timeout', '$route', function ($scope, SongService, DataService, FormService, $i18next, $rootScope, $timeout, $route) {
            var vmSongApp = this;

            vmSongApp.songList = SongService.songList;
            vmSongApp.data = DataService.data;
            vmSongApp.constant = DataService.constant;
            vmSongApp.formState = FormService.state;
            vmSongApp.configLinkData = {
                showPanel: true,
                showTable: true,
                isOpenForm: false
            };
            vmSongApp.configTable = {
                numberOfColumns: $i18next.t('song.table.numberOfColumns', { returnObjects: true }),
                title: $i18next.t('song.table.title'),
                swalTitle: "Delete Song",
                swalText: "songs",
                showTool: true,
                songPath: vmSongApp.constant.songPath,
                playlistPath: vmSongApp.constant.playlistPath,
                isCheckedAll: vmSongApp.data.isCheckedAll,
                selectAllCheckboxCb: function () {
                    selectAllCheckboxAction(vmSongApp.songList, vmSongApp.configTable.isCheckedAll);
                },
                openAddFormCb: function () {
                    vmSongApp.configLinkData.inputName = "";
                    vmSongApp.configLinkData.inputArtist = "";
                },
                openEditFormCb: function (item) {
                    vmSongApp.configLinkData.inputName = item.name;
                    vmSongApp.configLinkData.inputArtist = item.artist;
                    vmSongApp.configLinkData.arrTemp = item;
                },
                removeItemCb: function () {
                },
                removeItemsCb: function (indexChecked, notCheckedList) {
                    removeItemsAction(indexChecked, notCheckedList);
                }
            };
            vmSongApp.configForm = {
                isCheckedAll: vmSongApp.data.isCheckedAll,
                isOpenForm: vmSongApp.configTable.isOpenForm,
                labelInput1: $i18next.t('song.form.labelInput1'),
                labelInput2: $i18next.t('song.form.labelInput2'),
                warning1: $i18next.t('song.form.warning1'),
                warning2: $i18next.t('song.form.warning2'),
                songPath: vmSongApp.constant.songPath,
                playlistPath: vmSongApp.constant.playlistPath,
                closeFormCb: function () {
                    vmSongApp.configLinkData.showPanel = true;
                    vmSongApp.configLinkData.showTable = true;
                    vmSongApp.configLinkData.isOpenForm = false;
                    $route.reload();
                },
                submitFormCb: function () {
                    if (vmSongApp.configForm.titleBtn === 'form.create_titleBtn') {
                        vmSongApp.songList.push({
                            name: vmSongApp.configLinkData.inputName,
                            artist: vmSongApp.configLinkData.inputArtist
                        });
                        vmSongApp.configLinkData.inputName = " ";
                        vmSongApp.configLinkData.inputArtist = " ";
                        swalAlertSubmit();
                    } else if (vmSongApp.configForm.titleBtn === 'form.edit_titleBtn') {
                        for (let item of vmSongApp.songList) {
                            if (item.name == vmSongApp.configLinkData.arrTemp.name) {
                                item.name = vmSongApp.configLinkData.inputName;
                                item.artist = vmSongApp.configLinkData.inputArtist;
                                swalAlertSubmit();
                                $timeout(vmSongApp.configForm.closeFormCb, 1000);
                            }
                        };
                    };
                }
            };
            vmSongApp.configPagi = {
                itemList: []
            };
            angular.forEach(vmSongApp.songList, function (x) {
                x.checked = false;
            });

            // Config i18next
            $scope.$on('i18nextLanguageChange', function (event, arg) {
                vmSongApp.configTable.title = 'song.table.title';
                vmSongApp.configTable.numberOfColumns = $i18next.t('song.table.numberOfColumns', { returnObjects: true });
            });

            // DELETE MULTIPLE ACTION
            var removeItemsAction = function (indexChecked, notCheckedList) {
                swal({
                    title: "Delete Songs",
                    text: `Are you sure to delete ${indexChecked} songs`,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        SongService.songList = notCheckedList;
                        vmSongApp.configTable.isCheckedAll = false;
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
                vmSongApp.data.isCheckedAll = false;
                vmSongApp.configTable.title = 'song.table.title';
                showSidebar();
            });

            // sidebar
            function addClass(e) {
                vmSongApp.effect = e.target.getAttribute('data-effect');
                vmSongApp.menu.classList.toggle(vmSongApp.effect);
                vmSongApp.menu.classList.toggle('st-menu-open');
            }

            function closeMenu(el) {
                if (el.target.classList.contains('st-pusher')) {
                    vmSongApp.menu.classList.toggle(vmSongApp.effect);
                    vmSongApp.menu.classList.toggle('st-menu-open');
                }
            }
            function showSidebar() {
                $timeout(function () {
                    vmSongApp.click = document.querySelectorAll('div .arrow');
                    vmSongApp.menu = document.querySelector('#st-container');
                    vmSongApp.pusher = document.querySelector('.st-pusher');
                    vmSongApp.effect;
                    for (var i = 0; i < vmSongApp.click.length; i++) {
                        vmSongApp.click[i].addEventListener('click', addClass)
                    }
                    vmSongApp.pusher.addEventListener('click', closeMenu);
                }, 500)
            }

            if ($rootScope.isHideLoading === true) {
                vmSongApp.isLoading = true;
                $timeout(function () {
                    $(".loader-cat").fadeOut("slow");
                    $timeout(function () {
                        vmSongApp.isLoading = false;
                    }, 400);
                }, 800)
            }
        }])
})();