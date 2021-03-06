/************************ require ************************/

const Koa = require('koa'); // koa
const path = require('path'); // path
const console = require('tracer').colorConsole(); // 增强console
const koaStatic = require('koa-static'); // koa-static   设置静态资源目录
const koaMount = require('koa-mount'); // koa-mount 将中间件挂载到特定url下
const koaCORS = require('kcors'); // koa CORS 中间件
const koaBodyParser = require('koa-bodyparser'); // koa-bodyparser 解析post中的data
const koaEjs = require('koa-ejs');
const staticFiles = require('./middlewares/staticFiles'); // 自己写的静态资源中间件

const renderRouter = require('./routers/render'); // 渲染路由
const apiRouter = require('./routers/api'); // 接口路由

/************************ initial ************************/

const app = new Koa();

// 是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';
console.debug('当前环境 process.env.NODE_ENV', process.env.NODE_ENV);

/************************ middleware ************************/

// 设置 CORS 跨域资源请求
app.use(koaCORS({
    origin: 'http://localhost:9000', // 测试环境
}));

// 设置ejs中间件
koaEjs(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});

// x-response-time 记录请求时间
app.use(async function (ctx, next) {
    const startTime = new Date();
    await next();
    const ms = new Date() - startTime;
    ctx.set('X-Response-Time', `${ms}ms`); // 把请求开始到响应完成的时间存到ctx里
    // console.info(`响应时间 x-response-time ${ms}ms`);
});

// 开发环境下才会设置静态文件目录
if (!isProduction) {

    // // 设置静态目录，使用 koa-mount 和 koa-static 将静态资源目录挂载到 /static 路径下
    // app.use(koaMount('/static', koaStatic('static')));

    // 设置静态资源目录，使用自己写的中间件
    app.use(staticFiles('/static', __dirname + '/static'));
}

// 解析post的data
app.use(koaBodyParser());

/************************ 路由 ************************/

// 渲染路由，用来渲染页面
app.use(renderRouter.routes());
app.use(renderRouter.allowedMethods());

// 接口路由，用来做逻辑处理
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

/************************ start server ************************/

app.listen(5000);
console.debug('listenning 5000...');

/************************ error handler ************************/

app.on('error', err => console.error('server error', err));