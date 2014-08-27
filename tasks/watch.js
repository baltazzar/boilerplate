var gulp = require('gulp'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload');

gulp.task('watch', function() {
	watch({glob: ['libs/**/*.js'], read: false, gaze:{maxListeners: 999}}, ['browserify:libs']);
	watch({glob: ['application/templates/**/*.tpl'], read: false, gaze:{maxListeners: 999}}, ['browserify:templates']);
	watch({glob: ['application/**/*.js'], read: false, gaze:{maxListeners: 999}}, ['browserify:application']);
	watch({glob: ['css/**/*.css', 'index.html', 'config.json', 'temp/*.js'], read: false, gaze:{maxListeners: 999}}).pipe(livereload());
});