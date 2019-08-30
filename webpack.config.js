const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const isPROD = process.env.NODE_ENV === 'production';
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = {
  INDEX_HTML: path.resolve(__dirname, 'app', 'index.html'),
  INDEX_JS: path.resolve(__dirname, 'app', 'index.jsx'),
  BUILD: path.resolve(__dirname, 'dist'),
  TMP: path.resolve(__dirname, '.tmp'),
  THEME: path.resolve(__dirname, 'theme'),
};

module.exports = {
  entry: PATH.INDEX_JS,
  output: {
    path: PATH.TMP,
    filename: './rest-events.bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'app'),
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          }, { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.scss|.sass$/,
        include: PATH.THEME,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules/bulma'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '*.ts'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
      'process.env.IS_PRODUCTION': isPROD,
    }),
    // new ExtractTextPlugin('css/theme.css'),
  ],
};
