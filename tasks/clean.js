var gulp = require('gulp'),
	pkg = require('../package.json'),
	plugins = require('gulp-load-plugins')();

gulp.task('clean', function() {
	return gulp.src('dist/' + pkg.version, {read: false}).pipe(plugins.rimraf());
});