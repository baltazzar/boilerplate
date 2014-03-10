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

require(['initializer', 'application'], function(Initializer, Application) {

	// Run the initializers
	Initializer();

	// Start the application
	Application.start();
});