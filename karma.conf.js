'use strict';

module.exports = function(config) {

  config.set({
    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    // the default configuration
    htmlReporter: {
      outputFile: './reports/unitTestsReport.html' // where to put the reports
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
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
  });
};