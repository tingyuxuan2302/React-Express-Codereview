const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config.js');

const publicConfig = { 
    devtool: 'cheap-module-source-map',


    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.less$/,
            use:  ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        // 压缩js
        new UglifyJSPlugin(),
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV':JSON.stringify('production')
            }
        }),
        // 使vendor.[hash].js每次打包的时候hash不变，还要对应修改webpack.optimize.CommonsChunkPlugin的name为runtime
        new webpack.HashedModuleIdsPlugin(),
        // 清除dist文件夹里的多余文件
        new CleanWebpackPlugin(),
        // 单独提取css
        // new ExtractTextPlugin({
        //     filename: '[name].[contenthash:5].css',
        //     allChunks: true
        // })
    ]
};

module.exports = merge(commonConfig, publicConfig);