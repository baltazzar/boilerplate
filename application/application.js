// Exporta o jquery globalmente para compatibilidade com plugins.
jQuery = $ = require('jquery');

var Backbone = require('backbone');

// Injeta o jquery.
Backbone.$ = $;

var Marionette = require('marionette'),
	Config = require('config'),
	Application = new Marionette.Application();

Marionette.Renderer.render = function(template, data, view) {
	if(typeof template === 'function') {
		return template;
	} else {
		data.view = view;
		return require(template)(data);
	}
};

Application.addRegions(Config.regions);

module.exports = Application;