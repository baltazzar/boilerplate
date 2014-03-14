var fs = require('fs'),
	_ = require('underscore'),
	libs = fs.readdirSync('libs'),
	requireConfigFile = JSON.parse(fs.readFileSync('require_config.json', 'utf8')),
	startTpl = 'define([',
	endTpl = '], function () {});',
	template = null,
	arrLibs = [],
	arrViews = [],
	arrControllers = [],
	paths = {},
	libsPaths = {};

var updateRequirePaths = function() {

	_.each(libs, function(lib) {
		if(lib !== 'require.js' && lib !== 'almond.js') {
			lib = lib.split('.js')[0];
			libsPaths[lib] = '../libs/' + lib;
		}
	});

	_.each(requireConfigFile.paths, function(v, k) {
		if(v.indexOf('libs/') === -1) {
			paths[k] = v;
		}
	});

	requireConfigFile.paths = paths;
	requireConfigFile.paths = _.extend(requireConfigFile.paths, libsPaths);

	fs.writeFileSync('require_config.json', JSON.stringify(requireConfigFile, null, '\t'));
};

module.exports = function(grunt) {

	grunt.registerTask('updateRequireLibs', function() {

		_.each(libs, function(lib) {
			if(lib !== 'require.js' && lib !== 'almond.js') {
				arrLibs.push("'" + lib.split('.js')[0] + "'");
			}
		});

		arrLibs = arrLibs.join(',\n\t');
		template = startTpl + '\n\t' + arrLibs + '\n' + endTpl;

		fs.writeFileSync('base/libs.js', template);

		updateRequirePaths();

		// Cria o arquivo com os mapeamentos das views
		_.each(grunt.file.expand('application/views/**/*.js'), function(view) {
			view = view.split('application/')[1];
			view = view.split('.js')[0];
			arrViews.push("'" + view + "'");
		});

		arrViews = arrViews.join(',\n\t');
		template = startTpl + '\n\t' + arrViews + '\n' + endTpl;
		fs.writeFileSync('base/views.js', template);

		// Cria o arquivo com os mapeamentos dos controllers
		_.each(grunt.file.expand('application/controllers/**/*.js'), function(controller) {
			controller = controller.split('application/')[1];
			controller = controller.split('.js')[0];
			arrControllers.push("'" + controller + "'");
		});

		arrControllers = arrControllers.join(',\n\t');
		template = startTpl + '\n\t' + arrControllers + '\n' + endTpl;
		fs.writeFileSync('base/controllers.js', template);
	});
};