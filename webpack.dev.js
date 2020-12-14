const webpackConfig = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT;

webpackConfig.module.rules.push({
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
});
webpackConfig.plugins.push(new HtmlWebpackPlugin({
  template: './src/index.html',
  favicon: './src/assets/images/favicon.ico',
  minify: true,
}));

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: port
  },
  ...webpackConfig
};