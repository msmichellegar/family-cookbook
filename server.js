var Hapi = require('hapi');
var Inert = require('inert');
var server = new Hapi.Server();

server.register(Inert, function () {
    server.connection({
        port: process.env.PORT || 8080
    });
    server.route(require('./lib/routes.js'));
});

server.start(function() {
    console.log('Server running at: ' + server.info.uri + '!');
});

module.exports = server;
