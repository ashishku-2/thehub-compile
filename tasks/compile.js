/*
 * thehub-dependencies
 * https://github.com/cyb-ashishku/thehub-compile
 *
 * Copyright (c) 2015 Ashish Kumar
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('compile', 'Runs lint and does compile.', function (target) {
    var config = {
      copy: {}
    };

    var taskList = ['htmllint', 'tslint', 'typescript'];
    var target = target || 'dev';
    var copyTask = 'copy_compile-' + target;

    config.copy[copyTask] = {
      files: this.data.copy || []
    };

    grunt.log.writeln('Updated copy config');
    grunt.verbose.writeln(JSON.stringify(config, 2, 2));
    grunt.config.merge(config);

    var gruntConfig = grunt.config.get();
    taskList.forEach(function(task) {
      if(gruntConfig[task] && gruntConfig[task][target]) {
        grunt.task.run(task + ':' + target);
      }
    });

    grunt.task.run('copy:' + copyTask);
  });
};
