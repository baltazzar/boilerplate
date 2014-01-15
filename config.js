define(function(require, exports, module) {
	module.exports = {

		'app': {
			'routes': {
				''      : 'index',
				'*404'  : 'pagina404'
			}
		},

		'modules': {},

		'loadOnInit': [], // módulos carregados na inicialização da aplicação
		'BASE_URL': 'http://CAMINHO_DA_APLICACAO/api'
	}
});