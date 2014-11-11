"use strict";

module.exports = function (client, callback) {
	return client.request('GET', '/users')
		.then(function (users) {
			console.log(users);

			return client.request('GET', '/fakeurl');
		})
		.then(function (error) {
			console.log(error);
			// Kill the server once the requests have been made
			callback();
		});
};