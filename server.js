/************************ require ************************/

const Koa = require('koa'); // koa
const console = require('tracer').colorConsole(); // 增强console
const koaStatic = require('koa-static'); // koa-static   设置静态资源目录
const koaMount = require('koa-mount');  // koa-mount 将中间件挂载到特定url下
const koaBodyParser = require('koa-bodyparser');    // koa-bodyparser 解析post中的data
const staticFiles = require('./middlewares/staticFiles');   // 自己写的静态资源中间件
const templating = require('./middlewares/templating'); // 自己写的nunjucks模板渲染中间件
const Sequelize = require('sequelize'); // sequelize ORM库
const mysqlConfig = require('./secret/mysql.config');   // mysql配置文件

const renderRouter = require('./routers/render'); // 渲染路由
const apiRouter = require('./routers/api'); // 接口路由

/************************ initial ************************/

const app = new Koa();

// 是否是生产环境
const isProduction = process.env.NODE_ENV === 'production';
console.debug('当前环境 process.env.NODE_ENV', process.env.NODE_ENV);

/************************ connect mysql ************************/

// 创建sequelize对象实例
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
    host: mysqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 定义模型 Article，告诉 Sequelize 如何映射数据库表
const Article = sequelize.define('article', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    title: Sequelize.STRING(100),

});

/************************ middleware ************************/

// x-response-time 记录请求时间
app.use(async function (ctx, next) {
    const startTime = new Date();
    await next();
    const ms = new Date() - startTime;
    ctx.set('X-Response-Time', `${ms}ms`); // 把请求开始到响应完成的时间存到ctx里
    console.info(`响应时间 x-response-time ${ms}ms`);
});

// 开发环境下才会设置静态文件目录
if (!isProduction) {

    // // 设置静态目录，使用 koa-mount 将静态资源目录挂载到 /static 路径下
    // app.use(koaMount('/static', koaStatic('static')));

    // 设置静态资源目录，使用自己写的中间件
    app.use(staticFiles('/static', __dirname + '/static'));
}

// 解析post的data
app.use(koaBodyParser());

// 给ctx添加render方法，渲染模板文件
app.use(templating('views', {
    noCache: !isProduction, // 生产环境需要缓存
    watch: !isProduction,   // 生产环境不需要实时监测文件变化
}));

/************************ 路由 ************************/

// 渲染路由，用来渲染页面
app.use(renderRouter.routes());
app.use(renderRouter.allowedMethods());

// 接口路由，用来做逻辑处理
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

/************************ start server ************************/

app.listen(3000);
console.debug('listenning 3000...');

/************************ error handler ************************/

app.on('error', err =>
    console.error('server error', err)
);