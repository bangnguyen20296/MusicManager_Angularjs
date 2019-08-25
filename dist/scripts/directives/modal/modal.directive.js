(function () {
    'use strict';

    angular.module('modalModule', ['jm.i18next', 'ngSanitize', 'ngRoute'])
        .directive('myModal', function () {
            return {
                restrict: 'EA',
                templateUrl: './app/scripts/directives/modal/modal.html',
                scope: {
                    config: '=',
                    link: '=',
                    list: '='
                },
                link: function (scope, element, attrs) {
                    scope.dialogStyle = {};
                    if (attrs.boxWidth) {
                        scope.dialogStyle.width = attrs.boxWidth;
                    }
                    if (attrs.boxHeight) {
                        scope.dialogStyle.height = attrs.boxHeight;
                    }
                },
                controller: 'myModalCtrl',
                controllerAs: 'vmModal'
            }
        })
        .controller('myModalCtrl', function ($scope, ModalService, $i18next) {
            var vmModal = this;

            vmModal.link = $scope.link;
            vmModal.config = angular.extend(ModalService.state, $scope.config);
            vmModal.list = $scope.list;

            vmModal.hideModal = function () {
                vmModal.link.isOpenModal = false;
            };
            assignLanguage();
           
            // Config i18next
            function assignLanguage() {
                vmModal.config.title = 'modal.title';
                vmModal.config.numberOfColumns = $i18next.t('modal.numberOfColumns', { returnObjects: true });
            }

            $scope.$watch('vmModal.link.isOpenModal', function (newVal, oldVal) {
                if (newVal) {
                    vmModal.listModal = ModalService.songListModal;
                }
            });
        })
})();