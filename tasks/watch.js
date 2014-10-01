var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('watch', function() {
	plugins.watch(['libs/**/*.js'], {read: false, gaze:{maxListeners: 999}}, function() { gulp.start('libs'); });
	plugins.watch(['application/templates/**/*.tpl'], {read: false, gaze:{maxListeners: 999}}, function() { gulp.start('templates'); });
	plugins.watch(['application/**/*.js', 'config.json'], {read: false, gaze:{maxListeners: 999}}, function() { gulp.start('application'); });
});