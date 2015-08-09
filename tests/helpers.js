'use strict';

var Helpers = {
    write: require('fs').writeFileSync,
    read: require('fs').readFileSync,
    exists: require('fs').existsSync,
    exec: require('child_process').execSync
};

module.exports = Helpers;
