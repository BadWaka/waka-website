/**
 * 渲染路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const swig = require('swig');

/**
 * 初始化变量
 */

const viewsPath = process.cwd() + '/views/';

/**
 * 主页
 */
koaRouter.get('/', async function (ctx) {
    const template = swig.compileFile(viewsPath + 'index.html');
    const renderedHtml = template({
        user: 'waka'
    });
    ctx.body = renderedHtml;
});

/**
 * 博客页
 */
koaRouter.get('/blog', function (ctx) {
    console.debug('blog', ctx);
});

module.exports = koaRouter;