'use strict';

var GPIO = require('gpio');

var DATA_PIN = GPIO.setup('17', GPIO.OUT);
var CLOCK_PIN = GPIO.setup('22', GPIO.OUT);
var LATCH_PIN = GPIO.setup('27', GPIO.OUT);

var data = [];
for (var i = 0; i < 64; i++) {
    data.push(Math.round(Math.random()));
}

var timeStart = new Date().getTime();

LATCH_PIN.out(0);
for (i = 0; i < data.length; i++) {
    CLOCK_PIN.out(0);
    DATA_PIN.out(data[i]);
    CLOCK_PIN.out(1);
}
LATCH_PIN.out(1);

console.log(new Date().getTime() - timeStart);
