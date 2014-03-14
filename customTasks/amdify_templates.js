var fs = require('fs'),
	startTpl = '//TEMPLATES\ndefine(function(require, exports, module){',
	endTpl = '});',
	templatesFile = null,
	template = null,
	pattern = /\/\/TEMPLATES/;

module.exports = function(grunt) {

	grunt.registerTask('amdifyTemplates', function() {

		templatesFile = fs.readFileSync('application/templates/templates.js', 'UTF8');

		if(pattern.test(templatesFile)) {
			template = templatesFile;
		} else {
			template = startTpl + '\n' + templatesFile + '\n' + endTpl;
		}

		fs.writeFileSync('application/templates/templates.js', template);
	});
};