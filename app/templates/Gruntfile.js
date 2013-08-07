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
      src: ['Gruntfile.js', 'app/js/**/*.js']
    },
    
    sass: {
      options: {
        style: 'expanded'
      },
      'app/assets/css/styles.css': [
        <% if (includeBourbon) { %>'bower_components/bourbon/app/assets/stylesheets/_bourbon.scss',<% } %>
        'bower_components/normalize-css/normalize.css',
        'app/sass/styles.scss'
      ]
    },
    
    cssmin: {
      'build/assets/css/styles.css': 'app/assets/css/styles.css'
    },

    uglify: {
      files: {
        src: 'app/assets/js/main.js',
        dest: 'build/assets/js/main.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'bower_components/jquery/jquery.js'
        ],
        dest: 'app/assets/js/main.js'
      }
    },

    copy: {
      files: {
        expand: true,
        cwd: 'app/',
        src: [
          '**/*.html',
          'assets/images/**'
        ],
        dest: 'build/'
      }
    },

    clean: ['build/'],

    watch: {
      dev: {
        files: [
          'app/sass/**/*.scss',
          'app/scripts/**/*.js'
        ],
        tasks: ['sass', 'jshint', 'concat']
      }
    },

    connect: {
      server: {
        options: {
          host: '*',
          port: 8000,
          base: 'app'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['connect:server', 'watch']);

  // Development task.
  grunt.registerTask('dev', ['jshint', 'sass', 'concat']);

  // Build task.
  grunt.registerTask('build', ['jshint', 'sass', 'uglify', 'cssmin', 'copy']);
};
