/**
 * 接口路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const requestPromise = require('request-promise'); // request请求库的Promise版本
const cheerio = require('cheerio'); // cheerio 操作 html
const mysqlUtil = require('../utils/mysqlUtil');    // 操作数据库工具集
const uuidV4 = require('uuid/v4');   // 生成uuid的库

// initial

/**
 * 获得响应体
 * @param ctx
 * @param errno
 * @param errmsg
 * @param data
 * @return {{errno: *, errmsg: *, data: *}}
 */
function getCtxBody(errno = 0, errmsg = '', data = '') {
    return {
        errno,
        errmsg,
        data
    }
}

// 爬虫 crawler

/**
 * 必应壁纸爬虫
 *
 * 注：由于该网站的高清图片地址是放在 style 里的，用 cheerio 没法取到，所以这里和 jsdom 配合使用
 */
koaRouter.get('/api/bingWallPaper', async function (ctx) {

    // 高清图片地址数组
    const wallPaperHighDefinitionImgUrlList = [];

    const p = ctx.query.p || '';
    console.debug('要查询的页码 p', p);

    /**
     * 拉数据
     */
    const fetchData = async () => {

        // 请求微软必应壁纸首页，拿到 html
        const bingHost = 'https://bing.ioliu.cn';
        let url = bingHost;
        if (p) {
            url += '/?p=' + p;
        }
        console.debug('url', url);
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
        };

        // promise 数组，为了使用 Promise.all() 用来判断所有请求是否都完成
        const promiseArr = [];

        // 并发
        wallPaperDetailUrlList.forEach((item, index) => {
            const promise = fetchHighDefinitionImg(item, wallPaperHighDefinitionImgUrlList);
            promiseArr.push(promise);
        });

        // 所有并发请求完毕后返回
        return Promise.all(promiseArr);

    };

    // 拉完数据
    await fetchData();
    ctx.body = getCtxBody(0, '', wallPaperHighDefinitionImgUrlList);

});

// 文章相关 articles

/**
 * 创建新文章
 */
koaRouter.post('/api/createArticle', async function (ctx) {

    /**************************** 拿到 post 数据 ******************************/

    const reqBody = ctx.request.body;
    const article = {
        title: reqBody.title,
        intro: reqBody.intro,
        content: reqBody.content,
        type: reqBody.type,
        tag: reqBody.tag,
        read_count: reqBody.read_count,
        likes: reqBody.likes,
        donates: reqBody.donates,
        author_id: reqBody.author_id,
        author_name: reqBody.author_name,
        author_avatar: reqBody.author_avatar,
        created_at: reqBody.created_at,
        updated_at: reqBody.updated_at,
        comments: reqBody.comments,
    };
    // console.debug('article', article);

    let errno = 0;  // 错误码
    let errmsg = '';    // 错误提示
    let data = '';  // 数据

    /**************************** 校验必填项 ******************************/

    // 校验标题
    if (!article.title) {
        errno = 1;
        errmsg = '请填写标题';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 校验标题
    if (!article.content) {
        errno = 2;
        errmsg = '请填写内容';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    /**************************** 写库 ******************************/

    // 生成 uuid
    article.id = uuidV4().replace(/-/g, '');    // 去掉中间的 - 号，因为这样会导致 mysql 报错

    try {
        // 库中插入新数据
        data = await mysqlUtil.query(
            `INSERT INTO articles (id,title,intro,content,type,tag,author_id,author_name,author_avatar) 
             VALUES ('${article.id}','${article.title}','${article.intro}','${article.content}','${article.type}','${article.tag}','${article.author_id}','${article.author_name}','${article.author_avatar}');`
        );
        // 返回数据
        ctx.body = getCtxBody(errno, errmsg, data);
    } catch (e) {
        console.error(e);
        errno = 3;
        errmsg = `插入数据库报错 ${e.message}`;
        ctx.body = getCtxBody(errno, errmsg, data);
    }

});

/**
 * 删除文章 by id
 */
koaRouter.post('/api/deleteArticle', async function (ctx) {

    const articleId = ctx.request.body.id;
    console.debug('articleId', articleId);

    if (!articleId) {
        ctx.body = getCtxBody(1, '文章id为空', '');
        return;
    }

    try {
        const deleteResult = await mysqlUtil.query(`DELETE FROM articles WHERE id='${articleId}'`);
        ctx.body = getCtxBody(0, '', deleteResult);
    } catch (e) {
        console.error(e);
        ctx.body = getCtxBody(2, `删除数据行错误 ${e.message}`, '');
    }

});

/**
 * 修改文章 by id
 */
koaRouter.post('/api/updateArticle', async function (ctx) {

    /**************************** 拿到 post 数据 ******************************/

    const reqBody = ctx.request.body;
    const article = {
        id: reqBody.id,
        title: reqBody.title,
        intro: reqBody.intro,
        content: reqBody.content,
        type: reqBody.type,
        tag: reqBody.tag,
        read_count: reqBody.read_count,
        likes: reqBody.likes,
        donates: reqBody.donates,
        author_id: reqBody.author_id,
        author_name: reqBody.author_name,
        author_avatar: reqBody.author_avatar,
        created_at: reqBody.created_at,
        updated_at: reqBody.updated_at,
        comments: reqBody.comments,
    };
    // console.debug('article', article);

    let errno = 0;  // 错误码
    let errmsg = '';    // 错误提示
    let data = '';  // 数据

    /**************************** 校验必填项 ******************************/

    // 校验id
    if (!article.id) {
        errno = -1;
        errmsg = '没有id';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 校验标题
    if (!article.title) {
        errno = 1;
        errmsg = '请填写标题';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 校验标题
    if (!article.content) {
        errno = 2;
        errmsg = '请填写内容';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    /**************************** 写库 ******************************/

    try {
        // 更新数据
        data = await mysqlUtil.query(
            `UPDATE articles SET 
            id='${article.id}',
            title='${article.title}',
            intro='${article.intro}',
            content='${article.content}',
            type='${article.type}',
            tag='${article.tag}',
            author_id='${article.author_id}',
            author_name='${article.author_name}',
            author_avatar='${article.author_avatar}' 
            WHERE id='${article.id}';`
        );
        // 返回数据
        ctx.body = getCtxBody(errno, errmsg, data);
    } catch (e) {
        console.error(e);
        errno = 3;
        errmsg = `更新数据库报错 ${e.message}`;
        ctx.body = getCtxBody(errno, errmsg, data);
    }

});

/**
 * 获得所有文章
 */
koaRouter.get('/api/getArticles', async function (ctx) {
    const results = await mysqlUtil.query('SELECT * FROM articles');
    ctx.body = getCtxBody(0, '', results);
});

module.exports = koaRouter;