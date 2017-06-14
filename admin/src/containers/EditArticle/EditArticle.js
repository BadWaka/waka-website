import React, {
    Component
} from 'react';

import style from './style.scss';

import {
    AppBar,
    TextField,
    RaisedButton
} from 'material-ui';

class EditArticle extends Component {

    componentWillMount() {
        const {
            setMode
        } = this.props;

        // 设置模式
        setMode(0);
    }

    render() {

        const {
            mode
        } = this.props;

        // 根据模式设置标题
        const appBarTitle = mode === 0 ? '新建作品' : '编辑作品';

        return <section className={style.editArticle}>
            {/* Header */}
            <AppBar title={appBarTitle}/>
            {/* 主体 */}
            <section className={style.main}>
                {/* 左侧编辑框 */}
                <section className={style.left}>
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
                </section>
                {/* 右侧预览框 */}
                <section className={style.right}>
                    <h1>

                    </h1>
                </section>
            </section>
        </section>;
    }
}

/************************** Redux **************************/

import {
    connect
} from 'react-redux';

import {
    setMode
} from '../../reducers/EditArticle';

const mapStateToProps = (state) => {
    return {
        mode: state.editArticle.mode
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMode: (title) => {
            dispatch(setMode(title));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);