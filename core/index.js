var path = require('path');
var elasticsearch = require('elasticsearch');

global.core = {
    loadAlerts: require(path.join(__dirname,'loadAlerts.js')),
    fireAlert: require(path.join(__dirname,'fireAlert')),
    intervals: require(path.join(__dirname,'intervals.js'))
}

module.exports = function(){

    global.settings = require(path.join(__dirname,'..','settings.json'));
    global.esclient = new elasticsearch.Client(settings.elasticsearch);

    console.log(logdate()+'connecting to elasticsearch..');
    esclient.ping({
        requestTimeout: Infinity,
        test: "test"
    },
    function(error) {
        if (error) {
            console.error(error);
            console.error(logdate()+'elasticsearch cluster is down!');
        } else {
            console.log(logdate()+'connected to elasticsearch');

            console.log(logdate()+'loadings alerts..');
            core.loadAlerts();

            if(alerts.length  == 0){
                console.error(logdate()+"no alerts defined");
            }else{
                console.log(logdate()+'loaded '+alerts.length+' alerts');

                console.log(logdate()+'starting alerts..');
                core.intervals.start(alerts);

                process.stdin.resume();
                function exitHandler() {
                    core.intervals.stop();
                }
                process.on('exit', exitHandler);
                process.on('SIGINT', exitHandler);
                process.on('uncaughtException', exitHandler);
            }

        }
    });
}
