// Exporta o jquery globalmente para compatibilidade com plugins.
jQuery = $ = require('jquery');

var Backbone = require('backbone');

// Injeta o jquery.
Backbone.$ = $;

// Registra os helpers do Handlebars
require('handlebars_helpers');

var Marionette = require('marionette'),
	Templates = require('templates'),
	Config = require('config'),
	Application = new Marionette.Application();

Marionette.Renderer.render = function(template, data, view) {
	if(typeof template === 'function') {
		return template;
	} else {
		data.view = view;
		return Templates[template](data);
	}
};

Application.addRegions(Config.regions);

module.exports = Application;