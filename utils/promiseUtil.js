const Promise = require('bluebird');    // bluebird Promise
const console = require('tracer').colorConsole(); // 增强console

/**
 * promisify ES6
 * @param fn
 * @param receiver
 * @return {function(...[*])}
 */
const promisify = (fn, receiver) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn.apply(receiver, [...args, (err, res) => {
                return err ? reject(err) : resolve(res);
            }]);
        });
    }
};

/**
 * promisify ES5
 * @param fn
 * @param receiver
 * @return {Function}
 */
const promisifyES5 = function promisify(fn, receiver) {
    return function () {
        for (let _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return new Promise(function (resolve, reject) {
            fn.apply(receiver, [].concat(args, [function (err, res) {
                return err ? reject(err) : resolve(res);
            }]));
        });
    };
};

module.exports = {
    promisify,
    promisifyES5
};