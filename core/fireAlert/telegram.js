var telegram = require('telegram-bot-api');

module.exports = function(alert, values){

    var telegramBot = new telegram({
        token: settings.alerter.telegram.token
    });

    var value_html = "Alert <b>"+alert.name+"</b> fired ";
    if(alert.select){
        values.forEach(function(value){
            value_html += value+"<br>"
        })
    }

    telegramBot.sendMessage({
        chat_id: settings.alerter.telegram.to,
        parse_mode: "HTML",
        text: value_html
    }).then(function(data){
        //console.log(data);
    }).catch(function(err){
    	console.error(err);
    });
}
