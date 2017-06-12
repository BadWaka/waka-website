import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Header
} from './components/Header/Header';
import {
    Footer
} from './components/Footer/Footer';

ReactDOM.render(
    <div>
        <Header/>
        <Footer/>
    </div>,
    document.getElementById('example')
);