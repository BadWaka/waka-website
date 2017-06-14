/************************** action types **************************/

const SET_MODE = 'EDIT_ARTICLE/SET_MODE';  // 设置模式

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

/************************** reducer **************************/

export default function (state = {}, action) {
    switch (action.type) {
        // 设置模式
        case SET_MODE:
            return {...state, mode: action.mode};
        default:
            return state;
    }
}