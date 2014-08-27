var fs = require('fs');

fs.readdirSync('tasks').forEach(function(task) { require('./tasks/' + task); });

// gulp.task('watch', function() {
// 	return watch({glob: 'application/templates/**/*.tpl', read: false}, ['templates']);
// });