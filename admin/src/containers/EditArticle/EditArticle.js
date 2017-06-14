import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import style from './style.scss';

import {
    Header,
    Footer
} from '../index';

import {
    TextField
} from 'material-ui';

class EditArticle extends Component {

    componentWillMount() {
        const {
            setTitle
        } = this.props;

        // 设置标题
        setTitle('编辑作品');
    }

    render() {

        return <section>
            {/* Header */}
            <Header/>
            {/* 主体 */}
            <section className={style.main}>
                <TextField
                    hintText="Hint Text"
                    fullWidth={true}/>
            </section>
            {/* Footer */}
            <Footer/>
        </section>;
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: (title) => {
            dispatch({
                type: 'SET_TITLE',
                title: '编辑作品'
            });
        }
    }
};
EditArticle = connect(mapStateToProps, mapDispatchToProps)(EditArticle);

export default EditArticle;