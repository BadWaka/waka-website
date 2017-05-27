/**
 * 渲染路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console

koaRouter.get('/', async function (ctx) {
    console.debug('/', ctx);
    await ctx.render('index', {
        user: 'waka'
    });
});

koaRouter.get('/index', function (ctx) {
    console.debug('index', ctx);
});

module.exports = koaRouter;