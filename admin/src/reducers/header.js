// action types
const SET_TITLE = 'SET_TITLE';  // 设置标题

export default function (state = {}, action) {
    console.log('state', state);
    switch (action.type) {
        case SET_TITLE:
            return {...state, title: action.title};
        default:
            return state;
    }
}