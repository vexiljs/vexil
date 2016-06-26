var path = require('path')

var config = {
  entry: {
    app: './dev/index.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'dev.js',
  },
  module: {
    loaders: [
      {
        test: /\.vex$/,
        loader: 'vexil',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  babel: {
    presets: [ 'es2015' ],
  },
  devtool: 'eval',
  resolve: {
    alias: {
      'vexil': path.resolve(__dirname, '../src/'),
    },
  },
}

module.exports = config
