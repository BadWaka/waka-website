/************************ require ************************/

const Koa = require('koa'); // koa
const console = require('tracer').colorConsole(); // 增强console
const koaStatic = require('koa-static'); // koa-static   设置静态资源目录
const renderRouter = require('./routers/render'); // 渲染路由
const apiRouter = require('./routers/api'); // 接口路由

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

// 路由
app.use(renderRouter.routes()); // 渲染路由，用来渲染页面
app.use(renderRouter.allowedMethods());
app.use(apiRouter.routes()); // 接口路由，用来做逻辑处理
app.use(apiRouter.allowedMethods());

/************************ start server ************************/

app.listen(80);
console.info('listenning 80...');

/************************ error handler ************************/

app.on('error', err =>
    console.error('server error', err)
);