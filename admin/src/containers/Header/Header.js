import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

import {
    AppBar
} from 'material-ui';

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

/************************** Redux **************************/

import {
    connect
} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        title: state.header.title
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};
Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;