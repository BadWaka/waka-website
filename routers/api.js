/**
 * 接口路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const requestPromise = require('request-promise'); // request请求库的Promise版本
const cheerio = require('cheerio');

/**
 * 必应壁纸爬虫
 */
koaRouter.get('/api/bingWallPaper', async function (ctx) {

    console.debug('/api/bingWallPaper', ctx);

    // 壁纸详情路径地址
    let wallPaperDetailUrlList = [];

    // 请求微软必应壁纸首页，拿到 html
    const bingHost = 'https://bing.ioliu.cn';
    const html = await requestPromise(bingHost);

    // 使用 cheerio 转换
    let $ = cheerio.load(html);

    // 过滤壁纸字段
    const masks = $('.mark');
    masks.each((index, item) => {
        item = $(item);
        const wallPaperUrl = bingHost + item.attr('href');
        wallPaperDetailUrlList.push(wallPaperUrl);
    });

    console.log('wallPaperList', wallPaperDetailUrlList);

    // 并发请求详情页并且取数据
    wallPaperDetailUrlList.forEach(async(item, index) => {
        const detailHtml = await requestPromise(item);
        // console.info('detailHtml', detailHtml);
        let $ = cheerio.load(detailHtml);
        const mask = $('.mark');
        mask.each((index, item) => {
            // item = $(item);
            console.info('mask imageUrl', item); // 卡在了无法取得background-image上
        });

    });

});

module.exports = koaRouter;