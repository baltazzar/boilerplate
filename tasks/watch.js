var gulp = require('gulp'),
	watch = require('gulp-watch');

gulp.task('watch', function() {
	watch(['libs/**/*.js'], {read: false, gaze:{maxListeners: 999}}, function() { gulp.start('libs'); });
	watch(['application/templates/**/*.tpl'], {read: false, gaze:{maxListeners: 999}}, function() { gulp.start('templates'); });
	watch(['application/**/*.js', 'config.json'], {read: false, gaze:{maxListeners: 999}}, function() { gulp.start('application'); });
});