var path = require('path');
var elasticsearch = require('elasticsearch');

global.settings = require(path.join(__dirname,'..','settings.json'));

global.core = {
    loadAlerts: require(path.join(__dirname,'loadAlerts.js')),
    fireAlert: require(path.join(__dirname,'fireAlert')),
    intervals: require(path.join(__dirname,'intervals.js')),
    logger: require(path.join(__dirname,'logger.js')),
}

module.exports = function(){

    // Init
    core.logger.log(logdate()+"Starting "+pkg.name+" Service");

    global.esclient = new elasticsearch.Client(settings.elasticsearch);

    core.logger.log(logdate()+'connecting to elasticsearch..');
    esclient.ping({
        requestTimeout: Infinity,
        test: "test"
    },
    function(error) {
        if (error) {
            core.logger.error(error);
            core.logger.error(logdate()+'elasticsearch cluster is down!');
        } else {
            core.logger.log(logdate()+'connected to elasticsearch');

            core.logger.log(logdate()+'loadings alerts..');
            core.loadAlerts();

            if(alerts.length  == 0){
                core.logger.error(logdate()+"no alerts defined");
            }else{
                core.logger.log(logdate()+'loaded '+alerts.length+' alerts');

                core.logger.log(logdate()+'starting alerts..');
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
