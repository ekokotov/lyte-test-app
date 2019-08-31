const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dotenv = require('dotenv');

const isPROD = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATH = {
  INDEX_HTML: path.resolve(__dirname, 'app', 'index.html'),
  INDEX_JS: path.resolve(__dirname, 'app', 'index.jsx'),
  BUILD: path.resolve(__dirname, 'dist'),
  TMP: path.resolve(__dirname, '.tmp'),
  THEME: path.resolve(__dirname, 'theme'),
};

const BASE_CONFIG = {
  entry: PATH.INDEX_JS,
  output: {
    path: PATH.TMP,
    filename: './rest-events.bundle.js',
    publicPath: '/',
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
      'process.env.IS_PRODUCTION': isPROD,
    }),
  ],
};
const DEV_CONFIG = {
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
const PROD_CONFIG = {
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      ...BASE_CONFIG.module.rules,
      {
        test: /\.scss|.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

const TARGET_CONFIG = Object.assign(BASE_CONFIG, isPROD ? PROD_CONFIG : DEV_CONFIG);

if (process.env.INSPECT) {
  TARGET_CONFIG.plugins.push(
    new BundleAnalyzerPlugin(),
  );
}

exports.default = TARGET_CONFIG;
