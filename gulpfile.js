var gulp = require("gulp");
var webpack = require('webpack-stream')
var server = require('gulp-server-livereload');
var del = require('del');
var dtsGenarator = require('dts-generator');
var runSequence = require('run-sequence');
var karma = require('gulp-karma');

var webpackConfig = require("./webpack.config.js");
var config = require('./config');

var firstRun = true;
gulp.task('build:dev', [], function(callback) {
  console.log('Building library in dev mode...');
	gulp.src(config.PATHS.ENTRY_FILE_PATH)
	  	.pipe(webpack( webpackConfig, null, function(err, stats) {
        if(firstRun) {
           firstRun = false;
           runSequence(
        		'build:dts', 
            'build:copy',
            callback
      	   );
        } else {
          runSequence(
        		'build:dts', 
            'build:copy'
      	  );
        }        
      }))
	  	.pipe(gulp.dest(config.PATHS.BUILD_TARGET));
});

gulp.task('build:dts', [], function(callback) {
  dtsGenarator.generate({
    name: config.NAMES.PACKAGE_NAME,
    baseDir: config.PATHS.SOURCE_FOLDER,
    files: [ config.NAMES.ENTRY_FILE_NAME ],
    out: config.PATHS.DTS_TARGET
  }).then(function() {
    callback();
  });
});

gulp.task('build:copy', [], function() {
    return gulp.src(config.GLOBS.BUILD_COPY_SOURCE)
      .pipe(gulp.dest(config.PATHS.EXAMPLE_BUILD_TARGET));
});

gulp.task('build:example', function() {
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
		'build:dev',
    ['build:example', 'serve:example'],
    callback
	);
});

function runTests(singleRun, done) {
    var preprocessors = {};
    if(singleRun) {
      preprocessors[config.PATHS.TEST_TARGET + '/' + config.NAMES.OUT_FILE_NAME] = ['coverage'];
    }    
    
    gulp.src(['./node_modules/angular/angular.js',
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

gulp.task('build:test', function() {
  gulp.src(config.PATHS.TEST_ENTRY_FILE)
	  	.pipe(webpack(require(config.PATHS.TEST_WEBPACK_CONFIG_FILE).getConfig(false)))
	  	.pipe(gulp.dest(config.PATHS.TEST_TARGET));
});

gulp.task('build:test:auto', function() {
  gulp.src(config.PATHS.TEST_ENTRY_FILE)
	  	.pipe(webpack(require(config.PATHS.TEST_WEBPACK_CONFIG_FILE).getConfig(true)))
	  	.pipe(gulp.dest(config.PATHS.TEST_TARGET));
});

gulp.task('test', ['build:dev', 'build:test'], function (done) { runTests(true /* singleRun */, done) });
gulp.task('test:auto', ['build:dev', 'build:test:auto'], function (done) { runTests(false /* singleRun */, done) });

gulp.task('default', ['serve']);