'use strict';

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'me',
  password: 'secret',
  database: 'my_db'
});

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
    // console.log(socket);
    console.log('New client connected to server.');

    socket.on('status', function (data) {
        connection.connect();

        connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            connection.end();
            if (err) throw err;

            console.log('The solution is: ', rows[0].solution);
        });

    });

    socket.on('consumption', function (data) {
        connection.connect();

        connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            connection.end();
            if (err) throw err;

            console.log('The solution is: ', rows[0].solution);
        });

    });

    socket.on('disconnect', function() {
        console.log('Client disconnected from server.');
    });
});

// io.sockets.socket(id).emit('hello');
