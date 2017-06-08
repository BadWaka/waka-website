const path = require('path');
const fs = require('fs');
const url = require('url');

// app 根目录
// Make sure any symlinks in the project folder are resolved:
// 这里为什么要多一步 fs.realpathSync 请看 https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
console.log('appDirectory', appDirectory);

/**
 * 解析绝对路径
 * @param relativePath
 */
const resolveApp = (relativePath) => {
    return path.resolve(appDirectory, relativePath);
};

/**
 * 确保斜杠(什么鬼翻译!)
 * @param path
 * @param needsSlash
 * @return {*}
 */
const ensureSlash = (path, needsSlash) => {
    const hasSlash = path.endsWith('/');    // 是否是斜杠结尾
    if (hasSlash && !needsSlash) {  // 如果是斜杠结尾且不需要斜杠
        return path.substr(path, path.length - 1);  // 去除最后的斜杠
    } else if (!hasSlash && needsSlash) {   // 如果不是斜杠结尾且需要斜杠
        return `${path}/`;  // 加个斜杠后返回
    } else {
        return path;    // 返回原地址
    }
};

/**
 * 得到 publicUrl
 * @param appPackageJson
 * @return {*}
 */
const getPublicUrl = (appPackageJson) => {
    return process.env.PUBLIC_URL || require(appPackageJson).homepage;
};

/**
 * 得到服务器根路径
 * We use `PUBLIC_URL` environment variable or "homepage" field to infer
 * "public path" at which the app is served.
 * Webpack needs to know it to put the right <script> hrefs into HTML even in
 * single-page apps that may serve index.html for nested URLs like /todos/42.
 * We can't use a relative path in HTML because we don't want to load something
 * like /todos/42/static/js/bundle.7289d.js. We have to know the root.
 * @param appPackageJson
 */
const getServedPath = (appPackageJson) => {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = publicUrl
};