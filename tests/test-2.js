'use strict';

var Helpers = {
    exec: require('child_process').exec,
    execSync: require('child_process').execSync,
    execFileSync: require('child_process').execFileSync,
    sleep: function(time) {
        this.execSync('sleep '+time);
    }
};

Helpers.execFileSync('blink.sh');
