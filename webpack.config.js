const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const dotenv = require('dotenv');

const isPROD = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const stylesProcessing = (target, where, cssOptions, sassOptions) => ({
  test: target,
  include: where,
  use: [
    { loader: isPROD ? MiniCssExtractPlugin.loader : 'style-loader' },
    {
      loader: 'css-loader',
      options: cssOptions,
    }, { loader: 'sass-loader', options: sassOptions },
  ],
});
const htmlPlugin = new HtmlWebpackPlugin({ template: 'app/index.html' });
const definePlugin = new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.config().parsed), 'process.env.IS_PRODUCTION': isPROD });

const PATH = {
  APP: path.resolve(__dirname, 'app'),
  INDEX_HTML: path.resolve(__dirname, 'app', 'index.html'),
  INDEX_JS: path.resolve(__dirname, 'app', 'index.jsx'),
  BUILD: path.resolve(__dirname, 'dist'),
  TMP: path.resolve(__dirname, '.tmp'),
  THEME: path.resolve(__dirname, 'theme'),
};

const BASE_CONFIG = {
  entry: PATH.INDEX_JS,
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      stylesProcessing(/\.scss$/, PATH.APP, { modules: true }, { sourceMap: true }),
      stylesProcessing(/index\.scss$/, PATH.THEME, {}, { includePaths: ['./node_modules/bulma'] }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '*.ts'],
  },
};

const DEV_CONFIG = {
  ...BASE_CONFIG,
  output: {
    path: PATH.TMP,
    filename: './rest-events.bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    htmlPlugin, definePlugin,
  ],
};

const PROD_CONFIG = {
  ...BASE_CONFIG,
  output: {
    path: PATH.BUILD,
    filename: './rest-events.bundle.js',
  },
  plugins: [
    htmlPlugin, definePlugin,
    new MiniCssExtractPlugin(),
    ...process.env.INSPECT ? new BundleAnalyzerPlugin() : [],
  ],
};

exports.default = isPROD ? PROD_CONFIG : DEV_CONFIG;
