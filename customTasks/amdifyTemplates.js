var fs = require('fs'),
	templatesFile = fs.readFileSync('application/templates/templates.js', 'UTF8'),
	startTpl = '//TEMPLATES\ndefine(function(require, exports, module){',
	endTpl = '});',
	template = null,
	pattern = /\/\/TEMPLATES/;

module.exports = function(grunt) {

	grunt.registerTask('amdifyTemplates', function() {
		if(pattern.test(templatesFile)) {
			template = templatesFile;
		} else {
			template = startTpl + '\n' + templatesFile + '\n' + endTpl;
		}

		fs.writeFileSync('application/templates/templates.js', template);
	});
};