module.exports = {
  entry: './example/js/app.ts',
  output: {
    publicPath: './',
    filename: "app.js",
    
    // export itself to a global var
    libraryTarget: "var",
    // name of the global var: "Foo"
    library: "TodoMVC"
  },
  
  externals: {
    "angular": "angular",
    "reflect-metadata": 'Reflect',
    "ngDecorate/ngDecorate": 'ngDecorate'
  },

  // Currently we need to add '.ts' to resolve.extensions array.
  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js'],
  },

  // Source maps support (or 'inline-source-map' also works)
  devtool: 'source-map',
  
  // Watch mode
  watch: true,

  // Add loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        tscofig: './tsconfig.js'
      }
    ]
  }
};