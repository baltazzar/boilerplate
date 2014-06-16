var gulp = require('gulp'),
	pkg = require('../package.json'),
	clean = require('gulp-clean');

gulp.task('clean', function() {
	return gulp.src('dist/' + pkg.version, {read: false}).pipe(clean());
});