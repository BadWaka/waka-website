import React from 'react';
import ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

import 'antd/dist/antd.less';

// components
import {
    Footer,
    Header
} from './components/index';

// test antd
import {
    Button,
    DatePicker
} from 'antd';

ReactDOM.render(
    <div>
        <Header/>
        <div>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
        </div>
        <DatePicker/>
        <Footer/>
    </div>,
    document.getElementById('root')
);