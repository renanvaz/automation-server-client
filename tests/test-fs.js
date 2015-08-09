'use strict';

var Helpers = {
    write: require('fs').writeFileSync,
    read: require('fs').readFileSync,
    exists: require('fs').existsSync,
    exec: require('child_process').execSync,
    sleep: function(time) {
        this.exec('sleep '+time);
    }
};

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

var DATA_PIN = GPIO.setup('17', GPIO.OUT);
var CLOCK_PIN = GPIO.setup('22', GPIO.OUT);
var LATCH_PIN = GPIO.setup('27', GPIO.OUT);

var data = [0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,1, 0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,1, 0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,1, 0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,1].reverse();

var timeStart = new Date().getTime();

LATCH_PIN.out(0);
for (var i = 0; i < data.length; i++) {
    CLOCK_PIN.out(0);
    DATA_PIN.out(data[i]);
    CLOCK_PIN.out(1);
}
LATCH_PIN.out(1);

console.log(new Date().getTime() - timeStart);
