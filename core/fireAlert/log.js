var fs = require('fs');
var os = require('os');

module.exports = function(alert, values){
    var path = settings.alerter.log.path;
    var str = logdate()+' alert '+alert.name+' fired';
    var values_str = " ";
    if(alert.select){
        values.forEach(function(value){
            if(value)
                values_str += value+" ";
        })
    }

    fs.appendFile(path, str+values_str+os.EOL, function(err){
        if (err)
            console.error(err);
    });
}
