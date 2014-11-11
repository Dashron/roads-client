"use strict";
var port = 8081;

var controller = require('../../controller.js');
var client = new (require('../../../index.js').Client)('localhost', port);

controller(client, function () {
	console.log('complete');
});