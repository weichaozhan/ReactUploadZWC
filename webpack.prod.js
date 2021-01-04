const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = require('./webpack.common');

webpackConfig.plugins.push(...[
  new CleanWebpackPlugin()
]);

const configProd = {
  ...webpackConfig,
  entry: {
    main: ['regenerator-runtime/runtime', 'core-js/stable', './src/component/Index.tsx']
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
    'classnames': {
      commonjs: 'classnames',
      commonjs2: 'classnames',
      amd: 'classnames',
      root: 'classNames',
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
