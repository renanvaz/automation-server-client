/**
 * State
 * @uses  74HC595 CI for output data
 */
function State () {
    this._delay     = 0;
    this._loopID    = null;
    this._data      = [];

    // Load the data
    this.read();
}

/**
 * Start watch
 * @return void
 */
State.prototype.start = function(fn){
    this._loopID = setInterval(function(){
        if () {
            socket.emmit('status', {data: sender});
        }
    }, this._delay);
};

/**
 * Stop the main loop
 * @return void
 */
State.prototype.stop = function(){
    clearInterval(this._loopID);
};

/**
 * Read data
 * @return void
 */
State.prototype.read = function(){
    this._data;
};

State.prototype.get = function(){
    return this._data;
};

/**
 * Set the status sended by APP
 * Send serial data to pins of the CI 74HC595 chain
 * @param Array data eg: [0,1,0,1,0,0]
 */
State.prototype.set = function(data){
    // Latch LOW
    data.forEach(function(item, i){
        this._data[i].status = item;

        // Clock LOW
        // Set Data = item
        // Clock HIGH
    });
    // Latch HIGH
};

/**
 * Reset the data values
 * @return void
 */
State.prototype.reset = function(){
    this._data.forEach(function(item){
        item.watts = 0;
    });
};


var state = new State;

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
//

state.start();
