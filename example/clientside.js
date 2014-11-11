"use strict";
var apiport = 8081;
var webport = 8080;

var server = require('./apiserver/server.js');
var webserver = require('./webserver/server.js').server;

// Start the api server, so requests can be made against a real server
server.listen(apiport, function () {
	console.log('api server has started');
});

webserver.apiport = apiport;
webserver.listen(webport, function () {
	console.log('webserver has started');
});