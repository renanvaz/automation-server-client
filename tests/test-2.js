'use strict';

var Helpers = {
    exec: require('child_process').exec,
    execSync: require('child_process').execSync,
    sleep: function(time) {
        this.execSync('sleep '+time);
    }
};

Helpers.execSync('sudo blink.sh');
