!function(){"use strict";angular.module("myApp").directive("myNav",function(t,n,c,a,i,o){return{restrict:"EA",templateUrl:"./app/scripts/directives/nav/nav.html",scope:{},link:function(n,o,e){function s(){c.path()===n.constant.songPath?(n.songActive=!0,n.playlistActive=!1):c.path()===n.constant.playlistPath&&(n.songActive=!1,n.playlistActive=!0)}n.constant=t.constant,s(),n.$on("$locationChangeSuccess",function(){s()}),i.$on("$locationChangeStart",function(){a.closeForm()})},replace:!0,transclude:!0}})}();