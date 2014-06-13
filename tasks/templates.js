var gulp = require('gulp'),
	gutil = require('gulp-util'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),
	handlebars = require('gulp-handlebars'),
	defineModule = require('gulp-define-module'),
	concat = require('gulp-concat'),
	wrap = require('gulp-wrap'),
	path = require('path');

gulp.task('templates', function() {
	return gulp.src('application/templates/**/*.tpl')
		.pipe(plumber({errorHandler: gutil.log}))
		.pipe(changed('temp', {extension: '.js'}))
		.pipe(handlebars())
		.pipe(defineModule('plain', {
			wrapper: '<%= content %>',
			context: function(context) {
				var filename = context.file.path.split('templates' + path.sep)[1].replace('.js', '.tpl'),
					content = 'templates["' + filename + '"] = ' + context.handlebars;

				if(filename.split('/').pop().charAt(0) === '_') {
					content = 'Handlebars.registerPartial("' + filename + '",' + context.handlebars + ');';
				}
				return {content: content};
			}
		}))
		.pipe(concat('templates_compilados.js'))
		.pipe(wrap('module.exports = function(Handlebars) {\nvar templates = {};\n<%= contents %>\nreturn templates;\n};', {
			imports: {
				getName: function(filename) {
					return path.basename(filename, path.extname(filename));
				}
			}
		}))
		.pipe(gulp.dest('temp'));
});