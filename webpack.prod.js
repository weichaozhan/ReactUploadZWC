const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = require('./webpack.common');

webpackConfig.plugins.push(...[
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'index.min.css'
  })
]);

const configProd = {
  ...webpackConfig,
  entry: {
    main: ['./src/component/Index.tsx']
  },
  mode: 'production',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default'
  },
};

module.exports = configProd;
