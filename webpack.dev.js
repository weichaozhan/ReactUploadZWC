const { SourceMapDevToolPlugin } = require("webpack");
const webpackConfig = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

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
  new SourceMapDevToolPlugin(),
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
  })
);

const configDev = {
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    port: port || 3006,
    // open: true
  },
  devtool: 'eval-source-map',
  ...webpackConfig,
  optimization: {
    splitChunks: {
      name: 'common', 
      chunks: 'all', 
      minSize: 10000,
      maxInitialRequests: 5, // 首页最大并行下载数
      cacheGroups: {
        react: {
          test: (module) => {
            return /[\\/]*node_modules[\\/].*(react).*/.test(module.context);
          },
          name: 'react',
          priority: 1,
          reuseExistingChunk: true
        },
        ReactDOM: {
          test: (module) => {
            return /[\\/]*node_modules[\\/].*(react\-dom).*/.test(module.context);
          },
          name: 'react-dom',
          priority: 1,
          reuseExistingChunk: true
        },
        reactSyntaxHighlighter: {
          test: (module) => {
            return /[\\/]*node_modules[\\/].*(react\-syntax\-highlighter).*/.test(module.context);
          },
          name: 'react-syntax-highlighter',
          priority: 1,
          reuseExistingChunk: true
        }
      },
    }
  }
};

module.exports = configDev;
