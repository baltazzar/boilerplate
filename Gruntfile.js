module.exports = function(grunt) {

	var path = require('path');

	require('jit-grunt')(grunt);
	grunt.loadTasks('customTasks');

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
		watch: {
			files: {
				// files: ['**/*.{html,htm,css,js,tpl,png,jpg,gif}', '!application/templates/templates.js', '!libs/**', '!base/libs.js', '!requireConfig.json', '!**/*.TMP'],
				files: [
					'index.html',
					'application/**',
					'css/**',
					'config.js',
					'base/main.js',
					'!application/templates/templates.js'
				],
				options: {
					livereload: '<%= livereloadPort %>',
					interval: 700
				}
			},
			libs: {
				files: ['libs/**/*.js'],
				tasks: ['updateRequireLibs'],
				options: {
					atBegin: true
				}
			},
			main: {
				files: ['require_config.json'],
				tasks: ['updateRequireMain'],
				options: {
					atBegin: true
				}
			},
			templates: {
				files: 'application/templates/**/*.tpl',
				tasks: ['handlebars', 'amdifyTemplates'],
				options: {
					atBegin: true
				}
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
			files: ['**/*.js', '!libs/**/*.js', '!application/templates/templates.js', 'dist/**', '!node_modules/**/*.js']
		},
		requirejs: {
			build: {
				options: {
					mainConfigFile         : 'base/main.js',
					appDir                 : './',
					baseUrl                : 'base',
					dir                    : 'dist/<%= pkg.version %>',
					findNestedDependencies : true,
					removeCombined         : true,
					skipDirOptimize        : true,
					optimizeCss            : false,
					paths: {
						'backbone.babysitter' : '../libs/backbone.babysitter',
						'backbone'            : '../libs/backbone',
						'backbone.wreqr'      : '../libs/backbone.wreqr',
						'bootstrap'           : '../libs/bootstrap',
						'handlebars.runtime'  : '../libs/handlebars.runtime',
						'jquery'              : '../libs/jquery',
						'marionette'          : '../libs/marionette',
						'underscore'          : '../libs/underscore',
						'config': '../config'
					},
					modules                : [
						{
							name: 'main',
							exclude: 'config'
						}
					]
					// baseUrl                : 'base',
					// // paths               : {
					// // 	'almondLib'        : 'libs/almond'
					// // },
					// // modules: [
					// // 	{
					// // 		name: 'main',
					// // 		include: 'almondLib',
					// // 		exclude: ['config']
					// // 	}
					// // ]
				}
			}
		},
		clean: {
			dist: {
				options: {
					force: true
				},
				src: [
					'dist/<%= pkg.version %>/Gruntfile.js',
					'dist/<%= pkg.version %>/package.json',
					'dist/<%= pkg.version %>/build.txt',
					'dist/<%= pkg.version %>/.ftppass',
					'dist/<%= pkg.version %>/.gitignore',
					'dist/<%= pkg.version %>/application/templates',
					'dist/<%= pkg.version %>/Tarefas.todo',
					'dist/<%= pkg.version %>/**/node_modules'
				]
			}
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: 'versao',
							replacement: '<%= pkg.version %>'
						}
					]
				},
				files: [
					{
						src: 'dist/<%= pkg.version %>/index.html',
						dest: 'dist/<%= pkg.version %>/index.html'
					},
					{
						src: 'dist/<%= pkg.version %>/application/main.js',
						dest: 'dist/<%= pkg.version %>/application/main.js'
					}
				]
			}
		},
		processhtml: {
			dist: {
				files: [{
					src: 'dist/<%= pkg.version %>/index.html',
					dest: 'dist/<%= pkg.version %>/index.html'
				}]
			}
		}
	});

	grunt.registerTask('server', ['connect:server:keepalive']);
	grunt.registerTask('dev', ['connect', 'watch']);
	grunt.registerTask('build', ['jshint', 'requirejs', 'replace:dist', 'processhtml:dist', 'clean']);
	grunt.registerTask('default', ['dev']);
};