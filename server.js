/************************ require ************************/

const Koa = require('koa');
const console = require('tracer').colorConsole();

/************************ initial ************************/

const app = new Koa();

/************************ middleware ************************/

// req-res time
app.use(async function (ctx, next) {
    const startTime = new Date();
    await next();
    const ms = new Date() - startTime;
    console.log(`一次请求时间 req-res time is ${ms}ms`);
})

app.use(ctx => {
    ctx.body = 'Hello World!';
});

/************************ start server ************************/
app.listen(3000);
console.info('listenning 3000...');