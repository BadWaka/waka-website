/**
 * MySQL 操作 工具类
 */
const console = require('tracer').colorConsole(); // 增强console
const mysql = require('mysql'); // mysql node driver
const mysqlConfig = require('../secret/mysql.config');   // mysql配置文件
const Promise = require('bluebird');    // bluebird Promise

// 初始化数据库配置, 建立连接池 mysql端口号默认为3306
const pool = mysql.createConnection({
    connectionLimit: 10,    // 一次创建的最大连接数。 (默认值：10)
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
});

/**
 * 封装 pool.query 为 Promise
 * @param sql
 */
function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (err, results, fields) {
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

module.exports = {
    query,
};
