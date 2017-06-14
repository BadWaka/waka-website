/************************ React ****************************/

import React from 'react';
import ReactDOM from 'react-dom';

/************************ React Router ****************************/

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

/************************ Redux ****************************/

import {
    createStore
} from 'redux';

import {
    Provider
} from 'react-redux'

import reducer from './reducers';

/************************ stylesheet ****************************/

// reset.css
import './common/reset.scss';

// antd less
import 'antd/dist/antd.less';

/************************ Material UI ****************************/

// 使用 react-tap-event-plugin 监听 touch / tap / clickevents 事件，移动端使用 onTouchTap 事件替换 onClick 事件 http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Theme
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';    // 黑暗主题
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // 主题提供器组件
import getMuiTheme from 'material-ui/styles/getMuiTheme';   // 获得主题的方法
import _colors from './common/color';   // 颜色js

// 自定义主题
const muiTheme = getMuiTheme({
    // 调色板
    palette: {
        primary1Color: _colors.lightBlue500,
        primary2Color: _colors.lightBlue500,
        primary3Color: _colors.grey600,
        accent1Color: _colors.pinkA200,
        accent2Color: _colors.pinkA400,
        accent3Color: _colors.pinkA100,
        textColor: _colors.fullBlack,
    }
});

/************************ Components ****************************/

import {
    EditArticle
} from './containers';

/************************ render ****************************/

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    // react-redux Provider
    <Provider store={store}>
        {/* react-router 路由 */}
        <Router history="">
            {/* MaterialUI 主题 */}
            <MuiThemeProvider muiTheme={muiTheme}>
                {/* 主体 */}
                <section>
                    <EditArticle/>
                </section>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);