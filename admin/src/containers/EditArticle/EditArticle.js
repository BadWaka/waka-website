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
} from '../../components'

class EditArticle extends Component {

    componentWillMount() {
        const {
            setTitle
        } = this.props;
        setTitle('编辑作品');
    }

    render() {

        const {
            title,
            setTitle
        } = this.props;

        return <section>
            <Header title={title}/>
            <button onClick={() => {
                setTitle('waka');
            }}>改变标题
            </button>
            <Footer/>
        </section>;
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.header.title
    }
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