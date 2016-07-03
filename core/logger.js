var fs = require('fs');
var os = require('os');
var path = require('path');

module.exports = {
    log: function(data){
        if(settings.log){
            if(process.env.MODE == "service"){
                writeToFile("log", data);
            }else{
                console.log(data);
            }
        }
    },
    error: function(data){
        if(settings.log){
            if(process.env.MODE == "service"){
                writeToFile("error", data);
            }else{
                console.error(data);
            }
        }
    }
}

function writeToFile(type, data){
    if (!fs.existsSync(settings.logPath)){
        fs.mkdirSync(settings.logPath);
    }

    fs.appendFile( path.join(settings.logPath, type+".log"), data.toString()+os.EOL, function(err){

    });

}
