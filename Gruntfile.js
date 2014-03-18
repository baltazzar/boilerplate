module.exports = function(grunt) {

	require('jit-grunt')(grunt);

	var createAliases = function(aliases) {
		var arrAliases = [];
		aliases.forEach(function(alias) {
			grunt.file.expandMapping(alias.src, alias.dest, alias).forEach(function(a) {
				var expose = a.dest.substr(0, a.dest.lastIndexOf('.'));
				arrAliases.push(a.src + ':' + expose);
			});
		});
		return arrAliases;
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		livereloadPort : 4000,
		connect: {
			server: {
				options: {
					hostname: '*',
					port: 3000,
					livereload: '<%= livereloadPort %>',
					open: 'http://localhost:3000'
				}
			}
		},
		watch: {
			libs: {
				files: ['libs/**/*.js'],
				tasks: ['browserify:libs']
			},
			templates: {
				files: ['application/templates/**/*.tpl'],
				tasks: ['handlebars']
			},
			application: {
				files: ['application/**/*.js'],
				tasks: ['browserify:application'],
			},
			static: {
				files: ['index.html', 'css/**/*.css', 'config.json'],
				options: {
					livereload: '<%= livereloadPort %>'
				}
			},
			reload: {
				files: ['application.js'],
				options: {
					livereload: '<%= livereloadPort %>',
					interval: 700
				}
			}
		},
		handlebars: {
			compile: {
				src: 'application/templates/**/*.tpl',
				dest: 'application/templates/templates.js',
				options: {
					commonjs: true,
					namespace: false,
					processName: function(filePath) {
						filePath = filePath.split('templates/');
						return filePath[1];
					},
					processPartialName: function(filePath) {
						filePath = filePath.split('templates/');
						return filePath[1];
					}
				}
			}
		},
		browserify: {
			libs: {
				src: [],
				dest: './libs.js',
				options: {
					alias: createAliases([
						{
							cwd: 'libs',
							src: ['**/*.js'],
							dest: ''
						}
					])
				}
			},
			application: {
				src: ['base/main.js'],
				dest: 'application.js',
				options: {
					alias: createAliases([
						{
							cwd: 'libs',
							src: ['**/*.js'],
							dest: ''
						},
						{
							src: ['config.js'],
							dest: ''
						},
						{
							cwd: 'base',
							src: ['**/*.js'],
							dest: ''
						},
						{
							cwd: 'application',
							src: ['**/*.js'],
							dest: ''
						},
						{
							cwd: 'application/templates',
							src: ['templates.js'],
							dest: ''
						}
					])
				}
			}
		},
		cssmin: {
			'dist/<%= pkg.version %>/application.min.css': ['css/**/*.css', '!main.css'],
			options: {
				keepSpecialComments: 0
			}
		},
		uglify: {
			'dist/<%= pkg.version %>/application.min.js': ['libs.js', 'application.js']
		},
		copy: {
			dist: {
				'dist/<%= pkg.version %>/index.html': ['index.html'],
				'dist/<%= pkg.version %>/config.json': ['config.json']
			}
			// deploy: {
			// 	expand: true,
			// 	cwd: 'dist/<%= pkg.version %>',
			// 	src: '**',
			// 	dest: '//pms-teweb02/sistemas/TESTE/',
			// 	flatten: true
			// }
		},
		replace: {
			dist: {
				files: [{
					src: 'dist/<%= pkg.version %>/index.html',
					dest: 'dist/<%= pkg.version %>/index.html'
				}],
				options: {
					patterns: [{
						match: 'versao',
						replacement: '<%= pkg.version %>'
					}]
				}
			}
		},
		processhtml: {
			dist: {
				files: [{
					src: 'dist/<%= pkg.version %>/index.html',
					dest: 'dist/<%= pkg.version %>/index.html'
				}]
			}
		},
		jshint: {
			options: {
				'-W030' : true,
				'-W061' : true,
				'-W116' : true,
				'-W041' : true,
				'-W069' : true,
				'-W004' : true,
				'-W044' : true,
				'-W099' : true
			},
			files: ['application/**/*.js', '!application/templates/templates.js']
		}
	});

	grunt.registerTask('dev', ['connect', 'watch']);
	grunt.registerTask('default', ['handlebars', 'browserify', 'connect', 'watch']);
	grunt.registerTask('build', ['jshint', 'browserify', 'uglify', 'cssmin', 'copy:dist', 'replace', 'processhtml']);
	// grunt.registerTask('deploy', ['copy:deploy']);
};