var gulp = require("gulp");
var webpack = require('webpack-stream')
var server = require('gulp-server-livereload');
var del = require('del');
var dtsGenarator = require('dts-generator');
var runSequence = require('run-sequence');

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

gulp.task('default', ['serve']);