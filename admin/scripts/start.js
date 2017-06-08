// Do this as the first thing so that any code reading it knows the right env.
// 第一件事做这个是因为任何人读到该代码时都能知道正确的环境
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
// 让它崩溃！而不是静静的继续跑着但是存在隐患的代码
process.on('unhandledRejection', err => {
    throw err;
});

// Ensure environment variables are read.
// 确保环境变量被读取
require('../config/env');