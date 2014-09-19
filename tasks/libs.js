var gulp = require('gulp'),
	gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),
	tap = require('gulp-tap'),
	rename = require('gulp-rename'),
	glob = require('glob'),
	browserify = require('browserify');

gulp.task('libs', function() {
	return gulp.src('./application/application.js', {read: false})
		.pipe(plumber(gutil.log))
		.pipe(tap(function(file) {
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
		.pipe(rename('libs.js'))
		.pipe(gulp.dest('temp'));
});