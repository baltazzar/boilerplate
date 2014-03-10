define(function(require, exports, module){

	var BaseController = require('baseController');

	module.exports = BaseController.extend({

		before: function() {
			console.log('Before Not Special!!!');
		},

		beforeSpecial: function() {
			console.log('Before Special!!!');
		},

		after: function() {
			console.log('After Not Special!!!');
		},

		afterSpecial: function() {
			console.log('After Special!!!');
		},

		listar: function() {
			var patos = ['Huguinho', 'Zezinho', 'Luizinho'];
			var model = new Backbone.Model();
			model.set('patos', patos);

			console.log('LISTAGEM DE PESSOAS');
			this.renderView('pessoas/listar', 'main', {model: model});
		},

		detalhar: function(id) {
			console.log('EXIBINDO PESSOA #' + id);
		},

		cumprimentar: function(nome, sobrenome) {
			console.log('OLÁ ' + nome + ' ' + sobrenome + '!');
		}
	});
});