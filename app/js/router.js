define(function(require, exports, module){
	var Backbone = require('backbone'),
		Utils = require('utils'),
		Config = require('config');

	var AppRouter = Backbone.Router.extend({

		routes: {
			'*404': function() {
				Utils.loadModule('app', function(App) {
					App['pagina404']();
				});
			}
		},

		initialize: function() {
			var router = this,
				modulos = _.extend({}, {'app': Config.app});

			if(Config.modules) {
				modulos = _.extend(modulos, Config.modules);
			}

			_.each(modulos, function(modulo, name) {

				_.each(modulo.routes, function(metodo, rota) {
					if(rota == '*404') {
						return;
					}
					router.route(rota, function(params) {
						var args = arguments,
							parameters = {};

						Utils.loadModule(name, function(mod) {
							Utils.loadModule('app', function(App) {
								// Injeta o objeto App em todos os módulos
								if(name !== 'app') {
									mod.app = App;
								}
								if(params) {
									var re = rota.match(/\:([a-z0-9]*)/g);

									_.each(re, function(item, key) {
										item = item.replace(':', '');

										parameters[item] = args[key];
									});

									mod[metodo](parameters);
								} else {
									mod[metodo]();
								}
							});
						});
					});
				});
			});
		}
	});

	var registerRoutes = function() {
		new AppRouter();
		Backbone.history.start();
	};

	exports.registerRoutes = registerRoutes;
});