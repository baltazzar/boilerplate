var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	glob = require('glob');

gulp.task('helpers', function() {
	return gulp.src('application/helpers.js')
		.pipe(plugins.plumber(plugins.util.log))
		.pipe(plugins.wrap('<%= include_helpers(contents) %>', {}, {
			imports: {
				include_helpers: function(contents) {
					var helpers = [];

					glob.sync('./application/helpers/**/*.js').forEach(function(file) {
						file = file.split('./application/')[1].replace('.js', '');
						helpers.push("require('" + file + "');\n");
					});

					return helpers.join('');
				}
			}
		}))
		.pipe(gulp.dest('application'));
});