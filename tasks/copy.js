var gulp = require('gulp'),
	pkg = require('../package.json');

gulp.task('copy', function() {
	gulp.src('fonts/*').pipe(gulp.dest('dist/' + pkg.version + '/fonts'));
	gulp.src('img/*').pipe(gulp.dest('dist/' + pkg.version + '/img'));
	gulp.src(['*.json', '!package.json']).pipe(gulp.dest('dist/' + pkg.version));
});