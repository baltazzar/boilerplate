var BaseController = require('base_controller');

module.exports = BaseController.extend({

	before: function() {
		this.renderView('menu', 'menu');
	},

	home: function() {
		this.renderView('main', 'home');
	},

	pagina404: function() {
		// view menu renderizada explicitamente pois rotas 404 não executam filtros!
		this.renderView('menu', 'menu');
		this.renderView('main', 'pagina404');
	}
});