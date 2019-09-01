const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const isPROD = process.env.NODE_ENV === 'production';
const stylesProcessing = (target, where, cssOptions, sassOptions) => ({
  test: target,
  include: where,
  use: [
    { loader: isPROD ? MiniCssExtractPlugin.loader : 'style-loader' },
    { loader: 'css-loader', options: cssOptions, },
    { loader: 'sass-loader', options: sassOptions },
  ],
});
const PATH = {
  APP: path.resolve(__dirname, 'app'),
  INDEX_HTML: path.resolve(__dirname, 'app', 'index.html'),
  INDEX_JS: path.resolve(__dirname, 'app', 'index.jsx'),
  BUILD: path.resolve(__dirname, 'dist'),
  TMP: path.resolve(__dirname, '.tmp'),
  THEME: path.resolve(__dirname, 'theme'),
};
const definePlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(dotenv.config().parsed),
  'process.env.IS_PRODUCTION': isPROD,
});

const BASE_CONFIG = {
  entry: PATH.INDEX_JS,
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      stylesProcessing(
        /\.scss$/,
        PATH.APP,
        { modules: true },
        { sourceMap: true },
      ),
      stylesProcessing(
        /index\.scss$/,
        PATH.THEME,
        {},
        { includePaths: ['./node_modules/bulma'] },
      ),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '*.ts'],
  },
};

const DEV_CONFIG = {
  ...BASE_CONFIG,
  output: {
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: PATH.INDEX_HTML }), definePlugin],
};

const PROD_CONFIG = {
  ...BASE_CONFIG,
  output: {
    path: PATH.BUILD,
    filename: './rest-events.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: PATH.INDEX_HTML, inject: 'head' }),
    definePlugin,
    new MiniCssExtractPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
      preload: /\.js$/,
    }),
    // new BundleAnalyzerPlugin(), // uncomment to validate bundle
  ],
};

exports.default = isPROD ? PROD_CONFIG : DEV_CONFIG;
