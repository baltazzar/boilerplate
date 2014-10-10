var	Application = require('application'),
	Boiler = require('boiler'),
	Initializer = require('initializer'),
	Config = require('config');

// Registra os helpers
require('helpers');

// Registra os partials
require('partials');

// Inicia o Boiler
Boiler.init(Config, Application);

// Código a ser executado na inicialização da aplicação.
Initializer();

// Inicia a aplicação
Application.start();