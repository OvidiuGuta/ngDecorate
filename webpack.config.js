var config = require('./config');
module.exports = {
  entry: config.PATHS.ENTRY_FILE_PATH,
  output: {
    publicPath: __dirname,
    filename: config.NAMES.OUT_FILE_NAME,
    
    // export itself to a global var
    libraryTarget: "var",
    // name of the global var
    library: config.NAMES.PACKAGE_NAME
  },
  
  externals: {
    "angular": "angular",
    "reflect-metadata": 'Reflect'
  },

  // Currently we need to add '.ts' to resolve.extensions array.
  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js'],
  },

  // Source maps support (or 'inline-source-map' also works)
  devtool: 'source-map',
  
  // Watch mode
  watch: config.WATCH,

  // Add loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};