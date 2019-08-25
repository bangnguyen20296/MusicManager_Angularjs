(function () {
    'use strict';

    angular.module('configModule', ['ngRoute', 'ngAnimate'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            // $locationProvider.html5Mode(true);
            $routeProvider
                .when('/songs', {
                    templateUrl: './app/scripts/songApp/song.html',
                    // controller: 'songCtrl',
                    appId: 'songs'
                })
                .when('/playlists', {
                    templateUrl: './app/scripts/playlistApp/playlist.html',
                    // controller: 'playListCtrl',
                    appId: 'playlists'
                })
                .otherwise({
                    redirectTo: '/songs'
                });
        }]);
})();