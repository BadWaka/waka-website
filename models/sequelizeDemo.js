const Sequelize = require('sequelize'); // sequelize ORM库
const mysqlConfig = require('../secret/mysql.config');   // mysql配置文件

// 创建sequelize对象实例
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
    host: mysqlConfig.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 定义模型 Article，告诉 Sequelize 如何映射数据库表
const Article = sequelize.define('article', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    title: Sequelize.STRING(100),
    intro: Sequelize.STRING(200),
    content: Sequelize.STRING(500),
    tag: Sequelize.STRING(20),
    read_count: Sequelize.INT(11),
    comments: Sequelize.STRING(100),
    likes: Sequelize.STRING(100),
    donates: Sequelize.STRING(100),
    author_id: Sequelize.STRING(50),
    author_name: Sequelize.STRING(20),
    author_avatar: Sequelize.STRING(50),
    updated_at: Sequelize.STRING(100),
    created_at: Sequelize.STRING(100),
});