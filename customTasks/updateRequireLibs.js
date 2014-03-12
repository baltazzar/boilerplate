var fs = require('fs'),
	_ = require('underscore'),
	libs = fs.readdirSync('libs'),
	requireConfigFile = JSON.parse(fs.readFileSync('requireConfig.json', 'utf8')),
	startTpl = 'define([',
	endTpl = '], function () {});',
	template = null,
	arrLibs = [];

var updateRequirePaths = function() {

	var libsPaths = {};

	libs.forEach(function(lib) {
		if(lib !== 'require.js' && lib !== 'almond.js') {
			lib = lib.split('.js')[0];
			libsPaths[lib] = '../libs/' + lib;
		}
	});

	requireConfigFile.paths = _.extend(requireConfigFile.paths, libsPaths);

	fs.writeFileSync('requireConfig.json', JSON.stringify(requireConfigFile, null, '\t'));
};

module.exports = function() {

	libs.forEach(function(lib) {
		if(lib !== 'require.js' && lib !== 'almond.js') {
			arrLibs.push("'" + lib.split('.js')[0] + "'");
		}
	});

	arrLibs = arrLibs.join(',\n\t');

	template = startTpl + '\n\t' + arrLibs + '\n' + endTpl;

	fs.writeFileSync('base/libs.js', template);

	updateRequirePaths();
};