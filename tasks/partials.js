var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	glob = require('glob');

gulp.task('partials', function() {
	return gulp.src('application/partials.js')
		.pipe(plugins.plumber(plugins.util.log))
		.pipe(plugins.wrap('<%= include_partials(contents) %>', {}, {
			imports: {
				include_partials: function(contents) {
					var partials = ["var Handlebars = require('handlebars.runtime')['default'];\n\n"];

					glob.sync('./application/templates/**/*.tpl').forEach(function(file) {
						if(file.indexOf('/_') !== -1) {
							file = file.split('./application/templates/')[1];
							partials.push("Handlebars.registerPartial('" + file + "', require('" + file + "'));\n");
						}
					});

					return partials.join('');
				}
			}
		}))
		.pipe(gulp.dest('application'));
});