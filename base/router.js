define(function(require, exports, module){

	var Backbone = require('backbone');

	module.exports = Backbone.Router.extend({

		initialize: function(routes) {
			var router = this;

			_.each(routes, function(r) {
				var route = r.route,
					controllerPath = '../application/controllers/' + r.controller,
					method = r.method,
					special = r.special;

				router.route(route, function() {
					var args = _.initial(arguments);

					require([controllerPath], function(Controller) {
						Controller.execute(method, args, special);
					});
				});
			});
		}
	});
});