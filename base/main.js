//START REQUIRE CONFIG
require.config({
	"waitSeconds": 0,
	"urlArgs": "v=@@versao",
	"paths": {
		"baseController": "../base/baseController",
		"dispatcher": "../base/dispatcher",
		"router": "../base/router",
		"application": "../application/application",
		"initializer": "../application/initializer",
		"collections": "../application/collections",
		"controllers": "../application/controllers",
		"models": "../application/models",
		"templates": "../application/templates/templates",
		"views": "../application/views",
		"config": "../config",
		"backbone.babysitter": "../libs/backbone.babysitter",
		"backbone": "../libs/backbone",
		"backbone.wreqr": "../libs/backbone.wreqr",
		"bootstrap": "../libs/bootstrap",
		"handlebars.runtime": "../libs/handlebars.runtime",
		"jquery": "../libs/jquery",
		"marionette": "../libs/marionette",
		"underscore": "../libs/underscore"
	},
	"shim": {
		"bootstrap": [
			"jquery"
		]
	}
});
//END REQUIRE CONFIG

require(['libs']);

require(['initializer', 'application', 'dispatcher'], function(Initializer, Application, Dispatcher) {

	// Executa as rotinas contidas no arquivo application/initializer.js
	Initializer();

	// Registra as rotas da aplicação
	Dispatcher.registerRoutes();

	// Inicia a aplicação
	Application.start();
});