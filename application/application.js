var $ = require('jquery'),
	Marionette = require('marionette'),
	Backbone = require('backbone'),
	Handlebars = require('handlebars.runtime')['default'],
	Templates = require('templates')(Handlebars),
	Config = require('config'),
	Handlebars_Helpers = require('handlebars_helpers'),
	Application;

// Injeta o jquery
Backbone.$ = $;
Marionette.$ = $;

Application = new Marionette.Application();

Marionette.Renderer.render = function(template, data) {
	if(template) {
		return Templates[template](data);
	}
};

Application.addRegions(Config.regions);

// Código a ser executado na inicialização da aplicação.
Application.addInitializer(function() {});

module.exports = Application;