var BaseController = require('base_controller');

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