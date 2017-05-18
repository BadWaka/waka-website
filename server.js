/************************ require ************************/

const Koa = require('koa'); // koa
const console = require('tracer').colorConsole(); // 增强console
const koaRouter = require('koa-router')(); // koa-router   设置路由
const koaStatic = require('koa-static'); // koa-static 设置静态资源

/************************ initial ************************/

const app = new Koa();

/************************ middleware ************************/

// x-response-time 记录请求时间
app.use(async function (ctx, next) {
    const startTime = new Date();
    await next();
    const ms = new Date() - startTime;
    ctx.set('X-Response-Time', `${ms}ms`); // 把请求开始到响应完成的时间存到ctx里
    console.info(`x-response-time ${ms}ms`);
});

// 设置静态目录
app.use(koaStatic('static'));

// router 路由
app.use(koaRouter.routes());
app.use(koaRouter.allowedMethods());

/************************ router ************************/

koaRouter.get('/index', function (ctx) {
    console.debug('index', ctx);
});

/************************ start server ************************/

app.listen(8000);
``
console.info('listenning 8000...');

/************************ error handler ************************/

app.on('error', err =>
    console.error('server error', err)
);