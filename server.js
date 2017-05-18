/**
 * require
 */
const Koa = require('koa');

/**
 * initial
 */
const app = new Koa();

/**
 * middleware
 */
app.use(ctx => {
    ctx.body = 'Hello World!';
});

/**
 * start server
 */
app.listen(3000);
console.log('listenning 3000...');