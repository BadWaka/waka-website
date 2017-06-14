import React, {
    Component
} from 'react';

import style from './style.scss';

import {
    Header,
    Footer
} from '../index';

import {
    TextField,
    RaisedButton
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
                    hintText="请填写标题"
                    floatingLabelText="标题"
                    fullWidth={true}/>
                <TextField
                    floatingLabelText="内容"
                    multiLine={true}
                    rows={20}
                    rowsMax={20}
                    fullWidth={true}/>
                {/* 按钮组 */}
                <section className={style.btnsGroup}>
                    <RaisedButton className={style.btnConfirm} label="确定" primary={true}/>
                    <RaisedButton label="取消"/>
                </section>
            </section>
            {/* Footer */}
            <Footer/>
        </section>;
    }
}

/************************** Redux **************************/

import {
    connect
} from 'react-redux';

import {
    setTitle
} from '../../reducers/header';

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: (title) => {
            dispatch(setTitle(title));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);