/*global module:false*/
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: ['Gruntfile.js', 'dev/js/**/*.js']
    },
    
    sass: {
      options: {
        style: 'expanded'
      },
      'dev/assets/css/styles.css': [
        'bower_components/bourbon/app/assets/stylesheets/_bourbon.scss',
        'bower_components/normalize-css/normalize.css',
        'dev/sass/styles.scss'
      ]
    },
    
    cssmin: {
      'build/assets/css/styles.css': 'dev/assets/css/styles.css'
    },

    uglify: {
      files: {
        src: [
          'bower_components/jquery/jquery.js'
        ],
        dest: 'dev/assets/js/main.js'
      }
    },

    copy: {
      files: {
        expand: true,
        cwd: 'dev/',
        src: [
          '**/*.html',
          'assets/js/*',
          'assets/images/**'
        ],
        dest: 'build/'
      }
    },

    clean: ['build/'],

    watch: {
      dev: {
        files: [
          'dev/sass/**/*.scss',
          'dev/scripts/**/*.js'
        ],
        tasks: ['sass', 'jshint', 'uglify']
      }
    },

    connect: {
      server: {
        options: {
          host: '*',
          port: 8000,
          base: 'dev'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['connect:server', 'watch']);

  // Developement task.
  grunt.registerTask('dev', ['jshint', 'sass', 'uglify']);

  // Build task.
  grunt.registerTask('build', ['jshint', 'sass', 'uglify', 'cssmin', 'copy']);
};
