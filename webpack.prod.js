  const webpack = require('webpack');
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');// 缩小打包文件的体积
  const common = require('./webpack.config.js');
  const path = require('path');
    module.exports = merge(common, {
        entry: {
            app: './src/app.js',
            another: './src/another-module'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'js/[name].js', // 必须设置
        },
        devtool: 'source-map', //适用于生产环境，提高整体性能
        plugins: [
            new UglifyJSPlugin({
              sourceMap: true,
            }),
            new webpack.DefinePlugin({ // 配置的全局常量
                'process.env.NODE_ENV': JSON.stringify('prodcution'), //或者使用 '"production"'
                PRODUCTION: true , // 或者使用JSON.stringify(false)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common' //指定公共bundle的名称
            })
        ]
    });