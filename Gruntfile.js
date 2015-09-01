module.exports = function( grunt ) {

	grunt.initConfig({

		bower_concat: {
	    	all: {
	    		dest: 'assets/js/dependencies.js',
	    		cssDest: 'assets/css/dependencies.css',
	    		exclude: [],
	    		dependencies: {
	    			'jqueryui' : 'jquery'
	    		},
	    		mainFiles: { // Configure aqui o arquivo principal da dependencia, as vezes não é necessário
	    			'font-awesome' : 'css/font-awesome.min.css'
	    		},
	    		bowerOptions: {
	    			relative: false
	    		}
	    	}
	    },

	    copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: 'bower_components/font-awesome/fonts/*',
						dest: 'assets/fonts' 
					},

					{
						expand: true,
						flatten: true,
						src: [ 'bower_components/Materialize/font/material-design-icons/*' ],
						dest: 'assets/font/material-design-icons'
					},

					{
						expand: true,
						flatten: true,
						src: [ 'bower_components/Materialize/font/roboto/*' ],
						dest: 'assets/font/roboto'
					}

				]
			}
	    },

	    sass : {
    		dist : {
    			options : { style : 'compressed' },
    			files : {
    				'assets/css/spent-calculator.css' : 'assets/_sass/spent-calculator.scss'
    			}
    		}
	    },

		uglify : {
			options : {
				mangle : false
			},

			my_target : {
				files : {
					'assets/js/main.js' : [ 'assets/_js/main.js' ],
					'assets/js/dependencies.js' : [ 'assets/js/dependencies.js' ]
				}
			}
    	},

    	cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'assets/css/dependencies.css' : [ 'assets/css/dependencies.css' ]
				}
			}
		},

	    compress: {
			main: {
				options: {
					mode: 'gzip'
				},
				files: [
					// Each of the files in the src/ folder will be output to
					// the dist/ folder each with the extension .gz.js
					{expand: true, cwd: 'assets', src: ['js/*.js'], dest: 'assets/', ext: '.js.gz' },
					{expand: true, cwd: 'assets', src: ['css/*.css'], dest: 'assets/', ext: '.css.gz' }
				]
			}
		},

	    watch : {
	    	dist : {
	    		files : [
	    			'bower_components/**/*',
		    		'assets/_js/**/*',
		    		'assets/_sass/**/*'
	    		],

	    		tasks : [ 'bower_concat', 'copy', 'sass', 'uglify', 'cssmin', 'compress' ]
	    	}
    	}

	});

	// Plugins do Grunt
	grunt.loadNpmTasks( 'grunt-bower-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	// Tarefas que serão executadas
	grunt.registerTask( 'default', [ 'bower_concat', 'copy', 'sass', 'uglify', 'cssmin', 'compress' ] );

	// Tarefas para Watch
	grunt.registerTask( 'w', [ 'watch' ] );

};