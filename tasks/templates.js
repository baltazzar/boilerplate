var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	path = require('path'),
	browserify = require('browserify');

gulp.task('templates', function() {
	return gulp.src('application/templates/**/*.tpl')
		.pipe(plugins.plumber(plugins.util.log))
		.pipe(plugins.handlebars({ handlebars: require('handlebars') }))
		.pipe(plugins.defineModule('plain', {
			wrapper: '<%= content %>',
			context: function(context) {
				var filepath = context.file.path.split('templates' + path.sep)[1].replace('.js', '.tpl'),
					filename = filepath.replace(new RegExp('\\' + path.sep, 'g'), '/'),
					content = 'templates["' + filename + '"] = ' + context.handlebars;

				if(filename.split('/').pop().charAt(0) === '_') {
					content = 'Handlebars.registerPartial("' + filename + '",' + context.handlebars + ');';
				}
				return {content: content};
			}
		}))
		.pipe(plugins.concat('templates.js'))
		.pipe(plugins.wrap('var Handlebars = require("handlebars.runtime")["default"];\nvar templates = {};\n<%= contents %>\nmodule.exports = templates;'))
		.pipe(plugins.tap(function(file) {
			var bundler = browserify({fast: true});

			bundler.require(file, {expose: 'templates'});
			bundler.external('handlebars.runtime');

			file.contents = bundler.bundle();
		}))
		.pipe(plugins.rename('templates.js'))
		.pipe(gulp.dest('temp'));
});