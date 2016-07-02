var path = require('path');

// Utilities
Date.prototype.toStandarFormat = function() {
    return this.getUTCFullYear() + '-' +
    ('00' + (this.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + this.getUTCDate()).slice(-2) + ' ' +
    ('00' + this.getUTCHours()).slice(-2) + ':' +
    ('00' + this.getUTCMinutes()).slice(-2) + ':' +
    ('00' + this.getUTCSeconds()).slice(-2);
};
Object.resolve = function(path, obj, safe) {
    return path.split('.').reduce(function(prev, curr) {
        return !safe ? prev[curr] : (prev ? prev[curr] : undefined)
    }, obj || self)
}

global.logdate = function(){
    return "["+(new Date()).toStandarFormat()+"]";
}

// Settings
global.pkg = require(path.join(__dirname,'package.json'));

// Init
console.log(logdate()+"Starting "+pkg.name+" Service");

require(path.join(__dirname,'core'))()
