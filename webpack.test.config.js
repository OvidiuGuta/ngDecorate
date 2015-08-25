var config = require('./config');
var getConfig = function(watch) {
  return {
    watch: watch,
    output: {
      publicPath: __dirname,
      filename: config.NAMES.TEST_OUT_FILE_NAME, 
    },
    
    // Currently we need to add '.ts' to resolve.extensions array.
    resolve: {
      extensions: ['', '.ts', '.webpack.js', '.web.js', '.js'],
    },
    
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
        }
      ],
    },
    
    devtool: 'source-map',
    
    externals: {
      "angular": "angular",
      "reflect-metadata": 'Reflect',
      "ngDecorate/ngDecorate": 'ngDecorate'
    }
  };
}

module.exports = {
  getConfig: getConfig
}