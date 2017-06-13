const usersReducer = (state, action) => {
    if (!state) {
        return [];
    }
    switch (action.type) {
        case 'ADD_USER':
            return [...state, action.user];
        case 'DELETE_USER':
            let deState = [...state];
            deState.splice(action.index, 1);
            return deState;
        case 'UPDATE_USER':
            let upState = [...state];
            upState[action.index] = {...upState[action.index], ...action.user};
            return upState;
        default:
            return state;
    }
};