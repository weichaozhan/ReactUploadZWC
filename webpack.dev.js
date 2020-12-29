const { SourceMapDevToolPlugin } = require("webpack");
const webpackConfig = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const port = process.env.PORT;

webpackConfig.module.rules.push(
  {
    test: /\.(html)$/,
    use: {
      loader: 'html-loader',
      options: {
        attributes: {
          list: [
            {
              tag: 'img',
              attribute: 'data-src',
              type: 'src'
            },
            {
              tag: 'img',
              attribute: 'src',
              type: 'src'
            },
            {
              tag: 'audio',
              attribute: 'src',
              type: 'srcset'
            }
          ]
        },
        minimize: true
      }
    }
  },
  {
    test: /\.(ts|tsx|js|jsx)$/,
    enforce: 'pre',
    use: ['source-map-loader'],
  }
);
webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/assets/images/favicon.ico',
    minify: true,
  }),
  new FriendlyErrorsWebpackPlugin(),
  new SourceMapDevToolPlugin()
);

const configDev = {
  devServer: {
    contentBase: path.join(__dirname, 'lib'),
    port: port,
    // open: true
  },
  devtool: 'eval-source-map',
  ...webpackConfig
};

module.exports = configDev;
