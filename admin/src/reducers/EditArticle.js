/************************** action types **************************/

const SET_TITLE = 'EDIT_ARTICLE/SET_TITLE';  // 设置标题

/************************** action creators **************************/

// 设置标题
export const setTitle = (title) => {
    return {
        type: SET_TITLE,
        title
    }
};

/************************** reducer **************************/

export default function (state = {}, action) {
    switch (action.type) {
        // 设置标题
        case SET_TITLE:
            return {...state, title: action.title};
        default:
            return state;
    }
}