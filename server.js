var express = require('express');
var app = express();

var songList = [
    { name: "Hotel California", artist: "Passenger" },
    { name: "Bài này chill phết", artist: "Đen ft. MIN" },
    { name: "Hãy trao cho anh", artist: "Sơn Tùng M-TP ft. Snoop Dogg" },
    { name: "Radioactive", artist: "Imagine Dragons" },
    { name: "So Am I", artist: "Ava Max" },
    { name: "Everything I Need", artist: "Skylar Grey" },
    { name: "Move Your Body", artist: "Sia" },
    { name: "Một Đêm Say", artist: "Thịnh Suy" },
    { name: "Live Fast", artist: "Alan Walker" },
    { name: "Hồng Nhan", artist: "Jack" },
    { name: "So Far Away", artist: "Martin Garrix & David Guetta" },
    { name: "Có Chàng Trai Viết Lên Cây", artist: "Phan Mạnh Quỳnh" },
    { name: "Shape Of My Heart", artist: "Backstreet Boys" },
    { name: "Speechless", artist: "Naomi Scott" }
];

app.use('/', express.static(__dirname));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/api/getSongList', function (req, res, next) {
    res.json(songList);
});

app.listen(8080, function () {
    console.log("MyProject Server is Listening on port 8080");
});