define(function(require, exports, module){

	module.exports = {

		/**
		 * Rotas da Aplicação
		 *
		 * As rotas com '@' são consideradas rotas especiais. Os filtros 'beforeSpecial' e 'afterSpecial'
		 * são executados antes e depois da execução dessas rotas caso estejam definidos no controller.
		 * Para as demais rotas os filtros 'before' e 'after' são executados caso estejam
		 * definidos no controller.
		 */
		routes: {
			'*404' : 'application#pagina404',
			''     : 'application#home'
		},

		/**
		 * Regiões da Aplicação
		 */
		regions: {
			menu : '#menu',
			main : '#main'
		},

		cdnUrl: 'http://servicos.sorocaba.sp.gov.br/cdn'
	};
});