'use strict';

var moment = require('moment');

module.exports = {
    log: console.log,
    error: console.error,
    logH: logH,
    errorH: errorH
};

function logBase() {
    var args = ['[%s %s] : ' + arguments[1], arguments[0], getServerTime()];
    for(var i in arguments) {
        if(i > 1) {
            args.push(arguments[i]);
        }
    }
    console.log.apply(this, args);
}

function logH() {
    var args = ['LOG'];
    for(var i in arguments) {
        args.push(arguments[i]);
    }
    logBase.apply(this, args);
}

function errorH() {
    var args = ['ERROR'];
    for(var i in arguments) {
        args.push(arguments[i]);
    }
    logBase.apply(this, args);
}

function getServerTime() {
    var serverTime = moment().format("YYYY-MM-DD hh:mm:ss");
    return serverTime;
}