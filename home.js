 'use strict';

 /**
 * Home
 * @uses Hardware 74HC595 CI for output data
 */

function Home (serverURL) {
    this._sendConsumption   = 1; // each 1 second
    this._counterFps        = 0;
    this._fps               = 1; // FPS check state
    this._loopID            = null;
    this._data              = [];
    this._socket            = [];

    this.hardware = {
        read: {
            LATCH: 1,
            CLOCK: 2,
            DATA: 3,
        },
        write: {
            LATCH: 1,
            CLOCK: 2,
            DATA: 3,
        }
    }
    // Load the data
    this.read();
};

/**
 * Start server connection
 * @return void
 */
Home.prototype.connect = function(serverURL) {
    this._socket = require('socket.io-client')(this._serverURL, {
        'reconnection delay': 1000,
        'reconnection limit': Infinity,
        'max reconnection attempts': Infinity
    });

    this._socket.on('connect', function(){
        console.log('Connected to server "'+serverURL+'".');

        // Read state
        // Send state
    });

    this._socket.on('disconnect', function(){
        console.log('Disconnected from server "'+serverURL+'".');
    });

    this._loopID = setInterval(function(){
        if (true) {
            this._socket.emmit('state', {data: this._data});
        }

        if (++this._counterFps % (this._sendConsumption * this._fps) === 0) {
            this._counterFps = 0;

            this._socket.emmit('consumption', {data: this._data});
        }
    }.bind(this), 1000/this._fps);
};

/**
 * Stop the main loop
 * @return void
 */
Home.prototype.disconnect = function() {
    clearInterval(this._loopID);
    this._socket.disconnect();
};

/**
 * Read data
 * @return void
 */
Home.prototype.read = function() {
    let status;

    this._data.forEach(function(item, i){
        item.status = this.readAddress(i);
    });

    this._data = [{status: false, watts: 0}];
};

/**
 * Get the along data from a address (0 to 63)
 * @param  int address
 * @return float
 */
Home.prototype.readAddress = function(address) {
    let max = 64;

    address = address >= max ? max - 1 : address;

    // To control 64 inputs data uses 9 CIs 4051 demux
    // The master CI recive the output of the 8 slaves CI (one for each pin of the master)
    // This converts the input "address" (0 - 63) in two variables data (Bin with 3 bits).
    let masterAddress = ('000'+(Math.floor(address / 8).toString(2))).substr(-3);
    let slaveAddress = ('000'+(Math.floor(address % 8).toString(2))).substr(-3);

    Helpers.execSync('Clock LOW');

    // Set the master address
    Helpers.execSync('Pin 1 = '+masterAddress[0]);
    Helpers.execSync('Pin 2 = '+masterAddress[1]);
    Helpers.execSync('Pin 3 = '+masterAddress[2]);

    // Set the slaves address
    Helpers.execSync('Pin 1 = '+slaveAddress[0]);
    Helpers.execSync('Pin 2 = '+slaveAddress[1]);
    Helpers.execSync('Pin 3 = '+slaveAddress[2]);

    // Helpers.sleep(0.001); // For ensure the clock time

    Helpers.execSync('Clock HIGH');

    // Helpers.sleep(0.001); // For ensure the clock time

    Helpers this.execSync('GET the master CI 4051 output pin');
};

Home.prototype.get = function() {
    return this._data;
};

/**
 * Set the status sended by APP
 * Send serial data to pins of the CI 74HC595 chain
 * @param Array data eg: [0,1,0,1,0,0]
 */
Home.prototype.set = function(data) {
    Helpers.execSync('Latch LOW');
    data.forEach(function(item, i){
        this._data[i].status = item;

        Helpers.execSync('Clock LOW');

        Helpers.execSync('Set Data = '+item);

        // Helpers.sleep(0.001); // For ensure the clock time

        Helpers.execSync('Clock HIGH');

        // Helpers.sleep(0.001); // For ensure the clock time
    });
    Helpers.execSync('Latch HIGH');
};

/**
 * Reset the data values
 * @return void
 */
Home.prototype.reset = function() {
    this._data.forEach(function(item){
        item.watts = 0;
    });
};

const Helpers = {
    execSync: require('child_process').execSync,
    sleep: function(time) {
        this.execSync('sleep '+time);
    }
};

let home = new Home;
home.connect('http://107.170.148.84');
