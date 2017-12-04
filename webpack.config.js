const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractLoadingCss = new ExtractTextPlugin({
  filename: "css/main.min.css",
  disable: process.env.NODE_ENV === "development"
});


const config = {
  entry: {
    'js/juego': './src/js/juego.js',
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: extractLoadingCss.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader",
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['js/juego'],
      filename: 'index.html',
      template: 'src/index.html'
    }),
    extractLoadingCss,
    new CopyWebpackPlugin([
      {
        from: './node_modules/phaser-ce/build/phaser.min.js',
        to: 'js/'
      },
      {
        from: './node_modules/phaser-ce/build/phaser.map',
        to: 'js/'
      },
      {
        from: './src/assets',
        to: 'assets/'
      }
    ],{
      ignore: [
        '*.txt',
        '*.css',
        '*.json',
        '*.ts'
      ]
    }),
  ],
  resolve: {
    extensions: [
      ".js",
      ".scss",
      ".css"
    ],
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    open: true,
    stats: "errors-only",
    index: 'index.html',
    historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\//, to: 'index.html' },
      ]
    }
  },
};

module.exports = config;
