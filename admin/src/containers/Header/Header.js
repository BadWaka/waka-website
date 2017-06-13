import React, {
    Component
} from 'react';

import {
    AppBar
} from 'material-ui';

import style from './style.scss';

class Header extends Component {
    render() {
        return <section>
            <AppBar/>
        </section>;
    }
}

export default Header;