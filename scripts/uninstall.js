var Service = require('node-linux').Service;

module.exports = function(){
    // Create a new service object
    var svc = new Service({
        name: 'es-alert',
        script: require('path').join(__dirname,'..', 'service.js')
    });

    svc.on('uninstall', function() {
        console.log('Uninstall complete.');
    });

    svc.on('error', function(err) {
        console.log('ERROR:', err);
    })

    svc.uninstall();
}
