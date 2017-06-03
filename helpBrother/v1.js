const fileUtil = require('../utils/fileUtil');
const console = require('tracer').colorConsole(); // 增强console

/**
 * v1特征分析 是否是韵母：0代表不是，1代表是
 * @param str
 */
function v1(str) {
    const v1Arr = [];
    for (let i = 0; i < str.length; i++) {
        isVowel(str[i], i, v1Arr);
    }
    // console.debug('v1特征结果', v1Arr.join(','));
    return v1Arr.join(',');   // 返回一个,分割的字符串
}

/**
 * 是否是韵母
 * @param letter 字母
 * @param letterIndex 字母在原数组的下标
 * @param arr 是否是韵母标识数组
 */
function isVowel(letter, letterIndex, arr) {
    const vowelArr = ['A', 'O', 'E', 'I', 'U']; // 韵母数组
    for (let i = 0; i < vowelArr.length; i++) {
        if (letter === vowelArr[i]) {
            arr[letterIndex] = 1;
            return;
        }
    }
    arr[letterIndex] = 0;
}

fileUtil.readFile('./spell.txt')
    .then(function (data) {

        const dataStr = data.toString();
        // console.debug('原始数据 dataStr', dataStr);

        const dataArr = dataStr.split('\n');    // 以回车分割
        // console.debug('以回车分割的数组 dataArr', dataArr);

        const dataStrNoSpaceEnter = dataStr.replace(/\s+/g, '');    // 去除所有空格和回车
        // console.debug('没有空格和回车的字符串 dataStrNoSpaceEnter', dataStrNoSpaceEnter);

        /**
         * 进行v1特征分析，返回特征分析结果
         */
        const startTime = new Date().getTime();
        const v1Result = v1(dataStrNoSpaceEnter);
        const endTime = new Date().getTime();
        console.debug('v1花费时间', (endTime - startTime) / 1000);

        fileUtil.writeFile(v1Result, './v1.csv');
    });