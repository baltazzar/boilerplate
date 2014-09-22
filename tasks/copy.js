var gulp = require('gulp'),
	pkg = require('../package.json');

gulp.task('copy', function() {
	gulp.src('fonts/*').pipe(gulp.dest('dist/' + pkg.version + '/fonts'));
	gulp.src('img/*').pipe(gulp.dest('dist/' + pkg.version + '/img'));
	gulp.src('config.json').pipe(gulp.dest('dist/' + pkg.version));
});