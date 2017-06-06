/**
 * 给ctx添加render方法，渲染nunjucks模板
 */
const nunjucks = require('nunjucks');   // nunjucks 模板引擎
const console = require('tracer').colorConsole(); // 增强console

function createEnv(path, opts) {

    const autoescape = opts.autoescape === undefined ? true : opts.autoescape,    // 控制如果带有危险字符的输出自动转义
        noCache = opts.noCache || false,    // 不使用缓存并且每次重新编译模板，生产环境一定要置为false，否则由于同步IO会有严重性能问题
        watch = opts.watch || false,    // 改变时重新加载模板
        throwOnUndefined = opts.throwOnUndefined || false,  // 输出空值/未定义值时会抛出错误
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache,
                watch
            }), {
                autoescape,
                throwOnUndefined
            });

    if (opts.filters) {
        for (let filterName in opts.filters) {
            // 添加过滤器，虽然我也不知道过滤器有啥用
            env.addFilter(filterName, opts.filters[filterName]);
        }
    }

    return env;
}

function templating(path, opts) {

    // 创建nunjucks的env对象
    const env = createEnv(path, opts);

    return async (ctx, next) => {

        // 给ctx绑定render函数
        ctx.render = function (view, model) {

            // 把render后的内容赋值给response.body
            // 首先，model || {}确保了即使传入undefined，model也会变为默认值{}。Object.assign()会把除第一个参数外的其他参数的所有属性复制到第一个参数中。第二个参数是ctx.state || {}，这个目的是为了能把一些公共的变量放入ctx.state并传给View
            // 例如，某个middleware负责检查用户权限，它可以把当前用户放入ctx.state中，这样就没有必要在每个Controller的async函数中都把user变量放入model中
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));

            // 设置Content-Type
            ctx.response.type = 'text/html';
        };

        // 继续处理请求
        await next();
    };
}

module.exports = templating;