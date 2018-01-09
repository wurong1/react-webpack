const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const path =require('path');
module.exports = merge(common, {
  entry: ['babel-polyfill','./src/app.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    chunkFilename: '[name].bundle.js',
    filename: 'js/app.js', // 必须设置
  },
    devtool: 'inline-source-map', // 将编译的代码映射回原始源代码
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      open: true,        
      port: 8082,
      hot: true,
    },
    plugins: [
      new webpack.DefinePlugin({ // 配置的全局常量
        'process.env.NODE_ENV': '"development"', //或者使用 JSON.stringify('production')
        PRODUCTION: JSON.stringify(false), // 或者使用false
      }),
    ]
});