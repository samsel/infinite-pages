'use strict';

var shush = require('shush');
var merge = require('lodash-node/modern/object/merge');

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({

    browserify: {
      build: {
        files: {
          'build/infinite-pages.js': ['lib/index.jsx']
        },
        options: {
          transform: ['reactify']
        }
      }
    },

    uglify: {
      all: {
        options: {
          sourceMap: true,
          sourceMapName: 'build/infinite-pages.map'
        },
        files: {
          'build/infinite-pages.js': ['build/infinite-pages.js']
        }
      }
    },

    jscs: {
      src: ['**/*.js', '**/*.jsx'],
        options: {
        config: '.jscsrc',
        esprima: 'esprima-fb'
      }
    },

    jshint: {
      options: merge(shush('.jshintrc'), {
        reporter: require('jshint-stylish')
      }),
      javascriptFiles: ['**/*.js'],
      jsxFiles: {
        options: {
          quotmark: false
        },
        files: {
          src: ['**/*.jsx']
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
          'build/infinite-pages.css': ['node_modules/swiper/dist/idangerous.swiper.css', 'lib/css/index.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['lib/**/*.*'],
        tasks: ['browserify'],
        options: {
          spawn: false,
          interrupt: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('test', ['jscs', 'jshint']);
  grunt.registerTask('build', ['browserify', 'uglify', 'cssmin']);

  grunt.registerTask('default', ['watch']);

};
