/**
 * 接口路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console

koaRouter.get('/data', function (ctx) {
    console.debug('data', ctx);
});

module.exports = koaRouter;