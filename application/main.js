var	Application = require('application'),
	Boiler = require('boiler'),
	Initializer = require('initializer'),
	Handlebars = require('handlebars.runtime')['default'],
	Config = require('config');

//start-register-partials
//end-register-partials

//start-register-helpers
require('helpers/config');
require('helpers/link');
require('helpers/log');
//end-register-helpers

// Inicia o Boiler
Boiler.init(Config, Application);

// Código a ser executado na inicialização da aplicação.
Initializer();

// Inicia a aplicação
Application.start();