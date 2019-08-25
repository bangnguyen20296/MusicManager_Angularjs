!function(){"use strict";angular.module("playListModule",["tableModule","pagiModule","formModule","modalModule","doubleTableModule"]).controller("playListCtrl",["$scope","PlaylistService","SongService","DataService","ModalService","$i18next","$rootScope","$timeout","$route",function(e,t,n,o,l,i,a,s,c){var u=this;u.playList=t.playList,u.songList=n.songList,u.data=o.data,u.constant=o.constant,u.selectedList=t.selectedList,u.configLinkData={showPanel:!0,showTable:!0,showTableForm:!1,isOpenForm:!1,isOpenModal:!1},u.configTable={numberOfColumns:i.t("playlist.table.numberOfColumns",{returnObjects:!0}),title:i.t("playlist.table.title"),showTool:!0,checked:!1,songPath:u.constant.songPath,playlistPath:u.constant.playlistPath,isCheckedAll:u.data.isCheckedAll,selectAllCheckboxCb:function(){f(u.playList,u.configTable.isCheckedAll)},toggleModalCb:function(e){l.songListModal=e.songs},openAddFormCb:function(){u.configLinkData.showTableForm=!0,u.configLinkData.inputName="",u.selectedList=[]},openEditFormCb:function(e){u.configLinkData.showTableForm=!0,u.configLinkData.inputName=e.name,u.configForm.nameListTemp=e.name,u.selectedList=e.songs},removeItemCb:function(e){},removeItemsCb:function(e,t){r(e,t)}},u.configForm={isCheckedAll:u.data.isCheckedAll,isOpenForm:u.configTable.isOpenForm,numberOfColumns:i.t("playlist.form.numberOfColumns",{returnObjects:!0}),labelInput1:i.t("playlist.form.labelInput1"),warning1:i.t("playlist.form.warning1"),songPath:u.constant.songPath,playlistPath:u.constant.playlistPath,closeFormCb:function(){u.configLinkData.showPanel=!0,u.configLinkData.showTable=!0,u.configLinkData.isOpenForm=!1,c.reload()},submitFormCb:function(){if("form.create_titleBtn"===u.configForm.titleBtn)u.playList.push({name:u.configLinkData.inputName,songs:u.selectedList}),u.configLinkData.inputName=" ",m(),s(u.configForm.closeFormCb,1e3);else if("form.edit_titleBtn"===u.configForm.titleBtn)for(let e of u.playList)e.name==u.configForm.nameListTemp&&(e.name=u.configLinkData.inputName,e.songs=u.selectedList,m(),s(u.configForm.closeFormCb,1e3))}},u.configPagi={itemList:[]},u.configModal={},u.configDoubleTable={isCheckedAll:u.data.isCheckedAll,tableLeft:{isCheckedAll:!1,numberOfColumns:i.t("double-table.table-left.numberOfColumns",{returnObjects:!0}),selectAllCheckboxCb:function(){f(u.selectedList,u.configDoubleTable.tableLeft.isCheckedAll)}},tableRight:{isCheckedAll:!1,numberOfColumns:i.t("double-table.table-right.numberOfColumns",{returnObjects:!0}),selectAllCheckboxCb:function(){f(u.songList,u.configDoubleTable.tableRight.isCheckedAll)}},addSongToNewListCb:function(){u.configTable.isCheckedAll=!1}},angular.forEach(u.playList,function(e){e.checked=!1}),e.$on("i18nextLanguageChange",function(e,t){u.configTable.title="playlist.table.title",u.configTable.numberOfColumns=i.t("playlist.table.numberOfColumns",{returnObjects:!0})});var r=function(n,o){swal({title:"Delete Playlists",text:`Are you sure to delete ${n} playlists`,type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Delete",closeOnConfirm:!0,closeOnCancel:!0},function(n){n&&(t.playList=o,u.configTable.isCheckedAll=!1,e.$apply(),c.reload())})};function f(e,t){var n=t;!1===(n=!!n)?(angular.forEach(e,function(e){e.checked=!0}),n=!0):(angular.forEach(e,function(e){e.checked=!1}),n=!1)}function m(){swal({title:"Successed!",type:"success",timer:1e3,showConfirmButton:!1})}e.$watch("$route.reload()",function(){u.configTable.title="playlist.table.title"}),!0===a.isHideLoading&&(u.isLoading=!0,s(function(){$(".loader-cat").fadeOut("slow"),s(function(){u.isLoading=!1},400)},800))}])}();