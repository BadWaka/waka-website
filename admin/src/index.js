import React from 'react';
import ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

// antd less
import 'antd/dist/antd.less';

// components
import {
    Footer,
    Header
} from './components/index';

ReactDOM.render(
    <div>
        <Header/>
        <Footer/>
    </div>,
    document.getElementById('root')
);