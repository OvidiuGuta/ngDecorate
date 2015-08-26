var gulp = require("gulp");
var webpack = require('webpack-stream');
var server = require('gulp-server-livereload');
var del = require('del');
var dtsGenarator = require('dts-generator');
var runSequence = require('run-sequence');
var karma = require('gulp-karma');

var webpackConfig = require("./webpack.config.js");
var config = require('./config');

var firstRun = true;
gulp.task('compile:dev', [], function(callback) {
  console.log('Building library in dev mode...');
	gulp.src(config.PATHS.ENTRY_FILE_PATH)
	  	.pipe(webpack( webpackConfig.getConfig(false, true), null, function() {
        if(firstRun) {
           firstRun = false;
           runSequence(
        		'compile:dts', 
            'compile:copy',
            callback
      	   );
        } else {
          runSequence(
        		'compile:dts', 
            'compile:copy'
      	  );
        }        
      }))
	  	.pipe(gulp.dest(config.PATHS.BUILD_TARGET));
});

gulp.task('compile:prod:min', ['compile:dts'], function() {
  console.log('Building library in prod mode minified...');
  webpackConfig.watch = false;
	return gulp.src(config.PATHS.ENTRY_FILE_PATH)
	  	.pipe(webpack( webpackConfig.getConfig(true, false) ))
	  	.pipe(gulp.dest(config.PATHS.BUILD_TARGET));
});

gulp.task('compile:prod', ['compile:dts'], function() {
  console.log('Building library in prod mode...');
  webpackConfig.watch = false;
	return gulp.src(config.PATHS.ENTRY_FILE_PATH)
	  	.pipe(webpack( webpackConfig.getConfig(false, false) ))
	  	.pipe(gulp.dest(config.PATHS.BUILD_TARGET));
});

gulp.task('compile:dts', [], function(callback) {
  dtsGenarator.generate({
    name: config.NAMES.PACKAGE_NAME,
    baseDir: config.PATHS.SOURCE_FOLDER,
    files: [ config.NAMES.ENTRY_FILE_NAME ],
    out: config.PATHS.DTS_TARGET
  }).then(function() {
    callback();
  });
});

gulp.task('compile:copy', [], function() {
    return gulp.src(config.GLOBS.BUILD_COPY_SOURCE)
      .pipe(gulp.dest(config.PATHS.EXAMPLE_BUILD_TARGET));
});

gulp.task('compile:example', function() {
  console.log('Building example in dev mode...');
	return gulp.src(config.PATHS.EXAMPLE_ENTRY_FILE_PATH)
	  	.pipe(webpack( require(config.PATHS.EXAMPLE_WEBPACK_CONFIG_FILE_PATH) ))
	  	.pipe(gulp.dest(config.PATHS.EXAMPLE_BUILD_TARGET));
});

gulp.task('clean', function (cb) {
  del([
    config.PATHS.BUILD_TARGET,
    config.PATHS.EXAMPLE_BUILD_TARGET
  ], cb);
});

gulp.task('serve:example', [], function() {
  return gulp.src(config.PATHS.EXAMPLE_FOLDER)
    .pipe(server({
      livereload: config.SERVER.LIVE_RELOAD,
      port: config.SERVER.PORT,
      directoryListing: false,
      open: config.SERVER.OPEN,
      defaultFile: '/index.html'
    }));
});

gulp.task('serve', function(callback) {
	runSequence(
		'clean',   
		'compile:dev',
    ['compile:example', 'serve:example'],
    callback
	);
});

function runTests(singleRun, done) {
    var preprocessors = {};
    if(singleRun) {
      preprocessors[config.PATHS.TEST_TARGET + '/' + config.NAMES.OUT_FILE_NAME] = ['coverage'];
    }    
    
    gulp.src(['./node_modules/angular/angular.js',
        './node_modules/angular-ui-router/build/angular-ui-router.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './node_modules/reflect-metadata/Reflect.js',
        config.PATHS.BUILD_TARGET + '/**/*.js'])
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: (singleRun)? 'run': 'watch',
        reporters: (singleRun)?['dots', 'html', 'coverage']: ['dots'],
        preprocessors: preprocessors
      }))
      .on('end', function() {
        //run some code here
        done();
      })
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      });
}

gulp.task('compile:test', ['compile:dts'], function() {
  gulp.src(config.PATHS.TEST_ENTRY_FILE)
	  	.pipe(webpack(require(config.PATHS.TEST_WEBPACK_CONFIG_FILE).getConfig(false)))
	  	.pipe(gulp.dest(config.PATHS.TEST_TARGET));
});

gulp.task('compile:test:auto', function() {
  gulp.src(config.PATHS.TEST_ENTRY_FILE)
	  	.pipe(webpack(require(config.PATHS.TEST_WEBPACK_CONFIG_FILE).getConfig(true)))
	  	.pipe(gulp.dest(config.PATHS.TEST_TARGET));
});

gulp.task('test', ['compile:prod', 'compile:test'], function (done) { runTests(true /* singleRun */, done) });
gulp.task('test:auto', ['compile:dev', 'compile:test:auto'], function (done) { runTests(false /* singleRun */, done) });

gulp.task('build:dev', function(callback) {
  runSequence(
  	'clean',
    'compile:dts',
    'compile:dev',
    callback
  );
});

gulp.task('build:prod', function(callback) {
  runSequence(
  	'clean',
    'compile:dts',
    'compile:prod',
    'compile:prod:min',
    callback
  );
})

gulp.task('default', ['serve']);