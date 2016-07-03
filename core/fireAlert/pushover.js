var pushover = require( 'pushover-notifications' );

module.exports = function(alert, values){

    var pushoverBot = new pushover( {
        user: settings.alerter.pushover.user,
        token: settings.alerter.pushover.token,
        onerror: core.logger.error,
        update_sounds: true
    });

    var str = logdate()+' alert '+alert.name+' fired';
    var values_str = " ";
    if(alert.select){
        values.forEach(function(value){
            if(value)
                values_str += value+" ";
        })
    }

    pushoverBot.send({
        message: values_str,
        title: str,
        sound: settings.alerter.pushover.sound,
        device: settings.alerter.pushover.device,
        priority: 1
    }, function( err, result ) {
        if (err) {
            core.logger.error(err);
        }
    });

}
