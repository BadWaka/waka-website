/**
 * Created by BadWaka on 2017/6/3.
 */

const fileUtil = require('../utils/fileUtil');
const console = require('tracer').colorConsole(); // 增强console

fileUtil.readFile('./spell.txt')
    .then(function (data) {

        const dataStr = data.toString();
        // console.debug('原始数据 dataStr', dataStr);

        let dataArr = dataStr.replace(/\n/g, ' ');    // 去除所有空格和回车和数字
        dataArr = dataArr.split(' ');
        console.debug('用空格分词 dataArr', dataArr);

        const indexArr = [];
        for (let i = 0; i < dataArr.length; i++) {
            indexArr.push(i);
        }
        console.debug('indexArr', indexArr);

        fileUtil.writeFile(indexArr, './v6.csv');

    });