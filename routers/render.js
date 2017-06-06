/**
 * 渲染路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const nunjucks = require('nunjucks');   // nunjucks模板引擎
const marked = require('marked');   // 解析markdown为html
const fileUtil = require('../utils/fileUtil');  // 文件工具

/**
 * 初始化变量
 */

/**
 * 主页
 */
koaRouter.get('/', async function (ctx) {
});

/**
 * 详情页
 */
koaRouter.get('/detail', function (ctx) {
    const markdownStr = '';
    fileUtil.readFile(process.cwd() + '/test/test.md')
        .then((data) => {
            console.debug('data', data.toString());
            console.info('marked', marked(data.toString()));
        })
});

module.exports = koaRouter;