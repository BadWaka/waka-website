/************************** action types **************************/

const SET_MODE = 'EDIT_ARTICLE/SET_MODE';  // 设置模式
const SET_ARTICLE_TITLE = 'EDIT_ARTICLE/SET_ARTICLE_TITLE';  // 设置文章标题
const SET_ARTICLE_CONTENT = 'EDIT_ARTICLE/SET_ARTICLE_CONTENT';  // 设置文章内容

/************************** action creators **************************/

/**
 * 设置模式
 * @param mode number 0代表新建作品；1代表编辑作品
 * @return {{type: string, mode: *}}
 */
export const setMode = (mode) => {
    return {
        type: SET_MODE,
        mode
    }
};

/**
 * 设置文章标题
 * @param articleTitle
 * @return {{type: string, title: *}}
 */
export const setArticleTitle = (articleTitle) => {
    return {
        type: SET_ARTICLE_TITLE,
        articleTitle
    }
};

/**
 * 设置文章内容
 * @param articleContent
 * @return {{type: string, title: *}}
 */
export const setArticleContent = (articleContent) => {
    return {
        type: SET_ARTICLE_CONTENT,
        articleContent
    }
};

/************************** reducer **************************/

export default function (state = {}, action) {
    switch (action.type) {
        // 设置模式
        case SET_MODE:
            return {...state, mode: action.mode};
        // 设置文章标题
        case SET_ARTICLE_TITLE:
            return {...state, articleTitle: action.articleTitle};
        // 设置文章内容
        case SET_ARTICLE_CONTENT:
            return {...state, articleContent: action.articleContent};
        default:
            return state;
    }
}