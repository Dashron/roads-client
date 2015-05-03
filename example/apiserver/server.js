"use strict";

var roads = require('roads');
var api = new roads.Road(require('./resources/root').many);

var notFoundRepresentation = require('./representations/server/notFound');
var notAllowedRepresentation = require('./representations/server/notAllowed');
var unknownRepresentation = require('./representations/server/unknown');

api.use(roads.middleware.killSlash);
api.use(roads.middleware.cors(['http://localhost:8080'], ['authorization']));

api.use(function (method, url, body, headers, next) {
	return next()
		.catch(function (err) {
			var response = null;

			switch (err.code) {
				case 404:
					return new roads.Response(notFoundRepresentation(err), 404);
				case 405:
					return new roads.Response(notAllowedRepresentation(err), 405);
				case 500:
				default:
					return new roads.Response(unknownRepresentation(err), 500);
			}
		});
});//*/

module.exports = require('http').createServer(api.server.bind(api));
