import React from 'react';
import ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

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