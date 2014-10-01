var gulp = require('gulp'),
	browsersync = require('browser-sync');

gulp.task('server', function() {
	browsersync({
		server: {
			baseDir: './'
		},
		files: ['temp/*.js', 'css/**/*.css', 'index.html'],
		notify: false,
		ghostMode: false
	});
});