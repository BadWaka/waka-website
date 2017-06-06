/**
 * 静态文件中间件
 */
const path = require('path');
const mime = require('mime');   // 处理 MIME 类型的库
const fs = require('mz/fs');    // 将node更新至ES6+语法的库，这里用它的fs模块，它将原生的fs封装成了Promise
const console = require('tracer').colorConsole(); // 增强console

/**
 * 静态文件中间件
 * @param url 类似 '/static'
 * @param dir 类似 __dirname+'/static'
 * @return {function(*, *)}
 */
function staticFiles(url, dir) {
    return async (ctx, next) => {

        const reqPath = ctx.request.path; // 请求路径
        // console.debug('请求路径 reqPath', reqPath);

        // 判断是否以指定的路径开头
        if (!reqPath.startsWith(url)) {
            // 处理下一个middleware
            await next();
            return;
        }

        // 获取文件完整路径
        const filePath = path.join(dir, reqPath.substring(url.length));
        // console.debug('获取文件完整路径 filePath', filePath);

        // 判断文件是否存在
        if (!await fs.exists(filePath)) {
            // 文件不存在
            ctx.response.status = 404;
            return;
        }

        // 查找文件的mime
        ctx.response.type = mime.lookup(reqPath);
        // 读取文件内容并给body
        ctx.response.body = await fs.readFile(filePath);
    };
}

module.exports = staticFiles;