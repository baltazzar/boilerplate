var gulp = require('gulp'),
	pkg = require('../package.json'),
	rimraf = require('gulp-rimraf');

gulp.task('clean', function() {
	return gulp.src('dist/' + pkg.version, {read: false}).pipe(rimraf());
});