define(function(require, exports, module){

	var Marionette = require('marionette'),
		Handlebars = require('handlebars.runtime')['default'],
		Templates = require('templates')(Handlebars),
		Config = require('config'),
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
});