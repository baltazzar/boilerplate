var Handlebars = require('handlebars.runtime')['default'],
	Config = require('config');

Handlebars.registerHelper('config', function(value) {
	return Config[value];
});