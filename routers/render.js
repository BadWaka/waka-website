/**
 * 渲染路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const marked = require('marked');   // 解析markdown为html
const fileUtil = require('../utils/fileUtil');  // 文件工具
const requestPromise = require('request-promise');  // 网络请求
const constant = require('../utils/constant');  // 常量

/**
 * 初始化变量
 */
const currentHost = 'http://localhost:5000';

/**
 * 主页
 */
koaRouter.get('/', async function (ctx) {
    // // 得到 cookie
    // const cookie = ctx.cookies.get(constant.cookieName);
    // console.debug('cookie', cookie);
    // // 请求所有文章数据
    // const p1 = requestPromise(currentHost + '/api/getArticle');
    // try {
    //     const values = await Promise.all([p1]);
    //     // console.debug('values', values);
    //     await ctx.render('index', {
    //         articles: JSON.parse(values[0])
    //     });
    // } catch (err) {
    //     console.error(err);
    // }
    ctx.render('index',{
        
    });
});

/**
 * 详情页
 */
koaRouter.get('/detail', async function (ctx) {
    const markdownStr = '';
    fileUtil.readFile(process.cwd() + '/test/test.md')
        .then((data) => {
            console.debug('data', data.toString());
            console.info('marked', marked(data.toString()));
        });
    await ctx.render('detail');
});

/**
 * 注册页
 */
koaRouter.get('/signup', async function (ctx) {
    await ctx.render('login', {
        title: '注册'
    });
});

/**
 * 登录页
 */
koaRouter.get('/signin', async function (ctx) {
    await ctx.render('login', {
        title: '登录'
    });
});

/**
 * 上传文件测试页
 */
koaRouter.get('/uploadFile', async function (ctx) {
    await ctx.render('uploadFile', {
        title: '上传文件测试页'
    });
});

module.exports = koaRouter;