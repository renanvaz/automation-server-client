var app = require('http').createServer(function (req, res) {
    fs.readFile(__dirname+'/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
});

var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

io.on('connection', function (socket) {
    console.log(socket);
    console.log('New client connected to server.');

    socket.on('confirm', function (data) {
        console.log(data);
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected from server.');
    });
});

// io.sockets.socket(id).emit('hello');
