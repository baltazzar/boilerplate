var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch(['libs/*.js'], ['libs']);
	gulp.watch(['application/**/*.{js,json,tpl}'], ['application']);
});