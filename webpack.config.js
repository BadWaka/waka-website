const path = require('path');

// 配置请参考 https://doc.webpack-china.org/configuration
module.exports = {
    // 入口和上下文
    entry: './admin/src/index.tsx',
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
            // .ts and .tsx
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },
    // 外部扩展 https://doc.webpack-china.org/configuration/externals/
    // https://www.tslang.cn/docs/handbook/react-&-webpack.html
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // 大家可能对externals字段有所疑惑。 我们想要避免把所有的React都放到一个文件里，因为会增加编译时间并且浏览器还能够缓存没有发生改变的库文件。
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
};