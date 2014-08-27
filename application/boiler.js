var _ = require('underscore'),
	Backbone = require('backbone'),
	Marionette = require('marionette'),
	Handlebars = require('handlebars.runtime')['default'],
	Templates = require('templates')(Handlebars),
	Boiler = {};

// Register Routes
var registerRoutes = function(config) {
	var Router = new Backbone.Router({});

	require('backbone.queryparams');

	_(config.routes).each(function(action, route) {
		var controllerName = action.split('#')[0],
			methodName = action.split('#')[1],
			controller = require('controllers/' + controllerName);

		Router.route(route, function() {
			return controller.execute(controllerName, methodName, arguments);
		});
	});

	Backbone.history.start();
};

// Set the Loading and Error Templates
var setLoadingAndErrorTemplates = function() {
	if(Templates['loading.tpl']) {
		$(document).ajaxStart(function() {
			Boiler.Application.main.show(new Marionette.ItemView({template: 'loading.tpl'}));
		});
	}

	if(Templates['error.tpl']) {
		$(document).ajaxError(function(event, err) {
			var model = new Backbone.Model(err);
			Boiler.Application.main.show(new Marionette.ItemView({template: 'error.tpl', model: model}));
		});
	}
};

// Store
var store = (function() {
	var that = this;

	return {
		getCollection: function(name, data, callback) {
			if(!callback) {
				callback = data;
				data = null;
			}

			if(!that.collections[name + '-' + data]) {
				var collection = new (require('collections/' + name))();
				collection.fetch({data: data}).done(function() {
					that.collections[name + '-' + data] = collection;
					callback(collection);
				});
			} else {
				callback(that.collections[name + '-' + data]);
			}
		}
	};
});

// Set Store Clean Interval
var setStoreCleanInterval = function() {
	var interval;

	if(interval) {
		clearInterval(interval);
	} else {
		interval = setInterval(function() {
			Boiler.models = {};
			Boiler.collections = {};
		}, Boiler.Config.CACHE_CLEAR_INTERVAL || 60000);
	}
};

// Boiler Init
Boiler.init = function(config, application) {
	Boiler.Config = config;
	Boiler.Application = application;
	Boiler.errorCalled = false;
	Boiler.models = {};
	Boiler.collections = {};

	setLoadingAndErrorTemplates();
	setStoreCleanInterval();
	registerRoutes(config);
};

// Boiler Controller
Boiler.Controller = {
	before: function() {},
	after: function() {},
	execute: function(controller, method, args) {
		if(this.before(method, location.hash) !== false) {
			if(this[method] === undefined) {
				this.renderView(null, null, null, controller, method);
			} else {
				this[method].apply(this, args);
			}
			this.after(method, location.hash);
		}
	},
	renderView: _.throttle(function(region, view, viewOptions, controller, method) {
		var View,
			template;

		if(region && view) {
			View = require('views/' + view);
			Boiler.Application[region].show(new View(viewOptions));
		} else {
			var path = controller + '/' + method;

			try {
				View = require('views/' + path);
			} catch(err) {
				if(Templates[path + '.tpl']) {
					View = Marionette.ItemView.extend({template: path + '.tpl'});
				}
			}

			if(View) {
				Boiler.Application.main.show(new View());
			}
		}
	}, 100),
	extend: function(options) {
		return _.extend({store: store.call(Boiler)}, this, options);
	}
};

module.exports = Boiler;