var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	pkg = require('../package.json');

gulp.task('html-replace', function() {
	return gulp.src('index.html')
			.pipe(plugins.replace('@@versao', pkg.version))
			.pipe(plugins.processhtml('index.html'))
			.pipe(gulp.dest('dist/' + pkg.version));
});