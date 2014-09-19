var gulp = require('gulp'),
	gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),
	handlebars = require('gulp-handlebars'),
	defineModule = require('gulp-define-module'),
	concat = require('gulp-concat'),
	wrap = require('gulp-wrap'),
	path = require('path'),
	tap = require('gulp-tap'),
	browserify = require('browserify'),
	rename = require('gulp-rename');

gulp.task('templates', function() {
	return gulp.src('application/templates/**/*.tpl')
		.pipe(plumber(gutil.log))
		.pipe(handlebars({ handlebars: require('handlebars') }))
		.pipe(defineModule('plain', {
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
		.pipe(concat('templates.js'))
		.pipe(wrap('var Handlebars = require("handlebars.runtime")["default"];\nvar templates = {};\n<%= contents %>\nmodule.exports = templates;'))
		.pipe(tap(function(file) {
			var bundler = browserify({fast: true});

			bundler.require(file, {expose: 'templates'});
			bundler.external('handlebars.runtime');

			file.contents = bundler.bundle();
		}))
		.pipe(rename('templates.js'))
		.pipe(gulp.dest('temp'));
});