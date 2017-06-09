const path = require('path');

module.exports = {
    // 入口
    entry: [
        './src/app.js'
    ],
    // 输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // 开发工具
    devtool:'cheap-source-map',

};