var pushover = require( 'pushover-notifications' );

module.exports = function(alert, hits){

    var pushoverBot = new pushover( {
        user: settings.alerter.pushover.user,
        token: settings.alerter.pushover.token,
        onerror: console.error,
        update_sounds: true
    });

    var str = logdate()+' alert '+alert.name+' fired';
    var values = " ";
    if(alert.select){
        hits.forEach(function(hit){
            var value = Object.resolve(alert.select, hit._source, true);
            if(value)
                values += value+" ";
        })
    }

    pushoverBot.send({
        message: values,
        title: str,
        sound: settings.alerter.pushover.sound,
        device: settings.alerter.pushover.device,
        priority: 1
    }, function( err, result ) {
        if (err) {
            console.error(err);
        }
    });

}
