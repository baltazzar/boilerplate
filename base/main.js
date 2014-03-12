require(['libs']);

require(['initializer', 'application', 'dispatcher'], function(Initializer, Application, Dispatcher) {

	// Executa as rotinas contidas no arquivo application/initializer.js
	Initializer();

	// Registra as rotas da aplicação
	Dispatcher.registerRoutes();

	// Inicia a aplicação
	Application.start();
});