const mysql = require('mysql'); // mysql node driver
const mysqlConfig = require('../secret/mysql.config');   // mysql配置文件
const console = require('tracer').colorConsole(); // 增强console

// 初始化数据库配置,建立连接池 mysql端口号默认为3306
const pool = mysql.createPool({
    connectionLimit: 10,    // 连接数量
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
});

// 直接使用 pool.query
pool.query('SELECT * FROM articles', function (err, results, fields) {
    if (err) {
        console.error(err);
        return;
    }
    console.debug('results', results);
});

// 通过 pool.getConnection 获得链接
pool.getConnection(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }
    connection.query('SELECT * FROM articles', function (err, results, fields) {
        if (err) {
            console.error(err);
            return;
        }
        console.debug('results', results);

        connection.release();   // 释放该链接，把该链接放回池里供其他人使用

        // connection.destroy();   // 如果要关闭连接并将其从池中删除，请改用connection.destroy（）。该池将在下次需要时创建一个新的连接。
    });
});