'use strict';

var GPIO = require('./gpio');
var Helpers = require('./helpers');
var Messages = require('./messages');

var CONFIG_FILE = __dirname+'/../homez.json';

 /**
 * Home
 * @uses Hardware 74HC595 CI for output data
 */

function Home (serverURL) {
    this._sendConsumption   = 1; // each 1 second
    this._fps               = 1; // FPS check state
    this._counterFps        = 0;
    this._loopID            = null;
    this._data              = [];
    this._socket            = [];

    this.gpio = {
        LATCH: GPIO.setup(27, GPIO.OUT),
        CLOCK: GPIO.setup(22, GPIO.OUT),
        DATA: GPIO.setup(17, GPIO.OUT),
        CLEAR: GPIO.setup(4, GPIO.OUT),
        END: GPIO.setup(18, GPIO.IN)
    };

    if (!Helpers.exists(CONFIG_FILE)) {
        console.log(Messages.error.noConfigFile);

        var d1 =  Date.now();

        this.hardware();

        console.log('Time', Date.now() - d1);
    }

    this.config = JSON.parse(Helpers.read(CONFIG_FILE));



    // Load the data
    // this.read();
};

Home.prototype.hardware = function() {
    var counter = 0;

    this.gpio.CLEAR.out(0); // Clear in 0
    this.gpio.CLEAR.out(1); // Back to normal

    do {
        counter++;

        this.gpio.CLOCK.out(0);
        this.gpio.DATA.out(1);
        this.gpio.CLOCK.out(1);

        console.log('COUNT', this.gpio.END.in());

    } while (this.gpio.END.in() != 1);

    setTimeout(function(){
        this.gpio.CLEAR.out(0); // Clear in 0
        this.gpio.CLEAR.out(1); // Back to normal
    }.bind(this), 1000);

    Helpers.write(CONFIG_FILE, JSON.stringify({devices: counter}));

    console.log('Foram encotnradas "'+counter+'" saídas.');
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
    var status;

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
    var max = 64;

    address = address >= max ? max - 1 : address;

    // To control 64 inputs data uses 9 CIs 4051 demux
    // The master CI recive the output of the 8 slaves CI (one for each pin of the master)
    // This converts the input "address" (0 - 63) in two variables data (Bin with 3 bits).
    var masterAddress = ('000'+(Math.floor(address / 8).toString(2))).substr(-3);
    var slaveAddress = ('000'+(Math.floor(address % 8).toString(2))).substr(-3);

    // Helpers.execSync('Clock LOW');

    // Set the master address
    // Helpers.execSync('Pin 1 = '+masterAddress[0]);
    // Helpers.execSync('Pin 2 = '+masterAddress[1]);
    // Helpers.execSync('Pin 3 = '+masterAddress[2]);

    // Set the slaves address
    // Helpers.execSync('Pin 1 = '+slaveAddress[0]);
    // Helpers.execSync('Pin 2 = '+slaveAddress[1]);
    // Helpers.execSync('Pin 3 = '+slaveAddress[2]);

    // Helpers.execSync('Clock HIGH');

    // Helpers.execSync('GET the master CI 4051 output pin');
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

module.exports = Home;
