const fileUtil = require('../utils/fileUtil');
const console = require('tracer').colorConsole(); // 增强console

fileUtil.readFile('./spell.txt')
    .then(function (data) {

        const dataStr = data.toString();
        // console.debug('原始数据 dataStr', dataStr);

        const dataStrNoSpaceEnterNumber = dataStr.replace(/\s+|\d/g, '');    // 去除所有空格和回车和数字
        // console.debug('没有空格和回车的字符串 dataStrNoSpaceEnterNumber', dataStrNoSpaceEnterNumber);

        const indexArr = [];
        for (let i = 0; i < dataStrNoSpaceEnterNumber.length; i++) {
            indexArr.unshift(i);
        }
        console.debug('indexArr', indexArr);

        fileUtil.writeFile(indexArr, './v3.csv');

    });