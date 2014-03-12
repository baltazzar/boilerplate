var fs = require('fs'),
	mainFile = fs.readFileSync('base/main.js', 'utf8'),
	requireConfigFile = fs.readFileSync('requireConfig.json', 'utf8'),
	startTpl = '//START REQUIRE CONFIG',
	endTpl = '//END REQUIRE CONFIG',
	configBlock = startTpl + '\nrequire.config(' + requireConfigFile + ');\n' + endTpl,
	template = null;

module.exports = function() {

	if(new RegExp(startTpl).test(mainFile)) {
		template = mainFile.replace(new RegExp(startTpl + '((.|\n|\r|\t)*)' + endTpl), configBlock);
	} else {
		template = configBlock + '\n\n' + mainFile;
	}

	fs.writeFileSync('base/main.js', template);
};