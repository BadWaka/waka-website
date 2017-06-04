/**
 * Created by BadWaka on 2017/6/3.
 */

const fileUtil = require('../../utils/fileUtil');
const console = require('tracer').colorConsole(); // 增强console

fileUtil.readFile('./spell.txt')
    .then(function (data) {

        const dataStr = data.toString();
        // console.debug('原始数据 dataStr', dataStr);

        let dataStr2 = dataStr.replace(/\n/g, ' ');    // 去除所有空格和回车和数字
        dataStr2 = dataStr2.replace(/\d/g, ''); // 去除所有数字
        console.debug('dataStr2', dataStr2);

        let dataStr3 = dataStr2.split('');
        for (let i = 0; i < dataStr3.length; i++) {
            if (dataStr3[i] === ' ') {
                dataStr3[i - 1] = -1;
            } else {
                dataStr3[i] = 1;
            }
        }
        dataStr3 = dataStr3.filter(function (item) {
            if (item !== ' ') {
                return item;
            }
        });
        console.debug('dataStr3', dataStr3);

        // dataStr3 = dataStr3.join('').replace(/\s+/g, '');
        // dataStr3 = dataStr3.split('').join(',');

        fileUtil.writeFile(dataStr3, './v6.csv');

    });