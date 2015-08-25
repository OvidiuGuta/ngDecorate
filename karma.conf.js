/// <reference path="typings/node/node.d.ts"/>
'use strict';

module.exports = function(config) {
  var configuration = {
    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    // the default configuration
    htmlReporter: {
      outputFile: './reports/unitTestsReport.html' // where to put the reports
    },
    
     customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'lcov',
      dir : './reports/coverage'
    },

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      ".tmp/serve/**/*.js": ["coverage"]
    },

    plugins : [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-htmlfile-reporter',
        'karma-coverage'
    ]
  }

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }
  
  config.set(configuration);
};