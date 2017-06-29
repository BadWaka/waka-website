/**
 * 接口路由
 */
const koaRouter = require('koa-router')(); // koa-router   设置路由
const console = require('tracer').colorConsole(); // 增强console
const requestPromise = require('request-promise'); // request请求库的Promise版本
const cheerio = require('cheerio'); // cheerio 操作 html
const mysqlUtil = require('../utils/mysqlUtil');    // 操作数据库工具集
const uuidV4 = require('uuid/v4');   // 生成uuid的库
const constant = require('../utils/constant');  // 常量
const sessionUtil = require('../utils/sessionUtil');    // sessionUtil
const moment = require('moment');   // moment.js 处理时间日期格式

// initial

/**
 * 获得响应体
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

// 登录/注册/登出

/**
 * 注册
 */
koaRouter.post('/api/signup', async function (ctx) {

    const reqBody = ctx.request.body;
    const identifier = reqBody.identifier;  // 获得注册标识
    const credential = reqBody.credential;  // 获得凭证
    const identity_type = reqBody.identity_type; // 获得注册类型

    let errno = 0;  // 错误码
    let errmsg = '';    // 错误提示
    let data = '';  // 数据

    /**************************** 校验必填项 ******************************/

    // 校验注册标识
    if (!identifier) {
        errno = 1;
        errmsg = '注册标识为空';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 校验凭证
    if (!credential) {
        errno = 2;
        errmsg = '凭证为空';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 校验注册类型
    if (!identity_type) {
        errno = 3;
        errmsg = '注册类型为空';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    try {

        /**
         * 在 user_auths 表中查询是否有该类型、该标识的注册记录
         */
        const isSignUp = await mysqlUtil.query(
            `SELECT * FROM user_auths WHERE identity_type='${identity_type}' and identifier='${identifier}';`
        );
        // 查询的结果是个数组，当数组为空时则代表没有该记录
        if (isSignUp.length !== 0) {
            // 错误处理
            console.error('数据库中已有该类型、该标识的注册记录', isSignUp);
            errno = 4;
            errmsg = `数据库中已有该类型、该标识的注册记录 ${isSignUp.toString()}`;
            ctx.body = getCtxBody(errno, errmsg, data);
            return;
        }

        /**
         * 写 users 表
         */
            // 生成 userId
        const userId = uuidV4().replace(/-/g, '');    // 去掉中间的 - 号，因为这样会导致 mysql 报错
        let inputUsersResult = null;
        // 判断注册类型
        switch (identity_type) {
            case 'mobilePassword':
                // 写入手机号
                inputUsersResult = await mysqlUtil.query(
                    `INSERT INTO users (id,mobile_number) VALUES ('${userId}','${identifier}');`
                );
                break;
            default:
                // 只写入id
                inputUsersResult = await mysqlUtil.query(
                    `INSERT INTO users (id) VALUES ('${userId}');`
                );
                break;
        }
        // console.debug('inputUsersResult', inputUsersResult);

        /**
         * 写 user_auths 表
         */
            // 生成 userAuthId
        const userAuthId = uuidV4().replace(/-/g, '');    // 去掉中间的 - 号，因为这样会导致 mysql 报错
        const inputUserAuthsResult = await mysqlUtil.query(
            `INSERT INTO user_auths (id,user_id,identity_type,identifier,credential) 
             VALUES ('${userAuthId}','${userId}','${identity_type}','${identifier}','${credential}');`
        );
        // console.debug('inputUserAuthsResult', inputUserAuthsResult);

        // 提示成功
        errno = 0;
        data = '注册成功';
        ctx.body = getCtxBody(errno, errmsg, data);

    } catch (e) {
        console.error(e);
        errno = 10;
        errmsg = `数据库操作报错 ${e.message}`;
        ctx.body = getCtxBody(errno, errmsg, data);
    }

});

/**
 * 登录
 */
koaRouter.post('/api/signin', async function (ctx) {

    const reqBody = ctx.request.body;
    const identifier = reqBody.identifier;  // 获得标识
    const credential = reqBody.credential;  // 获得凭证
    const identity_type = reqBody.identity_type; // 获得类型
    let expires = +reqBody.expires;    // 获得 cookie 过期时间；默认获取的是字符串，需要转化成 number

    let errno = 0;  // 错误码
    let errmsg = '';    // 错误提示
    let data = '';  // 数据

    /**************************** 校验必填项 ******************************/

    // 校验标识
    if (!identifier) {
        errno = 1;
        errmsg = '标识为空';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 校验凭证
    if (!credential) {
        errno = 2;
        errmsg = '凭证为空';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 校验类型
    if (!identity_type) {
        errno = 3;
        errmsg = '类型为空';
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    try {

        // 在 user_auths 表中查询是否有该类型、该标识的注册记录
        const records = await mysqlUtil.query(
            `SELECT * FROM user_auths WHERE identity_type='${identity_type}' and identifier='${identifier}';`
        );
        // 错误处理
        if (records.length === 0) {
            errno = 4;
            errmsg = `数据库中没有该类型、该标识的注册记录，用户未注册`;
            ctx.body = getCtxBody(errno, errmsg, data);
            return;
        }
        // 判断凭证是否与库里的一致
        const user_id = records[0].user_id; // 获得库里的 user_id
        const credentialDB = records[0].credential; // 获得库里的凭证
        if (credential !== credentialDB) {
            errno = 5;
            errmsg = `凭证不一致`;
            ctx.body = getCtxBody(errno, errmsg, data);
            return;
        }

        // 如果没传过期时间
        if (expires === 0) {
            // 默认为半小时
            expires = 30 * 60 * 1000;
        }
        // 设置过期日期
        let expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + expires);
        console.log('expiresDate', expiresDate.toUTCString());
        const a = moment.utc().toDate();
        console.log('a', a);
        // 生成 session
        const session = sessionUtil.generateSession(user_id, expiresDate);
        // 写 session 入库
        const inputSessionResult = await mysqlUtil.query(
            `INSERT INTO sessions (id,user_id,expires) VALUES ('${session.id}','${session.user_id}','${a}');`
        );
        // 种 cookie
        // 把 session.id 写入 cookie
        ctx.cookies.set(constant.cookieName, session.id, {
            maxAge: expires,
            expires: expiresDate,   // 这里需要传入一个 GMT 日期格式的对象
        });

        // 提示成功
        errno = 0;
        data = '登录成功';
        ctx.body = getCtxBody(errno, errmsg, data);

    } catch (e) {
        console.error(e);
        errno = 10;
        errmsg = `数据库操作报错 ${e.message}`;
        ctx.body = getCtxBody(errno, errmsg, data);
    }

});

/**
 * 登出
 */
koaRouter.get('/api/logout', async function (ctx) {

    const cookie = ctx.cookies.get(constant.cookieName);    // 获得 cookie

    let errno = 0;  // 错误码
    let errmsg = '';    // 错误提示
    let data = '';  // 数据

    if (!cookie) {
        errno = 1;
        errmsg = '用户未登录';
        console.error('用户未登录');
        ctx.body = getCtxBody(errno, errmsg, data);
        return;
    }

    // 清除 cookie
    ctx.cookies.set(constant.cookieName, null);
    errno = 0;
    data = '登出成功';
    ctx.body = getCtxBody(errno, errmsg, data);
});

// 用户信息表 users

/**
 * 创建新用户
 */
koaRouter.post('/api/createUser', async function (ctx) {

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
 * 删除用户 by id
 */
koaRouter.post('/api/deleteUser', async function (ctx) {

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
 * 修改用户 by id
 */
koaRouter.post('/api/updateUser', async function (ctx) {

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
 * 获得用户
 */
koaRouter.get('/api/getUsers', async function (ctx) {

    const articleId = ctx.request.query.id;

    let result = null;  // 结果
    if (articleId) {
        // 如果有id, 取单个数据
        result = await mysqlUtil.query(`SELECT * FROM articles WHERE id='${articleId}'`);
    } else {
        // 如果没id, 取所有数据
        result = await mysqlUtil.query(`SELECT * FROM articles`);
    }
    ctx.body = getCtxBody(0, '', result);
});

// 用户授权表

/**
 * 创建新授权记录
 */
koaRouter.post('/api/createUserAuth', async function (ctx) {

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
 * 删除用户授权记录 by id
 */
koaRouter.post('/api/deleteUserAuth', async function (ctx) {

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
 * 修改用户授权记录 by id
 */
koaRouter.post('/api/updateUserAuth', async function (ctx) {

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
 * 获得用户授权记录
 */
koaRouter.get('/api/getUsersAuth', async function (ctx) {

    const articleId = ctx.request.query.id;

    let result = null;  // 结果
    if (articleId) {
        // 如果有id, 取单个数据
        result = await mysqlUtil.query(`SELECT * FROM articles WHERE id='${articleId}'`);
    } else {
        // 如果没id, 取所有数据
        result = await mysqlUtil.query(`SELECT * FROM articles`);
    }
    ctx.body = getCtxBody(0, '', result);
});

// 文章表 articles

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
 * 获得文章
 */
koaRouter.get('/api/getArticle', async function (ctx) {

    const articleId = ctx.request.query.id;

    let result = null;  // 结果
    if (articleId) {
        // 如果有id, 取单个数据
        result = await mysqlUtil.query(`SELECT * FROM articles WHERE id='${articleId}'`);
    } else {
        // 如果没id, 取所有数据
        result = await mysqlUtil.query(`SELECT * FROM articles`);
    }
    ctx.body = getCtxBody(0, '', result);
});

module.exports = koaRouter;