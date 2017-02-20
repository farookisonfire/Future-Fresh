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
  }
}
