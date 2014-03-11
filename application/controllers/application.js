define(function(require, exports, module){

	var BaseController = require('baseController');

	module.exports = BaseController.extend({

		index: function() {
			console.log('INDEX');
		},

		pagina404: function() {
			console.log('404');
		}
	});
});