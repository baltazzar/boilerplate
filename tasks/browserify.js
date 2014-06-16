var gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),
	plumber = require('gulp-plumber'),
	tap = require('gulp-tap'),
	rename = require('gulp-rename'),
	glob = require('glob'),
	browserify = require('browserify');

gulp.task('browserify:libs', function() {
	gulp.src('./base/main.js', {read: false})
		.pipe(plumber(gutil.log))
		.pipe(tap(function(file) {
			var bundler = browserify();

			glob.sync('./libs/*.js').forEach(function(file) {
				bundler.require(file, {expose: file.split('./libs/')[1].replace('.js', '')});
			});

			bundler.require('./node_modules/gulp-handlebars/node_modules/handlebars/dist/cjs/handlebars.runtime.js', {expose: 'handlebars.runtime'});

			file.contents = bundler.bundle({fast: true, noParse: glob.sync('./libs/*.js')});
		}))
		.pipe(rename('libs.js'))
		.pipe(gulp.dest('temp'))
		.pipe(livereload());
});

gulp.task('browserify:templates', ['templates'], function() {
	gulp.src('./temp/templates_compilados.js', {read: false})
		.pipe(plumber(gutil.log))
		.pipe(tap(function(file) {
			var bundler = browserify();

			bundler.require(file.path, {expose: 'templates'});

			file.contents = bundler.bundle({fast: true});
		}))
		.pipe(rename('templates.js'))
		.pipe(gulp.dest('temp'))
		.pipe(livereload());
});

gulp.task('browserify:application', function() {
	gulp.src('./base/main.js', {read: false})
		.pipe(plumber(gutil.log))
		.pipe(tap(function(file) {
			var bundler = browserify(file.path);

			glob.sync('./base/*.js').forEach(function(file) {
				bundler.require(file, {expose: file.split('./base/')[1].replace('.js', '')});
			});

			glob.sync('./application/**/*.js').forEach(function(file) {
				bundler.require(file, {expose: file.split('./application/')[1].replace('.js', '')});
			});

			glob.sync('./libs/*.js').forEach(function(file) {
				bundler.external(file.split('./libs/')[1].replace('.js', ''));
			});

			bundler.require('./config.js', {expose: 'config'});
			bundler.external('templates');
			bundler.external('handlebars.runtime');

			file.contents = bundler.bundle({fast: true, debug: true});
		}))
		.pipe(rename('application.js'))
		.pipe(gulp.dest('temp'))
		.pipe(livereload());
});