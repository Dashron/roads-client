"use strict";

var koa = require('koa');
var app = koa();
var fs = require('fs');

var home = function () {
	return 'Home <script src="/js/index.brws.js"></script>';
};

var loadFile = function () {
	return fs.readFileSync(__dirname + this.path, {
		encoding : 'utf8'
	});
};

var loadController = function () {
	return fs.readFileSync(__dirname + '/../controller.js', {
		encoding : 'utf8'
	});
};

app.use(function *(){
	console.log(this.path);
	switch (this.path) {
		case "/":
			this.body = home.call(this);
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
module.exports.apiport = 8081;