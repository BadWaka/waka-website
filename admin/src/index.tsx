import * as React from 'react';
import * as ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

// ant-design
import 'antd/dist/antd.css';

import {
    DatePicker
} from 'antd';

// components
import {
    Header,
    Footer
} from './components';

ReactDOM.render(
    <div>
        <Header/>
        <Footer/>
    </div>,
    document.getElementById('example')
);