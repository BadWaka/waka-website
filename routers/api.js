/**
 * 接口路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const requestPromise = require('request-promise');  // request请求库的Promise版本
const cheerio = require('cheerio');

koaRouter.get('/api/bingWallPaper', async function (ctx) {

    console.debug('/api/bingWallPaper', ctx);

    // 壁纸详情路径地址
    let wallPaperDetailUrlList = [];

    // 请求微软必应壁纸首页，拿到 html
    const bingHost = 'https://bing.ioliu.cn';
    const html = await requestPromise(bingHost);

    // 使用 cheerio 转换
    const $ = cheerio.load(html);

    // 过滤壁纸字段
    const masks = $('.mark');
    for (let i = 0; i < masks.length; i++) {
        const wallPaperUrl = bingHost + masks.eq(i).attr('href');
        wallPaperDetailUrlList.push(wallPaperUrl);
    }

    console.log('wallPaperList', wallPaperDetailUrlList);

    // 并发请求详情页并且取数据
    

});

module.exports = koaRouter;