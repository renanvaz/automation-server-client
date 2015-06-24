function State () {
    this.data = [];


}


State.prototype.loop = function(){

};

/**
 * Reset the data values
 * @return void
 */
State.prototype.reset = function(){
    this.data.forEach(function(item){
        item.watts = 0;
    });
};


var state = [];
var sender;

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


// On any changes on the status, tell the server
// sender = status; // Clone current state of status
// status.reset();
// socket.emmit('status', {data: sender});

var t = new Date().getTime();
var l = t;

while(true){
    t = new Date().getTime();

    console.log(t - l);

    if (t - l > 1000) {
        l = t;
        console.log('track');
    }
};
