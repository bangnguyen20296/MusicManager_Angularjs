!function(){"use strict";angular.module("songModule",["tableModule","pagiModule","formModule"]).controller("songCtrl",["$scope","SongService","DataService","FormService","$i18next","$rootScope","$timeout","$route",function(t,n,e,o,i,a,s,c){var l=this;l.songList=n.songList,l.data=e.data,l.constant=e.constant,l.formState=o.state,l.configLinkData={showPanel:!0,showTable:!0,isOpenForm:!1},l.configTable={numberOfColumns:i.t("song.table.numberOfColumns",{returnObjects:!0}),title:i.t("song.table.title"),swalTitle:"Delete Song",swalText:"songs",showTool:!0,songPath:l.constant.songPath,playlistPath:l.constant.playlistPath,isCheckedAll:l.data.isCheckedAll,selectAllCheckboxCb:function(){var t,n;t=l.songList,n=l.configTable.isCheckedAll,0==!!n?angular.forEach(t,function(t){t.checked=!0}):angular.forEach(t,function(t){t.checked=!1})},openAddFormCb:function(){l.configLinkData.inputName="",l.configLinkData.inputArtist=""},openEditFormCb:function(t){l.configLinkData.inputName=t.name,l.configLinkData.inputArtist=t.artist,l.configLinkData.arrTemp=t},removeItemCb:function(){},removeItemsCb:function(t,n){r(t,n)}},l.configForm={isCheckedAll:l.data.isCheckedAll,isOpenForm:l.configTable.isOpenForm,labelInput1:i.t("song.form.labelInput1"),labelInput2:i.t("song.form.labelInput2"),warning1:i.t("song.form.warning1"),warning2:i.t("song.form.warning2"),songPath:l.constant.songPath,playlistPath:l.constant.playlistPath,closeFormCb:function(){l.configLinkData.showPanel=!0,l.configLinkData.showTable=!0,l.configLinkData.isOpenForm=!1,c.reload()},submitFormCb:function(){if("form.create_titleBtn"===l.configForm.titleBtn)l.songList.push({name:l.configLinkData.inputName,artist:l.configLinkData.inputArtist}),l.configLinkData.inputName=" ",l.configLinkData.inputArtist=" ",u();else if("form.edit_titleBtn"===l.configForm.titleBtn)for(let t of l.songList)t.name==l.configLinkData.arrTemp.name&&(t.name=l.configLinkData.inputName,t.artist=l.configLinkData.inputArtist,u(),s(l.configForm.closeFormCb,1e3))}},l.configPagi={itemList:[]},angular.forEach(l.songList,function(t){t.checked=!1}),t.$on("i18nextLanguageChange",function(t,n){l.configTable.title="song.table.title",l.configTable.numberOfColumns=i.t("song.table.numberOfColumns",{returnObjects:!0})});var r=function(e,o){swal({title:"Delete Songs",text:`Are you sure to delete ${e} songs`,type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Delete",closeOnConfirm:!0,closeOnCancel:!0},function(e){e&&(n.songList=o,l.configTable.isCheckedAll=!1,t.$apply(),c.reload())})};function u(){swal({title:"Successed!",type:"success",timer:1e3,showConfirmButton:!1})}function f(t){l.effect=t.target.getAttribute("data-effect"),l.menu.classList.toggle(l.effect),l.menu.classList.toggle("st-menu-open")}function g(t){t.target.classList.contains("st-pusher")&&(l.menu.classList.toggle(l.effect),l.menu.classList.toggle("st-menu-open"))}t.$watch("$route.reload()",function(){l.data.isCheckedAll=!1,l.configTable.title="song.table.title",s(function(){l.click=document.querySelectorAll("div .arrow"),l.menu=document.querySelector("#st-container"),l.pusher=document.querySelector(".st-pusher"),l.effect;for(var t=0;t<l.click.length;t++)l.click[t].addEventListener("click",f);l.pusher.addEventListener("click",g)},500)}),!0===a.isHideLoading&&(l.isLoading=!0,s(function(){$(".loader-cat").fadeOut("slow"),s(function(){l.isLoading=!1},400)},800))}])}();