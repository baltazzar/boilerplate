var fs = require('fs'),
	_ = require('underscore'),
	libs = fs.readdirSync('libs'),
	requireConfigFile = JSON.parse(fs.readFileSync('require_config.json', 'utf8')),
	startTpl = 'define([',
	endTpl = '], function () {});',
	template = null,
	arrLibs = [],
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
	});
};