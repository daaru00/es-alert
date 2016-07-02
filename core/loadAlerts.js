var path = require('path');
var fs = require('fs');

module.exports = function(){
    global.alerts = [];
    fs.readdirSync(path.join(__dirname, "..", "alerts")).forEach(function(file) {
        var name = file.replace(".json", "");
        var data = require(path.join(__dirname, "..", "alerts", file));
        data.id = name;
        global.alerts.push(data);
    });
}
