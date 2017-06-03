const fs = require('fs');
const console = require('tracer').colorConsole(); // 增强console

/**
 * 读文件
 * @return {Promise}
 */
function readFile(filePath) {

    return new Promise((resolve, reject) => {

        fs.readFile(filePath, function (err, data) {

            if (err) {
                console.error(err);
                reject(err);
            }

            resolve(data);

        });

    });
}

/**
 * 写文件
 * @param data
 * @param outputFilePath 输出文件路径
 * @return {Promise}
 */
function writeFile(data, outputFilePath) {

    return new Promise((resolve, reject) => {

        fs.writeFile(outputFilePath, data, function (err) {

            if (err) {
                console.error(err);
                reject(err);
            }

            console.debug(outputFilePath + '文件写入成功');
        });
    });
}

module.exports = {
    readFile,
    writeFile
};