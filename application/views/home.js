define(function(require, exports, module){

	var Marionette = require('marionette'),
		Config = require('config');

	module.exports = Marionette.ItemView.extend({
		template: 'home.tpl',

		initialize: function() {
			$('.logotipo-prefeitura').attr('src', Config.cdnUrl + '/sorocaba_alpha.png');
			$('.logotipo-setor').attr('src', Config.cdnUrl + '/logotipo_setor.png');
		}
	});
});