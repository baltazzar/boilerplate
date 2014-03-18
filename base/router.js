var Backbone = require('backbone'),
	_ = require('underscore');

module.exports = Backbone.Router.extend({

	initialize: function(routes) {
		var router = this;

		_.each(routes, function(r) {
			var route = r.route,
				controller = require('controllers/' + r.controller),
				method = r.method,
				special = r.special;

			router.route(route, function() {
				var args = _.initial(arguments);

				controller.execute(method, args, special);
			});
		});
	}
});