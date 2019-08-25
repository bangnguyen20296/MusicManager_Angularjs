(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('SongService', ['$http',
            function SongService($http) {
                var songList = [
                    { name: "Hotel California", artist: "Passenger" },
                    { name: "Bài Này Hơi Chill Thôi", artist: "Đen ft. MIN" },
                    { name: "Hãy Trao Cho Anh", artist: "Sơn Tùng M-TP ft. Snoop Dogg" },
                    { name: "Có Chàng Trai Viết Lên Cây", artist: "Người Nào Đó Thấy Một Người Nào Khác Đang Viết Lên Cây" },
                    { name: "Radioactive", artist: "Imagine Dragons" },
                    { name: "So Am I", artist: "Ava Max" },
                    { name: "Everything I Need", artist: "Skylar Grey" },
                    { name: "Move Your Body", artist: "Sia" },
                    { name: "Một Đêm Say", artist: "Thịnh Suy" },
                    { name: "Live Fast", artist: "Alan Walker" },
                    { name: "Hồng Nhan", artist: "Jack" },
                    { name: "So Far Away", artist: "Martin Garrix & David Guetta" },
                    { name: "Shape Of My Heart", artist: "Backstreet Boys" },
                    { name: "Speechless", artist: "Naomi Scott" }
                ];

                var songListModal = [];

                var service = {
                    songList: songList,
                    songListModal: songListModal
                };

                return service;
            }])
})();