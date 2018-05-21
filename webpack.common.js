const CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');


module.exports = {
  'entry': {'juego': './src/js/juego.js'},
  'module': {
    'rules': [
      {
        'exclude': /node_modules/,
        'test': /\.(js)$/,
        'use': {'loader': 'babel-loader'}
      },
      {
        'test': /\.(png|jpg|jpeg|gif|svg|ogg)$/,
        'use': [
          {
            'loader': 'file-loader',
            'options': {
              'name': '[name].[ext]',
              'outputPath': 'assets/'
            }
          }
        ]
      },
      {
        'test': /\.(css|scss)$/,
        'use': [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  'plugins': [
    new CleanWebpackPlugin([
      'build',
      'dist'
    ]),
    new HtmlWebpackPlugin({
      'chunks': ['juego'],
      'filename': 'index.html',
      'template': 'src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        'from': 'node_modules/phaser-ce/build/phaser.min.js',
        'to': ''
      }
    ])
  ],
  'resolve': {
    'extensions': [
      '.css',
      '.js',
      '.scss'
    ],
    'modules': [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  'target': 'web'
};
