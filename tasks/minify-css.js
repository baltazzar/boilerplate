var gulp = require('gulp'),
	pkg = require('../package.json'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	glob = require('glob');

gulp.task('minify-css', function() {

	return gulp.src('css/main.css')
		.pipe(minifyCSS({keepSpecialComments:0}))
		.pipe(rename('application.min.css'))
		.pipe(gulp.dest('dist/' + pkg.version + '/css'));
});