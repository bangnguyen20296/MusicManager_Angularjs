!function(){"use strict";angular.module("configModule",["ngRoute","ngAnimate"]).config(["$routeProvider","$locationProvider",function(t,s){t.when("/songs",{templateUrl:"./app/scripts/songApp/song.html",appId:"songs"}).when("/playlists",{templateUrl:"./app/scripts/playlistApp/playlist.html",appId:"playlists"}).otherwise({redirectTo:"/songs"})}])}();