import React from 'react';
import ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

// antd less
import 'antd/dist/antd.less';

// 使用 react-tap-event-plugin 监听 touch / tap / clickevents 事件，移动端使用 onTouchTap 事件替换 onClick 事件 http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Material UI 主题
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

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
    return <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar title="My AppBar" />
    </MuiThemeProvider>;
};


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);