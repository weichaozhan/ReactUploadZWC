const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const mainEntry = ['./src/Main.tsx'];

const env = process.env.NODE_ENV;
const CssArr = [{
  loader: 'style-loader'
}];

module.exports = {
  mode: env,
  entry: {
    main: mainEntry,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: env === 'production' ? path.resolve(__dirname, './tsconfig.build.json') : path.resolve(__dirname, './tsconfig.json'),
              compilerOptions: {
                noEmit: false,
              }
            }
          },
        ],
      },
      {
        test: /\.(css)$/,
        exclude: /(node_modules|bower_components|src)/,
        use: [
          ...CssArr,
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(css)$/,
        exclude: /(node_modules|bower_components|lib)/,
        use: [
          ...CssArr,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          ...CssArr,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: false,
                javascriptEnabled: true
              }
            }
          }
        ]
      }, 
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[name][contentHash:8].[ext]',
              outputPath: 'assets/images/',
            }
          }
        ]
      }, 
      {
        test: /\.(woff|woff2|eot|ttf|otf|mp3)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json']
  },
  plugins: [
    new ESLintPlugin({
      formatter: require.resolve('react-dev-utils/eslintFormatter'),
      eslintPath: require.resolve('eslint'),
      exclude: ['node_modules', 'bower_components', 'lib'],
      extensions: ['ts', 'tsx', 'mjs', 'js', 'jsx']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ids.HashedModuleIdsPlugin()
  ],
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist')
  },
};
