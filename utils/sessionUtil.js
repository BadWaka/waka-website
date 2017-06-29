const uuidV4 = require('uuid/v4');   // 生成uuid的库

/**
 * 产生一个 session
 * @param user_id
 * @param expires
 * @return {{id: *, userId: *, expires: *}}
 */
const generateSession = (user_id, expires) => {
    return {
        id: uuidV4().replace(/-/g, ''),
        user_id,
        expires
    };
};

module.exports = {
    generateSession
};