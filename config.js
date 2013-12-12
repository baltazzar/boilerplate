define(function(require, exports, module) {
	module.exports = {

		'app': {
			'controller': 'app',
			'routes': {
				''      : 'index',
				'*404'  : 'pagina404'
			}
		},

		'modulos': {},

		'loadOnInit': [], // módulos carregados na inicialização da aplicação
		'BASE_URL': 'http://CAMINHO_DA_APLICACAO/api'
	}
});