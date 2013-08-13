/*global module:false*/
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var yeomanConfig = {
    app: 'app',
    build: 'build'
  };

  // Project configuration.
  grunt.initConfig({
    yeoman: yeomanConfig,

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: ['Gruntfile.js', '<%%= yeoman.app %>/js/**/*.js']
    },
    
    sass: {
      options: {
        style: 'expanded'
      },
      '<%%= yeoman.app %>/assets/css/styles.css': [
        <% if (includeBourbon) { %>'bower_components/bourbon/app/assets/stylesheets/_bourbon.scss',<% } %>
        'bower_components/normalize-css/normalize.css',
        '<%%= yeoman.app %>/sass/styles.scss'
      ]
    },
    
    cssmin: {
      '<%%= yeoman.build %>/assets/css/styles.css': '<%%= yeoman.app %>/assets/css/styles.css'
    },

    uglify: {
      files: {
        src: '<%%= yeoman.app %>/assets/js/main.js',
        dest: '<%%= yeoman.build %>/assets/js/main.js'
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
        dest: '<%%= yeoman.app %>/assets/js/main.js'
      }
    },

    copy: {
      files: {
        expand: true,
        cwd: '<%%= yeoman.app %>',
        src: [
          '**/*.html',
          'assets/images/**'
        ],
        dest: '<%%= yeoman.build %>'
      }
    },

    clean: ['<%%= yeoman.build %>'],

    watch: {
      dev: {
        files: [
          '<%%= yeoman.app %>/sass/**/*.scss',
          '<%%= yeoman.app %>/scripts/**/*.js'
        ],
        tasks: ['sass', 'jshint', 'concat']
      }
    },

    connect: {
      server: {
        options: {
          host: '*',
          port: 8000,
          base: '<%%= yeoman.app %>'
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
