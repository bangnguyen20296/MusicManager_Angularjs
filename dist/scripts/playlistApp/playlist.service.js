(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('PlaylistService', ['$http',
            function PlaylistService($http) {
                var playList = [
                    {
                        name: "Bóp",
                        songs: [
                            { name: "So Far Away", artist: "Martin Garrix & David Guetta" },
                            { name: "Everything I Need", artist: "Skylar Grey" },
                            { name: "Hồng Nhan", artist: "Jack" },
                            { name: "I Don't Care", artist: "Ed Sheeran, Justin Bieber" },
                            { name: "No Promises", artist: "Shayne Ward" },
                            { name: "Bye Bye Bye ", artist: "NSYNC" },
                            { name: "Shape Of My Heart", artist: "Backstreet Boys" },
                            { name: "It's My Life", artist: "Bon Jovi" },
                            { name: "Hero", artist: "Enrique Iglesias, Robin Smith" },
                            { name: "Cry Me A River ", artist: "Justin Timberlake, Timbaland" },
                            { name: "Uptown Girl", artist: "Westlife" },
                            { name: "Move Your Body", artist: "Sia" }
                        ]
                    },
                    {
                        name: "I Đi Em",
                        songs: [
                            { name: "Lily", artist: "Alan Walker, K-391, Emelie Hollow" },
                            { name: "Pump It Up", artist: "Danzel" },
                            { name: "Something Just Like This", artist: "The Chainsmokers, Coldplay" },
                            { name: "Unity ", artist: "Dimitri Vegas & Like Mike, Hardwell" }
                        ]
                    },
                    {
                        name: "Cân tri",
                        songs: [
                            { name: "Forever Country", artist: "Artists Of Then Now & Forever" },
                            { name: "We Were Us", artist: "Keith Urban, Miranda Lambert" },
                            { name: "Peter Pan", artist: "Kelsea Ballerini" }
                        ]
                    },
                    {
                        name: "Róc",
                        songs: [
                            { name: "Waiting For The End", artist: "Linkin Park" },
                            { name: "New Devide", artist: "Linkin Park" },
                            { name: "We Will Rock You", artist: "Queen" },
                            { name: "Zombie ", artist: "Bad Wolves" },
                            { name: "Knockin' On Heaven's Door", artist: "Bob Dylan" },
                            { name: "Behind Blue Eyes", artist: "The Who" },
                            { name: "Let It Be", artist: "The Beatles" }
                        ]
                    },
                    {
                        name: "À cao sờ tíc",
                        songs: [
                            { name: "Muộn Màng Là Từ Lúc", artist: "Nguyên Hà" },
                            { name: "1 Phút", artist: "Andiez" },
                            { name: "Ngày Mai Sẽ Khác", artist: "Lưu Tuấn Phong, Nguyễn Ngọc" },
                            { name: "Đường Một Chiều ", artist: "Huỳnh Tú" },
                            { name: "Mưa Trên Cuộc Tình", artist: "Edward Dương Nguyễn" },
                            { name: "Người Ta Nói", artist: "Trúc Nhân" },
                            { name: "Em Về Tinh Khôi", artist: "Lê Hiếu" }
                        ]
                    },
                    {
                        name: "I Đi Anh",
                        songs: [
                            { name: "Lily", artist: "Alan Walker, K-391, Emelie Hollow" },
                            { name: "Pump It Up", artist: "Danzel" },
                            { name: "Something Just Like This", artist: "The Chainsmokers, Coldplay" },
                            { name: "Unity ", artist: "Dimitri Vegas & Like Mike, Hardwell" }
                        ]
                    }
                ];

                var selectedList = [];

                var service = {
                    playList: playList,
                    selectedList: selectedList
                };

                return service;
            }])
})();