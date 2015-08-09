'use strict';

var Helpers = {
    exec: require('child_process').exec,
    execSync: require('child_process').execSync,
    spawnSync: require('child_process').spawnSync,
    sleep: function(time) {
        this.execSync('sleep '+time);
    }
};

console.log('em 1s vai ser chamado');

setTimeout(function(){
    Helpers.execSync('sudo bash blink.sh');
}, 1000);
