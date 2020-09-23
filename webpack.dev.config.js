const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    /*入口*/
    entry: {
        app: [
            'babel-polyfill', // 将es6新的api等进行转码
            'react-hot-loader/patch', // react热更新，保留state状态
            path.join(__dirname, 'src/index.js')
        ]
    },

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        filename: '[name].[hash].js'
    },
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        proxy: {
            '/api': 'http://localhost:5000'
        },
        port: 8080,
        compress: true, // 压缩dist文件
        historyApiFallback: true // 404的话定位到首页
    },
    devtool: 'inline-source-map', // source文件调试

};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);
