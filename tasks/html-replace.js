var gulp = require('gulp'),
	pkg = require('../package.json'),
	processhtml = require('gulp-processhtml'),
	replace = require('gulp-replace');

gulp.task('html-replace', function() {
	return gulp.src('index.html')
			.pipe(replace('@@versao', pkg.version))
			.pipe(processhtml('index.html'))
			.pipe(gulp.dest('dist/' + pkg.version));
});