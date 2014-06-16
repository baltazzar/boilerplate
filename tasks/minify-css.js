var gulp = require('gulp'),
	pkg = require('../package.json'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	glob = require('glob'),
	uncss = require('gulp-uncss'),
	uncssFiles = ['index.html'];

gulp.task('minify-css', function() {

	glob.sync('./application/templates/**/*.tpl').forEach(function(file) {
		uncssFiles.push(file);
	});

	return gulp.src('css/main.css')
		.pipe(minifyCSS({keepSpecialComments:0}))
		.pipe(uncss({
			html: uncssFiles
		}))
		.pipe(minifyCSS({keepSpecialComments:0}))
		.pipe(rename('application.min.css'))
		.pipe(gulp.dest('dist/' + pkg.version + '/css'));
});