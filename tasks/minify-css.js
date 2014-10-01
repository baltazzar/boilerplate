var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	pkg = require('../package.json'),
	glob = require('glob');

gulp.task('minify-css', function() {
	return gulp.src('css/main.css')
		.pipe(plugins.minifyCss({keepSpecialComments:0}))
		.pipe(plugins.rename('application.min.css'))
		.pipe(gulp.dest('dist/' + pkg.version + '/css'));
});