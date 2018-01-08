var path = require('path');
const webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');// build之前清理dist目录中的文件
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //将css文件从js文件中提取出来
// Create multiple instances
const extractCSS = new ExtractTextPlugin({
    filename: 'stylesheets/[name]-one.css',
});
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

module.exports = {
    module: {
        rules: [ //也可以用loaders:
            {
                test: /\.js$/,
                loader: "babel-loader", //可以添加问号设置参数，有多个loader使用use
                exclude: path.resolve(__dirname, './node_modules/'), //不用loader处理文件的范围
                include: path.resolve(__dirname, './src/'), // path.resolve(__dirname, )设置绝对路径
                query: { // query设置loader参数
                    presets: ['latest'], // latset可以转换es2015,es2016，es2017的所有特性
                    plugins: ['syntax-dynamic-import']
                },
            },
            {
                test: /\.css$/,
                use: extractCSS.extract(['css-loader', 'postcss-loader']),
                // use: [
                //     'style-loader',
                //     'css-loader?importLoaders=1',// 使用import，postcss才会处理在css中@import引入的css,1表示使用css-loader后面的1个loader(postcss)
                //     'postcss-loader'
                //     //loader: "style-loader!css-loader!postcss-loader", // 用!串联两个loader,postcss-loader autoprefixer可以样式添加浏览器前缀如webkit-,mozil-
                // ]
            },
            {
                test: /\.less$/, //配置sass文件同理
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader', //将html处理为字符串
            },
            {
                test: /\.ejs$/,  //文件后缀名可以是自定义的如.tpl
                loader: 'ejs-loader',
            },
            // {
            //     test: /\.(jpg|png|gif|svg)$/i, 
            //     loader: 'url-loader', //file-loader
            //      query: {
            //         limit: 90000, //小于90k的图片就会打包成base64编码，不会打包成单的img
            //         name: 'asset/[name]-[hash:5].[ext]'  //设置5位hash
            //     },
            // },
            {
                test: /\.(jpg|png|gif|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader', //专门处理图片类型
                        options: {
                            optipng: {
                                progressive: true,
                                quality: 100
                            },
                        },
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: "../",
                    outputPath: 'stylesheets/fonts/', // 打包后在css引用路径为../stylesheets/fonts/filename
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
        }),
        extractCSS,
        new CleanWebpackPlugin(['dist']),
        // HMR热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
}