const CopyWebpackPlugin = require('copy-webpack-plugin'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  common = require('./webpack.common.js'),
  merge = require('webpack-merge'),
  path = require('path');


module.exports = merge(common, {
  'output': {
    'filename': '[name].bundle.js',
    'path': path.join(__dirname, 'build/src'),
    'publicPath': './'
  },
  'plugins': [
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      {
        'from': 'package.json',
        'to': '..'
      }
    ]),
    new CopyWebpackPlugin([
      {
        'from': 'src/electron.js',
        'to': ''
      }
    ]),
    new CopyWebpackPlugin([
      {
        'from': 'node_modules/electron-is-dev',
        'to': 'node_modules/electron-is-dev',
        'toType': 'dir'
      }
    ])
  ]
});
