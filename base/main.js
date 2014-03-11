require.config({
	waitSeconds: 0,
	urlArgs: "v=@@versao",
	baseUrl: 'libs',
	paths: {
		'application'    : '../application/application',
		'baseController' : '../base/baseController',
		'config'         : '../config',
		'dispatcher'     : '../base/dispatcher',
		'infra'          : '../base/infra',
		'initializer'    : '../application/initializer',
		'router'         : '../base/router',
		'templates'      : '../application/templates/templates'
	},
	shim: {
		'bootstrap': ['jquery'],
		'handlebars': {
			exports: 'Handlebars'
		}
	}
});

require(['infra']);

require(['initializer', 'application', 'dispatcher'], function(Initializer, Application, Dispatcher) {

	// Executa as rotinas contidas no arquivo application/initializer.js
	Initializer();

	// Registra as rotas da aplicação
	Dispatcher.registerRoutes();

	// Inicia a aplicação
	Application.start();
});