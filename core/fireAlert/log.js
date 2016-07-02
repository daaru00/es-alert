var fs = require('fs');
var os = require('os');

module.exports = function(alert, hits){
    var path = settings.alerter.log.path;
    var str = logdate()+' alert '+alert.name+' fired';
    var values = " ";
    if(alert.select){
        hits.forEach(function(hit){
            var value = Object.resolve(alert.select, hit._source, true);
            if(value)
                values += value+" ";
        })
    }

    fs.appendFile(path, str+values+os.EOL, function(err){
        if (err)
            console.error(err);
    });
}
