const http = require('http');
const console = require('tracer').colorConsole(); // 增强console

const opts = {
    hostname: 'www.baidu.com',
    port: 80,
    method: 'GET'
};

const req = http.request(opts, function (res) {
    console.debug('STATUS: ', res.statusCode);
    console.debug('HEADERS: ', res.headers);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.debug('BODY: ', chunk);
    });
}).on('error', function (e) {
    console.error(e);
}).end();
