var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	glob = require('glob');

gulp.task('partials', function() {
	return gulp.src('application/main.js')
		.pipe(plugins.plumber(plugins.util.log))
		.pipe(plugins.wrap('<%= include_partials(contents) %>', {}, {
			imports: {
				include_partials: function(contents) {
					var partials = [],
						re = new RegExp('//start-register-partials((?:.|\\s)*?)//end-register-partials'); // thanks Tony

					partials.push('//start-register-partials\n');

					glob.sync('./application/templates/**/*.tpl').forEach(function(file) {
						if(file.indexOf('/_') !== -1) {
							file = file.split('./application/templates/')[1];
							partials.push("Handlebars.registerPartial('" + file + "', require('" + file + "'));\n");
						}
					});

					partials.push('//end-register-partials');

					if(re.exec(contents)) {
						return contents.replace(re, partials.join(''));
					} else {
						return partials.join('') + '\n\n' + contents;
					}
				}
			}
		}))
		.pipe(gulp.dest('application'));
});