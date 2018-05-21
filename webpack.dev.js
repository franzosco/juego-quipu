const common = require('./webpack.common.js'),
  merge = require('webpack-merge'),
  path = require('path');


module.exports = merge(common, {
  'devServer': {'contentBase': path.join(__dirname, 'src')},
  'devtool': 'inline-source-map',
  'output': {
    'filename': '[name].bundle.js',
    'path': path.join(__dirname, 'src'),
    'publicPath': '/'
  }
});
