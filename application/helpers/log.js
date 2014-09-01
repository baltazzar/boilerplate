var Handlebars = require('handlebars.runtime')['default'];

Handlebars.registerHelper('log', function(obj) {
	console.log(obj);
});