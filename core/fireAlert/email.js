var email = require("emailjs");
var moment = require('moment');

module.exports = function(alert, values){
    var server  = email.server.connect(settings.alerter.email);

    var obj_str = logdate()+' alert '+alert.name+' fired';
    var values_str = "Alert "+alert.name+" fired at "+moment(new Date()).format("YYYY/MM/DD HH:mm:ss")+" ";
    var value_html = "Alert <b>"+alert.name+"</b> fired at "+moment(new Date()).format("YYYY/MM/DD HH:mm:ss")+" ";
    if(alert.select){
        values.forEach(function(value){
            values_str += value+" ";
            value_html += value+"<br>"
        })
    }

    var message = {
        from: settings.alerter.email.from,
        text: values_str,
        to: settings.alerter.email.to,
        subject: obj_str,
        attachment:[
          {data:"<html>"+value_html+"</html>", alternative:true}
        ]
    };

    server.send(message, function(err, message) {
        if(err)
            core.logger.error(err);
    });
}
