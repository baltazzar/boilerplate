define(function(require, exports, module){
	var Backbone = require('backbone'),
		Utils = require('utils'),
		Config = require('config');

	var AppRouter = Backbone.Router.extend({

		routes: {
			'*404': function() {
				Utils.loadModule(Config.app, function(mod) {
					mod['pagina404']();
				});
			}
		},

		initialize: function() {
			var router = this,
				modulos = _.extend({}, {'app': Config.app});

			// Injeta o objeto App em todos os módulos
			var bindAppMethods = function(modulo, callback) {
				Utils.loadModule(Config.app, function(App) {
					modulo.app = App;
					callback();
				});
			}

			if(Config.modulos) {
				modulos = _.extend(modulos, Config.modulos);
			}

			_.each(modulos, function(modulo) {
				_.each(modulo.routes, function(metodo, rota) {
					if(rota == '*404') {
						return;
					}
					router.route(rota, function(params) {
						var args = arguments,
							parameters = {};

						Utils.loadModule(modulo, function(mod) {
							bindAppMethods(mod, function() {
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
	}

	exports.registerRoutes = registerRoutes;
});