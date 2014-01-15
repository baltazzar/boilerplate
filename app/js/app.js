define(function(require, exports, module){
	var Marionette = require('marionette'),
		Handlebars = require('handlebars'),
		MenuView = require('views/menu'),
		AppHomeView = require('views/home'),
		Pagina404View = require('views/pagina404'),
		Utils = require('utils');

	var App = new Marionette.Application();

	Marionette.Renderer.render = function(template, data){
		if (template) {
			template = Handlebars.templates[template];
			return template(data);
		}
	};

	App.addRegions({
		menu  : '#menu',
		main  : '#main'
	});

	exports.showView = function(region, view) {
		App.menu.show( new MenuView() );
		App[region].show(view);
	};

	exports.index = function() {
		this.showView('main', new AppHomeView());
	};

	exports.pagina404 = function() {
		this.showView('main', new Pagina404View());
	};

	exports.closeModal = function() {
		if(App.getRegion('modal')) {
			App.getRegion('modal').close();
		}
	};

	exports.marionetteApp = App;
});