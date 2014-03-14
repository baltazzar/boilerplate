define(function(require, exports, module){

	var Handlebars = require('handlebars.runtime')['default'],
		Config = require('config');

	Handlebars.registerHelper('CDN_URL', function() {
		return Config.CDN_URL;
	});
});