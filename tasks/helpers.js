var gulp = require('gulp'),
	gutil = require('gulp-util'),
	plumber = require('gulp-plumber'),
	wrap = require('gulp-wrap'),
	glob = require('glob');

gulp.task('helpers', function() {
	return gulp.src('application/main.js')
		.pipe(plumber(gutil.log))
		.pipe(wrap('<%= include_helpers(contents) %>', {}, {
			imports: {
				include_helpers: function(contents) {
					var helpers = [],
						re = new RegExp('//start-register-helpers((?:.|\\s)*?)//end-register-helpers'); // thanks Tony

					helpers.push('//start-register-helpers\n');

					glob.sync('./application/helpers/**/*.js').forEach(function(file) {
						file = file.split('./application/')[1].replace('.js', '');
						helpers.push("require('" + file + "');\n");
					});

					helpers.push('//end-register-helpers');

					if(re.exec(contents)) {
						return contents.replace(re, helpers.join(''));
					} else {
						return helpers.join('') + '\n\n' + contents;
					}
				}
			}
		}))
		.pipe(gulp.dest('application'));
});