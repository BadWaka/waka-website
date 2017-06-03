/**
 * 渲染路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console

/**
 * 主页
 */
koaRouter.get('/', async function (ctx) {
    console.debug('/', ctx);
    await ctx.render('index', {
        user: 'waka'
    });
});

/**
 * 博客页
 */
koaRouter.get('/blog', function (ctx) {
    console.debug('blog', ctx);
});

module.exports = koaRouter;