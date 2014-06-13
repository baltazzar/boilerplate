var gulp = require('gulp');

gulp.task('default', [
	'watch',
	'browserify:libs',
	'browserify:templates',
	'browserify:application',
	'server'
]);