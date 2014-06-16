var gulp = require('gulp'),
	pkg = require('../package.json'),
	concat = require('gulp-concat');
	uglify = require('gulp-uglify');

gulp.task('minify-js', function() {
	return gulp.src(['temp/libs.js', 'temp/templates.js', 'temp/application.js'])
		.pipe(concat('application.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/' + pkg.version + '/js'));
});