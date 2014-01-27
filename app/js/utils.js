define(function (require, exports, module) {
	/*
	 * Função para carregamento dos módulos da aplicação
	 * Params: String nome do módulo, Function callback
	 * Retorno: callback
	 */

	exports.loadModule = function (moduleName, callback) {
		moduleName = moduleName == 'app' ? 'app' : 'modules/' + moduleName + '/controller';
		require([moduleName], callback);
	};
});