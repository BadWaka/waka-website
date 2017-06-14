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

    // 文章标题变化
    handleArticleTitleChange(event, value) {
        const {
            setArticleTitle
        } = this.props;

        setArticleTitle(value);
    }

    // 文章内容变化
    handleArticleContentChange(event, value) {
        const {
            setArticleContent
        } = this.props;

        setArticleContent(value);
    }

    render() {

        const {
            mode,
            articleTitle,
            articleContent
        } = this.props;

        // 根据模式设置标题
        const appBarTitle = mode === 0 ? '新建作品' : '编辑作品';

        return <section className={style.editArticle}>
            {/* Header */}
            <AppBar className={style.header} title={appBarTitle}/>
            {/* 主体 */}
            <section className={style.main}>
                {/* 左侧编辑框 */}
                <section className={style.left}>
                    <TextField
                        hintText="请填写标题"
                        floatingLabelText="标题"
                        fullWidth={true}
                        onChange={this.handleArticleTitleChange.bind(this)}/>
                    <TextField
                        floatingLabelText="内容"
                        multiLine={true}
                        rows={20}
                        rowsMax={20}
                        fullWidth={true}
                        onChange={this.handleArticleContentChange.bind(this)}/>
                </section>
                {/* 右侧预览框 */}
                <section className={style.right}>
                    {/* 标题 */}
                    <h1 className={style.articleTitle}>{articleTitle}</h1>
                    {/* 内容 */}
                    <p className={style.articleContent}>{articleContent}</p>
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
    setMode,
    setArticleTitle,
    setArticleContent
} from '../../reducers/EditArticle';

const mapStateToProps = (state) => {
    return {
        mode: state.editArticle.mode,
        articleTitle: state.editArticle.articleTitle,
        articleContent: state.editArticle.articleContent,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMode: (mode) => {
            dispatch(setMode(mode));
        },
        setArticleTitle: (articleTitle) => {
            dispatch(setArticleTitle(articleTitle));
        },
        setArticleContent: (articleContent) => {
            dispatch(setArticleContent(articleContent));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);