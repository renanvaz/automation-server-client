'use strict';

var serverURL = 'http://107.170.148.84';
var socket = require('socket.io-client')(serverURL, {
    'reconnection delay': 1000,
    'reconnection limit': Infinity,
    'max reconnection attempts': Infinity
});

socket.on('connect', function(){
    console.log('Connected to server "'+serverURL+'".');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server "'+serverURL+'".');
});

socket.on('call', function(data){

});
