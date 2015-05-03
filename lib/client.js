"use strict";

/**
* client.js
* Copyright(c) 2014 Aaron Hedges <aaron@dashron.com>
* MIT Licensed
 */

var http = require('http');

var Client = module.exports = function Client (host, port) {
	this.host = host;
	this.port = port;
};


Client.prototype.host = null;
Client.prototype.port = null;

Client.prototype.request = function (method, path, body, headers) {
	var client = this;

	return new Promise(function (accept, reject) {
		var json = false;

		if (body && typeof body !== "string") {
			headers['content-type'] = 'application/json';
			body = JSON.stringify(body);
		}

		var req = http.request({
			hostname : client.host,
			port : client.port,
			path : path,
			method : method,
			headers : headers
		}, client._responseHandler(accept));

		req.on('error', reject);

		if (body) {
			req.write(body);
		}

		req.end();
	});
};

Client.prototype._responseHandler = function (accept) {
	var client = this;

	return function (response) {
		var response_body = '';

		response.on('data', function (chunk) {
			response_body += chunk;
		});

		response.on('end', function () {
			accept({
				body : client._decodeBody(response_body, response.headers),
				headers : response.headers,
				status : response.statusCode
			});
		});
	};
};

Client.prototype._decodeBody = function (body, headers) {
	switch (headers['content-type']) {
		case 'application/json' :
			return JSON.parse(body);
		default : 
			return body;
	}
};