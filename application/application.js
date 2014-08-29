var Backbone = require('backbone'),
	Handlebars = require('handlebars.runtime')['default'],
	Templates = require('templates')(Handlebars),
	Handlebars_Helpers = require('handlebars_helpers'),
	Initializer = require('initializer'),
	Config = require('config');

// Exporta o jquery globalmente para compatibilidade com plugins.
jQuery = $ = require('jquery');

// Injeta o jquery.
Backbone.$ = $;

var Marionette = require('marionette'),
	Boiler = require('boiler'),
	Application = new Marionette.Application();

Marionette.Renderer.render = function(template, data, view) {
	if(template) {
		data.view = view;
		return Templates[template](data);
	}
};

Application.addRegions(Config.regions);

Boiler.init(Config, Application);

// Código a ser executado na inicialização da aplicação.
Application.addInitializer(Initializer);

Application.start();

module.exports = Application;