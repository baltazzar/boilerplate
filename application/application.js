define(function(require, exports, module){

	var Marionette = require('marionette'),
		Dispatcher = require('dispatcher'),
		Handlebars = require('handlebars'),
		Templates = require('templates'),
		Config = require('config'),
		Application = new Marionette.Application();

	Marionette.Renderer.render = function(template, data){
		if(template) {
			return Templates[template](data);
		}
	};

	Application.addRegions(Config.regions);

	Application.addInitializer(function() {
		Dispatcher.registerRoutes();
	});

	module.exports = Application;
});