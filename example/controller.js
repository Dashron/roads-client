"use strict";

module.exports = function () {
	return this.client.request('GET', '/users')
		.then(function (users) {
			console.log(users);
			var body = [];

			for(var i = 0; i < users.data.total; i++) {
				body.push(users.data.collection[i].name);
			}

			return body.join(',') + '<br />Last updated on ' + new Date() + ' <a id="refresh" href="/">Refresh</a>';
		});
};