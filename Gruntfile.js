module.exports = function(grunt) {
	var path = require('path'),
		fs = require('fs');

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
					amd: true,
					namespace: 'Handlebars.templates',
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
				files: ['**/*.{html,htm,css,js,tpl,png,jpg,gif}', '!application/templates/templates.js', '!libs/**', '!**/*.TMP'],
				options: {
					livereload: '<%= livereloadPort %>',
					interval: 700
				}
			},
			libs: {
				files: 'libs/**/*.js',
				tasks: ['infra'],
				options: {
					atBegin: true
				}
			},
			templates: {
				files: 'application/templates/**/*.tpl',
				tasks: ['handlebars'],
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
			files: ['**/*.js', '!libs/**/*.js', '!application/templates/templates.js', '!node_modules/**/*.js']
		},
		requirejs: {
			build: {
				options: {
					mainConfigFile: 'base/main.js',
					appDir: './',
					baseUrl: 'application',
					dir: 'dist/<%= pkg.version %>',
					optimizeCss: 'standard',
					findNestedDependencies: true,
					removeCombined: true,
					skipDirOptimize: true,

					paths: {
						'requireLib': 'libs/require'
					},

					modules: [
						{
							name: 'main',
							include: 'requireLib',
							exclude: ['config']
						}
					]
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

	grunt.registerTask('compile', ['handlebars']);
	grunt.registerTask('server', ['connect:server:keepalive']);
	grunt.registerTask('dev', ['connect', 'watch']);
	grunt.registerTask('build', ['jshint', 'requirejs', 'replace:dist', 'processhtml:dist', 'clean']);

	grunt.registerTask('infra', function() {

		var files = fs.readdirSync('libs'),
			startTpl = 'define([',
			endTpl = '], function () {});',
			template = null,
			arrLibs = [];

		files.forEach(function(file) {
			if(file !== 'require.js') {
				arrLibs.push("'" + file.split('.js')[0] + "'");
			}
		});

		arrLibs = arrLibs.join(',\n\t');

		template = startTpl + '\n\t' + arrLibs + '\n' + endTpl;

		fs.writeFileSync('base/infra.js', template);
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-processhtml');
};