// action types
const SET_TITLE = 'SET_TITLE';  // 设置标题

export default function (state = {}, action) {
    console.log('state', state, 'action', action);
    switch (action.type) {
        case SET_TITLE:
            return state;
        default:
            return state;
    }
}