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
			compiledTemplates: {
				files: ['templates.js'],
				tasks: ['browserify:templates']
			},
			application: {
				files: ['application/**/*.js'],
				tasks: ['browserify:application']
			},
			static: {
				files: ['index.html', 'css/**/*.css', 'config.json'],
				options: {
					livereload: '<%= livereloadPort %>'
				}
			},
			reload: {
				files: ['application.js', 'libs.js', 'templates.js'],
				options: {
					livereload: '<%= livereloadPort %>',
					interval: 700
				}
			}
		},
		handlebars: {
			compile: {
				src: ['application/templates/**/*.tpl'],
				dest: 'templates.js',
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
				dest: 'libs.js',
				options: {
					alias: createAliases([
						{
							cwd: 'libs',
							src: ['**/*.js'],
							dest: ''
						},
						{
							cwd: './node_modules/grunt-contrib-handlebars/node_modules/handlebars/dist/cjs',
							src: ['handlebars.runtime.js'],
							dest: ''
						}
					])
				}
			},
			templates: {
				src: [],
				dest: 'templates.js',
				options: {
					alias: createAliases([
						{
							src: ['templates.js'],
							dest: ''
						}
					])
				}
			},
			application: {
				src: ['base/main.js'],
				dest: 'application.js',
				options: {
					external: createAliases([
						{
							cwd: 'libs',
							src: ['**/*.js'],
							dest: ''
						},
						{
							cwd: './node_modules/grunt-contrib-handlebars/node_modules/handlebars/dist/cjs',
							src: ['handlebars.runtime.js'],
							dest: ''
						},
						{
							src: ['templates.js'],
							dest: ''
						}
					]),
					alias: createAliases([
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
							src: ['controllers/**/*.js', 'collections/**/*.js', 'models/**/*.js', 'views/**/*.js', '*.js'],
							dest: ''
						}
					])
				}
			}
		},
		cssmin: {
			'dist/<%= pkg.version %>/css/application.min.css': ['css/**/*.css', '!main.css'],
			options: {
				keepSpecialComments: 0
			}
		},
		uglify: {
			'dist/<%= pkg.version %>/js/application.min.js': ['libs.js', 'templates.js', 'application.js']
		},
		copy: {
			dist: {
				files: [
					{
						src: 'index.html',
						dest: 'dist/<%= pkg.version %>/index.html'
					},
					{
						src: 'config.json',
						dest: 'dist/<%= pkg.version %>/config.json'
					},
					{
						expand: true,
						cwd: 'fonts',
						src: '**',
						dest: 'dist/<%= pkg.version %>/fonts',
						flatten: false
					}
				]
			},
			server: {
				expand: true,
				cwd: 'dist/<%= pkg.version %>',
				src: '**',
				dest: '//pms-teweb02/sistemas/<%= pkg.name %>',
				flatten: false
			}
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
			files: ['config.js', 'base/**/*.js', 'application/**/*.js', '!application/templates/templates.js']
		},
		clean: {
			options: {
				force: true
			},
			dist: {
				expand: true,
				cwd: 'dist/<%= pkg.version %>',
				src: '**',
				flatten: false
			},
			server: {
				expand: true,
				cwd: '//pms-teweb02/sistemas/<%= pkg.name %>',
				src: '**',
				flatten: false
			}
		}
	});

	grunt.registerTask('default', ['handlebars', 'browserify', 'connect', 'watch']);
	grunt.registerTask('dev', ['default']);
	grunt.registerTask('build', ['jshint', 'handlebars', 'browserify', 'uglify', 'cssmin', 'copy:dist', 'replace', 'processhtml']);

	grunt.registerTask('deploy-message', function() {
		var appName = grunt.file.readJSON('package.json')['name'];

		grunt.log.writeln('###########################################################################');
		grunt.log.writeln(' Deploy realizado com sucesso!');
		grunt.log.writeln(' Aplicação disponível no endereço http://pms-teweb02/' + appName);
		grunt.log.writeln('###########################################################################');
	});
	grunt.registerTask('deploy', ['copy:server', 'deploy-message']);

	grunt.registerTask('undeploy-message', function() {
		var appName = grunt.file.readJSON('package.json')['name'];

		grunt.log.writeln('###########################################################################');
		grunt.log.writeln(' Aplicação http://pms-teweb02/' + appName + ' removida com sucesso!');
		grunt.log.writeln('###########################################################################');
	});
	grunt.registerTask('undeploy', ['clean:server', 'undeploy-message']);
};