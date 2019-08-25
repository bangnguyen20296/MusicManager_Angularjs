!function(){"use strict";angular.module("doubleTableModule",["jm.i18next","ngAnimate","ngSanitize","ngRoute","oitozero.ngSweetAlert"]).directive("doubleTable",function(){return{restrict:"EA",templateUrl:"./app/scripts/directives/double-table/double-table.html",scope:{config:"=",link:"=",leftData:"=",rightData:"="},controller:"myDoubleTableCtrl",controllerAs:"vmDoubleTable"}}).controller("myDoubleTableCtrl",function(e,t,a){var l=this;l.config=e.config,l.link=e.link,l.leftData=e.leftData,l.rightData=e.rightData,l.arrCheckedBox=[],l.path=a.path(),l.configPagiLeft={itemList:[]},l.configPagiRight={itemList:[]},l.addSongToNewList=function(){var e={};if(!Array.isArray(l.leftData)||!l.leftData.length||Array.isArray(l.leftData)&&l.leftData.length)for(let a of l.rightData)if(a.checked){e=angular.copy(a);var t=l.leftData.find(e=>e.name===a.name);void 0===t?(e.checked=!1,l.leftData.push(e),a.checked=!1):(e.checked=!1,a.checked=!1)}l.config.tableRight.isCheckedAll=!1,(l.config.addSongToNewListCb||angular.noop)()},l.dropSongFromAddedSongs=function(){for(var e=0;e<l.leftData.length;e++)!0===l.leftData[e].checked&&(l.leftData.splice(e,1),e--);l.config.tableLeft.isCheckedAll=!1}})}();