
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

/**
 * 得到客户端的环境变量
 * Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
 * injected into the application via DefinePlugin in Webpack configuration.
 * @param publicUrl
 */
function getClientEnvironment(publicUrl) {

    // 最后得到的 raw 其实是一个对象，里面放了一些服务器的环境变量，应该是为了让浏览器知道当前是什么环境，好做判断，格式为：{ NODE_ENV: 'development', PUBLIC_URL: undefined }
    const raw = Object.keys(process.env)    // 遍历环境变量名
        .filter(key => /^REACT_APP_/i.test(key))    // 过滤包含该正则的环境变量名
        .reduce(
            // 每个环境变量的值都赋给 env 中去
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            // 传一个初始对象 env 进去，做为环境
            {
                // Useful for determining whether we’re running in production mode.
                // Most importantly, it switches React into the correct mode.
                NODE_ENV: process.env.NODE_ENV || 'development',
                // Useful for resolving the correct path to static assets in `public`.
                // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
                // This should only be used as an escape hatch. Normally you would put
                // images into the `src` and `import` them in code to get their paths.
                PUBLIC_URL: publicUrl,
            }
        );
    // console.log('raw', raw); // 所以最后得到的 raw 其实是一个对象，里面放了一些服务器的环境变量，应该是为了让浏览器知道当前是什么环境，好做判断，格式为：{ NODE_ENV: 'development', PUBLIC_URL: undefined }

    // Stringify all values so we can feed into Webpack DefinePlugin
    // 对所有值字符串化以便使用 Webpack DefinePlugin 这个插件
    // 这个插件是允许你创建一个在编译时可以配置的全局常量 http://www.css88.com/doc/webpack2/plugins/define-plugin/
    // 这个 stringified 得到的值很奇怪，需要这样访问 stringified['process.env']，得到的值类似于这样：{ NODE_ENV: '"development"', PUBLIC_URL: undefined }
    const stringified = {
        'process.env': Object.keys(raw)
            .reduce(
                (env, key) => {
                    env[key] = JSON.stringify(raw[key]);
                    return env;
                },
                {}
            )
    };
    // console.log('stringified', stringified['process.env']);

    return {
        raw,
        stringified
    }
}

module.exports = getClientEnvironment;