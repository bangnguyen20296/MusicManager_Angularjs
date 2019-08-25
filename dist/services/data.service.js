(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('DataService', ['$http',
            function DataService($http) {
                var constant = {
                    songURL: "#!songs",
                    playlistURL: "#!playlists",
                    songPath: "/songs",
                    playlistPath: "/playlists",

                }
                var data = {
                    listTable: [],
                    isCheckedAll: false,
                    language: [
                        { name: "English", lng: "en" },
                        { name: "Vietnamese", lng: "vi" }
                    ],
                }

                var service = {
                    constant: constant,
                    data: data
                };

                return service;
            }])
})();