/**
 * 上传文件工具
 */
const inspect = require('util').inspect;
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');
const console = require('tracer').colorConsole(); // 增强console

/**
 * 同步创建文件目录
 * @param dirname 目录绝对地址
 * @return {boolean} 创建目录结果
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

/**
 * 获取上传文件的后缀名
 * @param fileName 上传文件的文件名
 * @return {*} 文件后缀名
 */
function getSuffixName(fileName) {
    const nameList = fileName.split('.');
    return nameList[nameList.length - 1];
}

/**
 * 上传文件
 * @param ctx koa上下文
 * @param options 文件上传参数 fileType 文件类型, path 文件存放路径
 * @return {Promise}
 */
function uploadFile(ctx, options) {
    const req = ctx.req;
    const res = ctx.res;
    const busboy = new Busboy({
        headers: req.headers
    });

    const fileType = options.fileType || 'common';
    const filePath = path.join(options.path, fileType);
    const mkdirResult = mkdirsSync(filePath);

    return new Promise((resolve, reject) => {
        console.debug('文件上前中...');
        const result = {
            success: false,
            formData: {}
        };

        // 解析请求文件事件
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            const fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename); // 加个随机16进制字符串
            const _uploadFilePath = path.join(filePath, fileName);
            const saveTo = path.join(_uploadFilePath);

            // 文件保存到指定路径
            file.pipe(fs.createWriteStream(saveTo));

            // 文件写入事件结果
            file.on('end', function () {
                result.success = true;
                result.message = '文件上传成功';

                console.debug('文件上传成功');
                resolve(result);
            });
        });

        // 解析表单中其他字段信息
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.debug('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });

        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上传结束');
            resolve(result);
        });

        // 解析错误事件
        busboy.on('error', function (err) {
            console.error(err);
            reject(result);
        });

        req.pipe(busboy);
    });
}

module.exports = {
    mkdirsSync,
    getSuffixName,
    uploadFile,
};

