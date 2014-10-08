var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	glob = require('glob'),
	browserify = require('browserify'),
	hbsfy = require('hbsfy').configure({
		extensions: ['tpl'],
		compiler: 'require("handlebars.runtime")["default"]'
	});

gulp.task('application', function() {
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

			glob.sync('./application/templates/**/*.tpl').forEach(function(file) {
				bundler.require(file, {expose: file.split('./application/templates/')[1]});
			});

			glob.sync('./libs/*.js').forEach(function(file) {
				bundler.external(file.split('./libs/')[1].replace('.js', ''));
			});

			bundler.require('./config.js', {expose: 'config'});
			bundler.external('handlebars.runtime');
			bundler.transform(hbsfy);

			file.contents = bundler.bundle();
		}))
		.pipe(plugins.rename('application.js'))
		.pipe(plugins.wait(300))
		.pipe(gulp.dest('temp'));
});