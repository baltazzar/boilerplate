var Dispatcher = require('dispatcher');

var Controller = function(options){

	this.aborted = false;

	this.abort = function() {
		this.aborted = true;
	};

	this.execute = function(method, args, special) {

		if(special !== null) {
			if(special) {
				this.beforeSpecial();
			} else {
				this.before();
			}
		}

		if(!this.aborted) {
			options[method].apply(this, args);
		}

		if(special !== null && !this.aborted) {
			if(special) {
				this.afterSpecial();
			} else {
				this.after();
			}
		}
	};

	this.before = options.before ? options.before : function() {};

	this.beforeSpecial = options.beforeSpecial ? options.beforeSpecial : function() {};

	this.after = options.after ? options.after : function() {};

	this.afterSpecial = options.afterSpecial ? options.afterSpecial : function() {};

	this.renderView = function(region, view, options) {
		var viewPath = 'views/' + view;
		Dispatcher.renderView(region, viewPath, options);
	};
};

module.exports = {
	extend: function() {
		return new Controller(arguments[0]);
	}
};