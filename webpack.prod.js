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
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
};

module.exports = configProd;
