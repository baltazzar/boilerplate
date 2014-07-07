var Backbone = require('backbone');

// Exporta o jquery globalmente para compatibilidade com plugins.
jQuery = $ = require('jquery');

// Injeta o jquery.
Backbone.$ = $;

// Código a ser executado antes da inicialização da aplicação.
module.exports = function() {};