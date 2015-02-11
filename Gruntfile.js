'use strict';

var shush = require('shush');
var merge = require('lodash-node/modern/object/merge');

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({

    browserify: {
      src: ['lib/index.js'],
      dest: 'build/react-pages.js',
      options: {
        transform: ['reactify']
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

  grunt.registerTask('build', ['browserify']);
  grunt.registerTask('test', ['jscs', 'jshint']);

  grunt.registerTask('default', ['watch']);

};
