import React from 'react';
import ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

// antd less
import 'antd/dist/antd.less';

// 使用 react-tap-event-plugin 监听 touch / tap / clickevents 事件，移动端使用 onTouchTap 事件替换 onClick 事件 http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Material UI
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';    // 黑暗主题
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // 主题提供器组件
import getMuiTheme from 'material-ui/styles/getMuiTheme';   // 获得主题的方法
import AppBar from 'material-ui/AppBar';
import _colors from './common/color';
// 自定义主题
const muiTheme = getMuiTheme({
    // 调色板
    palette: {
        primary1Color: _colors.lightBlue700,
    }
});

// components
import {
    Footer,
    Header
} from './components';

// container
import {
    EditArticle
} from './containers';

const App = () => {
    return <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title="My AppBar"/>
    </MuiThemeProvider>;
};


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);