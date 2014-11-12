"use strict";

var koa = require('koa');
var app = koa();
var fs = require('fs');
var controller = require('../controller.js');
var api_port = 8081;
var client = new (require('../../index.js').Client)('localhost', api_port);

var loadFile = function () {
	return fs.readFileSync(__dirname + this.path, {
		encoding : 'utf8'
	});
};

var applyLayout = function (contents) {
	return '<div id="content">' + contents + '</div><script src="/js/index.brws.js"></script>';
};

app.use(function *(){
	console.log(this.path);
	switch (this.path) {
		case "/":
			
			this.body = applyLayout(yield controller.call({
				client: client
			}));

			this.response.header['content-type'] = 'text/html';
			break;
		case "/js/index.brws.js":
			this.body = loadFile.call(this);
			break;
		default:
			throw new Error('Page not found', 404);
	}
});

app.listen(3000);


module.exports.server = app;
module.exports.apiport = api_port;