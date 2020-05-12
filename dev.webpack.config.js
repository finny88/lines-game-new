const merge = require('webpack-merge');
const base = require('./base.webpack.config.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(base, {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
  },
  plugins: [
    new Dotenv({
      path: './dev.env',
    }),
  ],
});
