var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	glob = require('glob'),
	browserify = require('browserify');

gulp.task('application', ['helpers'], function() {
	return gulp.src('./application/main.js', {read: false})
		.pipe(plugins.plumber(plugins.util.log))
		.pipe(plugins.tap(function(file) {
			var bundler = browserify({
				entries: './application/main.js',
				fast: true,
				debug: true
			});

			glob.sync('./application/**/*.js').forEach(function(file) {
				if(file !== './application/main.js') {
					bundler.require(file, {expose: file.split('./application/')[1].replace('.js', '')});
				}
			});

			glob.sync('./libs/*.js').forEach(function(file) {
				bundler.external(file.split('./libs/')[1].replace('.js', ''));
			});

			bundler.require('./config.js', {expose: 'config'});
			bundler.external('templates');
			bundler.external('handlebars.runtime');

			file.contents = bundler.bundle();
		}))
		.pipe(plugins.rename('application.js'))
		.pipe(gulp.dest('temp'));
});