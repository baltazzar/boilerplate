var Handlebars = require('handlebars.runtime')['default'],
	Backbone = require('backbone'),
	Config = require('config');

Handlebars.registerHelper('config', function(value) {
	return Config[value];
});

Handlebars.registerHelper('log', function(obj) {
	console.log(obj);
});

Handlebars.registerHelper('link', function(route, param, options) {
	if(!options) {
		options = param;
		param = null;
	}

	var fragment = Backbone.history.fragment.split('?')[0],
		hashRoute,
		link = $('<a/>').html(options.fn(this));

	if(param) {
		if(route.indexOf('?') !== -1) {
			route = route.replace('?', '/' + param + '?');
		} else {
			route += '/' + param;
		}
	}

	hashRoute = route.split('?')[0];

	link.attr('href', '#/' + route).addClass('active', hashRoute === fragment);

	return new Handlebars.SafeString(link[0].outerHTML);
});