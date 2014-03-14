define(function(require, exports, module){

	var BaseController = require('baseController');

	module.exports = BaseController.extend({

		before: function() {
			this.renderView('menu', 'menu');
		},

		home: function() {
			this.renderView('main', 'home');
		},

		pagina404: function() {
			console.log('404');
		}
	});
});