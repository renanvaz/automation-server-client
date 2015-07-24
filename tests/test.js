'use strict';

var Helpers = {
    exec: require('child_process').exec,
    execSync: require('child_process').execSync,
    sleep: function(time) {
        this.execSync('sleep '+time);
    }
};

var GPIO = {
    IN: 'in',
    OUT: 'out',

    _data: {},

    setup: function(pin, mode) {
        Helpers.execSync('if [ ! -d "/sys/class/gpio/gpio'+pin+'" ]; then sudo echo "'+pin+'" > /sys/class/gpio/export; fi');
        Helpers.execSync('sudo echo "'+mode+'" > /sys/class/gpio/gpio'+pin+'/direction');

        this._data[pin] = mode;

        return new Pin(pin);
    },
    in: function(pin) {
        var mode = this._data[pin];

        if (mode === this.IN) {
            return Helpers.execSync('sudo cat /sys/class/gpio/gpio'+pin+'/value');
        } else {
            throw new Error('The pin mode is "'+mode+'" and is not able to use the "in" method.');
        }
    },
    out: function(pin, value) {
        var mode = this._data[pin];

        if (mode === this.OUT) {
            return Helpers.execSync('sudo echo "'+(!!value ? 1 : 0)+'" > /sys/class/gpio/gpio'+pin+'/value');
        } else {
            throw new Error('The pin mode is "'+mode+'" and is not able to use the "out" method.');
        }
    }
};

function Pin(pin) {
    this._pin = pin;
}

Pin.prototype.in = function() {
    GPIO.in(this._pin);
};

Pin.prototype.out = function(value) {
    GPIO.out(this._pin, value);
};

var DATA_PIN = GPIO.setup('17', GPIO.OUT);
var CLOCK_PIN = GPIO.setup('22', GPIO.OUT);
var LATCH_PIN = GPIO.setup('27', GPIO.OUT);

LATCH_PIN.out(0);
for (var i = 0; i < 16; i++) {
    CLOCK_PIN.out(0);
    DATA_PIN.out(i%4);
    CLOCK_PIN.out(1);
}
LATCH_PIN.out(1);
