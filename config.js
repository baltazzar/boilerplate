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
			''                         : 'application#index',
			'@pessoas'                 : 'pessoas#listar',
			'pessoas/:id'              : 'pessoas#detalhar',
			'pessoas/:nome/:sobrenome' : 'pessoas#cumprimentar'
		},

		/**
		 * Regiões da Aplicação
		 */
		regions: {
			menu : '#menu',
			main : '#main'
		}
	};
});