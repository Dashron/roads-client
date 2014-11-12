"use strict";
var port = 8081;

var controller = require('../../controller.js');
var client = new (require('../../../index.js').Client)('localhost', port);

var refresh = function (event) {
	event.preventDefault();

	controller.call({
		client: client
	}).then(function(html) {
		document.getElementById('content').innerHTML = html;
		assignHandler();
	});
};

var assignHandler = function () {
	document.getElementById('refresh').addEventListener('click', refresh);
};

assignHandler();