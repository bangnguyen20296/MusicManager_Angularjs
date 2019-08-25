!function(){"use strict";angular.module("myApp").directive("myTableTemp",function(){return{restrict:"EA",templateUrl:"./app/scripts/directives/table-temp/table-temp.html",scope:{config:"=",link:"="},controller:"myTableTempCtrl",controllerAs:"vmTableTemp"}}).controller("myTableTempCtrl",function(e,c,a,t,n,r){var o=this;o.config=e.config,o.link=e.link,o.songList=a.songList,o.playList=t.playList,o.data=n.data,o.constant=n.constant,o.arrCheckedBox=[],o.arrTemp=[],o.configPagi={};var l=e.$watch("vmTableTemp.data.changeLng",function(e,c){r.changeLanguage(e)});e.$on("i18nextLanguageChange",function(){console.log("Language has changed!"),o.config.numberOfColumns=r.t("table_temp.numberOfColumns",{returnObjects:!0})}),o.toggleCheckboxSelection=function(e,c){o.config.toggleFlag=!o.config.toggleFlag;var a={checked:e.currentTarget.checked,id:c=c};if(console.log(e.currentTarget.checked),Array.isArray(o.arrCheckedBox)&&o.arrCheckedBox.length)for(let e=0;e<o.arrCheckedBox.length;e++)o.arrCheckedBox[e].id!==a.id?o.arrCheckedBox.push(a):o.arrCheckedBox[e]=a;else o.arrCheckedBox.push(a),o.config.checked=!0,console.log(o.arrCheckedBox);o.arrCheckedBox=o.removeDuplicate(o.arrCheckedBox,"checked","id");for(let e=0;e<o.arrCheckedBox.length;e++)o.arrTemp.push(o.arrCheckedBox[e].checked);o.arrTemp.indexOf(!0)>=0?o.config.checked=!0:o.config.checked=!1},o.removeDuplicate=function(e,c,a){const t=[c,a];return e.filter((e=>c=>(c=>!e.has(c)&&e.add(c))(t.map(e=>c[e]).join("|")))(new Set))};o.selectAllItem=function(){var e;o.data.isCheckedAll2=!!o.data.isCheckedAll2,c.path()===o.constant.playlistPath&&(e=o.config.list,!1===o.data.isCheckedAll2?(angular.forEach(e,function(e){e.checked=!0}),o.data.isCheckedAll2=!0):(angular.forEach(e,function(e){e.checked=!1}),o.data.isCheckedAll2=!1))},e.$on("$destroy",function(){l()})})}();