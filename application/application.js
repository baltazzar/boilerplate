var Backbone = require('backbone'),
	Templates = require('templates'),
	Initializer = require('initializer'),
	Config = require('config');

// Exporta o jquery globalmente para compatibilidade com plugins.
jQuery = $ = require('jquery');

// Injeta o jquery.
Backbone.$ = $;

// Registra os helpers do Handlebars
require('handlebars_helpers');

var Marionette = require('marionette'),
	Boiler = require('boiler'),
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

Boiler.init(Config, Application);

// Código a ser executado na inicialização da aplicação.
Application.addInitializer(Initializer);

Application.start();

module.exports = Application;