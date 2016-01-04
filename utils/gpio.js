'use strict';

var Helpers = require('./helpers');

var GPIO = {
    IN: 'in',
    OUT: 'out',

    _data: {},

    setup: function(pin, mode) {
        Helpers.exec('if [ ! -d "/sys/class/gpio/gpio'+pin+'" ]; then sudo echo "'+pin+'" > /sys/class/gpio/export; fi');
        Helpers.write('/sys/class/gpio/gpio'+pin+'/direction', mode);

        this._data[pin] = mode;

        return new Pin(pin);
    },
    in: function(pin) {
        var mode = this._data[pin];

        if (mode === this.IN) {
            return Helpers.read('/sys/class/gpio/gpio'+pin+'/value');
        } else {
            throw new Error('The pin mode is "'+mode+'" and is not able to use the "in" method.');
        }
    },
    out: function(pin, value) {
        var mode = this._data[pin];

        if (mode === this.OUT) {
            Helpers.write('/sys/class/gpio/gpio'+pin+'/value', (!!value ? 1 : 0));
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

module.exports = GPIO;
