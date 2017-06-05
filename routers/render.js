/**
 * 渲染路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const swig = require('swig');   // swig模板引擎
const nunjucks = require('nunjucks');   // nunjucks模板引擎

function createEnv(path, opts) {
    let autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache,
                watch,
            }), {
                autoescape,
                throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

const env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

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