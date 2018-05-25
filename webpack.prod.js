const UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  common = require('./webpack.common.js'),
  merge = require('webpack-merge'),
  path = require('path');


module.exports = merge(common, {
  'output': {
    'filename': '[name].bundle.js',
    'path': path.join(__dirname, 'build'),
    'publicPath': './'
  },
  'plugins': [new UglifyJSPlugin()]
});
