'use strict';

var Helpers = {
    exec: require('child_process').exec,
    execSync: require('child_process').execSync,
    spawnSync: require('child_process').spawnSync,
    sleep: function(time) {
        this.execSync('sleep '+time);
    }
};

Helpers.spawnSync('sudo bash', ['blink.sh']);
