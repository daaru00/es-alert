var email = require("emailjs");
var moment = require('moment');

module.exports = function(alert, hits){
    var server  = email.server.connect(settings.alerter.email);

    var obj_str = logdate()+' alert '+alert.name+' fired';
    var values = "Alert "+alert.name+" fired at "+moment(new Date()).format("YYYY/MM/DD HH:mm:ss")+" ";
    var value_html = "Alert <b>"+alert.name+"</b> fired at "+moment(new Date()).format("YYYY/MM/DD HH:mm:ss")+" ";
    if(alert.select){
        hits.forEach(function(hit){
            values += Object.resolve(alert.select, hit._source, true)+" ";
            value_html += Object.resolve(alert.select, hit._source, true)+"<br>"
        })
    }

    var message = {
        from: settings.alerter.email.from,
        text: values,
        to: settings.alerter.email.to,
        subject: obj_str,
        attachment:[
          {data:"<html>"+value_html+"</html>", alternative:true}
        ]
    };

    server.send(message, function(err, message) {
        if(err)
            console.error(err);
    });
}
