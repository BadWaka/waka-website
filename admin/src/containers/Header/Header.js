import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import {
    AppBar
} from 'material-ui';

import style from './style.scss';

class Header extends Component {

    // 定义属性类型
    static propTypes = {
        title: PropTypes.string,
    };

    // 设置默认属性
    static defaultProps = {
        title: '',
    };

    render() {

        const {
            title,
        } = this.props;

        return <section>
            <AppBar title={title}/>
        </section>;
    }
}

export default Header;