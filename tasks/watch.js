var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('watch', function() {
	gulp.watch(['libs/*.js'], ['libs']);
	gulp.watch(['application/**/*.{js,json,tpl}'], ['application']);
});