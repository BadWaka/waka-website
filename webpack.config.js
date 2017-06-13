const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');    // webpack-dev-server仪表盘
const HtmlWebpackPlugin = require('html-webpack-plugin');   // html-webpack-plugin生成HTML模板插件

// 配置请参考 https://doc.webpack-china.org/configuration
module.exports = {
    // 入口和上下文
    entry: './admin/src/index.js',
    // 输出
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 开发工具
    devtool: 'source-map',
    // 解析
    resolve: {
        // 自动解析确定的扩展。默认值为：extensions: [".js", ".json"]
        extensions: ['.js', '.json', '.ts', '.tsx']
    },
    // 模块
    module: {
        // 模块规则（配置 loader、解析器等选项）
        rules: [
            // .scss
            {
                test: /\.scss$/,
                use: [{ // use 的顺序是从下至上
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader?modules" // 后面增加?modules开启css-modules
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            // .css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules']
            },
            // babel js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            },
        ]
    },
    // 插件
    plugins: [
        new DashboardPlugin(),  // webpack-dev-server仪表盘插件
        new webpack.HotModuleReplacementPlugin(),   // 热模块替换插件
        new HtmlWebpackPlugin({ // 生成HTML模板插件
            title: '开发',    // 标题
            template: 'admin/index.html',   // 模板
            filename: 'admin/index.html', // 输出文件，在内存中，不会存在硬盘里
        }),
    ],
    // 开发服务器
    devServer: {
        compress: true,
        port: 9000,
        hot: true
    }
};