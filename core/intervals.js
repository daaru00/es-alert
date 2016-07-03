var str2millisecond = require('parse-duration');
var intervals = [];

module.exports = {
    start: function(alerts){
        alerts.forEach(function(alert){
            var ms = str2millisecond(alert.frequency);
            core.logger.log(logdate()+'started alert checker '+alert.id);
            intervals.push(setInterval(function(){
                chkAlertThread(alert);
            }, ms));
        })
    },
    stop: function(){
        intervals.forEach(function(interval){
            clearInterval(interval);
        });
    }
}

function chkAlertThread(alert){
    esclient.search(alert.search).then(function (resp) {
        if(resp.hits.total > 0){
            core.fireAlert(alert, resp.hits.hits);
        }
    }, function (err) {
        core.logger.error(err);
    });
}
