var Service = require('node-linux').Service;


module.exports = function(){

    // Create a new service object
    var svc = new Service({
        name: 'es-alert',
        description: 'Alerting for Elasticsearch',
        script: require('path').join(__dirname, '..', 'service.js')
    });

    // Listen for the "install" event, which indicates the
    // process is available as a service.
    svc.on('install', function() {
        console.log('Installation Complete');
        console.log('Now you can start it with: service '+svc.name+' start');
        //svc.start();
    });

    // Just in case this file is run twice.
    svc.on('alreadyinstalled', function() {
        console.log('This service '+svc.name+' is already installed.');
        //svc.start();
    });

    // Listen for the "start" event and let us know when the
    // process has actually started working.
    svc.on('start', function() {
        console.log(svc.name + ' started');
    });

    // Install the script as a service.
    svc.install();
}
