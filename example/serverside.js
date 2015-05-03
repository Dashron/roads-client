"use strict";
var port = 8081;

var client = new (require('../index.js').Client)('localhost', port);
var server = require('./apiserver/server.js');
var controller = require('./controller.js');

// Start the api server, so requests can be made against a real server
server.listen(port, function () {
	console.log('server has started');
});

controller(client)
	.then(function (response) {
		console.log(response);
		server.close();
	})
	.catch(function (err) {
		console.log(err);
		server.close();
	});