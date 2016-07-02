var telegram = require('telegram-bot-api');
var telegramBot = new telegram({
    token: settings.alerter.telegram.token;
});

module.exports = function(alert, hits){

    var value_html = "Alert <b>"+alert.name+"</b> fired ";
    if(alert.select){
        hits.forEach(function(hit){
            value_html += Object.resolve(alert.select, hit._source, true)+"<br>"
        })
    }

    telegramBot.sendMessage({
        chat_id: settings.alerter.telegram.to,
        parse_mode: "HTML"
        text: value_html
    }).then(function(data){
        //console.log(data);
    }).catch(function(err){
    	console.error(err);
    });
}
