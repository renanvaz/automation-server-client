var serverURL = 'http://localhost';
var socket = require('socket.io-client')(serverURL);
var reconnect;

socket.on('connect', function(){
    clearInterval(reconnect);

    console.log('Connected to server "'+serverURL+'"');
});

socket.on('disconnect', function(){
	console.log('Disconnected from server "'+serverURL+'"');

    reconnect = setInterval(function(){
        socket.connect();
    }, 1000);
});

socket.on('call', function(data){

});
