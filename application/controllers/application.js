define(function(require, exports, module){

	var BaseController = require('baseController');

	module.exports = BaseController.extend({

		before: function() {
			this.renderView('menu', 'menu');
		},

		index: function() {
			this.renderView('main', 'index');
		},

		pagina404: function() {
			console.log('404');
		}
	});
});