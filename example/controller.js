"use strict";

module.exports = function (client) {
	return client.request('GET', '/users')
		.then(function (users) {
			var body = [];

			for(var i = 0; i < users.body.total; i++) {
				body.push(users.body.collection[i].name);
			}

			return body.join(',') + '<br />Last updated on ' + new Date() + ' <a id="refresh" href="/">Refresh</a>';
		});
};