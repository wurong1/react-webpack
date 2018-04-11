const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // 缩小打包文件的体积
const common = require('./webpack.config.js');
const path = require('path');
module.exports = env => {
		console.log('NODE_ENV: ', env.NODE_ENV);
		return merge(common, {
			entry: {
					app: './src/app.js',
					another: './src/another-module',
					vendor: ['lodash', 'react']
			},
			output: {
					path: path.resolve(__dirname, './dist'),
					filename: 'js/[name].[chunkhash].js', // 必须设置
			},
			//devtool: 'source-map', //适用于生产环境，提高整体性能
			plugins: [
					new UglifyJSPlugin({ //压缩代码，去掉一些引入但未调用的代码
							sourceMap: true
					}),
					new webpack.DefinePlugin({ // 配置的全局常量
							'process.env.NODE_ENV': JSON.stringify('prodcution'), //或者使用 '"production"'
							PRODUCTION: true, // 或者使用JSON.stringify(false)
					}),
					new webpack
							.optimize
							.CommonsChunkPlugin({ //将lodash和react打包到js/vendor.[chumkhash].js文件中
									name: 'vendor',
									minChunks: Infinity
							}),
					new webpack
							.optimize
							.CommonsChunkPlugin({
									name: 'common' //将一些公共的模块(第三方库如lodash)提取到common.js，但是不包括上面已经提取的js
							}),
			]
	});
}