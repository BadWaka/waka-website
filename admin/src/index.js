import React from 'react';
import ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

import Header from './components/Header/Header';

ReactDOM.render(
    <div>
        <Header/>
    </div>,
    document.getElementById('root')
);