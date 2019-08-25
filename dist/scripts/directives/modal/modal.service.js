(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('ModalService', function () {
            var dialogState = {
                isOpenModal: false
            }
            var songListModal = []
            var service = {
                state: dialogState,
                openDialog: openDialog,
                closeDialog: closeDialog,
                toggleDialog: toggleDialog,
                songListModal: songListModal
            };

            return service;
            ///////////////////////////////
            function openDialog() {
                dialogState.isOpenModal = true;
            }

            function closeDialog() {
                dialogState.isOpenModal = false;
            }

            function toggleDialog() {
                dialogState.isOpenModal = !dialogState.isOpenModal;
            }

        })
})();