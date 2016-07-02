var path = require('path');
var fs = require('fs');
var moment = require("moment");
var str2millisecond = require('parse-duration');

var alerts_history = [];

var alerter = {
    email: require(path.join(__dirname,'email.js')),
    log: require(path.join(__dirname,'log.js')),
    telegram: require(path.join(__dirname,'telegram.js')),
    pushover: require(path.join(__dirname,'pushover.js'))
}

module.exports = function(alert, hits){
    if(alert.noRealert){
        if(alerts_history[alert.id] == undefined){
            alerts_history[alert.id] = new Date();
            fireAlert(alert, hits)
        }else{
            var last_fired = alerts_history[alert.id];
            var noRealert = str2millisecond(alert.noRealert);
            var duration = moment.duration(moment(new Date).diff(last_fired));
            if(duration.asMilliseconds() > noRealert){
                alerts_history[alert.id] = new Date();
                fireAlert(alert, hits);
            }
        }
    }else{
        fireAlert(alert, hits);
    }

}

function fireAlert(alert, hits){
    console.log(logdate()+'firing alert '+alert.name);
    alert.transports.forEach(function(transport){
        alerter[transport](alert, hits);
    })
}
