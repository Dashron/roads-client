"use strict";
var port = 8081;

var client = new (require('../index.js').Client)('localhost', port);
var server = require('./server/server.js');

// Start the api server, so requests can be made against a real server
server.listen(port, function () {
	console.log('server has started');
});

client.request('GET', '/users')
	.then(function (users) {
		console.log(users);

		return client.request('GET', '/fakeurl');
	})
	.then(function (error) {
		console.log(error);
		// Kill the server once the requests have been made
		server.close();
	});