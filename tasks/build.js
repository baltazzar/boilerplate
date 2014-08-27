var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	gutil = require('gulp-util');

gulp.task('build', function() {
	runSequence('clean', ['minify-css', 'minify-js', 'copy', 'html-replace'], function() {
		gutil.log(gutil.colors.green('########################################################################################'));
		gutil.log(gutil.colors.green('#                            BUILD REALIZADO COM SUCESSO!!!                            #'));
		gutil.log(gutil.colors.green('########################################################################################'));
	});
});