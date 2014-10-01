var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	glob = require('glob'),
	browserify = require('browserify');

gulp.task('libs', function() {
	return gulp.src('./application/application.js', {read: false})
		.pipe(plugins.plumber(plugins.util.log))
		.pipe(plugins.tap(function(file) {
			var bundler = browserify({
				fast: true,
				noparse: glob.sync('./libs/*.js')
			});

			glob.sync('./libs/*.js').forEach(function(file) {
				bundler.require(file, {expose: file.split('./libs/')[1].replace('.js', '')});
			});

			bundler.require('./node_modules/handlebars/dist/cjs/handlebars.runtime.js', {expose: 'handlebars.runtime'});

			file.contents = bundler.bundle();
		}))
		.pipe(plugins.rename('libs.js'))
		.pipe(gulp.dest('temp'));
});