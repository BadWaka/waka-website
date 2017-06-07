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
