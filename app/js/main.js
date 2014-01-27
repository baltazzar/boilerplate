require.config({
	waitSeconds: 0,
	urlArgs: "v=@@versao",
	paths: {
		'backbone': 'libs/backbone.min',
		'backbone.babysitter': 'libs/babysitter.min',
		'backbone.wreqr': 'libs/wreqr.min',
		'bootstrap': 'libs/bootstrap.min',
		'config': '../../config',
		'handlebars': 'libs/handlebars.runtime.min',
		'handlebars_helpers': 'handlebars_helpers',
		'jquery': 'libs/jquery.min',
		'marionette': 'libs/marionette.min',
		'templates': 'templates',
		'underscore': 'libs/underscore.min'
	},
	shim: {
		'bootstrap': ['jquery'],
		'handlebars': {
			exports: 'Handlebars'
		},
		'handlebars_helpers': ['handlebars'],
		'templates': ['handlebars', 'handlebars_helpers']
	}
});

require(['router', 'config', 'utils', 'app', 'infra'], function (AppRouter, Config, Utils, App) {
	AppRouter.registerRoutes();

	_.each(Config.loadOnInit, function (modulo) {
		Utils.loadModule(modulo);
	});
});