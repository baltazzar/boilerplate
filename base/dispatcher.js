define(function(require, exports, module){

	var Backbone = require('backbone'),
		Router = require('router'),
		Config = require('config');

	exports.registerRoutes = function() {
		var routesArr = [],
			special = false;

		_.each(Config.routes, function(action, route) {

			if(_.contains(route, '@')) {
				special = true;
				route = _.rest(route).join('');
			} else if(_.contains(route, '*')) {
				special = null;
			} else {
				special = false;
			}

			routesArr.push({
				route      : route,
				controller : action.split('#')[0],
				method     : action.split('#')[1],
				special    : special
			});
		});

		new Router(routesArr);
		Backbone.history.start();
	};

	exports.renderView = function(view, region, options) {
		require(['application', view], function(Application, View) {
			Application[region].show(new View(options));
		});
	}
});