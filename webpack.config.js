module.exports = {
  entry: __dirname + '/src/client/index.js',
  output: {
    path: __dirname + '/dist/build',
    filename: 'bundle.js'
  },
  devServer: {
    port: 1337,
    contentBase: __dirname + '/dist/build',
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
