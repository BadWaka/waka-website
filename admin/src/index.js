const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red'
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
};

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            };
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            };
        default:
            return state;
    }
}

function createStore(state, stateChanger) {
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = stateChanger(state, action);
        listeners.forEach((listener) => {
            listener();
        });
    };
    return {
        getState,
        dispatch,
        subscribe
    }
}

const store = createStore(appState, stateChanger);
let oldState = store.getState();    // 缓存旧的state
store.subscribe(() => {
    const newState = store.getState();
    renderApp(newState, oldState);
    oldState = newState;
});
// store.subscribe(() => renderApp2(store.getState()))
// store.subscribe(() => renderApp3(store.getState()))

function renderTitle(newTitle, oldTitle) {
    if (newTitle === oldTitle) {
        return;
    }
    console.log('render title...')
    const titleDOM = document.getElementById('title');
    titleDOM.innerHTML = newTitle.text;
    titleDOM.style.color = newTitle.color;
}

function renderContent(newContent, oldContent) {
    if (newContent === oldContent) {
        return;
    }
    console.log('render content...')
    const contentDOM = document.getElementById('content');
    contentDOM.innerHTML = newContent.text;
    contentDOM.style.color = newContent.color;
}

function renderApp(newAppState, oldAppState = {}) {
    if (newAppState === oldAppState) {
        return;
    }
    console.log('render app...')
    renderTitle(newAppState.title, oldAppState.title);
    renderContent(newAppState.content, oldAppState.content);
}

renderApp(store.getState());

store.dispatch({type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》'}); // 修改标题文本
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'blue'}); // 修改标题颜色
