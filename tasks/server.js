var gulp = require('gulp'),
	http = require('http'),
	connect = require('connect'),
	open = require('open');

var SERVER_PORT = 3000;

gulp.task('server', function() {
	var server = connect();

	server.use(require('connect-livereload')());
	server.use(connect.static(process.cwd()));
	server.listen(SERVER_PORT);

	// setTimeout(function() {
	// 	open('http://localhost:' + SERVER_PORT);
	// }, 3000);
});