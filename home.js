/**
 * Home
 * @uses  74HC595 CI for output data
 */
function Home (serverURL) {
    this._serverURL = 'http://107.170.148.84';

    this._delay     = 1000/30; // 30 FPS
    this._loopID    = null;
    this._data      = [];
    this._socket    = [];

    // Load the data
    this.read();
}

/**
 * Start server connection
 * @return void
 */
Home.prototype.connect = function(serverURL){
    this._socket = require('socket.io-client')(this._serverURL, {
        'reconnection delay': 1000,
        'reconnection limit': Infinity,
        'max reconnection attempts': Infinity
    });

    this._socket.on('connect', function(){
        console.log('Connected to server "'+serverURL+'".');
    });

    this._socket.on('disconnect', function(){
        console.log('Disconnected from server "'+serverURL+'".');
    });

    this._loopID = setInterval(function(){
        if (true) {
            this._socket.emmit('status', {data: this._data});
        }
    }.bind(this), this._delay);
};

/**
 * Stop the main loop
 * @return void
 */
Home.prototype.disconnect = function(){
    clearInterval(this._loopID);
    this._socket.disconnect();
};

/**
 * Read data
 * @return void
 */
Home.prototype.read = function(){
    this._data = [{status: false, watts: 0}];
};

Home.prototype.get = function(){
    return this._data;
};

/**
 * Set the status sended by APP
 * Send serial data to pins of the CI 74HC595 chain
 * @param Array data eg: [0,1,0,1,0,0]
 */
Home.prototype.set = function(data){
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
Home.prototype.reset = function(){
    this._data.forEach(function(item){
        item.watts = 0;
    });
};

var home = new Home;
home.connect('http://107.170.148.84');
