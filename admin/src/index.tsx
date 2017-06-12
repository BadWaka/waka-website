import * as React from 'react';
import * as ReactDOM from 'react-dom';

// reset.css
import './common/reset.scss';

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