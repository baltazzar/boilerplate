var gulp = require('gulp'),
	gutil = require('gulp-util'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),
	source = require('vinyl-source-stream'),
	glob = require('glob'),
	watchify = require('watchify'),
	livereload = require('gulp-livereload');

gulp.task('browserify:libs', function() {
	var bundler = watchify([], {
		fast: true,
		noParse: glob.sync('./libs/*.js')
	});

	glob.sync('./libs/*.js').forEach(function(file) {
		bundler.require(file, {expose: file.split('./libs/')[1].replace('.js', '')});
	});

	bundler.require('./node_modules/gulp-handlebars/node_modules/handlebars/dist/cjs/handlebars.runtime.js', {expose: 'handlebars.runtime'});

	bundler.on('update', bundle);

	function bundle() {
		return bundler.bundle().pipe(source('libs.js')).pipe(gulp.dest('temp')).pipe(livereload());
	}

	return bundle();
});

gulp.task('browserify:templates', ['templates'], function() {
	var bundler = watchify([], {
		fast: true
	});

	bundler.require('./temp/templates_compilados.js', {expose: 'templates'});

	bundler.on('update', bundle);

	function bundle() {
		return bundler.bundle().pipe(source('templates.js')).pipe(gulp.dest('temp')).pipe(livereload());
	}

	return bundle();
});

gulp.task('browserify:application', function() {
	var bundler = watchify(['./base/main.js'], {
		fast: true,
		debug: true
	});

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

	function bundle() {
		return bundler.bundle().pipe(source('application.js')).pipe(gulp.dest('temp')).pipe(livereload());
	}

	return bundle();
});

gulp.task('browserify', ['browserify:libs', 'browserify:templates', 'browserify:application']);