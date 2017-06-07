const mysql = require('mysql'); // mysql node driver
const mysqlConfig = require('../secret/mysql.config');   // mysql配置文件
const console = require('tracer').colorConsole(); // 增强console

// 初始化数据库配置, mysql端口号默认为3306
const connection = mysql.createConnection({
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
});

// 连接数据库
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ', err);
    }
    console.debug('connected id is', connection.threadId);
});

connection.query('SELECT * FROM articles', function (err, results, fields) {
    if (err) {
        console.error(err);
    }
    console.debug('results', results);
});

connection.end();