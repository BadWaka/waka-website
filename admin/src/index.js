import React from 'react';
import ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

import {
    Footer,
    Header
} from './components/index';

ReactDOM.render(
    <div>
        <Footer/>
        <Header/>
    </div>,
    document.getElementById('root')
);