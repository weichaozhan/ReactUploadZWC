const webpack = require('webpack'); //访问内置的插件
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mainEntry = ['./src/Main.tsx'];

const env = process.env.NODE_ENV;
const CssArr = [];

if (env === 'production') {
  CssArr.push(MiniCssExtractPlugin.loader);
}

module.exports = {
  mode: 'environment',
  entry: {
    main: mainEntry,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        exclude: /(node_modules|bower_components|lib)/,
        include: path.resolve(__dirname, 'src')
      },
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
              compilerOptions: {
                noEmit: false,
              }
            }
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'style-loader'
          },
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
        test: /\.(css|scss)$/,
        exclude: /(src)/,
        use: [
          {
            loader: 'style-loader'
          },
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
              javascriptEnabled: true
            }
          }
        ]
      }, 
      {
        test: /\.(png|svg|jpg|gif)$/,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ids.HashedModuleIdsPlugin()
  ],
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist')
  },
};
