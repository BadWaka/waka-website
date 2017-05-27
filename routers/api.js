/**
 * 接口路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const requestPromise = require('request-promise'); // request请求库的Promise版本
const cheerio = require('cheerio'); // cheerio 操作 html

/**
 * 必应壁纸爬虫
 * 
 * 注：由于该网站的高清图片地址是放在 style 里的，用 cheerio 没法取到，所以这里和 jsdom 配合使用
 */
koaRouter.get('/api/bingWallPaper', async function (ctx) {

    console.debug('/api/bingWallPaper', ctx);

    // 请求微软必应壁纸首页，拿到 html
    const bingHost = 'https://bing.ioliu.cn';
    const html = await requestPromise(bingHost);

    // 使用 cheerio 转换
    let $ = cheerio.load(html);

    // 壁纸详情路径地址数组，待会会并发该数组用来获得高清图片地址
    let wallPaperDetailUrlList = [];

    // 过滤壁纸字段
    const masks = $('.mark');
    masks.each((index, item) => {
        item = $(item);
        const wallPaperUrl = bingHost + item.attr('href'); // 拿到壁纸详情页的地址
        wallPaperDetailUrlList.push(wallPaperUrl);
    });
    console.log('壁纸详情路径地址数组 wallPaperDetailUrlList', wallPaperDetailUrlList);

    // 高清图片地址数组
    let wallPaperHighDefinitionImgUrlList = [];

    /**
     * 获得高清图片地址
     * @param {*} wallPaperDetailUrl 壁纸详情路径
     * @param {*} wallPaperHighDefinitionImgUrlList 高清图片地址数组
     */
    const fetchHighDefinitionImg = async function (wallPaperDetailUrl, wallPaperHighDefinitionImgUrlList) {
        // 这里需要注意一个问题，使用 chrome 打开的网页 dom 结构和 cheerio 爬下来的有区别，可能是因为 user-agent 不一样, 以 cheerio 的为准
        const detailHtml = await requestPromise(wallPaperDetailUrl);
        let $ = cheerio.load(detailHtml);
        const target = $('.target');
        const highDefinitionImgUrl = target.attr('data-progressive');
        wallPaperHighDefinitionImgUrlList.push(highDefinitionImgUrl);
        console.log('高清图片地址 highDefinitionImgUrl', highDefinitionImgUrl);
    }

    // 并发
    wallPaperDetailUrlList.forEach((item, index) => {
        fetchHighDefinitionImg(item, wallPaperHighDefinitionImgUrlList);
    });

    console.log('高清图片地址数组 wallPaperHighDefinitionImgUrlList', wallPaperHighDefinitionImgUrlList);

});

module.exports = koaRouter;