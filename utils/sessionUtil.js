const uuidV4 = require('uuid/v4');   // 生成uuid的库

/**
 * 产生一个 session
 * @param userId
 * @param expires
 * @return {{id: *, userId: *, expires: *}}
 */
const generateSession = (userId, expires) => {
    return {
        id: uuidV4().replace(/-/g, ''),
        userId,
        expires
    };
};
