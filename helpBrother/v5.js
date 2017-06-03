/**
 * Created by BadWaka on 2017/6/3.
 */

const fileUtil = require('../utils/fileUtil');
const console = require('tracer').colorConsole(); // 增强console

const alphabetArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];    // 字母表
const alphabetStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';   // 字母表

fileUtil.readFile('./spell.txt')
    .then(function (data) {

        const dataStr = data.toString();
        // console.debug('原始数据 dataStr', dataStr);

        const dataStrNoSpaceEnterNumber = dataStr.replace(/\s+|\d/g, '');    // 去除所有空格和回车和数字
        // console.debug('没有空格和回车的字符串 dataStrNoSpaceEnterNumber', dataStrNoSpaceEnterNumber);

        const indexArr = [];
        for (let i = 0; i < dataStrNoSpaceEnterNumber.length; i++) {
            const index = alphabetStr.indexOf(dataStrNoSpaceEnterNumber[i]) + 1;
            indexArr.unshift(index);
        }
        console.debug('indexArr', indexArr);

        fileUtil.writeFile(indexArr, './v5.csv');

    });