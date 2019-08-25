(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('FormService', function () {
            var formState = {
                isOpenForm: false,
                isAdd: false,
                isEdit: false
            }
            var service = {
                state: formState,
                openForm: openForm,
                closeForm: closeForm
            };
            
            return service;
            ///////////////////////////////
            function openForm() {
                formState.isOpenForm = true;
            }

            function closeForm() {
                formState.isOpenForm = false;
            }
        })
})();