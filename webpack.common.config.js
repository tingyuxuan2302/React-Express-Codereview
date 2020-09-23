const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    /*入口*/
    entry: {
        app: [
            "babel-polyfill", // 将es6新的api等进行转码
            'whatwg-fetch', // 引入fetch
            path.join(__dirname, 'src/index.js')
        ],
        vendor: [
            'react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'
        ]
    },

    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/', // 加载外部资源的输出路径
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'async',
    //         minSize: 30000,
    //         //   minRemainingSize: 0,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 6,
    //         maxInitialRequests: 4,
    //         automaticNameDelimiter: '~',
    //         cacheGroups: {
    //             defaultVendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // },
    /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
    /*cacheDirectory是用来缓存编译结果，下次编译加速*/
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    plugins: [
        // 将生成的js自动插入到index.html中
        new HtmlWebpackPlugin({
            reject: true,
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve('./dist/dll/vendor.dll.js'), // 这个路径是你的dll文件路径
            includeSourcemap: false  // 这里是因为我开启了sourcemap。 不这么写会报错。
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/dll/vendor.manifest.json')
        })
        // 将不变的第三方包提取出来缓存
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // }),
        // new ExtractTextPlugin("[name].css")

    ],
    // 路径配置
    resolve: {
        extensions: ['.js', '.jsx', '.less'],
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            data: path.join(__dirname, 'src/data')
        }
    },
};
