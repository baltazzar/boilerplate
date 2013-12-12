define(function(require, exports, module) {
	/*
	 * Função para carregamento dos módulos da aplicação
	 * Params: String nome do módulo, Function callback
	 * Retorno: callback
	 */
	var loadModule = function(modulo, callback) {
		if(modulo) {
			require([modulo.controller], function(mod) {
				if(callback) {
					callback(mod);
				}
			});
		}
	};

	exports.loadModule = loadModule;
})