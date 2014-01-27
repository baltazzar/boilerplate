define(function (require, exports, module) {
	var Handlebars = require('handlebars');

	Handlebars.registerHelper('is', function (value, test, options) {
		if (value === test) {
			return options.fn(this);
		}
		else {
			return options.inverse(this);
		}
	});

	Handlebars.registerHelper('log', function (value) {
		return console.log(value);
	});
});